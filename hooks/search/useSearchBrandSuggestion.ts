import { useEffect, useState } from 'react';
import {
  Business,
  SearchSuggestBrandsDocument,
  SearchSuggestBrandsQuery,
  SearchSuggestBrandsQueryVariables,
} from '../../generated/app';
import { apolloClient } from '../../api/client';
import { useDebounce } from '../../utils/debounce';

export const useSearchBrandSuggestion = (query: string, countryId: number) => {
  const [brands, setBrands] = useState<Business[]>([]);
  const [queryDebounce] = useDebounce(query, 1000);

  useEffect(() => {
    setBrands([]);
    if (queryDebounce.length <= 15 && queryDebounce.length >= 3) {
      apolloClient
        .query<SearchSuggestBrandsQuery, SearchSuggestBrandsQueryVariables>({
          query: SearchSuggestBrandsDocument,
          variables: {
            search: query,
            countryId: countryId,
          },
        })
        .then(brandResponse => {
          setBrands(
            (brandResponse?.data?.busProdDealSearchByName?.business ||
              []) as Business[],
          );
        });
    }
  }, [queryDebounce]);

  return {
    brands,
  };
};
