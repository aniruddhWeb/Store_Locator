import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { checkIfRegion } from '../../utils/region';
import {
  useAnalyticsSaveSearchMutation,
  useBusinessProductsBySlugLazyQuery,
} from '../../generated/graphql';

const getInitialData = (props: any) =>
  !props.productsFilter || Object.keys(props.productsFilter || {}).length === 0
    ? props.businessData || null
    : props.businessData
    ? {
        ...props.businessData,
        products: [],
      }
    : null;

export const useBusinessProductsDynamic = (props: any) => {
  const [businessData, setBusinessData] = useState<any>(getInitialData(props));
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);

  const variables = useMemo(() => {
    if (
      props.onlyWhenFilterExists &&
      (!props.productsFilter ||
        Object.keys(props.productsFilter || {}).length === 0)
    ) {
      return {};
    }
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
          limit: 350,
          bizSlug: businessQuery as string,
          plSlugType: resolvedUrlParts[0],
          regionSlug: (cityQuery as string | undefined) || null,
        };
      }
    }

    return {
      ...(props.productsFilter || {}),
      limit: 350,
      bizSlug: '',
      plSlugType: '',
      regionSlug: null,
    };
  }, [props.context, props.productsFilter]);
  const prevVariables = useRef<any>(variables);

  const [getBusiness, { loading }] = useBusinessProductsBySlugLazyQuery({
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
    if (variables.bizSlug && variables.plSlugType) {
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
  }, [variables]);

  const refresh = useCallback(() => {
    if (variables.bizSlug && variables.plSlugType) {
      getBusiness({
        variables,
      });
    }
  }, [variables]);

  useDeepCompareEffect(() => {
    setIsLoadingState(true);
  }, [props.productsFilterNoDebounce]);

  useEffect(() => {
    setIsLoadingState(loading);
  }, [loading]);

  return {
    isLoading: isLoadingState,
    refresh,
    businessData,
  };
};
