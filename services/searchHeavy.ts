import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import {
  AnalyticsSaveSearchDocument,
  AnalyticsSaveSearchMutationVariables,
  ProductType,
  AnalyticsSaveSearchMutation,
  SearchProductsQueryVariables,
  SearchProductsQuery,
  SearchProductsDocument,
  SearchBusinessQueryVariables,
  SearchBusinessQuery,
  SearchBusinessDocument,
  SearchDealsQueryVariables,
  SearchDealsQuery,
  SearchDealsDocument,
  SearchProductTypesQuery,
  SearchProductTypesQueryVariables,
  SearchProductTypesDocument,
  SearchCountsQuery,
  SearchCountsQueryVariables,
  SearchCountsDocument,
} from '../generated/app';
import { apolloClient } from '../api/client';
import { useDebounce } from '../utils/debounce';
import { useCurrentLocationDynamic } from './location';
import {
  filterProductSubType,
  filterProductType,
  getProductSubTypes,
  useProductFilter,
} from '../hooks/product/useProductFilter';
import { useDetectScrollEnd } from '../utils/window';
import { useProductSearchSorting } from '../hooks/product/useProductSearchSorting';
import { useSearchValues } from '../hooks/search/useSearchContext';

export enum SearchType {
  Products = 'products',
  Businesses = 'businesses',
  Deals = 'deals',
}

export enum SearchMode {
  Country = 'country',
  Region = 'region',
  GPS = 'gps',
}

export const useSearchStatic = async (
  context: GetServerSidePropsContext,
  type?: SearchType,
) => {
  return {
    productCount: 0,
    businessCount: 0,
    dealCount: 0,
    type: type || (context.query?.type as string | undefined) || null,
  };
};

export const useSearch = (props?: any) => {
  const router = useRouter();

  const { selectedLocation } = useCurrentLocationDynamic();
  const { userLocationLat, userLocationLng, locationType } = useSearchValues();

  const [isPaginating, setIsPaginating] = useState<boolean>(false);
  const noMorePagination = useRef<boolean>(false);

  const isSearchLoadingInternal = useRef<boolean>(true);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(
    props?.type === SearchType.Products,
  );
  const [isBusinessLoading, setIsBusinessLoading] = useState<boolean>(
    props?.type === SearchType.Businesses,
  );
  const [isDealLoading, setIsDealLoading] = useState<boolean>(
    props?.type === SearchType.Deals,
  );

  const [isCountLoading, setIsCountLoading] = useState<boolean>(false);
  const [productCount, setProductCount] = useState<number>(
    props?.productCount || 0,
  );
  const [businessCount, setBusinessCount] = useState<number>(
    props?.businessCount || 0,
  );
  const [dealCount, setDealCount] = useState<number>(props?.dealCount || 0);

  const [productTypeOrigin, setProductTypeOrigin] = useState<any[]>([]);

  const isSearchLoading = useMemo(
    () => isBusinessLoading || isDealLoading || isProductLoading,
    [isBusinessLoading, isProductLoading, isDealLoading],
  );
  const {
    setSelectedFilters,
    selectedFilters,
    resetAll,
    sortFilter,
    setSortFilter,
    productTypes,
  } = useProductFilter(
    productTypeOrigin || [],
    undefined,
    true,
    undefined,
    false,
  );
  const productTypesInternal = useRef<ProductType[]>(productTypes || []);

  useEffect(() => {
    productTypesInternal.current = productTypes || [];
  }, [productTypes]);

  const { setSorting, sorting, sortingOptions } = useProductSearchSorting(
    sortFilter,
    setSortFilter,
  );

  const [searchProducts, setSearchProducts] = useState<any[]>(
    props?.products || [],
  );
  const [searchBusinesses, setSearchBusinesses] = useState<any[]>(
    props?.businesses || [],
  );
  const [searchDeals, setSearchDeals] = useState<any[]>(props?.deals || []);
  const [isHeaderSearchLoading, setIsHeaderSearchLoading] = useState<boolean>(
    !(
      searchBusinesses.length > 0 ||
      searchProducts.length > 0 ||
      searchDeals.length > 0
    ),
  );
  const [query, setQuery] = useState<string>(
    props.emptyInitial ? '' : ((router.query?.q || '') as string),
  );
  const [searchDebounceQuery, setSearchDebounceQuery] = useDebounce(query, 500);
  const internalFilters = useRef<string[]>(selectedFilters);

  const productsLimit = useRef<number>(searchProducts.length + 50);
  const dealsLimit = useRef<number>(searchDeals.length + 50);
  const businessesLimit = useRef<number>(searchBusinesses.length + 50);

  const lastSearchQuery = useRef<string>(query);
  const lastSearchFilters = useRef<string[]>(selectedFilters || []);

  const getProductTypes = useCallback(
    async (variables: SearchProductTypesQueryVariables) => {
      return apolloClient.query<
        SearchProductTypesQuery,
        SearchProductTypesQueryVariables
      >({
        query: SearchProductTypesDocument,
        variables,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      });
    },
    [],
  );

  useEffect(() => {
    const variables: any = {
      isGlobalSearch: false,
      type: SearchType.Products,
      search: router.query?.q as string,
    };
    if (locationType === SearchMode.GPS && userLocationLat && userLocationLng) {
      variables.latitudeGPS = userLocationLat;
      variables.longitudeGPS = userLocationLng;
    } else if (
      locationType === SearchMode.Region &&
      selectedLocation?.plRegionID
    ) {
      variables.plRegionId = selectedLocation?.plRegionID;
    } else if (
      locationType === SearchMode.Country &&
      selectedLocation?.province?.country?.plCountryID
    ) {
      variables.countryId = selectedLocation?.province?.country?.plCountryID;
    }

    getProductTypes(variables).then(response => {
      setProductTypeOrigin(
        response?.data?.busProdDealSearchByName?.productTypes || [],
      );
    });
  }, [
    getProductTypes,
    selectedLocation,
    locationType,
    userLocationLat,
    userLocationLng,
    router.query?.q,
  ]);

  const getSearchCounts = useCallback(
    async (variables: SearchCountsQueryVariables) => {
      return apolloClient.query<SearchCountsQuery, SearchCountsQueryVariables>({
        query: SearchCountsDocument,
        variables,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      });
    },
    [],
  );

  useEffect(() => {
    setIsCountLoading(true);
    setProductCount(0);
    setBusinessCount(0);
    setDealCount(0);
    const variables: any = {
      isGlobalSearch: false,
      search: router.query?.q as string,
    };
    if (locationType === SearchMode.GPS && userLocationLat && userLocationLng) {
      variables.latitudeGPS = userLocationLat;
      variables.longitudeGPS = userLocationLng;
    } else if (
      locationType === SearchMode.Region &&
      selectedLocation?.plRegionID
    ) {
      variables.plRegionId = selectedLocation?.plRegionID;
    } else if (
      locationType === SearchMode.Country &&
      selectedLocation?.province?.country?.plCountryID
    ) {
      variables.countryId = selectedLocation?.province?.country?.plCountryID;
    }
    getSearchCounts(variables).then(response => {
      setProductCount(
        response?.data?.busProdDealSearchByName?.productsPagination
          ?.totalCount || 0,
      );
      setBusinessCount(
        response?.data?.busProdDealSearchByName?.businessPagination
          ?.totalCount || 0,
      );
      setDealCount(
        response?.data?.busProdDealSearchByName?.dealsPagination?.totalCount ||
          0,
      );
      setIsCountLoading(false);
    });
  }, [
    getSearchCounts,
    selectedLocation,
    locationType,
    userLocationLat,
    userLocationLng,
    router.query?.q,
  ]);

  const getProductSearch = useCallback(
    async (variables: SearchProductsQueryVariables) => {
      return apolloClient.query<
        SearchProductsQuery,
        SearchProductsQueryVariables
      >({
        query: SearchProductsDocument,
        variables,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      });
    },
    [],
  );

  const getBusinessSearch = useCallback(
    async (variables: SearchBusinessQueryVariables) => {
      return apolloClient.query<
        SearchBusinessQuery,
        SearchBusinessQueryVariables
      >({
        query: SearchBusinessDocument,
        variables,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      });
    },
    [],
  );

  const getDealSearch = useCallback(
    async (variables: SearchDealsQueryVariables) => {
      return apolloClient.query<SearchDealsQuery, SearchDealsQueryVariables>({
        query: SearchDealsDocument,
        variables,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      });
    },
    [],
  );

  const saveSearchAnalytics = useCallback(
    (variables: AnalyticsSaveSearchMutationVariables) => {
      apolloClient.mutate<
        AnalyticsSaveSearchMutation,
        AnalyticsSaveSearchMutationVariables
      >({
        mutation: AnalyticsSaveSearchDocument,
        variables,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      });
    },
    [],
  );

  const getProductItems = useCallback(
    async (pagination?: boolean) => {
      const productTypesParam: string[][] = [];
      const productSubTypesParam: any[] = [];
      const savedProductFilters = [...internalFilters.current];
      const productTypesParamBefore = savedProductFilters.filter(
        (item: string) =>
          productTypesInternal.current.some(productType =>
            filterProductType(productType, item),
          ),
      );
      const productSubTypesParamBefore = savedProductFilters.filter(
        (item: string) =>
          getProductSubTypes(
            productTypesInternal.current || [],
            savedProductFilters,
            true,
          ).some(typeItem => filterProductSubType(typeItem, item)),
      );
      if (productTypesParamBefore.length > 0) {
        (productTypesParamBefore || []).forEach((selectedType: string) => {
          const formattedSelectedType = selectedType.replace(/, /g, '&@#');
          if (formattedSelectedType.includes(',')) {
            const productTypesParamInner: string[] = [];
            formattedSelectedType.split(',').forEach((subType: string) => {
              productTypesParamInner.push(subType.replace(/&@#/g, ', '));
            });
            productTypesParam.push(productTypesParamInner);
          } else {
            productTypesParam.push([selectedType]);
          }
        });
      }
      if (productSubTypesParamBefore.length > 0) {
        (productSubTypesParamBefore || []).forEach(
          (selectedSubType: string) => {
            const formattedSelectedSubType = selectedSubType.replace(
              /, /g,
              '&@#',
            );
            if (formattedSelectedSubType.includes(',')) {
              const productCategoriesParamInner: string[] = [];
              formattedSelectedSubType.split(',').forEach((subType: string) => {
                productCategoriesParamInner.push(subType.replace(/&@#/g, ', '));
              });
              productSubTypesParam.push(productCategoriesParamInner);
            } else {
              productSubTypesParam.push([selectedSubType]);
            }
          },
        );
      }
      const variables: any = {
        search: router.query.q as string,
        offset: 0,
        limit: productsLimit.current,
        type: SearchType.Products,
        prdProductType: productTypesParam.length > 0 ? productTypesParam : null,
        prdProductCategories:
          productSubTypesParam.length > 0 ? productSubTypesParam : null,
        sort: sortFilter,
        withPrice: true,
      };
      if (
        locationType === SearchMode.GPS &&
        userLocationLat &&
        userLocationLng
      ) {
        variables.latitudeGPS = userLocationLat;
        variables.longitudeGPS = userLocationLng;
      } else if (
        locationType === SearchMode.Region &&
        selectedLocation?.plRegionID
      ) {
        variables.plRegionId = selectedLocation?.plRegionID;
      } else if (
        locationType === SearchMode.Country &&
        selectedLocation?.province?.country?.plCountryID
      ) {
        variables.countryId = selectedLocation?.province?.country?.plCountryID;
      }
      const { data: productData } = await getProductSearch(variables);
      if (!pagination) {
        saveSearchAnalytics({
          input: {
            searchWords: router.query.q as string,
            tag: 'site-wide',
          },
        });
      }
      let productsFinal: any[] =
        productData?.busProdDealSearchByName?.products || [];
      if (variables.withPrice && productsFinal.length < productsLimit.current) {
        const { data: productWithoutPriceData } = await getProductSearch({
          ...variables,
          offset: 0,
          limit: productsLimit.current - productsFinal.length,
          withPrice: false,
        });
        productsFinal = productsFinal.concat(
          productWithoutPriceData?.busProdDealSearchByName?.products || [],
        );
      }
      setSearchProducts(productsFinal);
      noMorePagination.current = productsFinal.length < productsLimit.current;
      return savedProductFilters;
    },
    [
      selectedLocation,
      locationType,
      userLocationLat,
      userLocationLng,
      sortFilter,
      router.query.q,
      getProductSearch,
    ],
  );

  const getDealItems = useCallback(
    async (pagination?: boolean) => {
      const variables: any = {
        search: router.query.q as string,
        offset: 0,
        limit: dealsLimit.current,
        type: SearchType.Deals,
      };
      if (
        locationType === SearchMode.GPS &&
        userLocationLat &&
        userLocationLng
      ) {
        variables.latitudeGPS = userLocationLat;
        variables.longitudeGPS = userLocationLng;
      } else if (
        locationType === SearchMode.Region &&
        selectedLocation?.plRegionID
      ) {
        variables.plRegionId = selectedLocation?.plRegionID;
      } else if (
        locationType === SearchMode.Country &&
        selectedLocation?.province?.country?.plCountryID
      ) {
        variables.countryId = selectedLocation?.province?.country?.plCountryID;
      }
      const { data: dealData } = await getDealSearch(variables);
      if (!pagination) {
        saveSearchAnalytics({
          input: {
            searchWords: router.query.q as string,
            tag: 'site-wide',
          },
        });
      }
      setSearchDeals(dealData?.busProdDealSearchByName?.deals || []);
      noMorePagination.current =
        (dealData?.busProdDealSearchByName?.deals || []).length <
        dealsLimit.current;
    },
    [
      selectedLocation,
      locationType,
      userLocationLat,
      userLocationLng,
      router.query.q,
    ],
  );

  const getBusinessItems = useCallback(
    async (pagination?: boolean) => {
      const variables: any = {
        search: router.query.q as string,
        offset: 0,
        limit: businessesLimit.current,
        type: SearchType.Businesses,
      };
      if (
        locationType === SearchMode.GPS &&
        userLocationLat &&
        userLocationLng
      ) {
        variables.latitudeGPS = userLocationLat;
        variables.longitudeGPS = userLocationLng;
      } else if (
        locationType === SearchMode.Region &&
        selectedLocation?.plRegionID
      ) {
        variables.plRegionId = selectedLocation?.plRegionID;
      } else if (
        locationType === SearchMode.Country &&
        selectedLocation?.province?.country?.plCountryID
      ) {
        variables.countryId = selectedLocation?.province?.country?.plCountryID;
      }
      const { data: businessData } = await getBusinessSearch(variables);
      if (!pagination) {
        saveSearchAnalytics({
          input: {
            searchWords: router.query.q as string,
            tag: 'site-wide',
          },
        });
      }
      setSearchBusinesses(
        businessData?.busProdDealSearchByName?.business || [],
      );
      noMorePagination.current =
        (businessData?.busProdDealSearchByName?.business || []).length <
        businessesLimit.current;
    },
    [
      selectedLocation,
      locationType,
      userLocationLat,
      userLocationLng,
      router.query.q,
    ],
  );

  useEffect(() => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...(router.query || {}),
          q: searchDebounceQuery || '',
        },
      },
      undefined,
      { shallow: true },
    );
  }, [router.pathname, searchDebounceQuery]);

  useEffect(() => {
    lastSearchQuery.current = searchDebounceQuery;
  }, [searchDebounceQuery]);

  useEffect(() => {
    if (!props.emptyInitial && router.query.q) {
      setQuery(router.query.q as string);
      setSearchDebounceQuery(router.query.q as string);
      if (!isSearchLoadingInternal.current && router.query.q) {
        setIsProductLoading(props?.type === SearchType.Products);
        setIsBusinessLoading(props?.type === SearchType.Businesses);
        setIsDealLoading(props?.type === SearchType.Deals);
        isSearchLoadingInternal.current = true;
        setIsPaginating(false);
        noMorePagination.current = false;
      }
    }
  }, [router.query.q, props?.type, props.emptyInitial]);

  useEffect(() => {
    if (selectedLocation && ((router.query.q as string) || '').length > 0) {
      window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
      isSearchLoadingInternal.current = true;
      setIsPaginating(false);
      noMorePagination.current = false;
      switch (props?.type as SearchType) {
        case SearchType.Products:
          productsLimit.current = 50;
          setIsProductLoading(true);
          getProductItems().finally(() => {
            isSearchLoadingInternal.current = false;
            setIsProductLoading(false);
          });
          break;
        case SearchType.Businesses:
          businessesLimit.current = 50;
          setIsBusinessLoading(true);
          getBusinessItems().finally(() => {
            isSearchLoadingInternal.current = false;
            setIsBusinessLoading(false);
          });
          break;
        case SearchType.Deals:
          dealsLimit.current = 50;
          setIsDealLoading(true);
          getDealItems().finally(() => {
            isSearchLoadingInternal.current = false;
            setIsDealLoading(false);
          });
          break;
        default:
          break;
      }
    }
  }, [
    selectedLocation,
    props?.type,
    getProductItems,
    getBusinessItems,
    getDealItems,
  ]);

  const getMoreItems = useCallback(() => {
    if (
      selectedLocation &&
      ((router.query.q as string) || '').length > 0 &&
      !noMorePagination.current &&
      !isPaginating &&
      !isSearchLoadingInternal.current
    ) {
      setIsPaginating(true);
      switch (props?.type as SearchType) {
        case SearchType.Products:
          productsLimit.current += 50;
          getProductItems(true).finally(() => setIsPaginating(false));
          break;
        case SearchType.Businesses:
          businessesLimit.current += 50;
          getBusinessItems(true).finally(() => setIsPaginating(false));
          break;
        case SearchType.Deals:
          dealsLimit.current += 50;
          getDealItems(true).finally(() => setIsPaginating(false));
          break;
        default:
          break;
      }
    }
  }, [
    props?.type,
    selectedLocation,
    router.query.q,
    isPaginating,
    getProductItems,
    getBusinessItems,
    getDealItems,
  ]);

  useDetectScrollEnd(getMoreItems, true);

  useEffect(() => {
    if (!isEqual(lastSearchFilters.current, selectedFilters)) {
      window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
      isSearchLoadingInternal.current = true;
      setIsProductLoading(true);
      lastSearchFilters.current = selectedFilters;
    }
  }, [selectedFilters]);

  const handleKeyPress = useCallback(
    async e => {
      if (e.key === 'Enter') {
        e.target.blur();
      }
      if (e.key === 'Enter' && query) {
        setQuery(query);
      }
    },
    [query],
  );

  const setQueryFunc = useCallback(
    (value: string) => {
      if (selectedLocation && value && lastSearchQuery.current !== value) {
        noMorePagination.current = false;
        setIsHeaderSearchLoading(true);
      }
      setQuery(value);
    },
    [selectedLocation],
  );

  const onQueryChange = useCallback(
    ({ target: { value } }) => setQueryFunc(value),
    [selectedLocation],
  );

  const getProductItemsDebounce = useCallback(
    debounce(() => {
      productsLimit.current = 50;
      setIsProductLoading(true);
      getProductItems().then(savedProductFilters => {
        if (isEqual(savedProductFilters, internalFilters.current)) {
          isSearchLoadingInternal.current = false;
          setIsProductLoading(false);
        }
      });
    }, 1200),
    [getProductItems],
  );

  const setSelectedFiltersFunc = useCallback(
    (type: string | string[]) => {
      const prevFilters = [...internalFilters.current];
      internalFilters.current = setSelectedFilters(type);
      if (!isEqual(prevFilters, internalFilters.current)) {
        getProductItemsDebounce();
      }
    },
    [getProductItemsDebounce, setSelectedFilters],
  );

  const resetFiltersFunc = useCallback(() => {
    resetAll();
    internalFilters.current = [];
    productsLimit.current = 50;
    setIsProductLoading(true);
    getProductItems().then(savedProductFilters => {
      if (isEqual(savedProductFilters, internalFilters.current)) {
        isSearchLoadingInternal.current = false;
        setIsProductLoading(false);
      }
    });
  }, [resetAll, getProductItems]);

  return {
    isHeaderSearchLoading,
    isCountLoading,
    isLoading: isSearchLoading,
    isProductLoading,
    isBusinessLoading,
    isDealLoading,
    isPaginating,
    query,
    setQuery: setQueryFunc,
    handleKeyPress,
    onQueryChange,
    products: searchProducts,
    businesses: searchBusinesses,
    deals: searchDeals,
    productTypes,
    resetAll: resetFiltersFunc,
    selectedFilters,
    setSelectedFilters: setSelectedFiltersFunc,
    setSorting,
    sorting,
    sortingOptions,
    isResultVisible:
      searchBusinesses.length > 0 ||
      searchProducts.length > 0 ||
      searchDeals.length > 0,
    productCount,
    businessCount,
    dealCount,
  };
};
