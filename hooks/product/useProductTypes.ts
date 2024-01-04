import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  ProductType,
  ProductTypeItemsDocument,
  ProductTypeItemsQuery,
  ProductTypeItemsQueryVariables,
} from '../../generated/graphql';
import { apolloClient } from '../../api/client';

export const useProductTypes = (
  brandFilter: boolean = false,
  strainNameFilter: boolean = false,
) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ProductType[]>([]);

  const productTypesArray = useMemo(() => {
    const productTypeQuery = router?.query?.types;
    return productTypeQuery
      ? Array.isArray(productTypeQuery)
        ? productTypeQuery
        : [productTypeQuery]
      : null;
  }, [router.query?.types]);

  const productTypeSlug = useMemo(() => {
    if ((productTypesArray || []).length > 0) {
      return productTypesArray![0];
    }
    return null;
  }, [productTypesArray]);

  useEffect(() => {
    setIsLoading(true);
    apolloClient
      .query<ProductTypeItemsQuery, ProductTypeItemsQueryVariables>({
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
        query: ProductTypeItemsDocument,
        variables: {
          brandFilter,
          strainNameFilter,
        },
      })
      .then(resp => {
        setCategories(
          (resp?.data?.productListTypes?.productTypes || []) as ProductType[],
        );
      })
      .finally(() => setIsLoading(false));
  }, [brandFilter, strainNameFilter]);

  const productTypes = useMemo(() => {
    if (productTypeSlug) {
      return (categories || []).filter(item => item?.slug === productTypeSlug);
    }
    return categories || [];
  }, [productTypeSlug, categories]);

  return {
    productTypes,
    isLoading,
  };
};
