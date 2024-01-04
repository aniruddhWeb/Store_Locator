import React, { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';
import isEqual from 'lodash/isEqual';
import { useMediaQueries } from '@react-hook/media-query';
import s from './UserLocationToggleForSearchPage.module.css';
import { DropdownArrow } from '../../icons/DropdownArrow';
import { useOutsideDetect } from '../../../utils/window';
import {
  getBrowserUserLocation,
  useCurrentLocationDynamic,
} from '../../../services/location';
import { SearchMode } from '../../../services/search';
import { useSearchValues } from '../../../hooks/search/useSearchContext';

interface Props {
  disableToggle?: boolean;
}

export const UserLocationToggleForSearchPage = React.memo(
  ({ disableToggle }: Props) => {
    const { selectedLocation } = useCurrentLocationDynamic();

    const locationOptions = useMemo(
      () => [
        {
          label: `${selectedLocation?.province?.country?.plCountryName || ''}`,
          value: SearchMode.Country,
        },
        {
          label: `${selectedLocation.plName}, ${selectedLocation.province.plInitials}`,
          value: SearchMode.Region,
        },
        {
          label: `Near Me`,
          value: SearchMode.GPS,
        },
      ],
      [selectedLocation],
    );

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [locationMenuOpened, setLocationMenuOpened] =
      useState<boolean>(false);

    const {
      userLocationLat,
      setUserLocationLat,
      userLocationLng,
      setUserLocationLng,
      setLocationType,
      locationType,
    } = useSearchValues();

    const showingAllText = useMemo(() => {
      if (
        locationType === SearchMode.GPS &&
        userLocationLat &&
        userLocationLng
      ) {
        return 'Showing all results';
      }
      return 'Showing all results in';
    }, [locationType, userLocationLat, userLocationLng]);
    const userRegionTitle = useMemo(() => {
      if (
        locationType === SearchMode.GPS &&
        userLocationLat &&
        userLocationLng
      ) {
        return 'Near Me';
      }
      if (locationType === SearchMode.Country) {
        return `${selectedLocation?.province?.country?.plCountryName}`;
      }
      return `${selectedLocation.plName}, ${selectedLocation.province.plInitials}`;
    }, [locationType, userLocationLng, userLocationLat, selectedLocation]);

    const onDropdownSorting = useCallback(
      (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setLocationMenuOpened(!locationMenuOpened);
      },
      [locationMenuOpened],
    );

    const closeSoring = useCallback(() => setLocationMenuOpened(false), []);

    const handleSortingSelect = useCallback(
      (e: any, option: { label: string; value: string }) => {
        e.preventDefault();
        e.stopPropagation();
        setLocationMenuOpened(false);

        if (option.value === SearchMode.GPS) {
          setIsLoading(true);
          getBrowserUserLocation(() => {}, true).then(locationCoords => {
            if (locationCoords.lat && locationCoords.lng) {
              setLocationType(option.value);
              setUserLocationLat(locationCoords.lat);
              setUserLocationLng(locationCoords.lng);
            } else {
              setLocationType(SearchMode.Region);
              setUserLocationLat(0);
              setUserLocationLng(0);
            }
            setIsLoading(false);
          });
        } else {
          setLocationType(option.value);
        }
      },
      [],
    );

    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
    });

    const sortingDropdownRef = useOutsideDetect(closeSoring, matches.isMobile);

    const dropdownSortItemsClass = cn(s.dropdownItems, {
      [s.dropdownRightSide]: true,
      [s.dropdownItemsHidden]: !locationMenuOpened,
    });

    const dropdownSortingArrowClass = cn(s.dropdownSortingArrow, {
      [s.dropdownSortingArrowOpen]: locationMenuOpened,
    });

    const dropdownSortContainerClass = cn(s.dropdownSortContainer, {
      [s.dropdownSortContainerDisabled]: disableToggle || isLoading,
    });

    return (
      <div className={s.root}>
        <div className={s.resultShowing}>{showingAllText}</div>
        <div
          ref={sortingDropdownRef}
          onClick={onDropdownSorting}
          className={dropdownSortContainerClass}>
          <div className={s.filterItemContainer}>
            <div className={s.filterItemText}>{userRegionTitle}</div>
          </div>
          <DropdownArrow fill="#EF845C" className={dropdownSortingArrowClass} />
          <div className={dropdownSortItemsClass}>
            <div className={s.dropdownScroll}>
              <div className={s.dropdownScrollItems}>
                {locationOptions.map(locationOption => (
                  <div
                    key={locationOption.value}
                    onClick={e => handleSortingSelect(e, locationOption)}
                    className={s.dropdownItem}>
                    <div className={s.nameContainer}>
                      <div className={s.radioInputOrange}>
                        {isEqual(locationType, locationOption.value) ? (
                          <div className={s.radioCircle} />
                        ) : null}
                      </div>
                      <div
                        className={
                          isEqual(locationType, locationOption.value)
                            ? s.selectedDropdownItemText
                            : s.dropdownItemText
                        }>
                        {locationOption.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
