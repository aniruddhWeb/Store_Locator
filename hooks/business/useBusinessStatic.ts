import { GetServerSidePropsContext } from 'next';
import { checkIfRegion } from '../../utils/region';
import { getApolloClient } from '../../api/client';
import {
  BusinessBySlugDocument,
  BusinessBySlugQuery,
  BusinessBySlugQueryVariables,
} from '../../generated/graphql';
import {
  getUserClientIp,
  useCurrentLocationStatic,
} from '../../services/location';

export const useBusinessStatic = async (context: GetServerSidePropsContext) => {
  const cityQuery = context?.query?.city;
  const businessQuery = context?.query?.business || context?.query?.province;
  const { selectedLocation } = await useCurrentLocationStatic(context);
  const clientIp = getUserClientIp(context);
  if (businessQuery && !checkIfRegion(businessQuery as string)) {
    const resolvedUrlParts = context.resolvedUrl.split('/');
    if (resolvedUrlParts.length > 0) {
      resolvedUrlParts.shift();
    }
    if (resolvedUrlParts.length > 0) {
      const { data: businessBySlugData } = await getApolloClient(context).query<
        BusinessBySlugQuery,
        BusinessBySlugQueryVariables
      >({
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
        query: BusinessBySlugDocument,
        variables: {
          productLimit: 12,
          productOffset: 0,
          bizSlug: businessQuery as string,
          plSlugType: resolvedUrlParts[0],
          regionSlug: (cityQuery as string | undefined) || null,
          filterByLocation: true,
          regionID: selectedLocation?.plRegionID || null,
          clientIp: clientIp || null,
        },
      });
      return businessBySlugData?.businessBySlug || null;
    }
  }
  return null;
};
