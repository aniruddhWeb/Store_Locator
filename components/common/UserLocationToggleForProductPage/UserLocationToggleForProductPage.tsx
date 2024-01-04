import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  getBrowserUserLocation,
  LocationContext,
  useCurrentLocationDynamic,
} from 'services/location';
import cn from 'classnames';
import styles from './UserLocationToggleForProductPage.module.css';
import { useDebounce } from '../../../utils/debounce';

export const UserLocationToggleForProductPage = ({
  disableToggle,
}: {
  disableToggle?: boolean;
}) => {
  const { userLocation, selectedLocation, setUserLocation } =
    useCurrentLocationDynamic();
  const { userLocationAllowed, setUserLocationAllowed } =
    useContext(LocationContext);

  const [isLoadingToggleState, setIsLoadingToggleState] =
    useState<boolean>(false);
  const [isLoadingToggleStateDebounce, setIsLoadingToggleStateDebounce] =
    useDebounce(isLoadingToggleState, 1500);

  const [internalToggleEnabled, setInternalToggleEnabled] = useState<boolean>(
    userLocationAllowed && !!userLocation,
  );

  const toggle = useRef<boolean>(disableToggle || false);
  useEffect(() => {
    toggle.current = false;
  }, []);

  const userRegionTitle = useMemo(() => {
    if (internalToggleEnabled) {
      return 'Near Me';
    }
    return `${selectedLocation.plName}, ${selectedLocation.province.plInitials}`;
  }, [internalToggleEnabled, selectedLocation]);

  const onToggle = useCallback(() => {
    if (!isLoadingToggleState) {
      toggle.current = true;
      setIsLoadingToggleState(true);
      setIsLoadingToggleStateDebounce(true);
      setInternalToggleEnabled(!internalToggleEnabled);
    }
  }, [internalToggleEnabled, isLoadingToggleState]);

  useEffect(() => {
    if (internalToggleEnabled && !userLocationAllowed) {
      getBrowserUserLocation(setUserLocationAllowed, true).then(
        locationCoords => {
          if (locationCoords.lat && locationCoords.lng) {
            setUserLocation(locationCoords);
            setTimeout(() => {
              setUserLocationAllowed(true);
              setIsLoadingToggleState(false);
            }, 300);
          } else {
            setInternalToggleEnabled(false);
            setUserLocationAllowed(false);
            setIsLoadingToggleState(false);
          }
        },
      );
    } else if (!internalToggleEnabled) {
      setTimeout(() => {
        setUserLocationAllowed(false);
        setIsLoadingToggleState(false);
      }, 1500);
    }
  }, [internalToggleEnabled, setUserLocation, userLocationAllowed]);

  return (
    <div className={styles.root}>
      <div
        className={cn(styles.userLocationToggleWrapper, {
          [styles.allowed]: internalToggleEnabled,
        })}>
        <div className={styles.leftBlock}>
          <div
            className={cn(styles.toggleWrapper, {
              [styles.checked]: internalToggleEnabled,
              [styles.toggleWrapperDisabled]:
                isLoadingToggleStateDebounce ||
                (toggle.current && disableToggle),
            })}
            onClick={onToggle}>
            <div
              className={cn(styles.toggleMarker, {
                [styles.checked]: internalToggleEnabled,
                [styles.toggleWrapperRotating]:
                  (isLoadingToggleStateDebounce ||
                    (toggle.current && disableToggle)) &&
                  !internalToggleEnabled,
                [styles.toggleWrapperRotatingChecked]:
                  (isLoadingToggleStateDebounce ||
                    (toggle.current && disableToggle)) &&
                  internalToggleEnabled,
              })}>
              {isLoadingToggleStateDebounce ||
              (toggle.current && disableToggle) ? (
                <>
                  <div className={styles.toggleLine} />
                  <div
                    className={
                      internalToggleEnabled
                        ? styles.toggleMarkerInnerChecked
                        : styles.toggleMarkerInner
                    }
                  />
                </>
              ) : null}
            </div>
            <span
              className={cn(styles.label, {
                [styles.checked]: internalToggleEnabled,
              })}>
              Location
            </span>
          </div>
        </div>
        <div className={styles.rightBlock}>
          <span
            className={cn(styles.userRegion, {
              [styles.checked]: internalToggleEnabled,
            })}>
            {userRegionTitle}
          </span>
          <span className={styles.description}>
            {isLoadingToggleStateDebounce || (toggle.current && disableToggle)
              ? 'Applying changes...'
              : internalToggleEnabled
              ? `Showing results closest to your device's location`
              : 'Showing results closest to your selected region'}
          </span>
        </div>
      </div>
    </div>
  );
};
