import { GetServerSidePropsContext } from 'next';
import { getContentfulClient } from '../../api/client';

import {
  ProductTypeHeadersDocument,
  ProductTypeHeadersQuery,
  ProductTypeHeadersQueryVariables,
} from '../../generated/contentful';

export const useProductsAllStatic = async (
  context: GetServerSidePropsContext,
) => {
  const productTypeQuery = context?.query?.types;

  const productTypes = productTypeQuery
    ? Array.isArray(productTypeQuery)
      ? productTypeQuery
      : [productTypeQuery]
    : null;

  if (productTypes && productTypes.length > 0) {
    const { data: categoryHeaderData } = await getContentfulClient().query<
      ProductTypeHeadersQuery,
      ProductTypeHeadersQueryVariables
    >({
      fetchPolicy: 'cache-first',
      query: ProductTypeHeadersDocument,
    });

    return {
      productHeaderContents:
        categoryHeaderData?.productHeaderCollection?.items || [],
    };
  }

  return {
    productHeaderContents: [],
  };
};
