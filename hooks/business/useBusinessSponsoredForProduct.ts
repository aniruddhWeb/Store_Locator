import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BusinessAdvertisementForProductPageDocument,
  BusinessAdvertisementForProductPageQuery,
  BusinessAdvertisementForProductPageQueryVariables,
} from '../../generated/graphql';
import { apolloClient } from '../../api/client';
import { useCurrentLocationDynamic } from '../../services/location';

const paginationLimit = 6;

export const useBusinessSponsoredForProduct = (productId?: string | null) => {
  const [businessData, setBusinessData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPaginating, setIsPaginating] = useState<boolean>(false);
  const isLoadingInternal = useRef<boolean>(true);
  const isPaginatingInternal = useRef<boolean>(false);
  const noMorePagination = useRef<boolean>(false);
  const paginationOffset = useRef<number>(0);
  const prevBusinessData = useRef<any[]>(businessData);

  const { userLocation, selectedLocation } = useCurrentLocationDynamic();

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

  const getProducts = useCallback(
    async (
      variablesParam: BusinessAdvertisementForProductPageQueryVariables,
    ) => {
      const variables = { ...variablesParam };
      const { data } = await apolloClient.query<
        BusinessAdvertisementForProductPageQuery,
        BusinessAdvertisementForProductPageQueryVariables
      >({
        query: BusinessAdvertisementForProductPageDocument,
        fetchPolicy: 'no-cache',
        variables,
      });
      const newBusinessData = isPaginatingInternal.current
        ? (prevBusinessData.current || []).concat(
            data?.businessAdvertisementForProductPage || [],
          )
        : data?.businessAdvertisementForProductPage || [];
      noMorePagination.current =
        (data?.businessAdvertisementForProductPage || []).length <
        paginationLimit;
      setBusinessData(newBusinessData);
      setIsLoading(false);
      setIsPaginating(false);
      isPaginatingInternal.current = false;
      isLoadingInternal.current = false;
    },
    [],
  );

  const getAllBusinesses = useCallback(() => {
    if (productId) {
      setIsLoading(true);
      isLoadingInternal.current = true;
      paginationOffset.current = 0;
      getProducts({
        productId,
        limit: paginationLimit,
        offset: paginationOffset.current,
        plProvinceID: location?.plProvinceID || null,
        plRegionID: location?.plRegionID || null,
        latitudeGPS: location?.plLatitude || null,
        longitudeGPS: location?.plLongitude || null,
      });
    }
  }, [
    productId,
    location?.plProvinceID,
    location?.plRegionID,
    location?.plLatitude,
    location?.plLongitude,
    getProducts,
  ]);

  const getMoreBusinesses = useCallback(() => {
    if (
      !noMorePagination.current &&
      !isPaginatingInternal.current &&
      productId
    ) {
      setIsPaginating(true);
      isPaginatingInternal.current = true;
      isLoadingInternal.current = true;
      paginationOffset.current += 6;
      getProducts({
        productId,
        limit: paginationLimit,
        offset: paginationOffset.current,
        plProvinceID: location?.plProvinceID || null,
        plRegionID: location?.plRegionID || null,
        latitudeGPS: location?.plLatitude || null,
        longitudeGPS: location?.plLongitude || null,
      });
    } else {
      setIsPaginating(false);
      isPaginatingInternal.current = false;
      isLoadingInternal.current = false;
    }
  }, [
    productId,
    location?.plProvinceID,
    location?.plRegionID,
    location?.plLatitude,
    location?.plLongitude,
    getProducts,
  ]);

  useEffect(() => {
    prevBusinessData.current = businessData;
  }, [businessData]);

  useEffect(() => {
    setIsLoading(true);
    setIsPaginating(false);
    setBusinessData([]);
    paginationOffset.current = 0;
    noMorePagination.current = false;
    isLoadingInternal.current = true;
    isPaginatingInternal.current = false;

    getAllBusinesses();
  }, [getAllBusinesses]);

  return {
    isLoading,
    isPaginating,
    businesses: businessData,
    getMoreBusinesses,
  };
};
