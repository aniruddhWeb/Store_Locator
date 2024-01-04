import { getContentfulClient } from '../api/client';

import {
  ServiceGroupsDocument,
  ServiceGroupsQuery,
  ServiceGroupsQueryVariables,
  ServicesDocument,
  ServicesQuery,
  ServicesQueryVariables,
} from '../generated/contentful';

export const useServicesStatic = async () => {
  let serviceGroups: any[] = [];

  const { data: serviceGroupsData } = await getContentfulClient().query<
    ServiceGroupsQuery,
    ServiceGroupsQueryVariables
  >({
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
    query: ServiceGroupsDocument,
  });

  if ((serviceGroupsData?.serviceGroupCollection?.items || []).length > 0) {
    serviceGroups = await Promise.all(
      (serviceGroupsData?.serviceGroupCollection?.items || []).map(
        serviceGroupItem => {
          return new Promise(resolve => {
            if (!serviceGroupItem) {
              resolve({
                title: '',
                services: [],
              });
            } else {
              getContentfulClient()
                .query<ServicesQuery, ServicesQueryVariables>({
                  fetchPolicy: 'no-cache',
                  errorPolicy: 'all',
                  query: ServicesDocument,
                  variables: {
                    where: {
                      sys: {
                        id_in: (
                          serviceGroupItem?.servicesCollection?.items || []
                        ).map(item => item?.sys?.id || ''),
                      },
                    },
                  },
                })
                .then(({ data: servicesData }) => {
                  resolve({
                    title: serviceGroupItem?.title || '',
                    services: servicesData?.serviceCollection?.items || [],
                  });
                })
                .catch(() =>
                  resolve({
                    title: serviceGroupItem?.title || '',
                    services: [],
                  }),
                );
            }
          });
        },
      ),
    );
    serviceGroups = serviceGroups.filter(
      (item: any) => !!item.title && item.services.length > 0,
    );
  }

  return {
    serviceGroups,
  };
};
