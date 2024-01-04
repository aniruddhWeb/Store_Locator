import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';
import { useMediaQueries } from '@react-hook/media-query';
import isEqual from 'lodash/isEqual';
import s from './ProductSorting.module.css';
import { DropdownArrow } from '../../icons/DropdownArrow';
import { useOutsideDetect } from '../../../utils/window';
import { Sort } from '../../icons/Sort';

interface Props {
  sortingMenuOpened: boolean;
  setSortingMenuOpened: (v: boolean) => void;
  sortingOptions?: { label: string; value: string[] | null }[];
  selectedSorting?: { label: string; value: string[] | null } | null;
  onSelectSorting?: (
    type: { label: string; value: string[] | null } | null,
  ) => void;
  mobile?: boolean;
  desktop?: boolean;
  withMargin?: boolean;
  rightSide?: boolean;
  fullWidth?: boolean;
  dropdownDirection?: 'top' | 'bottom';
}

export const ProductSorting = React.memo(
  ({
    setSortingMenuOpened,
    sortingMenuOpened,
    mobile,
    desktop,
    withMargin,
    onSelectSorting,
    selectedSorting,
    sortingOptions,
    rightSide,
    fullWidth,
    dropdownDirection = 'bottom',
  }: Props) => {
    const onDropdownSorting = useCallback(
      (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setSortingMenuOpened(!sortingMenuOpened);
      },
      [sortingMenuOpened],
    );

    const closeSoring = useCallback(() => setSortingMenuOpened(false), []);

    const handleSortingSelect = useCallback(
      (e: any, option?: { label: string; value: string[] | null }) => {
        e.preventDefault();
        e.stopPropagation();
        setSortingMenuOpened(false);
        if (option !== undefined && onSelectSorting) {
          onSelectSorting(option);
        }
      },
      [onSelectSorting, selectedSorting],
    );

    const sortingText = useMemo(() => {
      if (selectedSorting?.label) {
        return selectedSorting.label;
      }
      return 'Sorting';
    }, [selectedSorting]);

    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
    });

    const sortingDropdownRef = useOutsideDetect(closeSoring, matches.isMobile);

    const dropdownSortItemsClass = cn(s.dropdownItems, {
      [s.dropdownItemsHidden]: !sortingMenuOpened,
      [s.dropdownItemsTop]: dropdownDirection === 'top',
      [s.dropdownRightSide]: rightSide,
      [s.dropdownItemsFullWidth]: fullWidth,
    });

    const dropdownSortingArrowClass = cn(s.dropdownSortingArrow, {
      [s.dropdownSortingArrowOpen]: sortingMenuOpened,
    });

    const dropdownSortContainerClass = cn(s.dropdownSortContainer, {
      [s.rootDesktop]: desktop,
      [s.rootMobile]: mobile,
      [s.rootMargin]: withMargin,
      [s.rootFullWidth]: fullWidth,
    });

    return (
      <div
        ref={sortingDropdownRef}
        onClick={onDropdownSorting}
        className={dropdownSortContainerClass}>
        <div className={s.filterItemContainer}>
          <Sort fill="#EF845C" className={s.sortIcon} />
          <div className={s.filterItemText}>{sortingText}</div>
        </div>
        <DropdownArrow fill="#EF845C" className={dropdownSortingArrowClass} />
        <div className={dropdownSortItemsClass}>
          <div className={s.dropdownScroll}>
            <div className={s.dropdownScrollItems}>
              {(sortingOptions || []).map(
                (sortingOption, sortingOptionIndex) => (
                  <div
                    key={sortingOption.value?.join('-')}
                    onClick={e => handleSortingSelect(e, sortingOption)}
                    className={s.dropdownItem}>
                    <div className={s.nameContainer}>
                      <div className={s.radioInputOrange}>
                        {isEqual(selectedSorting, sortingOption) ? (
                          <div className={s.radioCircle} />
                        ) : null}
                      </div>
                      <div
                        className={
                          isEqual(selectedSorting, sortingOption)
                            ? s.selectedDropdownItemText
                            : s.dropdownItemText
                        }>
                        {sortingOption.label}
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
