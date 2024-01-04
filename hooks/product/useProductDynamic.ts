import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { checkIfRegion } from '../../utils/region';
import { useProductBySlugLazyQuery } from '../../generated/graphql';

export const useProductDynamic = (props: any) => {
  const [businessData, setBusinessData] = useState<any>(
    props.businessData || null,
  );
  const [productData, setProductData] = useState<any>(
    props.productData || null,
  );
  const [isPaginatingState, setIsPaginatingState] = useState<boolean>(false);
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);

  useEffect(() => {
    setBusinessData(props.businessData);
  }, [props.businessData]);

  useEffect(() => {
    setProductData(props.productData);
  }, [props.productData]);

  const variables = useMemo(() => {
    const cityQuery = props.context?.query?.city;
    const businessQuery =
      props.context?.query?.business || props.context?.query?.province;
    const productQuery =
      props.context?.query?.product ||
      (!props.context?.query?.business ? props.context?.query?.city : '');

    if (
      businessQuery &&
      !checkIfRegion(businessQuery as string) &&
      productQuery
    ) {
      const resolvedUrlParts = props.context?.asPath.split('/');
      if (resolvedUrlParts.length > 0) {
        resolvedUrlParts.shift();
      }
      if (resolvedUrlParts.length > 0) {
        return {
          ...(props.businessLocationFilter || {}),
          ...(props.productsFilter || {}),
          productLimit: props.productLimit || 12,
          productOffset: props.productOffset || 0,
          prdSlug: productQuery as string,
          bizSlug: businessQuery as string,
          plSlugType: resolvedUrlParts[0],
          regionSlug: (cityQuery as string | undefined) || null,
        };
      }
    }
    return {
      ...(props.businessLocationFilter || {}),
      ...(props.productsFilter || {}),
      productLimit: props.productLimit || 12,
      productOffset: props.productOffset || 0,
      prdSlug: '',
      bizSlug: '',
      plSlugType: '',
      regionSlug: null,
    };
  }, [
    props.context,
    props.productsFilter,
    props.businessLocationFilter,
    props.productLimit,
    props.productOffset,
  ]);
  const prevVariables = useRef<any>(variables);

  const [getProduct, { loading }] = useProductBySlugLazyQuery({
    fetchPolicy: 'cache-and-network',
    variables,
    onCompleted: data => {
      setProductData(
        (data?.productBySlug &&
          data.productBySlug.length > 0 &&
          data.productBySlug[0]) ||
          null,
      );
      setBusinessData(data?.businessBySlug || null);
    },
  });

  useEffect(() => {
    if (
      !isEqual(variables, prevVariables.current) &&
      variables.bizSlug &&
      variables.prdSlug &&
      variables.plSlugType
    ) {
      getProduct({
        variables,
      });
      prevVariables.current = variables;
    }
  }, [variables]);

  const refresh = useCallback(() => {
    if (variables.bizSlug && variables.prdSlug && variables.plSlugType) {
      getProduct({
        variables,
      });
      prevVariables.current = variables;
    }
  }, [variables, getProduct]);

  useDeepCompareEffect(() => {
    setIsLoadingState(true);
  }, [props.productsFilterNoDebounce, props.businessLocationFilterNoDebounce]);

  useEffect(() => {
    setIsPaginatingState(true);
  }, [props.productLimit]);

  useEffect(() => {
    setIsLoadingState(loading);
    if (!loading) {
      setIsPaginatingState(false);
    }
  }, [loading]);

  return {
    isPaginating: isPaginatingState,
    isLoading: isLoadingState,
    refresh,
    businessData,
    productData,
  };
};
