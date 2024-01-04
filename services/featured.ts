import { useEffect, useRef, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import isEqual from 'lodash/isEqual';
import {
  FeaturedPageDataDocument,
  FeaturedPageDataQuery,
  FeaturedPageDataQueryVariables,
  LocationItemFragment,
  useBusinessFeaturedBrandsLazyQuery,
  useBusinessFeaturedDeliveriesLazyQuery,
  useBusinessFeaturedDispensaryLazyQuery,
  useBusinessFeaturedMailLazyQuery,
} from '../generated/graphql';
import { getApolloClient } from '../api/client';
import {
  useCurrentLocationStatic,
  useCurrentLocationDynamic,
} from './location';

export const useFeaturedStatic = async (context: GetServerSidePropsContext) => {
  const { currentLocation, selectedLocation } = await useCurrentLocationStatic(
    context,
  );

  const { data: featuredPageData } = await getApolloClient(context).query<
    FeaturedPageDataQuery,
    FeaturedPageDataQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: FeaturedPageDataDocument,
    variables: {
      provinceId: (currentLocation || selectedLocation).plProvinceID,
      regionID: (currentLocation || selectedLocation).plRegionID,
      offset: 0,
      limit: 6,
    },
  });

  return {
    featuredBrands: featuredPageData?.businessFeaturedBrands || [],
    featuredMails: featuredPageData?.businessFeaturedMail || [],
    featuredDeliveries: featuredPageData?.businessFeaturedDeliveries || [],
    featuredDispensaries: featuredPageData?.businessFeaturedDispensary || [],
  };
};

export const useFeaturedDynamic = (props: any) => {
  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [featuredBrands, setFeaturedBrands] = useState<any[]>(
    props.featuredBrands || [],
  );
  const [featuredDispensaries, setFeaturedDispensaries] = useState<any[]>(
    props.featuredDispensaries || [],
  );
  const [featuredDeliveries, setFeaturedDeliveries] = useState<any[]>(
    props.featuredDeliveries || [],
  );
  const [featuredMails, setFeaturedMails] = useState<any[]>(
    props.featuredMails || [],
  );

  const [getBrands] = useBusinessFeaturedBrandsLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setFeaturedBrands(data?.businessFeaturedBrands || []);
    },
  });

  const [getMails] = useBusinessFeaturedMailLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setFeaturedMails(data?.businessFeaturedMail || []);
    },
  });

  const [getDeliveries] = useBusinessFeaturedDeliveriesLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setFeaturedDeliveries(data?.businessFeaturedDeliveries || []);
    },
  });

  const [getDispensary] = useBusinessFeaturedDispensaryLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setFeaturedDispensaries(data?.businessFeaturedDispensary || []);
    },
  });

  useEffect(() => {
    if (
      !isEqual(location?.plProvinceID, prevLocation.current?.plProvinceID) &&
      location
    ) {
      getBrands({
        variables: {
          linkProvinceID: location.plProvinceID,
          limit: 15,
          offset: 0,
        },
      });
      getMails({
        variables: {
          linkProvinceID: location.plProvinceID,
          limit: 15,
          offset: 0,
        },
      });
      getDeliveries({
        variables: {
          linkProvinceID: location.plProvinceID,
          plRegionID: location.plRegionID,
          limit: 15,
          offset: 0,
        },
      });
      getDispensary({
        variables: {
          linkProvinceID: location.plProvinceID,
          plRegionID: location.plRegionID,
          limit: 15,
          offset: 0,
        },
      });
      prevLocation.current = location;
    }
  }, [location]);

  return {
    featuredBrands,
    featuredDeliveries,
    featuredMails,
    featuredDispensaries,
  };
};
