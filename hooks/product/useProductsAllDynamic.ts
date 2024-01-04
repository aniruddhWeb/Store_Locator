import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { DateTime } from 'luxon';
import {
  BrandBusinessByProductTypeDocument,
  BrandBusinessByProductTypeQuery,
  BrandBusinessByProductTypeQueryVariables,
  LocationItemFragment,
  ProductAdvertisementDocument,
  ProductAdvertisementQuery,
  ProductAdvertisementQueryVariables,
  ProductAllByTypeDistance10kmDocument,
  ProductAllByTypeDistance10kmQuery,
  ProductAllByTypeDistance10kmQueryVariables,
  ProductAllByTypeDistance2kmDocument,
  ProductAllByTypeDistance2kmQuery,
  ProductAllByTypeDistance2kmQueryVariables,
  ProductAllByTypeMailOrderDocument,
  ProductAllByTypeMailOrderQuery,
  ProductAllByTypeMailOrderQueryVariables,
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

export const useProductsAllDynamic = () => {
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

  const [productsSponsored, setProductsSponsored] = useState<any[]>([]);
  const [products2kmData, setProducts2kmData] = useState<any[]>([]);
  const [products10kmData, setProducts10kmData] = useState<any[]>([]);
  const [productsMailOrderData, setProductsMailOrderData] = useState<any[]>([]);
  const [strainNames2km, setStrainNames2km] = useState<string[]>([]);
  const [strainNames10km, setStrainNames10km] = useState<string[]>([]);
  const [brandNamesProp, setBrandNames] = useState<string[]>([]);

  const sortStrainNames = useCallback(
    (
      strainNames2kmParam?: null | string[],
      strainNames10kmParam?: null | string[],
    ) => {
      return (strainNames2kmParam || [])
        .concat(strainNames10kmParam || [])
        .filter(
          (item, pos, self) => self.findIndex(sub => sub === item) === pos,
        );
    },
    [],
  );
  const strainNamesProp = useMemo(
    () => sortStrainNames(strainNames2km, strainNames10km),
    [strainNames2km, strainNames10km, sortStrainNames],
  );

  const [showLocationDisabledBanner, setShowLocationDisabledBanner] =
    useState<boolean>(false);
  const prevShowLocationDisabledBanner = useRef<boolean>(
    showLocationDisabledBanner,
  );
  const [showLocationTitle, setShouldShowLocationTitle] =
    useState<boolean>(false);
  const [showNearByTitle, setShowNearByTitle] = useState<boolean>(false);

  const {
    isPaginating: isProductSponsoredPaginating,
    getIsPaginating: getIsProductSponsoredPaginating,
    setIsPaginating: setIsProductSponsoredPaginating,
    getAllLimit: getProductSponsoredLimit,
    setAllLimit: setProductSponsoredLimit,
    setNoMorePagination: setProductSponsoredNoMorePagination,
    getNoMorePagination: getProductSponsoredNoMorePagination,
  } = useInternalPagination(productsSponsored);

  const {
    isPaginating: isProduct2kmPaginating,
    getIsPaginating: getIsProduct2kmPaginating,
    setIsPaginating: setIsProduct2kmPaginating,
    getAllLimit: getProduct2kmLimit,
    setAllLimit: setProduct2kmLimit,
    setNoMorePagination: setProduct2kmNoMorePagination,
    getNoMorePagination: getProduct2kmNoMorePagination,
  } = useInternalPagination(products2kmData);

  const {
    isPaginating: isProduct10kmPaginating,
    getIsPaginating: getIsProduct10kmPaginating,
    setIsPaginating: setIsProduct10kmPaginating,
    getAllLimit: getProduct10kmLimit,
    setAllLimit: setProduct10kmLimit,
    setNoMorePagination: setProduct10kmNoMorePagination,
    getNoMorePagination: getProduct10kmNoMorePagination,
  } = useInternalPagination(products10kmData);

  const {
    isPaginating: isProductMailOrderPaginating,
    getIsPaginating: getIsProductMailOrderPaginating,
    setIsPaginating: setIsProductMailOrderPaginating,
    getAllLimit: getProductMailOrderLimit,
    setAllLimit: setProductMailOrderLimit,
    setNoMorePagination: setProductMailOrderNoMorePagination,
    getNoMorePagination: getProductMailOrderNoMorePagination,
  } = useInternalPagination(productsMailOrderData);

  const [isLoadingMail, setIsLoadingMail] = useState<boolean>(true);
  const [isLoading2km, setIsLoading2km] = useState<boolean>(true);
  const [isLoading10km, setIsLoading10km] = useState<boolean>(true);

  const isLoadingMailInternal = useRef<boolean>(true);
  const isLoading2kmInternal = useRef<boolean>(true);
  const isLoading10kmInternal = useRef<boolean>(true);

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
    strainNamesProp,
    brandNamesProp,
  );

  const { sorting, setSorting, sortingOptions } = useProductSorting(
    sortFilter,
    setSortFilter,
    true,
    productsFilter,
  );

  const getProducts = useCallback(
    async (variablesParam: any, compareVariables: any) => {
      apolloClient
        .query<
          ProductAllByTypeDistance2kmQuery,
          ProductAllByTypeDistance2kmQueryVariables
        >({
          query: ProductAllByTypeDistance2kmDocument,
          fetchPolicy: 'no-cache',
          variables: variablesParam,
        })
        .then(({ data: data2km }) => {
          setIsLoading2km(false);
          if (isEqual(currentWorkingFilter.current, compareVariables)) {
            setProduct2kmNoMorePagination(
              (data2km?.productAllByTypeDistance2km?.products || []).length,
            );
            setProducts2kmData(
              data2km?.productAllByTypeDistance2km?.products || [],
            );
            setStrainNames2km(
              (data2km?.productAllByTypeDistance2km?.productStrainName ||
                []) as string[],
            );
            isLoading2kmInternal.current = false;
          }
        });
      apolloClient
        .query<
          ProductAllByTypeDistance10kmQuery,
          ProductAllByTypeDistance10kmQueryVariables
        >({
          query: ProductAllByTypeDistance10kmDocument,
          fetchPolicy: 'no-cache',
          variables: variablesParam,
        })
        .then(({ data: data10km }) => {
          setIsLoading10km(false);
          if (isEqual(currentWorkingFilter.current, compareVariables)) {
            setProduct10kmNoMorePagination(
              (data10km?.productAllByTypeDistance10km?.products || []).length,
            );
            setProducts10kmData(
              data10km?.productAllByTypeDistance10km?.products || [],
            );
            setStrainNames10km(
              (data10km?.productAllByTypeDistance10km?.productStrainName ||
                []) as string[],
            );
            isLoading10kmInternal.current = false;
          }
        });
      apolloClient
        .query<
          ProductAllByTypeMailOrderQuery,
          ProductAllByTypeMailOrderQueryVariables
        >({
          query: ProductAllByTypeMailOrderDocument,
          fetchPolicy: 'no-cache',
          variables: variablesParam,
        })
        .then(({ data: dataMailOrder }) => {
          setIsLoadingMail(false);
          if (isEqual(currentWorkingFilter.current, compareVariables)) {
            setProductMailOrderNoMorePagination(
              (dataMailOrder?.productAllByTypeBrandLinkMailOrder || []).length,
            );
            setProductsMailOrderData(
              dataMailOrder?.productAllByTypeBrandLinkMailOrder || [],
            );
            isLoadingMailInternal.current = false;
          }
        });
      let brandProductCategories = variablesParam?.prdProductCategories || [];
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
            ...variablesParam,
            prdProductCategories: brandProductCategories,
            distance: [0, 10],
          },
        })
        .then(({ data: dataBrandNames }) => {
          setBrandNames(
            (dataBrandNames?.brandBusinessByProductType || []) as string[],
          );
        });
    },
    [
      setProduct2kmNoMorePagination,
      setProduct10kmNoMorePagination,
      setProductMailOrderNoMorePagination,
    ],
  );

  const getMoreSponsoredProductsQuery = useCallback(
    async (
      variablesParam: ProductAdvertisementQueryVariables,
      compareVariables: any,
    ) => {
      const { data } = await apolloClient.query<
        ProductAdvertisementQuery,
        ProductAdvertisementQueryVariables
      >({
        query: ProductAdvertisementDocument,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
        variables: variablesParam,
      });
      if (isEqual(currentWorkingFilter.current, compareVariables)) {
        setProductSponsoredNoMorePagination(
          (data?.productAdvertisement || []).length,
        );
        setProductsSponsored((sponsoredCurrent: any[]) => {
          const newSponsoredProducts = (sponsoredCurrent || []).concat(
            data?.productAdvertisement || [],
          );
          setProductSponsoredNoMorePagination(newSponsoredProducts.length);
          return newSponsoredProducts;
        });
        setIsProductSponsoredPaginating(false);
      }
    },
    [setProductSponsoredNoMorePagination],
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
        isLoading2kmInternal.current = false;
        setIsLoading2km(false);
      }
    },
    [setProduct2kmNoMorePagination],
  );

  const getMore10kmProductsQuery = useCallback(
    async (
      variablesParam: ProductAllByTypeDistance10kmQueryVariables,
      compareVariables: any,
    ) => {
      const { data } = await apolloClient.query<
        ProductAllByTypeDistance10kmQuery,
        ProductAllByTypeDistance10kmQueryVariables
      >({
        query: ProductAllByTypeDistance10kmDocument,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
        variables: variablesParam,
      });
      if (isEqual(currentWorkingFilter.current, compareVariables)) {
        setProduct10kmNoMorePagination(
          (data?.productAllByTypeDistance10km?.products || []).length,
        );
        setProducts10kmData(data?.productAllByTypeDistance10km?.products || []);
        setStrainNames10km(
          data?.productAllByTypeDistance10km?.productStrainName as string[],
        );
        setIsProduct10kmPaginating(false);
        isLoading10kmInternal.current = false;
        setIsLoading10km(false);
      }
    },
    [setProduct10kmNoMorePagination],
  );

  const getMoreMailOrderProductsQuery = useCallback(
    async (
      variablesParam: ProductAllByTypeDistance2kmQueryVariables,
      compareVariables: any,
    ) => {
      const { data } = await apolloClient.query<
        ProductAllByTypeMailOrderQuery,
        ProductAllByTypeMailOrderQueryVariables
      >({
        query: ProductAllByTypeMailOrderDocument,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
        variables: variablesParam,
      });
      if (isEqual(currentWorkingFilter.current, compareVariables)) {
        setProductMailOrderNoMorePagination(
          (data?.productAllByTypeBrandLinkMailOrder || []).length,
        );
        setProductsMailOrderData(
          data?.productAllByTypeBrandLinkMailOrder || [],
        );
        setIsProductMailOrderPaginating(false);
        isLoadingMailInternal.current = false;
        setIsLoadingMail(false);
      }
    },
    [setProductMailOrderNoMorePagination],
  );

  const getAllProducts = useCallback(() => {
    if (
      productsFilter.prdProductType &&
      productsFilter.prdProductType.length > 0
    ) {
      currentWorkingFilter.current = productsFilter;
      setIsLoading2km(true);
      setIsLoading10km(true);
      setIsLoadingMail(true);
      setProduct2kmLimit(24);
      setProduct10kmLimit(24);
      setProductMailOrderLimit(24);
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
    }
  }, [
    location?.plRegionID,
    location?.plLatitude,
    location?.plLongitude,
    JSON.stringify(productsFilter),
    getProducts,
    setProduct2kmLimit,
    setProduct10kmLimit,
    setProductMailOrderLimit,
  ]);

  const getMoreSponsoredProducts = useCallback(() => {
    if (
      !getIsProductSponsoredPaginating() &&
      !getProductSponsoredNoMorePagination() &&
      productsFilter.prdProductType &&
      productsFilter.prdProductType.length > 0
    ) {
      setIsProductSponsoredPaginating(true);
      const previousLimit = getProductSponsoredLimit();
      setProductSponsoredLimit(getProductSponsoredLimit() + 6);
      getMoreSponsoredProductsQuery(
        {
          ...productsFilter,
          prdProductType: productsFilter?.prdProductType || [],
          limit: 6,
          offset: previousLimit,
          plRegionID: location?.plRegionID || null,
          plProvinceID: location?.plProvinceID || null,
          latitudeGPS: location?.plLatitude || null,
          longitudeGPS: location?.plLongitude || null,
        },
        currentWorkingFilter.current,
      );
    } else {
      setIsProductSponsoredPaginating(false);
    }
  }, [
    getIsProductSponsoredPaginating,
    getProductSponsoredNoMorePagination,
    getProductSponsoredLimit,
    setProductSponsoredLimit,
    JSON.stringify(productsFilter?.prdProductType),
    JSON.stringify(productsFilter?.prdProductCategories),
    location?.plProvinceID,
    location?.plRegionID,
    location?.plLatitude,
    location?.plLongitude,
  ]);

  const getMore2kmProducts = useCallback(
    (doNotSetPaginating?: boolean) => {
      if (
        !getIsProduct2kmPaginating() &&
        !getProduct2kmNoMorePagination() &&
        !isLoading2kmInternal.current &&
        currentWorkingFilter.current &&
        currentWorkingFilter.current.prdProductType &&
        currentWorkingFilter.current.prdProductType.length > 0
      ) {
        if (doNotSetPaginating) {
          isLoading2kmInternal.current = true;
          setIsLoading2km(true);
        } else {
          setIsProduct2kmPaginating(true);
        }
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
    },
    [
      getIsProduct2kmPaginating,
      getProduct2kmNoMorePagination,
      getProduct2kmLimit,
      JSON.stringify(productsFilter),
      location?.plRegionID,
      location?.plLatitude,
      location?.plLongitude,
    ],
  );

  const getMore10kmProducts = useCallback(
    (doNotSetPaginating?: boolean) => {
      if (
        !getIsProduct10kmPaginating() &&
        !getProduct10kmNoMorePagination() &&
        !isLoading10kmInternal.current &&
        !isLoading10kmInternal.current &&
        currentWorkingFilter.current &&
        currentWorkingFilter.current.prdProductType &&
        currentWorkingFilter.current.prdProductType.length > 0
      ) {
        if (doNotSetPaginating) {
          isLoading10kmInternal.current = true;
          setIsLoading10km(true);
        } else {
          setIsProduct10kmPaginating(true);
        }
        setProduct10kmLimit(getProduct10kmLimit() + 24);
        getMore10kmProductsQuery(
          {
            ...currentWorkingFilter.current,
            plRegionID: location?.plRegionID || null,
            latitudeGPS: location?.plLatitude || null,
            longitudeGPS: location?.plLongitude || null,
            limit: getProduct10kmLimit(),
            offset: 0,
          },
          currentWorkingFilter.current,
        );
      } else {
        setIsProduct10kmPaginating(false);
      }
    },
    [
      getIsProduct10kmPaginating,
      getProduct10kmNoMorePagination,
      getProduct10kmLimit,
      JSON.stringify(productsFilter),
      location?.plRegionID,
      location?.plLatitude,
      location?.plLongitude,
    ],
  );

  const getMoreMailOrderProducts = useCallback(() => {
    if (
      !getIsProductMailOrderPaginating() &&
      !getProductMailOrderNoMorePagination() &&
      currentWorkingFilter.current &&
      currentWorkingFilter.current.prdProductType &&
      currentWorkingFilter.current.prdProductType.length > 0
    ) {
      setIsProductMailOrderPaginating(true);
      setProductMailOrderLimit(getProductMailOrderLimit() + 24);
      getMoreMailOrderProductsQuery(
        {
          ...currentWorkingFilter.current,
          limit: getProductMailOrderLimit(),
          offset: 0,
        },
        currentWorkingFilter.current,
      );
    } else {
      setIsProductMailOrderPaginating(false);
    }
  }, [
    getIsProductMailOrderPaginating,
    getProductMailOrderNoMorePagination,
    getProductMailOrderLimit,
    setProductMailOrderLimit,
    JSON.stringify(productsFilter),
  ]);

  useEffect(() => {
    setProductsSponsored([]);
    setProductSponsoredLimit(0);
    setProductSponsoredNoMorePagination(0, false);
  }, [
    location?.plProvinceID,
    location?.plRegionID,
    location?.plLatitude,
    location?.plLongitude,
  ]);

  useEffect(() => {
    setIsLoading2km(true);
    setIsLoading10km(true);
    setIsLoadingMail(true);
    setProducts2kmData([]);
    setProducts10kmData([]);
    setProductsMailOrderData([]);
    setProductsSponsored([]);
    setProduct2kmLimit(0);
    setProduct10kmLimit(0);
    setProductMailOrderLimit(0);
    setProductSponsoredLimit(0);
    setProduct2kmNoMorePagination(0, false);
    setProduct10kmNoMorePagination(0, false);
    setProductMailOrderNoMorePagination(0, false);
    setProductSponsoredNoMorePagination(0, false);
    isLoading2kmInternal.current = true;
    isLoading10kmInternal.current = true;
    isLoadingMailInternal.current = true;
  }, [
    JSON.stringify(productsFilterNoDebounce?.prdProductType),
    JSON.stringify(productsFilterNoDebounce?.prdProductCategories),
  ]);

  useEffect(() => {
    setIsLoading2km(true);
    setIsLoading10km(true);
    setIsLoadingMail(true);
    setProducts2kmData([]);
    setProducts10kmData([]);
    setProductsMailOrderData([]);
    setProduct2kmLimit(0);
    setProduct10kmLimit(0);
    setProductMailOrderLimit(0);
    setProduct2kmNoMorePagination(0, false);
    setProduct10kmNoMorePagination(0, false);
    setProductMailOrderNoMorePagination(0, false);
    isLoading2kmInternal.current = true;
    isLoading10kmInternal.current = true;
    isLoadingMailInternal.current = true;
  }, [productsFilterNoDebounce?.sort, productsFilterNoDebounce?.search]);

  useEffect(() => {
    setIsLoading2km(true);
    setIsLoading10km(true);
    setIsLoadingMail(true);
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    setTimeout(() => getMoreSponsoredProducts(), 150);
  }, [getMoreSponsoredProducts]);

  useEffect(() => {
    if (!isLoading2km) {
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
        getMore2kmProducts(true);
      }
    }
    if (!isLoading10km) {
      if (
        prevSelectedLocation.current &&
        location &&
        (prevSelectedLocation.current?.plRegionID !== location?.plRegionID ||
          prevSelectedLocation.current?.plProvinceID !==
            location?.plProvinceID ||
          prevSelectedLocation.current?.plLatitude !== location?.plLatitude ||
          prevSelectedLocation.current?.plLongitude !== location?.plLongitude)
      ) {
        setProducts10kmData([]);
        setStrainNames10km([]);
        setBrandNames([]);
        setProduct10kmLimit(0);
        setProduct10kmNoMorePagination(0, false);
        getMore10kmProducts(true);
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
      setShowNearByTitle(false);
      setShouldShowLocationTitle(true);
      prevSelectedLocation.current = location;
    }
  }, [
    isLoading2km,
    isLoading10km,
    getMore2kmProducts,
    getMore10kmProducts,
    location?.plProvinceID,
    location?.plRegionID,
    location?.plLatitude,
    location?.plLongitude,
  ]);

  return {
    isLoading2km,
    isLoading10km,
    isLoadingMail,
    showNearByTitle,
    showLocationTitle,
    showLocationDisabledBanner,
    setShowLocationDisabledBanner,
    products2km: products2kmData,
    products10km: products10kmData,
    productsMailOrder: productsMailOrderData,
    productsSponsored,
    isProduct2kmPaginating,
    isProduct10kmPaginating,
    isProductMailOrderPaginating,
    isProductSponsoredPaginating,
    getMore2kmProducts,
    getMore10kmProducts,
    getMoreMailOrderProducts,
    getMoreSponsoredProducts,
    productsFilter,
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
    strainNames,
    brandNames,
  };
};
