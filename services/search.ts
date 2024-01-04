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
  const [isBusinessLoading, setIsBusinessLoading] = useState<boolean>(false);
  const [isDealLoading, setIsDealLoading] = useState<boolean>(false);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(false);
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
  } = useProductFilter(
    props.productTypes || [],
    undefined,
    true,
    undefined,
    true,
  );
  const productTypesInternal = useRef<ProductType[]>(props.productTypes || []);

  useEffect(() => {
    productTypesInternal.current = props.productTypes;
  }, [props.productTypes]);

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
  const [searchDebounceQuery, setSearchDebounceQuery] = useDebounce(
    query,
    1000,
  );
  const internalFilters = useRef<string[]>(selectedFilters);

  const productsLimit = useRef<number>(searchProducts.length + 50);
  const dealsLimit = useRef<number>(searchDeals.length + 50);
  const businessesLimit = useRef<number>(searchBusinesses.length + 50);

  const lastSearchQuery = useRef<string>(query);
  const lastSearchFilters = useRef<string[]>(selectedFilters || []);

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
            props.productTypes || [],
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
        isGlobalSearch: true,
        search: searchDebounceQuery,
        offset: 0,
        limit: productsLimit.current,
        type: SearchType.Products,
        prdProductType: productTypesParam.length > 0 ? productTypesParam : null,
        prdProductCategories:
          productSubTypesParam.length > 0 ? productSubTypesParam : null,
        sort: sortFilter,
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
            searchWords: searchDebounceQuery,
            tag: 'site-wide',
          },
        });
      }
      setSearchProducts(productData?.busProdDealSearchByName?.products || []);
      noMorePagination.current =
        (productData?.busProdDealSearchByName?.products || []).length <
        productsLimit.current;
      return savedProductFilters;
    },
    [
      selectedLocation,
      locationType,
      userLocationLat,
      userLocationLng,
      sortFilter,
      searchDebounceQuery,
      getProductSearch,
      props.productTypes,
    ],
  );

  const getDealItems = useCallback(
    async (pagination?: boolean) => {
      const variables: any = {
        isGlobalSearch: true,
        search: searchDebounceQuery,
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
            searchWords: searchDebounceQuery,
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
      searchDebounceQuery,
    ],
  );

  const getBusinessItems = useCallback(
    async (pagination?: boolean) => {
      const variables: any = {
        isGlobalSearch: true,
        search: searchDebounceQuery,
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
            searchWords: searchDebounceQuery,
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
      searchDebounceQuery,
    ],
  );

  const replaceQueryParams = useCallback(async () => {
    await router.replace(
      {
        pathname: router.pathname,
        query: {
          ...(router.query || {}),
          q: lastSearchQuery.current,
        },
      },
      undefined,
      { shallow: true },
    );
  }, [router.pathname]);

  useEffect(() => {
    if (
      !props.emptyInitial &&
      router.query.header === 'true' &&
      router.query.q
    ) {
      setQuery(router.query.q as string);
      setSearchDebounceQuery(router.query.q as string);
      if (
        !isSearchLoadingInternal.current &&
        router.query.q &&
        router.query.header === 'true'
      ) {
        setIsProductLoading(true);
        setIsBusinessLoading(true);
        setIsDealLoading(true);
        isSearchLoadingInternal.current = true;
        setIsPaginating(false);
        noMorePagination.current = false;
      }
    }
  }, [router.query.header, router.query.q, props.emptyInitial]);

  useEffect(() => {
    if (selectedLocation && (searchDebounceQuery || '').length > 0) {
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
            replaceQueryParams();
          });
          break;
        case SearchType.Businesses:
          businessesLimit.current = 50;
          setIsBusinessLoading(true);
          getBusinessItems().finally(() => {
            isSearchLoadingInternal.current = false;
            setIsBusinessLoading(false);
            replaceQueryParams();
          });
          break;
        case SearchType.Deals:
          dealsLimit.current = 50;
          setIsDealLoading(true);
          getDealItems().finally(() => {
            isSearchLoadingInternal.current = false;
            setIsDealLoading(false);
            replaceQueryParams();
          });
          break;
        default:
          break;
      }
    }
  }, [
    selectedLocation,
    searchDebounceQuery,
    props?.type,
    getProductItems,
    getBusinessItems,
    getDealItems,
    replaceQueryParams,
  ]);

  const getMoreItems = useCallback(() => {
    if (
      selectedLocation &&
      (searchDebounceQuery || '').length > 0 &&
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
    searchDebounceQuery,
    isPaginating,
    getProductItems,
    getBusinessItems,
    getDealItems,
  ]);

  useDetectScrollEnd(getMoreItems, true);

  useEffect(() => {
    lastSearchQuery.current = searchDebounceQuery;
  }, [searchDebounceQuery]);

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
      internalFilters.current = setSelectedFilters(type);
      getProductItemsDebounce();
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
    productTypes: props.productTypes || [],
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
  };
};
