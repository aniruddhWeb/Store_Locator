import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { DateTime } from 'luxon';
import {
  BrandBusinessByProductTypeDocument,
  BrandBusinessByProductTypeQuery,
  BrandBusinessByProductTypeQueryVariables,
  LocationItemFragment,
  ProductAllByTypeDistance2kmDocument,
  ProductAllByTypeDistance2kmQuery,
  ProductAllByTypeDistance2kmQueryVariables,
} from '../../generated/graphql';
import { useProductSorting } from './useProductSorting';
import { useProductFilter } from './useProductFilter';
import { apolloClient } from '../../api/client';
import { useCurrentLocationDynamic } from '../../services/location';
import { useProductTypes } from './useProductTypes';

const useInternalPagination = (productsData?: any[]) => {
  const noMorePagination = useRef<boolean>(false);
  const allLimit = useRef<number>(productsData?.length || 0);
  const [isPaginating, setIsPaginating] = useState<boolean>(false);
  const isPaginatingInternal = useRef<boolean>(false);

  const setNoMorePagination = useCallback(
    (productsDataLength: number, value?: boolean) => {
      if (value !== undefined) {
        noMorePagination.current = value;
      } else {
        noMorePagination.current = productsDataLength < allLimit.current;
      }
    },
    [],
  );

  const getAllLimit = useCallback(() => allLimit.current, []);
  const getNoMorePagination = useCallback(() => noMorePagination.current, []);
  const setAllLimit = useCallback((limit: number) => {
    allLimit.current = limit;
  }, []);
  const getIsPaginatingFunc = useCallback(
    () => isPaginatingInternal.current,
    [],
  );
  const setIsPaginatingFunc = useCallback((v: boolean) => {
    setIsPaginating(v);
    isPaginatingInternal.current = v;
  }, []);

  return {
    getAllLimit,
    setAllLimit,
    getNoMorePagination,
    setNoMorePagination,
    isPaginating,
    getIsPaginating: getIsPaginatingFunc,
    setIsPaginating: setIsPaginatingFunc,
  };
};

export const useProducts2kmDynamic = () => {
  const { userLocation, selectedLocation } = useCurrentLocationDynamic();

  const { productTypes: originProductTypes } = useProductTypes();

  const location = useMemo(() => {
    if (userLocation?.plLatitude && userLocation?.plLongitude) {
      return userLocation;
    }
    return {
      ...selectedLocation,
      plLatitude: null,
      plLongitude: null,
    };
  }, [
    userLocation?.plLatitude,
    userLocation?.plLongitude,
    selectedLocation?.plRegionID,
  ]);

  const [products2kmData, setProducts2kmData] = useState<any[]>([]);
  const [strainNames2km, setStrainNames2km] = useState<string[]>([]);
  const [brandNamesProp, setBrandNames] = useState<string[]>([]);

  const [showLocationDisabledBanner, setShowLocationDisabledBanner] =
    useState<boolean>(false);
  const prevShowLocationDisabledBanner = useRef<boolean>(
    showLocationDisabledBanner,
  );
  const [showLocationTitle, setShouldShowLocationTitle] =
    useState<boolean>(false);
  const [showNearByTitle, setShowNearByTitle] = useState<boolean>(false);

  const {
    isPaginating: isProduct2kmPaginating,
    getIsPaginating: getIsProduct2kmPaginating,
    setIsPaginating: setIsProduct2kmPaginating,
    getAllLimit: getProduct2kmLimit,
    setAllLimit: setProduct2kmLimit,
    setNoMorePagination: setProduct2kmNoMorePagination,
    getNoMorePagination: getProduct2kmNoMorePagination,
  } = useInternalPagination(products2kmData);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isLoadingInternal = useRef<boolean>(true);
  const currentWorkingFilter = useRef<any>(null);

  const prevSelectedLocation = useRef<LocationItemFragment | null>(
    location || null,
  );

  useEffect(() => {
    if (
      !showLocationDisabledBanner &&
      prevShowLocationDisabledBanner.current !== showLocationDisabledBanner
    ) {
      localStorage.setItem('location-banner-time', DateTime.now().toISO());
    }
    prevShowLocationDisabledBanner.current = showLocationDisabledBanner;
  }, [showLocationDisabledBanner]);

  useEffect(() => {
    const showLocationBanner = () => {
      setShowNearByTitle(false);
      setShouldShowLocationTitle(true);
      const latestBannerTimeStamp = localStorage.getItem(
        'location-banner-time',
      );
      const nowTime = DateTime.now();
      if (latestBannerTimeStamp) {
        const bannerTime = DateTime.fromISO(latestBannerTimeStamp);
        const diff = nowTime.diff(bannerTime, ['days']).toObject();
        if (!!diff.days && Math.abs(diff.days) >= 30) {
          setShowLocationDisabledBanner(true);
        }
      } else {
        setShowLocationDisabledBanner(true);
      }
    };
    if (!userLocation?.plLatitude && !userLocation?.plLongitude) {
      showLocationBanner();
    }
  }, [userLocation?.plLatitude, userLocation?.plLongitude]);

  const {
    searchQuery,
    setSearchQuery,
    productTypes,
    setSelectedFilters,
    selectedFilters,
    productsFilter,
    productsFilterNoDebounce,
    resetAll,
    sortFilter,
    setSortFilter,
    strainNames,
    brandNames,
  } = useProductFilter(
    originProductTypes,
    undefined,
    undefined,
    undefined,
    true,
    true,
    true,
    strainNames2km,
    brandNamesProp,
  );

  const { sorting, setSorting, sortingOptions } = useProductSorting(
    sortFilter,
    setSortFilter,
    true,
    productsFilter,
  );

  const getProducts = useCallback(
    async (
      variablesParam: ProductAllByTypeDistance2kmQueryVariables,
      compareVariables: any,
    ) => {
      const { data } = await apolloClient.query<
        ProductAllByTypeDistance2kmQuery,
        ProductAllByTypeDistance2kmQueryVariables
      >({
        query: ProductAllByTypeDistance2kmDocument,
        fetchPolicy: 'no-cache',
        variables: variablesParam,
      });
      if (isEqual(currentWorkingFilter.current, compareVariables)) {
        setProduct2kmNoMorePagination(
          (data?.productAllByTypeDistance2km?.products || []).length,
        );
        setProducts2kmData(data?.productAllByTypeDistance2km?.products || []);
        setStrainNames2km(
          (data?.productAllByTypeDistance2km?.productStrainName ||
            []) as string[],
        );
        setIsLoading(false);
        isLoadingInternal.current = false;
      }
      let brandProductCategories = (variablesParam?.prdProductCategories ||
        []) as string[];
      const brandCategoryIndex = brandProductCategories.findIndex(
        (subItem: string) => subItem === 'Brand',
      );
      if (brandCategoryIndex > -1) {
        brandProductCategories = brandProductCategories.filter(
          (item: string, index: number) =>
            index !== brandCategoryIndex && index - 1 !== brandCategoryIndex,
        );
      }
      apolloClient
        .query<
          BrandBusinessByProductTypeQuery,
          BrandBusinessByProductTypeQueryVariables
        >({
          query: BrandBusinessByProductTypeDocument,
          fetchPolicy: 'no-cache',
          variables: {
            ...(variablesParam as any),
            prdProductCategories: brandProductCategories,
            distance: [0, 2],
          },
        })
        .then(({ data: dataBrandNames }) => {
          setBrandNames(
            (dataBrandNames?.brandBusinessByProductType || []) as string[],
          );
        });
    },
    [setProduct2kmNoMorePagination],
  );

  const getMore2kmProductsQuery = useCallback(
    async (
      variablesParam: ProductAllByTypeDistance2kmQueryVariables,
      compareVariables: any,
    ) => {
      const { data } = await apolloClient.query<
        ProductAllByTypeDistance2kmQuery,
        ProductAllByTypeDistance2kmQueryVariables
      >({
        query: ProductAllByTypeDistance2kmDocument,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
        variables: variablesParam,
      });
      if (isEqual(currentWorkingFilter.current, compareVariables)) {
        setProduct2kmNoMorePagination(
          (data?.productAllByTypeDistance2km?.products || []).length,
        );
        setProducts2kmData(data?.productAllByTypeDistance2km?.products || []);
        setStrainNames2km(
          data?.productAllByTypeDistance2km?.productStrainName as string[],
        );
        setIsProduct2kmPaginating(false);
      }
    },
    [setProduct2kmNoMorePagination],
  );

  const getAllProducts = useCallback(() => {
    currentWorkingFilter.current = productsFilter;
    setIsLoading(true);
    isLoadingInternal.current = true;
    setProduct2kmLimit(24);
    getProducts(
      {
        ...productsFilter,
        plRegionID: location?.plRegionID || null,
        latitudeGPS: location?.plLatitude || null,
        longitudeGPS: location?.plLongitude || null,
        prdProductType: productsFilter?.prdProductType || [],
        limit: 24,
        offset: 0,
      },
      productsFilter,
    );
  }, [
    getProducts,
    JSON.stringify(productsFilter),
    location?.plRegionID,
    location?.plLatitude,
    location?.plLongitude,
    setProduct2kmLimit,
  ]);

  const getMore2kmProducts = useCallback(() => {
    if (
      !getIsProduct2kmPaginating() &&
      !getProduct2kmNoMorePagination() &&
      !isLoadingInternal.current &&
      currentWorkingFilter.current &&
      currentWorkingFilter.current.prdProductType &&
      currentWorkingFilter.current.prdProductType.length > 0
    ) {
      setIsProduct2kmPaginating(true);
      setProduct2kmLimit(getProduct2kmLimit() + 24);
      getMore2kmProductsQuery(
        {
          ...currentWorkingFilter.current,
          plRegionID: location?.plRegionID || null,
          latitudeGPS: location?.plLatitude || null,
          longitudeGPS: location?.plLongitude || null,
          limit: getProduct2kmLimit(),
          offset: 0,
        },
        currentWorkingFilter.current,
      );
    } else {
      setIsProduct2kmPaginating(false);
    }
  }, [
    getIsProduct2kmPaginating,
    getProduct2kmNoMorePagination,
    getProduct2kmLimit,
    JSON.stringify(productsFilter),
    location?.plRegionID,
    location?.plLatitude,
    location?.plLongitude,
  ]);

  useEffect(() => {
    setIsLoading(true);
    setProducts2kmData([]);
    setProduct2kmLimit(0);
    setProduct2kmNoMorePagination(0, false);
    isLoadingInternal.current = true;
  }, [
    JSON.stringify(productsFilterNoDebounce?.prdProductType),
    JSON.stringify(productsFilterNoDebounce?.prdProductCategories),
  ]);

  useEffect(() => {
    setIsLoading(true);
    setProducts2kmData([]);
    setProduct2kmLimit(0);
    setProduct2kmNoMorePagination(0, false);
    isLoadingInternal.current = true;
  }, [productsFilterNoDebounce?.sort, productsFilterNoDebounce?.search]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    if (!isLoading) {
      if (
        prevSelectedLocation.current &&
        location &&
        (prevSelectedLocation.current?.plRegionID !== location?.plRegionID ||
          prevSelectedLocation.current?.plProvinceID !==
            location?.plProvinceID ||
          prevSelectedLocation.current?.plLatitude !== location?.plLatitude ||
          prevSelectedLocation.current?.plLongitude !== location?.plLongitude)
      ) {
        setProducts2kmData([]);
        setStrainNames2km([]);
        setBrandNames([]);
        setProduct2kmLimit(0);
        setProduct2kmNoMorePagination(0, false);
        getMore2kmProducts();
      }
    }
    if (
      prevSelectedLocation.current &&
      location &&
      (prevSelectedLocation.current?.plRegionID !== location?.plRegionID ||
        prevSelectedLocation.current?.plProvinceID !== location?.plProvinceID ||
        prevSelectedLocation.current?.plLatitude !== location?.plLatitude ||
        prevSelectedLocation.current?.plLongitude !== location?.plLongitude)
    ) {
      setShouldShowLocationTitle(true);
      prevSelectedLocation.current = location || selectedLocation;
    }
  }, [
    isLoading,
    getMore2kmProducts,
    location?.plProvinceID,
    location?.plRegionID,
    location?.plLatitude,
    location?.plLongitude,
  ]);

  return {
    isLoading,
    showNearByTitle,
    showLocationTitle,
    showLocationDisabledBanner,
    setShowLocationDisabledBanner,
    products2km: products2kmData,
    isProduct2kmPaginating,
    getMore2kmProducts,
    scrollDependency: productsFilterNoDebounce,
    sorting,
    setSorting,
    sortingOptions,
    productTypes,
    setSelectedFilters,
    selectedFilters,
    resetAll,
    searchQuery,
    setSearchQuery,
    strainNames: strainNames2km,
    brandNames,
  };
};
