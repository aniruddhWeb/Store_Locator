import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import {
  BusinessAllByLocationDocument,
  BusinessAllByLocationQuery,
  BusinessAllByLocationQueryVariables,
  BusinessItemFragment,
  useBusinessAllByLocationLazyQuery,
} from '../generated/graphql';
import { getApolloClient } from '../api/client';
import {
  useCurrentLocationStatic,
  useCurrentLocationDynamic,
} from './location';
import { useDetectScrollEnd } from '../utils/window';

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const useAllAllStatic = async (context: GetServerSidePropsContext) => {
  const { selectedLocation } = await useCurrentLocationStatic(context);

  const { data: allPageData } = await getApolloClient(context).query<
    BusinessAllByLocationQuery,
    BusinessAllByLocationQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: BusinessAllByLocationDocument,
    variables: {
      provinceID: selectedLocation.plProvinceID,
      regionID: selectedLocation.plRegionID,
      offset: 0,
      limit: 12,
    },
  });

  return allPageData?.businessAllByLocation || [];
};

export const useAllAllDynamic = (allAllProps?: any[]) => {
  const { selectedLocation } = useCurrentLocationDynamic();
  const [allAll, setAllAll] = useState<any[]>(allAllProps || []);
  const [businessTypeFilter, setBusinessTypeFilter] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLoadingInternal = useRef<boolean>(false);
  const [noMorePagination, setNoMorePagination] = useState<boolean>(
    (allAllProps?.length || 0) < 12,
  );
  const allLimit = useRef<number>(allAll.length);

  const [getAllAll] = useBusinessAllByLocationLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      if ((data?.businessAllByLocation || []).length < allLimit.current) {
        setNoMorePagination(true);
      } else {
        setNoMorePagination(false);
      }
      setAllAll(data?.businessAllByLocation || []);
    },
  });

  const getAllItems = useCallback(() => {
    if (selectedLocation && !noMorePagination && !isLoadingInternal.current) {
      setIsLoading(true);
      isLoadingInternal.current = true;
      allLimit.current += 200;
      getAllAll({
        variables: {
          provinceID: selectedLocation.plProvinceID,
          regionID: selectedLocation.plRegionID,
          limit: allLimit.current,
          offset: 0,
        },
      }).finally(() => {
        setIsLoading(false);
        isLoadingInternal.current = false;
      });
    } else {
      setIsLoading(false);
      isLoadingInternal.current = false;
    }
  }, [selectedLocation, noMorePagination]);

  useDetectScrollEnd(getAllItems, true);

  useEffect(() => {
    allLimit.current = 0;
    setNoMorePagination(false);
  }, [selectedLocation]);

  useEffect(() => {
    getAllItems();
  }, [getAllItems]);

  const businessTypes = useMemo(
    () => [
      BusinessType.BrandType,
      BusinessType.MailOrderType,
      BusinessType.DeliveryType,
      BusinessType.DispensaryType,
    ],
    [],
  );

  const setBusinessTypeFilterFunc = useCallback(
    (type: string) => {
      if (businessTypeFilter.includes(type as BusinessType)) {
        setBusinessTypeFilter(businessTypeFilter.filter(item => item !== type));
      } else {
        setBusinessTypeFilter([...businessTypeFilter, type]);
      }
    },
    [businessTypeFilter],
  );

  const filteredBusinesses = useMemo(
    () =>
      allAll.filter((businessItem: BusinessItemFragment) =>
        businessTypeFilter.length === 0
          ? true
          : businessTypeFilter.length > 0 && businessItem.plType
          ? businessTypeFilter.includes(businessItem.plType as BusinessType)
          : true,
      ),
    [allAll, businessTypeFilter],
  );
  return {
    allAll: filteredBusinesses,
    businessTypes,
    businessTypeFilter,
    setBusinessTypeFilter: setBusinessTypeFilterFunc,
    isLoading,
  };
};
