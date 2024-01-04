import { GetServerSidePropsContext } from 'next';
import { checkIfRegion } from '../../utils/region';
import { getApolloClient } from '../../api/client';
import {
  ProductBySlugDocument,
  ProductBySlugQuery,
  ProductBySlugQueryVariables,
} from '../../generated/graphql';

export const useProductStatic = async (context: GetServerSidePropsContext) => {
  const cityQuery = context?.query?.city;
  const businessQuery = context?.query?.business || context?.query?.province;
  const productQuery =
    context?.query?.product ||
    (!context?.query?.business ? context?.query?.city : '');

  if (
    businessQuery &&
    !checkIfRegion(businessQuery as string) &&
    productQuery
  ) {
    const resolvedUrlParts = context.resolvedUrl.split('/');
    if (resolvedUrlParts.length > 0) {
      resolvedUrlParts.shift();
    }
    if (resolvedUrlParts.length > 0) {
      const { data: productBySlugData } = await getApolloClient(context).query<
        ProductBySlugQuery,
        ProductBySlugQueryVariables
      >({
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
        query: ProductBySlugDocument,
        variables: {
          productLimit: 12,
          productOffset: 0,
          prdSlug: productQuery as string,
          bizSlug: businessQuery as string,
          plSlugType: resolvedUrlParts[0],
          regionSlug: (cityQuery as string | undefined) || null,
        },
      });

      return {
        product:
          (productBySlugData?.productBySlug &&
            productBySlugData.productBySlug.length > 0 &&
            productBySlugData.productBySlug[0]) ||
          null,
        business: productBySlugData?.businessBySlug || null,
      };
    }
  }
  return {
    product: null,
    business: null,
  };
};
