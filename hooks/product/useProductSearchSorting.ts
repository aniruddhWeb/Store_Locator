import { useCallback, useMemo } from 'react';
import isEqual from 'lodash/isEqual';

export const useProductSearchSorting = (
  selectedSorting: string[] | null,
  onSelectSorting: (v: string[] | null) => void,
) => {
  const sortingOptions = useMemo(
    () => [
      {
        label: 'Cheapest',
        value: [
          [
            'prdPriceEighthOunce',
            'prdPriceHalfOunce',
            'prdPriceQuarterOunce',
            'prdPriceOneGram',
            'prdPricePerUnit',
            'prdPriceOneOunce',
            'prdPriceHalfGram',
          ],
          ['asc'],
        ],
      },
      {
        label: 'Most Expensive',
        value: [
          [
            'prdPriceEighthOunce',
            'prdPriceHalfOunce',
            'prdPriceQuarterOunce',
            'prdPriceOneGram',
            'prdPricePerUnit',
            'prdPriceOneOunce',
            'prdPriceHalfGram',
          ],
          ['desc'],
        ],
      },
    ],
    [],
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
    return null;
  }, [sortingOptions, selectedSorting]);

  return {
    sorting,
    setSorting,
    sortingOptions,
  };
};
