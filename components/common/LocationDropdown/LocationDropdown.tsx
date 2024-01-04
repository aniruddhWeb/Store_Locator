import React, { FC, useState, useCallback, useEffect } from 'react';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import cn from 'classnames';
import {
  askUserLocation,
  useCurrentLocationDynamic,
  useLocationList,
} from '../../../services/location';
import { LocationItemFragment, Maybe } from '../../../generated/graphql';
import s from './LocationDropdown.module.css';
import { Cross } from '../../icons/Cross';
import { Close } from '../../icons/Close';
import { Search } from '../../icons/Search';
import { MapLocation } from '../../icons/MapLocation';
import { CanadaFlag } from '../../icons/CanadaFlag';
import { UsaFlag } from '../../icons/UsaFlag';
import { FLAGS, IFlagsCurrent } from './constants';
import { Loader } from '../Loader/Loader';
import { getProvinces } from '../../../services/location';
import { DropdownArrow } from 'components/icons/DropdownArrow';
// import { FaqItemsDocument } from 'generated/contentful';
// import { SideBarSorting } from '../SideBarSorting/SideBarSorting';

interface Props {
  toggleLocationSelect: () => void;
  location?: LocationItemFragment | null;
}

export const LocationDropdown: FC<Props> = React.memo(props => {
  const { selectedLocation, setCurrentLocation } = useCurrentLocationDynamic();
  const [provinces, setProvinces] = useState<
    Array<
      Maybe<{
        plProvinceID: number;
        plName: string;
        plInitials: string;
        country: {
          plCountryID: number;
          plCountryName: string;
          plCountrySlug: string;
        };
      }>
    >
  >([]);

  const [query, setQuery] = useState<string>('');
  const [flag, setFlag] = useState<IFlagsCurrent>({
    name:
      selectedLocation?.province?.country?.plCountryName?.toUpperCase() ||
      props.location?.province?.country?.plCountryName?.toUpperCase() ||
      FLAGS.canada.name,
    plCountryID:
      selectedLocation?.province?.country?.plCountryID ||
      props.location?.province?.country?.plCountryID ||
      FLAGS.canada.plCountryID,
  });
  const [placeholderValue, setPlaceholderValue] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const [prvID, setPrvID] = useState<string | number | undefined>();

  const [provinceDropdown, setProvinceDropdown] = useState<boolean>(false);

  const setCurrentFlag = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const current = find(Object.values(FLAGS), {
        name: event.currentTarget.dataset.current,
      });
      setFlag(current);
      if (current.name === 'CANADA') {
        setPlaceholderValue('All Provinces');
        setPrvID(undefined);
      } else if (current.name === 'USA') {
        setPlaceholderValue('All States');
        setPrvID(undefined);
      }
    },
    [placeholderValue],
  );

  const {
    selectableList,
    isLoading: isSelectableListLoading,
    hideUSA,
    hideCanada,
    // setSortingOption,
  } = useLocationList(flag.plCountryID, query);

  useEffect(() => {
    if (!isSelectableListLoading) {
      if (hideUSA && !isEqual(flag, FLAGS.canada)) {
        setFlag(FLAGS.canada);
      } else if (hideCanada && !isEqual(flag, FLAGS.usa)) {
        setFlag(FLAGS.usa);
      }
    }
    getProvinces().then(result => {
      setProvinces(result.locationListProvinceForUser);
    });
  }, [hideUSA, flag, hideCanada, isSelectableListLoading]);

  const onChangeLocation = useCallback(
    async (
      locationParam: { value: LocationItemFragment; label: string } | null,
    ) => {
      if (locationParam) {
        await setCurrentLocation(locationParam.value);
      }
      props.toggleLocationSelect();
      setPlaceholderValue(locationParam?.label || '');
    },
    [setCurrentLocation, props.toggleLocationSelect],
  );

  useEffect((): any => {
    if (!placeholderValue) {
      if (flag.name === 'CANADA') {
        setPlaceholderValue('All Provinces');
      } else {
        setPlaceholderValue('All States');
      }
      // Return the newly set placeholder value
      return placeholderValue;
    } else {
      return placeholderValue;
    }
  }, []);

  const toggleLocationSelect = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      props.toggleLocationSelect();
    },
    [props.toggleLocationSelect],
  );

  const onQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.currentTarget.value);
      if (e.currentTarget.value === '') {
        setShowDropdown(false);
      } else {
        setShowDropdown(true);
      }
    },
    [],
  );

  const dropdownChange = (e: any) => {
    if (e.target.value) {
      setShowDropdown(true);
    }
  };

  const onPreventDefault = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const getUserLocation = useCallback(async () => {
    props.toggleLocationSelect();

    const foundLocation = await askUserLocation(undefined);
    if (foundLocation) {
      await setCurrentLocation(foundLocation);
    }
  }, [setCurrentLocation, props.toggleLocationSelect]);

  // const locationDetermineFlagsClass = cn(s.locationDetermineFlags, {
  //   [s.locationDetermineFlagsInvisible]: false,
  // });
  // Need to enable after adding USA data

  const locationDetermineItemClass = cn(s.locationDetermineItem, {
    [s.locationDetermineItemOneCountry]: hideUSA || hideCanada,
  });

  return (
    <div className={s.backContainer} onClick={toggleLocationSelect}>
      <div className={s.locationContainer} onClick={onPreventDefault}>
        <Cross className={s.closeIcon} onClick={toggleLocationSelect} />
        <div className={s.locationTopContainer}>
          <div className={s.firstContainer}>
            <Close
              className={s.closeIconMobile}
              onClick={toggleLocationSelect}
            />
            <div className={s.locationQueryInputContainer}>
              <input
                className={s.locationQueryInput}
                placeholder={'Find your location'}
                value={query}
                onChange={onQueryChange}
                onClick={onPreventDefault}
              />
              <Search className={s.locationIcon} fill="rgba(0,0,0,0.5)" />
            </div>
          </div>

          <div className={s.locationQueryInputBorder} />

          <div
            className={`${s.locationDetermine} ${s.locationDetermineBottom}`}>
            <div className={s.locationDetermineFlags}>
              {hideCanada ? null : (
                <div
                  onClick={setCurrentFlag}
                  className={`${s.flagItem} ${
                    flag.name === FLAGS.canada.name && s.activeFlag
                  }`}
                  data-current={FLAGS.canada.name}>
                  <CanadaFlag className={s.flagIcon} />
                </div>
              )}
              {hideUSA ? null : (
                <div
                  onClick={setCurrentFlag}
                  className={`${s.flagItem} ${
                    flag.name === FLAGS.usa.name && s.activeFlag
                  }`}
                  data-current={FLAGS.usa.name}>
                  <UsaFlag className={s.flagIcon} />
                </div>
              )}
            </div>
            <div
              onClick={getUserLocation}
              className={locationDetermineItemClass}>
              <div className={s.locationDetermineText}>
                Determine My Location
              </div>
              <MapLocation fill="#EF845C" />
            </div>
          </div>
          <div className={s.locationDetermineBorder} />

          {/* dropdown menu */}

          <div
            onClick={() => {
              setProvinceDropdown(!provinceDropdown);
            }}
            className={s.subRootFilter}>
            <div className={s.dropdownContainer}>
              <div className={s.filterItemContainer}>
                <div className={s.filterItemText}>
                  <p className={s.inputTag}>{placeholderValue}</p>
                </div>
                <DropdownArrow className={s.dropdownArrow} fill={'black'} />
              </div>
              {provinceDropdown && (
                <div className={s.dropdownItems}>
                  <div className={s.dropdownScroll}>
                    <div className={s.dropdownScrollItems}>
                      <div className={s.listContent}>
                        <div>
                          {provinces?.map(item =>
                            flag.plCountryID === item?.country.plCountryID ? (
                              <div
                                onClick={e => {
                                  e.stopPropagation();
                                  setPlaceholderValue(item.plName);
                                  setProvinceDropdown(false);
                                  setPrvID(item.plProvinceID);
                                }}
                                className={s.dropdownItem}>
                                <div className={s.nameContainer}>
                                  <div className={s.dropdownItemText}>
                                    <ul>
                                      <li value={item.plProvinceID}>
                                        {item.plName}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            ) : null,
                          )}
                          <div
                            onClick={e => {
                              e.stopPropagation();
                              setPlaceholderValue(
                                flag.name === 'CANADA'
                                  ? 'All Provinces'
                                  : 'All States',
                              );
                              setProvinceDropdown(false);
                              setPrvID(undefined);
                            }}
                            className={s.dropdownItem}>
                            <div className={s.nameContainer}>
                              <div className={s.dropdownItemText}>
                                <ul>
                                  <li
                                    style={{
                                      listStyle: 'none',
                                      fontFamily: 'SuisseIntl',
                                      fontStyle: 'normal',
                                      fontWeight: 'normal',
                                      textAlign: 'left',
                                    }}>
                                    {flag.name === 'CANADA'
                                      ? 'All Provinces'
                                      : 'All States'}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {(showDropdown ||
          selectableList.some(
            (city: any) => city.value.plProvinceID === prvID,
          )) && (
          <>
            {/* {placeholderValue === 'All Provinces' ||
            placeholderValue === 'All States' ? null : (
              <SideBarSorting setSortingOption={setSortingOption} />
            )} */}
            <div className={s.selectList}>
              {isSelectableListLoading ? (
                <Loader size={40} />
              ) : (query !== '' && placeholderValue === 'All Provinces') ||
                placeholderValue === 'All States' ? (
                selectableList.map((item: any) => {
                  return (
                    <div
                      key={item.label}
                      className={s.selectItem}
                      onClick={() => onChangeLocation(item)}>
                      {item.label}
                    </div>
                  );
                })
              ) : (
                selectableList.map((item: any) => {
                  if (item.value.plProvinceID == prvID) {
                    return (
                      <div
                        key={item.label}
                        className={s.selectItem}
                        onClick={() => onChangeLocation(item)}>
                        {item.label}
                      </div>
                    );
                  }
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
});
