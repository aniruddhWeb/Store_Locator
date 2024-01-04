import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  ProductTypeNameBySlugDocument,
  ProductTypeNameBySlugQuery,
  ProductTypeNameBySlugQueryVariables,
} from '../../generated/graphql';
import { apolloClient } from '../../api/client';

export const useWithProductCategories = (
  productCategoryHeaderContents?: any[],
) => {
  const router = useRouter();

  const productTypes = useMemo(() => {
    const productTypeQuery = router?.query?.types;
    return productTypeQuery
      ? Array.isArray(productTypeQuery)
        ? productTypeQuery
        : [productTypeQuery]
      : null;
  }, [router.query?.types]);

  const productTypeSlug = useMemo(() => {
    if ((productTypes || []).length > 0) {
      return productTypes![0];
    }
    return null;
  }, [productTypes]);

  const productHeader = useMemo(() => {
    if (
      (productCategoryHeaderContents || []).length > 0 &&
      (productTypes || []).length > 0
    ) {
      return (
        (productCategoryHeaderContents || []).find(
          item => item?.type?.toLowerCase() === productTypes![0].toLowerCase(),
        ) || null
      );
    }
    return null;
  }, [productCategoryHeaderContents, productTypes]);

  const [productTypeName, setProductTypeName] = useState<string | null>(null);
  useEffect(() => {
    if ((productTypes || []).length > 0) {
      apolloClient
        .query<ProductTypeNameBySlugQuery, ProductTypeNameBySlugQueryVariables>(
          {
            fetchPolicy: 'cache-first',
            errorPolicy: 'all',
            query: ProductTypeNameBySlugDocument,
            variables: {
              prdTypeSlug: productTypes![0],
            },
          },
        )
        .then(({ data: productTypeNameData }) => {
          if (productTypeNameData?.productTypeBySlug) {
            setProductTypeName(productTypeNameData?.productTypeBySlug);
          }
        });
    }
  }, [productTypes]);

  return {
    productHeader,
    productTypeName,
    productTypeSlug,
  };
};
