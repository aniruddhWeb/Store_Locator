import { useCallback, useEffect, useMemo, useState } from 'react';
import { checkIfRegion } from '../../utils/region';
import { useBusinessResellersBySlugLazyQuery } from '../../generated/graphql';

export const useBusinessResellersDynamic = (props: any) => {
  const [businessData, setBusinessData] = useState<any>(
    props.businessData || null,
  );

  const variables = useMemo(() => {
    const cityQuery = props.context?.query?.city;
    const businessQuery =
      props.context?.query?.business || props.context?.query?.province;
    if (businessQuery && !checkIfRegion(businessQuery as string)) {
      const resolvedUrlParts = props.context?.asPath.split('/');
      if (resolvedUrlParts.length > 0) {
        resolvedUrlParts.shift();
      }
      if (resolvedUrlParts.length > 0) {
        return {
          ...(props.businessLocationFilter || {}),
          limit: 300,
          bizSlug: businessQuery as string,
          plSlugType: resolvedUrlParts[0],
          regionSlug: (cityQuery as string | undefined) || null,
        };
      }
    }
    return {
      ...(props.businessLocationFilter || {}),
      limit: 300,
      bizSlug: '',
      plSlugType: '',
      regionSlug: null,
    };
  }, [props.context, props.businessLocationFilter]);

  const [getBusiness, { loading: isLoading }] =
    useBusinessResellersBySlugLazyQuery({
      fetchPolicy: 'cache-and-network',
      variables,
      onCompleted: data => {
        setBusinessData(data?.businessBySlug || null);
      },
    });

  useEffect(() => {
    if (variables.bizSlug && variables.plSlugType) {
      getBusiness({
        variables,
      });
    }
  }, [variables]);

  const refresh = useCallback(() => {
    if (variables.bizSlug && variables.plSlugType) {
      getBusiness({
        variables,
      });
    }
  }, [variables]);

  return {
    isLoading,
    refresh,
    businessData,
  };
};
