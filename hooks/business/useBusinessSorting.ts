import { useCallback, useMemo } from 'react';
import isEqual from 'lodash/isEqual';

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const useBusinessSorting = (
  selectedSorting: string[] | null,
  onSelectSorting: (v: string[] | null) => void,
  defaultSortingProp?: string | null,
  businessType?: string | null,
) => {
  const sortingOptions = useMemo(
    () =>
      businessType === BusinessType.BrandType
        ? [
            { label: 'Weed First', value: ['Weed'] },
            { label: 'Alphabetical', value: ['Name'] },
          ]
        : [
            { label: 'Weed First', value: ['Weed'] },
            { label: 'Alphabetical', value: ['Name'] },
            { label: 'Cheapest', value: ['Price'] },
          ],
    [businessType],
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
      return sortingOptions.find(
        item => defaultSortingProp && item.value.includes(defaultSortingProp),
      );
    }
    return sortingOptions[0];
  }, [sortingOptions, selectedSorting, defaultSortingProp]);

  return {
    sorting,
    setSorting,
    sortingOptions,
  };
};
