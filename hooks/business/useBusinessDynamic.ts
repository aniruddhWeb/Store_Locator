import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { checkIfRegion } from '../../utils/region';
import {
  useAnalyticsSaveSearchMutation,
  useBusinessBySlugLazyQuery,
} from '../../generated/graphql';

const getInitialVariables = (props: any, variables: any) =>
  !props.productsFilter || Object.keys(props.productsFilter || {}).length === 0
    ? variables
    : null;

export const useBusinessDynamic = (props: any) => {
  const [businessData, setBusinessData] = useState<any>(
    props.businessData || null,
  );
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);

  useEffect(() => {
    setBusinessData(props.businessData);
  }, [props.businessData]);

  const variables = useMemo(() => {
    const cityQuery = props.context?.query?.city;
    const businessQuery =
      props.context?.query?.business || props.context?.query?.province;
    if (businessQuery && !checkIfRegion(businessQuery as string)) {
      const resolvedUrlParts = props.context?.asPath.split('/');
      if (resolvedUrlParts.length > 0) {
        resolvedUrlParts.shift();
      }
      if (resolvedUrlParts.length > 0) {
        return {
          ...(props.productsFilter || {}),
          productLimit: props.productLimit || 12,
          resellersLimit: props.resellersLimit || 300,
          brandsLimit: props.brandsLimit || 12,
          productOffset: props.productOffset || 0,
          ...(props.businessLocationFilter || {}),
          bizSlug: businessQuery as string,
          plSlugType: resolvedUrlParts[0],
          regionSlug: (cityQuery as string | undefined) || null,
        };
      }
    }
    return {
      ...(props.productsFilter || {}),
      productLimit: props.productLimit || 12,
      resellersLimit: props.resellersLimit || 300,
      brandsLimit: props.brandsLimit || 12,
      productOffset: props.productOffset || 0,
      ...(props.businessLocationFilter || {}),
      bizSlug: '',
      plSlugType: '',
      regionSlug: null,
    };
  }, [
    props.context,
    props.productsFilter,
    props.businessLocationFilter,
    props.productLimit,
    props.resellersLimit,
    props.brandsLimit,
    props.productOffset,
  ]);
  const prevVariables = useRef<any>(getInitialVariables(props, variables));
  const [productsLimitPaginating, setProductsLimitPaginating] = useState(false);
  const [resellersLimitPaginating, setResellersLimitPaginating] =
    useState(false);
  const [brandsLimitPaginating, setBrandsLimitPaginating] = useState(false);

  const updatePaginations = useCallback(() => {
    if (variables.productLimit !== prevVariables.current?.productLimit) {
      setProductsLimitPaginating(true);
      return;
    }

    if (variables.resellersLimit !== prevVariables.current?.resellersLimit) {
      setResellersLimitPaginating(true);
      return;
    }

    if (variables.brandsLimit !== prevVariables.current?.brandsLimit) {
      setBrandsLimitPaginating(true);
    }
  }, [variables]);

  const [getBusiness, { loading }] = useBusinessBySlugLazyQuery({
    fetchPolicy: 'cache-and-network',
    variables,
    onCompleted: data => {
      setBusinessData(data?.businessBySlug || null);
    },
  });

  const [saveSearchAnalytics] = useAnalyticsSaveSearchMutation({
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  });

  useEffect(() => {
    updatePaginations();
    if (
      !isEqual(variables, prevVariables.current) &&
      variables.bizSlug &&
      variables.plSlugType
    ) {
      getBusiness({
        variables,
      });
      if (
        variables?.search &&
        prevVariables.current?.search !== variables?.search
      ) {
        saveSearchAnalytics({
          variables: {
            input: {
              searchWords: variables?.search,
              tag: 'business-page',
            },
          },
        });
      }
      prevVariables.current = variables;
    }
  }, [variables, updatePaginations]);

  const refresh = useCallback(() => {
    if (variables.bizSlug && variables.plSlugType) {
      getBusiness({
        variables,
      });
      prevVariables.current = variables;
    }
  }, [variables]);

  useDeepCompareEffect(() => {
    setIsLoadingState(true);
  }, [props.productsFilterNoDebounce, props.businessLocationFilterNoDebounce]);

  useEffect(() => {
    setIsLoadingState(loading);
    if (!loading) {
      setProductsLimitPaginating(false);
      setResellersLimitPaginating(false);
      setBrandsLimitPaginating(false);
    }
  }, [loading]);

  return {
    productsLimitPaginating,
    resellersLimitPaginating,
    brandsLimitPaginating,
    isLoading: isLoadingState,
    refresh,
    businessData,
  };
};
