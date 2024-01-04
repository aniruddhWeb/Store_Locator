import { useCallback, useEffect, useMemo, useState } from 'react';
import { checkIfRegion } from '../../utils/region';
import { useProductResellersBySlugLazyQuery } from '../../generated/graphql';

export const useProductResellersDynamic = (props: any) => {
  const [businessData, setBusinessData] = useState<any>(
    props.businessData || null,
  );
  const [productData, setProductData] = useState<any>(
    props.productData || null,
  );

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
          limit: 300,
          prdSlug: productQuery as string,
          bizSlug: businessQuery as string,
          plSlugType: resolvedUrlParts[0],
          regionSlug: (cityQuery as string | undefined) || null,
        };
      }
    }
    return {
      limit: 300,
      prdSlug: '',
      bizSlug: '',
      plSlugType: '',
      regionSlug: null,
    };
  }, [props.context]);

  const [getProduct, { loading: isLoading }] =
    useProductResellersBySlugLazyQuery({
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
    if (variables.bizSlug && variables.prdSlug && variables.plSlugType) {
      getProduct({
        variables,
      });
    }
  }, [variables]);

  const refresh = useCallback(() => {
    if (variables.bizSlug && variables.prdSlug && variables.plSlugType) {
      getProduct({
        variables,
      });
    }
  }, [variables, getProduct]);

  return {
    isLoading,
    refresh,
    businessData,
    productData,
  };
};
