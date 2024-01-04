import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { useDebounce } from '../../utils/debounce';
import { Product, ProductType } from '../../generated/app';
import { getCleanUrl } from '../../utils/link';
import { getProductTypesArray } from '../../utils/product';

export const getQueryParamsForFilter = (queryParams: any) => {
  if (!queryParams?.filters) return [];
  return Array.isArray(queryParams?.filters as string | string[])
    ? (queryParams?.filters as string[])
    : [queryParams?.filters as string];
};

export const getQueryParamsForSort = (queryParams: any) => {
  if (!queryParams?.sort) return [];
  return Array.isArray(queryParams?.sort as string | string[])
    ? (queryParams?.sort as string[])
    : [queryParams?.sort as string];
};

export const getQueryParamsForSearch = (queryParams: any) => {
  return (queryParams?.search || '') as string;
};

export const getProductSubTypes = (
  productTypes: ProductType[],
  selectedProductTypes?: string[] | null,
  ignoreAvailable?: boolean,
) => {
  if ((selectedProductTypes || []).length > 0) {
    const firstPart: string = (selectedProductTypes || [])[0];
    const productTypeFiltered: string[] = firstPart.split(',');
    const firstSelectedProductType = productTypeFiltered[0];
    const lastSelectedProductType =
      productTypeFiltered[productTypeFiltered.length - 1];
    const selectedType =
      productTypes.find(productType => {
        return (
          filterProductType(productType, firstSelectedProductType) &&
          productType?.name &&
          firstSelectedProductType.includes(productType?.name)
        );
      }) || null;
    if ((selectedType?.typeItems || []).length > 0) {
      const childSelectedType =
        (selectedType?.typeItems || []).find(productType => {
          return (
            filterProductType(productType, lastSelectedProductType) &&
            productType?.name &&
            lastSelectedProductType.includes(productType?.name)
          );
        }) || null;
      if (childSelectedType) {
        return (childSelectedType?.categoriesItems || []).filter(
          item => ignoreAvailable || item?.available,
        ) as ProductType[];
      }
    }
    return (selectedType?.categoriesItems || []).filter(
      item => ignoreAvailable || item?.available,
    ) as ProductType[];
  }
  return [];
};

export const filterProductType: (
  filterItem: ProductType | undefined | null,
  search: string,
  onlyLastPart?: boolean,
) => boolean = (filterItem, search, onlyLastPart) => {
  if (!search || !filterItem) return false;
  const formattedSearch = search.replace(/, /g, '&@#');
  const commaSplits = formattedSearch.split(',');
  if (commaSplits.length > 1) {
    if (onlyLastPart) {
      return filterProductType(
        filterItem,
        commaSplits[commaSplits.length - 1].replace(/&@#/g, ', '),
      );
    }
    return commaSplits.every(item =>
      filterProductType(filterItem, item.replace(/&@#/g, ', ')),
    );
  }
  if (filterItem?.name === formattedSearch.replace(/&@#/g, ', ')) {
    return true;
  }
  if ((filterItem?.typeItems || []).length > 0) {
    return !!filterItem?.typeItems?.some(
      subItem =>
        subItem &&
        filterProductType(subItem, formattedSearch.replace(/&@#/g, ', ')),
    );
  }
  return false;
};

export const filterProductSubType: (
  filterItem: ProductType | undefined | null,
  search: string,
) => boolean = (filterItem, search) => {
  if (!search || !filterItem) return false;
  const formattedSearch = search.replace(/, /g, '&@#');
  const commaSplits = formattedSearch.split(',');
  if (commaSplits.length > 1) {
    return filterProductSubType(
      filterItem,
      commaSplits[commaSplits.length - 1].replace(/&@#/g, ', '),
    );
  }
  if (filterItem?.name === formattedSearch.replace(/&@#/g, ', ')) {
    return true;
  }
  if ((filterItem?.categoriesItems || []).length > 0) {
    return !!filterItem?.categoriesItems?.some(
      subItem =>
        subItem &&
        filterProductSubType(subItem, formattedSearch.replace(/&@#/g, ', ')),
    );
  }
  return false;
};

const getFirstProductType = (currentProduct?: Product | null) => {
  if (currentProduct) {
    const types = getProductTypesArray(currentProduct.prdProductTypes);
    if (types.length > 0) {
      return types[0];
    }
  }
  return null;
};

export const useProductFilter = (
  productType?: ProductType[] | null,
  product?: Product | null,
  disableRedirect?: boolean,
  defaultSortOption?: string | null,
  ignoreAvailable?: boolean,
  resetOnQueryChange?: boolean,
  resetWithoutFirst?: boolean,
  strainNamesProp?: string[],
  brandNamesProp?: string[],
) => {
  const router = useRouter();
  const [sortingTypes, setSortingTypes] = useState<string[] | null>(null);
  const [sortFilter, setSortFilter] = useState<string[] | null>(
    defaultSortOption ? [defaultSortOption] : null,
  );
  const [showAllPrices, setShowAllPrices] = useState<boolean>(false);
  const [productLimit, setProductLimit] = useState<number>(12);
  const [resellersLimit, setResellersLimit] = useState<number>(300);
  const [brandsLimit, setBrandsLimit] = useState<number>(12);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    getQueryParamsForFilter(router.query),
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchDebounceQuery, setSearchDebounceQuery] = useDebounce(
    searchQuery,
    2500,
  );
  const [selectedDebounceFilters, setSelectedDebounceFilters] = useDebounce(
    selectedFilters,
    2500,
  );
  const [sortFilterDebounce, setSortFilterDebounce] = useDebounce(
    sortFilter,
    2500,
  );
  const [sortingDebounceTypes] = useDebounce(sortingTypes, 2500);
  const filterWasApplied = useRef<boolean>(false);

  const resetFilters = useCallback(
    (notClearSorting?: boolean) => {
      if (!notClearSorting) {
        setSortingTypes(null);
      }
      if (resetWithoutFirst) {
        setSelectedFilters(s => (s.length > 0 ? [s[0]] : []));
        setSelectedDebounceFilters((s: any) => (s.length > 0 ? [s[0]] : []));
      } else {
        setSelectedFilters([]);
        setSelectedDebounceFilters([]);
      }
      setProductLimit(12);
      setResellersLimit(300);
      setBrandsLimit(12);
      setSearchQuery('');
      setSearchDebounceQuery('');
    },
    [resetWithoutFirst],
  );

  const setProductLimitFunc = useCallback((limit: number) => {
    setProductLimit(limit);
  }, []);

  const setResellersLimitFunc = useCallback((limit: number) => {
    setResellersLimit(limit);
  }, []);

  const setBrandsLimitFunc = useCallback((limit: number) => {
    setBrandsLimit(limit);
  }, []);

  const setQueryFunc = useCallback((query: string) => {
    filterWasApplied.current = true;
    setSearchQuery(query);
  }, []);

  const setShowAllPricesFunc = useCallback((showAllPricesValue: boolean) => {
    setShowAllPrices(showAllPricesValue);
  }, []);

  const strainNames = useMemo(() => {
    const strainNameFilter = selectedFilters?.find(item =>
      item?.includes('Strain Name,'),
    );
    if (strainNameFilter) {
      const formattedSelectedType = strainNameFilter.replace(/, /g, '&@#');
      if (formattedSelectedType.includes(',')) {
        return (strainNamesProp || []).concat(
          formattedSelectedType
            .split(',')
            .map(item => item.replace(/&@#/g, ', '))
            .slice(1),
        );
      }
    }
    return strainNamesProp;
  }, [strainNamesProp, selectedFilters]);

  const brandNames = useMemo(() => {
    const brandNamesFilter = selectedFilters?.find(item =>
      item?.includes('Brand,'),
    );
    if (brandNamesFilter) {
      const formattedSelectedType = brandNamesFilter.replace(/, /g, '&@#');
      if (formattedSelectedType.includes(',')) {
        return (brandNamesProp || []).concat(
          formattedSelectedType
            .split(',')
            .map(item => item.replace(/&@#/g, ', '))
            .slice(1),
        );
      }
    }
    return brandNamesProp;
  }, [brandNamesProp, selectedFilters]);

  const productTypes = useMemo(() => {
    const replaceStrainNameValues: (
      depth: number,
      type: 'type' | 'category',
    ) => (productTypeItem?: ProductType | null) => ProductType =
      (depth: number, type: 'type' | 'category') =>
      (productTypeItem?: ProductType | null) => {
        if ((strainNames || []).length === 0) {
          return {
            ...(productTypeItem || {}),
          };
        }
        if (productTypeItem?.name === 'Strain Name') {
          return {
            ...(productTypeItem || {}),
            available: true,
            name: 'Strain Name',
            slug: 'strain-name',
            counter: (strainNames || []).length,
            categoriesItems: (strainNames || []).map(strainItem => ({
              available: true,
              name: strainItem,
              categoriesItems: [],
              typeItems: [],
            })),
          };
        }
        let childCategoryItems = (productTypeItem?.categoriesItems || []).map(
          replaceStrainNameValues(depth + 1, 'category'),
        );
        if (
          type === 'type' &&
          childCategoryItems.length === 0 &&
          (depth === 1 ||
            ((depth === 0 && productTypeItem?.typeItems) || []).length === 0) &&
          (strainNames || []).length > 0
        ) {
          childCategoryItems = [
            {
              name: 'Strain Name',
              slug: 'strain-name',
              available: true,
              counter: (strainNames || []).length,
              categoriesItems: (strainNames || []).map(strainItem => ({
                available: true,
                name: strainItem,
                categoriesItems: [],
                typeItems: [],
              })),
            },
          ];
        }
        const childTypeItems = (productTypeItem?.typeItems || []).map(
          replaceStrainNameValues(depth + 1, 'type'),
        );
        return {
          ...(productTypeItem || {}),
          available:
            productTypeItem?.available ||
            childCategoryItems?.some(
              item => ignoreAvailable || item?.available,
            ) ||
            childTypeItems?.some(item => ignoreAvailable || item?.available),
          categoriesItems: childCategoryItems,
          typeItems: childTypeItems,
        };
      };

    const replaceBrandNameValues: (
      depth: number,
      type: 'type' | 'category',
    ) => (productTypeItem?: ProductType | null) => ProductType =
      (depth: number, type: 'type' | 'category') =>
      (productTypeItem?: ProductType | null) => {
        if ((brandNames || []).length === 0) {
          return {
            ...(productTypeItem || {}),
          };
        }
        if (productTypeItem?.name === 'Brand') {
          return {
            ...(productTypeItem || {}),
            available: true,
            name: 'Brand',
            slug: 'brand',
            counter: (brandNames || []).length,
            categoriesItems: (brandNames || []).map(brandItem => ({
              available: true,
              name: brandItem,
              categoriesItems: [],
              typeItems: [],
            })),
          };
        }
        let childCategoryItems = (productTypeItem?.categoriesItems || []).map(
          replaceBrandNameValues(depth + 1, 'category'),
        );
        if (
          type === 'type' &&
          (childCategoryItems.length === 0 ||
            (childCategoryItems.length === 1 &&
              childCategoryItems[0].name === 'Strain Name' &&
              (strainNames || []).length > 0)) &&
          (depth === 1 ||
            ((depth === 0 && productTypeItem?.typeItems) || []).length === 0) &&
          (brandNames || []).length > 0
        ) {
          childCategoryItems = [
            ...(childCategoryItems || []),
            {
              name: 'Brand',
              slug: 'brand',
              available: true,
              counter: (brandNames || []).length,
              categoriesItems: (brandNames || []).map(brandItem => ({
                available: true,
                name: brandItem,
                categoriesItems: [],
                typeItems: [],
              })),
            },
          ];
        }
        const childTypeItems = (productTypeItem?.typeItems || []).map(
          replaceBrandNameValues(depth + 1, 'type'),
        );
        return {
          ...(productTypeItem || {}),
          available:
            productTypeItem?.available ||
            childCategoryItems?.some(
              item => ignoreAvailable || item?.available,
            ) ||
            childTypeItems?.some(item => ignoreAvailable || item?.available),
          categoriesItems: childCategoryItems,
          typeItems: childTypeItems,
        };
      };

    return (productType || [])
      .map(replaceStrainNameValues(0, 'type'))
      .map(replaceBrandNameValues(0, 'type'))
      .filter(item => ignoreAvailable || item?.available) as ProductType[];
  }, [productType, ignoreAvailable, strainNames, brandNames]);

  const resetAll = useCallback(() => {
    setProductLimit(12);
    setResellersLimit(300);
    setBrandsLimit(12);
    if (resetWithoutFirst) {
      setSelectedFilters(s => (s.length > 0 ? [s[0].split(',')[0]] : []));
      setSelectedDebounceFilters((s: any) =>
        s.length > 0 ? [s[0].split(',')[0]] : [],
      );
    } else {
      setSelectedFilters([]);
      setSelectedDebounceFilters([]);
    }
    setSortFilter(null);
    setSortFilterDebounce(null);
    setSortingTypes(null);
  }, [resetWithoutFirst]);

  const prevProduct = useRef<any>(product);
  const prevFilters = useRef<any>(selectedDebounceFilters);
  const prevSearch = useRef<string>(searchDebounceQuery);
  const prevSortFilter = useRef<string[] | null>(sortFilterDebounce);
  const filtersAndSearchInitialized = useRef<boolean>(false);
  const prevQuery = useRef<any>(router.query);
  const prevProductType = useRef<any>(productType);

  useEffect(() => {
    if (!isEqual(prevProduct.current, product)) {
      prevProduct.current = product;
      filtersAndSearchInitialized.current = false;
    }
    if (resetOnQueryChange && !isEqual(prevQuery.current, router.query)) {
      prevQuery.current = router.query;
      filtersAndSearchInitialized.current = false;
    }
    if (!filtersAndSearchInitialized.current) {
      filtersAndSearchInitialized.current = true;
      const filtersFromQuery = getQueryParamsForFilter(router.query);
      const sortFiltersFromQuery = getQueryParamsForSort(router.query);
      const filtersFromProduct = getFirstProductType(product);
      if (
        filtersFromQuery.length > 0 &&
        !isEqual(filtersFromQuery, selectedFilters)
      ) {
        setSelectedFilters(filtersFromQuery);
      } else if (
        !(
          sortFiltersFromQuery.length > 0 &&
          !isEqual(sortFiltersFromQuery, sortFilter)
        ) &&
        filtersFromProduct &&
        !isEqual([filtersFromProduct], selectedFilters)
      ) {
        setSortingTypes([filtersFromProduct]);
      }
      if (
        sortFiltersFromQuery.length > 0 &&
        !isEqual(sortFiltersFromQuery, sortFilter)
      ) {
        setSortFilter(sortFiltersFromQuery);
      }
      const searchFromQuery = getQueryParamsForSearch(router.query);
      if (
        searchFromQuery &&
        !isEqual(searchFromQuery, searchQuery) &&
        (productType ? isEqual(prevProductType.current, productType) : true)
      ) {
        setSearchQuery(searchFromQuery);
      } else if (
        productType ? !isEqual(prevProductType.current, productType) : false
      ) {
        setSearchQuery('');
      }
    }
    if (!isEqual(prevProductType.current, productType)) {
      prevProductType.current = productType;
    }
  }, [
    resetOnQueryChange,
    router.query,
    productType,
    selectedFilters,
    searchQuery,
    sortFilter,
    product,
  ]);

  useEffect(() => {
    if (
      !disableRedirect &&
      (!isEqual(prevFilters.current, selectedDebounceFilters) ||
        !isEqual(prevSortFilter.current, sortFilterDebounce) ||
        prevSearch.current !== searchDebounceQuery)
    ) {
      const cleanURL = getCleanUrl(router.asPath);
      if (
        (!selectedDebounceFilters || selectedDebounceFilters.length === 0) &&
        !searchDebounceQuery
      ) {
        router.replace(cleanURL, undefined, { shallow: true });
      } else {
        const query: any = {};
        if (selectedDebounceFilters.length > 0) {
          query.filters = selectedDebounceFilters;
        }
        if (searchDebounceQuery) {
          query.search = searchDebounceQuery;
        }
        if (sortFilterDebounce && sortFilterDebounce.length > 0) {
          query.sort = sortFilterDebounce;
        }
        router.replace(
          {
            pathname: cleanURL,
            query,
          },
          undefined,
          { shallow: true },
        );
      }
    }
    prevFilters.current = selectedDebounceFilters;
    prevSearch.current = searchDebounceQuery;
    prevSortFilter.current = sortFilterDebounce;
  }, [
    selectedDebounceFilters,
    sortFilterDebounce,
    searchDebounceQuery,
    disableRedirect,
  ]);

  const setSelectedFilterFunc = useCallback(
    (type: string | string[]) => {
      setSortingTypes(null);
      if (Array.isArray(type)) {
        setSelectedFilters(type || []);
        return type || [];
      }
      filterWasApplied.current = true;
      if (selectedFilters.includes(type)) {
        const filters = selectedFilters.filter(item => item !== type);
        setSelectedFilters(filters);
        return filters;
      }
      const filters = [...selectedFilters, type];
      setSelectedFilters(filters);
      return filters;
    },
    [selectedFilters, productTypes],
  );

  const setSortFilterFunc = useCallback((v: string[] | null) => {
    setSortFilter(v);
    setSortingTypes([]);
    filterWasApplied.current = true;
  }, []);

  const productsFilter = useMemo(() => {
    const selectedTypes = selectedDebounceFilters.filter((item: string) =>
      productTypes.some(typeItem => filterProductType(typeItem, item)),
    );
    const selectedSubTypes = selectedDebounceFilters.filter(
      (item: string) =>
        item?.includes('Strain Name,') ||
        item?.includes('Brand,') ||
        getProductSubTypes(
          productTypes,
          selectedDebounceFilters,
          ignoreAvailable,
        ).some(typeItem => filterProductSubType(typeItem, item)),
    );
    const filterObject: any = {
      prdProductType: null,
      prdProductCategories: null,
      search: null,
      sort: null,
      bizTypes: ['brands', 'weed-delivery', 'marijuana-dispensary'],
    };
    if (selectedTypes.length > 0) {
      filterObject.prdProductType = [];
      (selectedTypes || []).forEach((selectedType: string) => {
        const formattedSelectedType = selectedType.replace(/, /g, '&@#');
        if (formattedSelectedType.includes(',')) {
          formattedSelectedType.split(',').forEach((subType: string) => {
            filterObject.prdProductType.push(subType.replace(/&@#/g, ', '));
          });
        } else {
          filterObject.prdProductType.push(selectedType);
        }
      });
    }
    if (selectedSubTypes.length > 0) {
      filterObject.prdProductCategories = [];
      (selectedSubTypes || []).forEach((selectedSubType: string) => {
        const formattedSelectedType = selectedSubType.replace(/, /g, '&@#');
        if (formattedSelectedType.includes(',')) {
          formattedSelectedType.split(',').forEach((subType: string) => {
            filterObject.prdProductCategories.push(
              subType.replace(/&@#/g, ', '),
            );
          });
        } else {
          filterObject.prdProductCategories.push(selectedSubType);
        }
      });
    }
    if (searchDebounceQuery) {
      filterObject.search = searchDebounceQuery;
    }
    if (sortFilterDebounce && sortFilterDebounce.length > 0) {
      filterObject.sort = sortFilterDebounce;
    } else if (sortingDebounceTypes && sortingDebounceTypes.length > 0) {
      filterObject.sort = sortingDebounceTypes;
    }
    if (Object.keys(filterObject).length === 0 && filterWasApplied.current) {
      filterObject.prdProductType = null;
      filterObject.prdProductCategories = null;
      filterObject.search = null;
      filterObject.sort = null;
    }
    return filterObject;
  }, [
    ignoreAvailable,
    sortFilterDebounce,
    sortingDebounceTypes,
    selectedDebounceFilters,
    searchDebounceQuery,
    productTypes,
  ]);

  const productsFilterNoDebounce = useMemo(() => {
    const selectedTypes = selectedFilters.filter((item: string) =>
      productTypes.some(typeItem => filterProductType(typeItem, item)),
    );
    const selectedSubTypes = selectedFilters.filter(
      (item: string) =>
        item?.includes('Strain Name,') ||
        item?.includes('Brand,') ||
        getProductSubTypes(productTypes, selectedFilters, ignoreAvailable).some(
          typeItem => filterProductSubType(typeItem, item),
        ),
    );
    const filterObject: any = {
      bizTypes: ['brands', 'weed-delivery', 'marijuana-dispensary'],
    };
    if (selectedTypes.length > 0) {
      filterObject.prdProductType = selectedTypes;
    }
    if (selectedSubTypes.length > 0) {
      filterObject.prdProductCategories = selectedSubTypes;
    }
    if (searchQuery) {
      filterObject.search = searchQuery;
    }
    if (sortFilter && sortFilter.length > 0) {
      filterObject.sort = sortFilter;
    } else if (sortingTypes && sortingTypes.length > 0) {
      filterObject.sort = sortingTypes;
    }
    if (Object.keys(filterObject).length === 0 && filterWasApplied.current) {
      filterObject.prdProductType = null;
      filterObject.prdProductCategories = null;
      filterObject.search = null;
      filterObject.sort = null;
    }
    return filterObject;
  }, [
    ignoreAvailable,
    sortFilter,
    sortingTypes,
    selectedFilters,
    searchQuery,
    productTypes,
  ]);

  return {
    searchQuery,
    setSearchQuery: setQueryFunc,
    selectedFilters,
    setSelectedFilters: setSelectedFilterFunc,
    productTypes,
    productsFilter,
    productsFilterNoDebounce,
    productLimit,
    resellersLimit,
    brandsLimit,
    setNextProductLimit: setProductLimitFunc,
    setNextResellersLimit: setResellersLimitFunc,
    setNextBrandsLimit: setBrandsLimitFunc,
    resetFilters,
    resetAll,
    showAllPrices,
    setShowAllPrices: setShowAllPricesFunc,
    sortFilter,
    setSortFilter: setSortFilterFunc,
    strainNames,
    brandNames,
  };
};
