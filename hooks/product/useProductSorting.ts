import { useCallback, useMemo } from 'react';
import isEqual from 'lodash/isEqual';

export const useProductSorting = (
  selectedSorting: string[] | null,
  onSelectSorting: (v: string[] | null) => void,
  defaultSortingProp?: boolean | null,
  productsFilter?: any,
) => {
  const sortingOptions = useMemo(
    () =>
      (productsFilter?.prdProductType || []).includes('Weed')
        ? [
            { label: 'Highest Rated', value: ['Rating'] },
            { label: 'Name A-Z', value: ['Name', 'asc'] },
            { label: 'Name Z-A', value: ['Name', 'desc'] },
            { label: 'Price low to high', value: ['Price', 'asc'] },
            { label: 'Price high to low', value: ['Price', 'desc'] },
          ]
        : [
            { label: 'Highest Rated', value: ['Rating'] },
            { label: 'Name A-Z', value: ['Name', 'asc'] },
            { label: 'Name Z-A', value: ['Name', 'desc'] },
          ],
    [productsFilter?.prdProductType],
  );

  const setSorting = useCallback(
    (sortingOption: { label: string; value: string[] | null } | null) => {
      if (sortingOption) {
        onSelectSorting(sortingOption.value);
      } else {
        onSelectSorting(null);
      }
    },
    [sortingOptions, onSelectSorting],
  );

  const sorting = useMemo(() => {
    if (selectedSorting) {
      return sortingOptions.find(item => isEqual(item.value, selectedSorting));
    }
    if (defaultSortingProp) {
      return sortingOptions[0];
    }
    return null;
  }, [sortingOptions, selectedSorting, defaultSortingProp]);

  return {
    sorting,
    setSorting,
    sortingOptions,
  };
};
