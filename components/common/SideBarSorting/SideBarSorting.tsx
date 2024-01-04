import React, { useState, MouseEvent, useCallback } from 'react';
import s from './SideBarSorting.module.css';
import { SORTING_TYPES } from '../LocationDropdown/constants';

interface ISideBarSorting {
  setSortingOption: (curr: boolean) => void;
}

export const SideBarSorting = React.memo(
  ({ setSortingOption }: ISideBarSorting) => {
    const [sorting, setSorting] = useState<string>(
      SORTING_TYPES.alphabetic.value,
    );

    const handleClick = useCallback(
      (e: MouseEvent<HTMLDivElement | HTMLLIElement>) => {
        const currDataSet = e.currentTarget.dataset.current;
        if (currDataSet) {
          setSorting(currDataSet);
        }
        const isPopularSorting =
          e.currentTarget.dataset.current === SORTING_TYPES.popular.value;
        setSortingOption(isPopularSorting);
      },
      [],
    );

    return (
      <>
        <div className={s.sortingWrapper}>
          <div
            data-current={SORTING_TYPES.alphabetic.value}
            onClick={handleClick}
            className={`${s.title} ${
              sorting === SORTING_TYPES.alphabetic.value && s.active
            }`}>
            A–Z
          </div>
          <div
            onClick={handleClick}
            data-current={SORTING_TYPES.popular.value}
            className={`${s.title} ${
              sorting === SORTING_TYPES.popular.value && s.active
            }`}>
            Popular Areas
          </div>
        </div>
      </>
    );
  },
);
