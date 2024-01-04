import React, { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';
import s from './MapFilter.module.css';
import { DropdownArrow } from '../../icons/DropdownArrow';
import { useOutsideDetect } from '../../../utils/window';
import { transformCapitalWords } from '../../../utils/string';
import { Filter } from '../../icons/Filter';
import { Delivery } from '../../icons/Delivery';
import { Dispensary } from '../../icons/Dispensary';
import { Sort } from '../../icons/Sort';

interface Props {
  selectedBusinessType: 'delivery' | 'dispensary' | null;
  onSelectBusinessType: (type: 'delivery' | 'dispensary' | null) => void;
  selectedSorting: 'rating' | 'largest' | 'distance' | null;
  onSelectSorting: (type: 'rating' | 'largest' | 'distance' | null) => void;
  mobile?: boolean;
  desktop?: boolean;
}

export const MapFilter = React.memo(
  ({
    mobile,
    desktop,
    onSelectBusinessType,
    onSelectSorting,
    selectedBusinessType,
    selectedSorting,
  }: Props) => {
    const [filterMenuOpened, setFilterMenuOpened] = useState<boolean>(false);
    const [sortingMenuOpened, setSortingMenuOpened] = useState<boolean>(false);

    const onDropdownFilter = useCallback(
      (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setFilterMenuOpened(!filterMenuOpened);
        setSortingMenuOpened(false);
      },
      [filterMenuOpened],
    );

    const onDropdownSorting = useCallback(
      (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setSortingMenuOpened(!sortingMenuOpened);
        setFilterMenuOpened(false);
      },
      [sortingMenuOpened],
    );

    const closeFilter = useCallback(() => setFilterMenuOpened(false), []);
    const closeSoring = useCallback(() => setSortingMenuOpened(false), []);

    const handleSortingSelect = useCallback(
      (e: any, type?: 'rating' | 'largest' | 'distance' | null) => {
        e.preventDefault();
        e.stopPropagation();
        setFilterMenuOpened(false);
        setSortingMenuOpened(false);
        if (type !== undefined && onSelectSorting) {
          if (type === selectedSorting) {
            onSelectSorting(null);
          } else {
            onSelectSorting(type);
          }
        }
      },
      [onSelectSorting, selectedSorting],
    );

    const handleFilterSelect = useCallback(
      (e: any, type: 'delivery' | 'dispensary' | null) => {
        e.preventDefault();
        e.stopPropagation();
        setFilterMenuOpened(false);
        setSortingMenuOpened(false);
        if (onSelectBusinessType) {
          onSelectBusinessType(type);
        }
      },
      [onSelectBusinessType],
    );

    const filterText = useMemo(
      () =>
        selectedBusinessType
          ? `${transformCapitalWords(selectedBusinessType)}`
          : 'All Businesses',
      [selectedBusinessType],
    );

    const sortingText = useMemo(() => {
      switch (selectedSorting) {
        case 'distance':
          return 'Closest';
        case 'largest':
          return 'Largest Menu';
        case 'rating':
          return 'Highest Rated';
        default:
          return 'Featured First';
      }
    }, [selectedSorting]);

    const filterDropdownRef = useOutsideDetect(closeFilter, false);
    const sortingDropdownRef = useOutsideDetect(closeSoring, false);

    const rootClass = cn(s.root, {
      [s.rootMobile]: mobile,
      [s.rootDesktop]: desktop,
      [s.rootOverflowVisible]: filterMenuOpened || sortingMenuOpened,
    });

    const dropdownTypeContainerClass = cn(s.dropdownContainer, {
      [s.dropdownContainerSelected]: !!selectedBusinessType,
    });

    const dropdownTypeItemsClass = cn(s.dropdownItems, {
      [s.dropdownItemsHidden]: !filterMenuOpened,
    });

    const dropdownSortItemsClass = cn(s.dropdownItems, {
      [s.dropdownItemsHidden]: !sortingMenuOpened,
      [s.dropdownRightSide]: true,
    });

    const dropdownTypeArrowClass = cn(s.dropdownArrow, {
      [s.dropdownArrowOpen]: filterMenuOpened,
    });

    const dropdownSortingArrowClass = cn(s.dropdownSortingArrow, {
      [s.dropdownSortingArrowOpen]: sortingMenuOpened,
    });

    return (
      <>
        <div className={rootClass}>
          <div
            ref={filterDropdownRef}
            onClick={onDropdownFilter}
            className={dropdownTypeContainerClass}>
            <div className={s.filterItemContainer}>
              <Filter className={s.filterIcon} />
              <div className={s.filterItemText}>{filterText}</div>
            </div>
            <DropdownArrow className={dropdownTypeArrowClass} />
            <div className={dropdownTypeItemsClass}>
              <div className={s.dropdownScroll}>
                <div className={s.dropdownScrollItems}>
                  <div
                    onClick={e => handleFilterSelect(e, null)}
                    className={s.dropdownItem}>
                    <div className={s.nameContainer}>
                      <Filter
                        fill={
                          selectedBusinessType === null ? '#EF845C' : '#000000'
                        }
                        className={s.dropdownItemAll}
                      />
                      <div
                        className={
                          selectedBusinessType === null
                            ? s.selectedDropdownItemText
                            : s.dropdownItemText
                        }>
                        {'All Businesses'}
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={e => handleFilterSelect(e, 'delivery')}
                    className={s.dropdownItem}>
                    <div className={s.nameContainer}>
                      <Delivery
                        fill={
                          selectedBusinessType === 'delivery'
                            ? '#EF845C'
                            : '#000000'
                        }
                        className={s.dropdownItemDelivery}
                      />
                      <div
                        className={
                          selectedBusinessType === 'delivery'
                            ? s.selectedDropdownItemText
                            : s.dropdownItemText
                        }>
                        {'Delivery'}
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={e => handleFilterSelect(e, 'dispensary')}
                    className={s.dropdownItem}>
                    <div className={s.nameContainer}>
                      <Dispensary
                        fill={
                          selectedBusinessType === 'dispensary'
                            ? '#EF845C'
                            : '#000000'
                        }
                        className={s.dropdownItemDispensary}
                      />
                      <div
                        className={
                          selectedBusinessType === 'dispensary'
                            ? s.selectedDropdownItemText
                            : s.dropdownItemText
                        }>
                        {'Dispensary'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            ref={sortingDropdownRef}
            onClick={onDropdownSorting}
            className={s.dropdownSortContainer}>
            <div className={s.filterItemContainer}>
              <Sort fill="#EF845C" className={s.sortIcon} />
              <div className={s.filterItemText}>{sortingText}</div>
            </div>
            <DropdownArrow
              fill="#EF845C"
              className={dropdownSortingArrowClass}
            />
            <div className={dropdownSortItemsClass}>
              <div className={s.dropdownScroll}>
                <div className={s.dropdownScrollItems}>
                  <div
                    onClick={e => handleSortingSelect(e, null)}
                    className={s.dropdownItem}>
                    <div className={s.nameContainer}>
                      <div
                        className={
                          selectedSorting === null
                            ? s.selectedDropdownItemText
                            : s.dropdownItemText
                        }>
                        {'Featured First'}
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={e => handleSortingSelect(e, 'rating')}
                    className={s.dropdownItem}>
                    <div className={s.nameContainer}>
                      <div
                        className={
                          selectedSorting === 'rating'
                            ? s.selectedDropdownItemText
                            : s.dropdownItemText
                        }>
                        {'Highest Rated'}
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={e => handleSortingSelect(e, 'distance')}
                    className={s.dropdownItem}>
                    <div className={s.nameContainer}>
                      <div
                        className={
                          selectedSorting === 'distance'
                            ? s.selectedDropdownItemText
                            : s.dropdownItemText
                        }>
                        {'Closest'}
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={e => handleSortingSelect(e, 'largest')}
                    className={s.dropdownItem}>
                    <div className={s.nameContainer}>
                      <div
                        className={
                          selectedSorting === 'largest'
                            ? s.selectedDropdownItemText
                            : s.dropdownItemText
                        }>
                        {'Largest Menu'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
);
