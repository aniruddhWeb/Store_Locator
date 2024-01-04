import { useEffect, useState } from 'react';
import {
  ProductType,
  ProductTypeStrainNameSearchDocument,
  ProductTypeStrainNameSearchQuery,
  ProductTypeStrainNameSearchQueryVariables,
} from '../../generated/app';
import { apolloClient } from '../../api/client';

export const useStrainNameSearch = (strainName: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [strainNames, setStrainNames] = useState<ProductType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    apolloClient
      .query<
        ProductTypeStrainNameSearchQuery,
        ProductTypeStrainNameSearchQueryVariables
      >({
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
        query: ProductTypeStrainNameSearchDocument,
        variables: {
          strainName,
        },
      })
      .then(resp => {
        setStrainNames((resp?.data?.strainNameSearch || []) as ProductType[]);
      })
      .finally(() => setIsLoading(false));
  }, [strainName]);

  return {
    strainNames,
    isLoading,
  };
};
