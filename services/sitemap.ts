import { apolloClient } from '../api/client';
import {
  LocationListProvinceForSiteMapDocument,
  LocationListProvinceForSiteMapQuery,
  LocationListProvinceForSiteMapQueryVariables,
  LocationListRegionByProvinceForSiteMapDocument,
  LocationListRegionByProvinceForSiteMapQuery,
  LocationListRegionByProvinceForSiteMapQueryVariables,
  SiteMapDocument,
  SiteMapQuery,
  SiteMapQueryVariables,
} from '../generated/graphql';

export const useSiteMapStatic = async () => {
  let regionsByProvinces: any[] = [];

  const { data: siteMapProvinceData } = await apolloClient.query<
    LocationListProvinceForSiteMapQuery,
    LocationListProvinceForSiteMapQueryVariables
  >({
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    query: LocationListProvinceForSiteMapDocument,
  });

  if ((siteMapProvinceData?.locationListProvinceForSiteMap || []).length > 0) {
    regionsByProvinces = await Promise.all(
      (siteMapProvinceData?.locationListProvinceForSiteMap || []).map(
        province => {
          return new Promise(resolve => {
            if (!province) {
              resolve({
                province: '',
                regions: [],
              });
            } else {
              apolloClient
                .query<
                  LocationListRegionByProvinceForSiteMapQuery,
                  LocationListRegionByProvinceForSiteMapQueryVariables
                >({
                  fetchPolicy: 'cache-first',
                  errorPolicy: 'all',
                  query: LocationListRegionByProvinceForSiteMapDocument,
                  variables: {
                    provinceId: province.plProvinceID,
                  },
                })
                .then(({ data: siteMapRegionData }) => {
                  resolve({
                    province: province.plInitials as string,
                    regions:
                      siteMapRegionData?.locationListRegionByProvinceForSiteMap ||
                      [],
                  });
                })
                .catch(() =>
                  resolve({
                    province: province.plInitials as string,
                    regions: [],
                  }),
                );
            }
          });
        },
      ),
    );
    regionsByProvinces = regionsByProvinces
      .filter((item: any) => !!item.province && item.regions.length > 0)
      .map((item: any) => ({
        province: item.province,
        city: (item.regions || []).map((subItem: any) => ({
          name: subItem.plName,
          slug: subItem.plSlug,
        })),
      }));
  }

  const { data: siteMapData } = await apolloClient.query<
    SiteMapQuery,
    SiteMapQueryVariables
  >({
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    query: SiteMapDocument,
  });

  const weedDeliveryRegions = regionsByProvinces.map((object: any) => ({
    ...object,
    city: (object.city || []).map((subObject: any) => ({ ...subObject })),
  }));
  const ontarioIndex = weedDeliveryRegions.findIndex(
    (item: any) => item.province?.toUpperCase() === 'ON',
  );
  if (ontarioIndex > -1) {
    const torontoIndex = (
      weedDeliveryRegions[ontarioIndex].city || []
    ).findIndex(
      (cityItem: any) =>
        cityItem.slug === 'toronto-west' || cityItem.slug === 'toronto-east',
    );
    if (torontoIndex > -1) {
      weedDeliveryRegions[ontarioIndex].city.splice(torontoIndex, 0, {
        name: 'Toronto',
        slug: 'toronto',
      });
    }
  }

  return {
    brands: (siteMapData?.siteMapTop5?.brands || []) as any[],
    mail_order_marijuana: (siteMapData?.siteMapTop5?.mail_order_marijuana ||
      []) as any[],
    marijuana_dispensary: regionsByProvinces as any[],
    weed_delivery: weedDeliveryRegions as any[],
  };
};
