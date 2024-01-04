import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { useBusinessPagination } from './useBusinessPaginasion';
import {
  BusinessItemFragment,
  useBusinessNearByLazyQuery,
} from '../../generated/graphql';

export const useNearbyBusiness = (enabled: boolean, props: any) => {
  const { setNextBusinessLimit, businessLimit } = useBusinessPagination();

  const [nearbyBusiness, setNearbyBusiness] = useState<BusinessItemFragment[]>(
    props.nearby || [],
  );
  const [isPaginating, setIsPaginating] = useState<boolean>(false);

  useEffect(() => {
    setNearbyBusiness(props.nearby || []);
  }, [props.nearby]);

  const variables = useMemo(() => {
    return {
      offset: 0,
      limit: businessLimit || 24,
      plRegionID: props.location?.plRegionID,
      countryId: props.location?.province?.country?.plCountryID,
      plType: props.businessType || null,
    };
  }, [props.location, props.businessType, businessLimit]);
  const prevVariables = useRef<any>(variables);

  const [getBusinessNearby, { loading }] = useBusinessNearByLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setNearbyBusiness((data?.businessNearBy || []) as BusinessItemFragment[]);
    },
  });

  useEffect(() => {
    if (
      enabled &&
      !isEqual(variables, prevVariables.current) &&
      variables.plRegionID &&
      variables.countryId
    ) {
      getBusinessNearby({
        variables,
      });
      prevVariables.current = variables;
    }
  }, [enabled, variables]);

  const refresh = useCallback(() => {
    if (enabled && variables.plRegionID && variables.countryId) {
      getBusinessNearby({
        variables,
      });
    }
    prevVariables.current = variables;
  }, [enabled, variables]);

  useEffect(() => {
    setIsPaginating(true);
  }, [businessLimit]);

  useEffect(() => {
    if (!loading) {
      setIsPaginating(false);
    }
  }, [loading]);

  const onNextPage = useCallback(() => {
    setNextBusinessLimit((nearbyBusiness || []).length + 24);
  }, [(nearbyBusiness || []).length, setNextBusinessLimit]);

  return {
    isPaginating,
    onNextPage,
    refresh,
    nearbyBusiness,
    location: props.location || null,
  };
};
