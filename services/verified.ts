import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import {
  BusinessAllVerifiedQuery,
  BusinessAllVerifiedQueryVariables,
  BusinessAllVerifiedDocument,
  useBusinessAllVerifiedLazyQuery,
  BusinessItemFragment,
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

export const useVerifiedAllStatic = async (
  context: GetServerSidePropsContext,
) => {
  const { selectedLocation } = await useCurrentLocationStatic(context);

  const { data: verifiedPageData } = await getApolloClient(context).query<
    BusinessAllVerifiedQuery,
    BusinessAllVerifiedQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: BusinessAllVerifiedDocument,
    variables: {
      provinceID: selectedLocation.plProvinceID,
      regionID: selectedLocation.plRegionID,
      offset: 0,
      limit: 12,
    },
  });

  return verifiedPageData?.businessAllVerified || [];
};

export const useVerifiedAllDynamic = (verifiedAllProps?: any[]) => {
  const { selectedLocation } = useCurrentLocationDynamic();

  const [verifiedAll, setVerifiedAll] = useState<any[]>(verifiedAllProps || []);
  const [businessTypeFilter, setBusinessTypeFilter] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLoadingInternal = useRef<boolean>(false);
  const [noMorePagination, setNoMorePagination] = useState<boolean>(
    (verifiedAllProps?.length || 0) < 12,
  );
  const verifiedLimit = useRef<number>(verifiedAll.length);

  const [getVerifiedAll] = useBusinessAllVerifiedLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      if ((data?.businessAllVerified || []).length < verifiedLimit.current) {
        setNoMorePagination(true);
      } else {
        setNoMorePagination(false);
      }
      setVerifiedAll(data?.businessAllVerified || []);
    },
  });

  const getVerifiedItems = useCallback(() => {
    if (selectedLocation && !noMorePagination && !isLoadingInternal.current) {
      setIsLoading(true);
      isLoadingInternal.current = true;
      verifiedLimit.current += 30;
      getVerifiedAll({
        variables: {
          provinceID: selectedLocation.plProvinceID,
          regionID: selectedLocation.plRegionID,
          limit: verifiedLimit.current,
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

  useDetectScrollEnd(getVerifiedItems, true);

  useEffect(() => {
    verifiedLimit.current = 0;
    setNoMorePagination(false);
  }, [selectedLocation]);

  useEffect(() => {
    getVerifiedItems();
  }, [getVerifiedItems]);

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
      verifiedAll.filter((businessItem: BusinessItemFragment) =>
        businessTypeFilter.length === 0
          ? true
          : businessTypeFilter.length > 0 && businessItem.plType
          ? businessTypeFilter.includes(businessItem.plType as BusinessType)
          : true,
      ),
    [verifiedAll, businessTypeFilter],
  );
  return {
    verifiedAll: filteredBusinesses,
    businessTypes,
    businessTypeFilter,
    setBusinessTypeFilter: setBusinessTypeFilterFunc,
    isLoading,
  };
};
