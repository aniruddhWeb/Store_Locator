import { useEffect, useMemo, useRef, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import isEqual from 'lodash/isEqual';
import { useRouter } from 'next/router';
import {
  BusinessFeaturedDeliveriesDocument,
  BusinessFeaturedDeliveriesQuery,
  BusinessFeaturedDeliveriesQueryVariables,
  BusinessVerifiedDeliveriesDocument,
  BusinessVerifiedDeliveriesQuery,
  BusinessVerifiedDeliveriesQueryVariables,
  useBusinessFeaturedDeliveriesLazyQuery,
  useBusinessVerifiedDeliveriesLazyQuery,
  BusinessAllDeliveriesQuery,
  BusinessAllDeliveriesQueryVariables,
  BusinessAllDeliveriesDocument,
  useBusinessAllDeliveriesLazyQuery,
  BusinessMonthlyTopPicksDeliveriesQuery,
  BusinessMonthlyTopPicksDeliveriesQueryVariables,
  BusinessMonthlyTopPicksDeliveriesDocument,
  useBusinessMonthlyTopPicksDeliveriesLazyQuery,
  LocationItemFragment,
  BusinessNearByQuery,
  BusinessNearByQueryVariables,
  BusinessNearByDocument,
} from '../generated/graphql';
import { getApolloClient } from '../api/client';
import {
  useCurrentLocationStatic,
  useCurrentLocationDynamic,
} from './location';
import { useNearbyBusiness } from '../hooks/business/useNearbyBusiness';

export const useDeliveriesStatic = async (
  context: GetServerSidePropsContext,
  disableRegion?: boolean,
) => {
  const { currentLocation, selectedLocation } = await useCurrentLocationStatic(
    context,
  );

  let topPicks: any = null;
  if (
    (context?.query?.province || context?.query?.city) &&
    (currentLocation || selectedLocation).plRegionID
  ) {
    const { data } = await getApolloClient(context).query<
      BusinessMonthlyTopPicksDeliveriesQuery,
      BusinessMonthlyTopPicksDeliveriesQueryVariables
    >({
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      query: BusinessMonthlyTopPicksDeliveriesDocument,
      variables: {
        plRegionID: (currentLocation || selectedLocation).plRegionID,
        offset: 0,
        limit: 50,
      },
    });
    topPicks = data;
  }

  const { data: featuredData } = await getApolloClient(context).query<
    BusinessFeaturedDeliveriesQuery,
    BusinessFeaturedDeliveriesQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: BusinessFeaturedDeliveriesDocument,
    variables: {
      plCountryID:
        !context?.query?.province && !context?.query?.city
          ? selectedLocation?.province?.country?.plCountryID
          : null,
      linkProvinceID: (currentLocation || selectedLocation).plProvinceID,
      plRegionID: disableRegion
        ? null
        : (currentLocation || selectedLocation).plRegionID,
      offset: 0,
      limit: 24,
    },
  });

  const { data: verifiedData } = await getApolloClient(context).query<
    BusinessVerifiedDeliveriesQuery,
    BusinessVerifiedDeliveriesQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: BusinessVerifiedDeliveriesDocument,
    variables: {
      plCountryID:
        !context?.query?.province && !context?.query?.city
          ? selectedLocation?.province?.country?.plCountryID
          : null,
      linkProvinceID: (currentLocation || selectedLocation).plProvinceID,
      plRegionID: disableRegion
        ? null
        : (currentLocation || selectedLocation).plRegionID,
      offset: 0,
      limit: 50,
    },
  });

  const { data: allData } = await getApolloClient(context).query<
    BusinessAllDeliveriesQuery,
    BusinessAllDeliveriesQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: BusinessAllDeliveriesDocument,
    variables: {
      plCountryID:
        !context?.query?.province && !context?.query?.city
          ? selectedLocation?.province?.country?.plCountryID
          : null,
      linkProvinceID: (currentLocation || selectedLocation).plProvinceID,
      plRegionID: disableRegion
        ? null
        : (currentLocation || selectedLocation).plRegionID,
      offset: 0,
      limit: 50,
    },
  });

  let nearByData: any = null;
  if (
    (context?.query?.province || context?.query?.city) &&
    (currentLocation || selectedLocation).plRegionID
  ) {
    const { data } = await getApolloClient(context).query<
      BusinessNearByQuery,
      BusinessNearByQueryVariables
    >({
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      query: BusinessNearByDocument,
      variables: {
        plType: 'Delivery',
        countryId: (currentLocation || selectedLocation).province?.country
          ?.plCountryID,
        plRegionID: (currentLocation || selectedLocation).plRegionID,
        offset: 0,
        limit: 24,
      },
    });
    nearByData = data;
  }

  return {
    monthlyTopPicks: topPicks?.businessMonthlyTopPicksDeliveries || [],
    featured: featuredData?.businessFeaturedDeliveries || [],
    verified: verifiedData?.businessVerifiedDeliveries || [],
    all: allData?.businessAllDeliveries || [],
    nearby: nearByData?.businessNearBy || [],
  };
};

export const useDeliveriesDynamic = (props: any, disableRegion?: boolean) => {
  const router = useRouter();

  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const prevSelectLocation = useRef<LocationItemFragment | null>(
    selectedLocation,
  );
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [topPicks, setTopPicks] = useState<any[]>(props.monthlyTopPicks || []);
  const [featuredDeliveries, setFeaturedDeliveries] = useState<any[]>(
    props.featured || [],
  );
  const [verifiedDeliveries, setVerifiedDeliveries] = useState<any[]>(
    props.verified || [],
  );
  const [allDeliveries, setAllDeliveries] = useState<any[]>(props.all || []);

  useEffect(() => {
    setAllDeliveries(props.all || []);
  }, [props.all]);

  useEffect(() => {
    setVerifiedDeliveries(props.verified || []);
  }, [props.verified]);

  useEffect(() => {
    setFeaturedDeliveries(props.featured || []);
  }, [props.featured]);

  useEffect(() => {
    setTopPicks(props.monthlyTopPicks || []);
  }, [props.monthlyTopPicks]);

  const [getTopPicks] = useBusinessMonthlyTopPicksDeliveriesLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setTopPicks(data?.businessMonthlyTopPicksDeliveries || []);
    },
  });

  const [getFeaturedDeliveries] = useBusinessFeaturedDeliveriesLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setFeaturedDeliveries(data?.businessFeaturedDeliveries || []);
    },
  });

  const [getVerifiedDeliveries] = useBusinessVerifiedDeliveriesLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setVerifiedDeliveries(data?.businessVerifiedDeliveries || []);
    },
  });

  const [getAllDeliveries] = useBusinessAllDeliveriesLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setAllDeliveries(data?.businessAllDeliveries || []);
    },
  });

  useEffect(() => {
    if (
      (!isEqual(
        selectedLocation?.plRegionID,
        prevSelectLocation.current?.plRegionID,
      ) ||
        !isEqual(location?.plRegionID, prevLocation.current?.plRegionID)) &&
      (selectedLocation || location)
    ) {
      if (
        (router?.query?.province || router?.query?.city) &&
        (selectedLocation?.plRegionID || location?.plRegionID)
      ) {
        getTopPicks({
          variables: {
            plRegionID: (selectedLocation?.plRegionID ||
              location?.plRegionID) as number,
            limit: 50,
            offset: 0,
          },
        });
      }
      prevSelectLocation.current = selectedLocation;
    }
    if (
      !isEqual(location?.plRegionID, prevLocation.current?.plRegionID) &&
      location
    ) {
      getFeaturedDeliveries({
        variables: {
          plCountryID:
            !router?.query?.province && !router?.query?.city
              ? location?.province?.country?.plCountryID
              : null,
          linkProvinceID: location.plProvinceID,
          plRegionID: disableRegion ? null : location.plRegionID,
          limit: 15,
          offset: 0,
        },
      });
      getVerifiedDeliveries({
        variables: {
          plCountryID:
            !router?.query?.province && !router?.query?.city
              ? location?.province?.country?.plCountryID
              : null,
          linkProvinceID: location.plProvinceID,
          plRegionID: disableRegion ? null : location.plRegionID,
          limit: 50,
          offset: 0,
        },
      });
      getAllDeliveries({
        variables: {
          plCountryID:
            !router?.query?.province && !router?.query?.city
              ? location?.province?.country?.plCountryID
              : null,
          linkProvinceID: location.plProvinceID,
          plRegionID: disableRegion ? null : location.plRegionID,
          limit: 50,
          offset: 0,
        },
      });
      prevLocation.current = location;
    }
  }, [location, router.query, disableRegion]);

  const emptyLists = useMemo(
    () =>
      topPicks &&
      topPicks.length === 0 &&
      featuredDeliveries &&
      featuredDeliveries.length === 0 &&
      verifiedDeliveries &&
      verifiedDeliveries.length === 0 &&
      allDeliveries &&
      allDeliveries.length === 0,
    [topPicks, featuredDeliveries, verifiedDeliveries, allDeliveries],
  );

  const nearbyBusiness = useNearbyBusiness(emptyLists, {
    nearby: props.nearby || [],
    location,
    businessType: 'Delivery',
  });

  return {
    isEmptyLists: emptyLists,
    monthlyTopPicks: topPicks,
    featured: featuredDeliveries,
    verified: verifiedDeliveries,
    all: allDeliveries,
    nearbyBusiness,
  };
};

export const useAllDeliveriesStatic = async (
  context: GetServerSidePropsContext,
  disableRegion?: boolean,
) => {
  const { selectedLocation, currentLocation } = await useCurrentLocationStatic(
    context,
  );

  const { data: allData } = await getApolloClient(context).query<
    BusinessAllDeliveriesQuery,
    BusinessAllDeliveriesQueryVariables
  >({
    errorPolicy: 'all',
    query: BusinessAllDeliveriesDocument,
    variables: {
      plCountryID:
        !context?.query?.province && !context?.query?.city
          ? selectedLocation?.province?.country?.plCountryID
          : null,
      linkProvinceID: (currentLocation || selectedLocation).plProvinceID,
      plRegionID: disableRegion
        ? null
        : (currentLocation || selectedLocation).plRegionID,
      offset: 0,
      limit: 50,
    },
  });

  return {
    all: allData?.businessAllDeliveries || [],
  };
};

export const useAllDeliveriesDynamic = (
  props: any,
  disableRegion?: boolean,
) => {
  const router = useRouter();

  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [allDeliveries, setAllDeliveries] = useState<any[]>(props.all || []);

  const [getAllDeliveries] = useBusinessAllDeliveriesLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setAllDeliveries(data?.businessAllDeliveries || []);
    },
  });

  useEffect(() => {
    if (
      !isEqual(location?.plRegionID, prevLocation.current?.plRegionID) &&
      location
    ) {
      getAllDeliveries({
        variables: {
          plCountryID:
            !router?.query?.province && !router?.query?.city
              ? location?.province?.country?.plCountryID
              : null,
          linkProvinceID: location.plProvinceID,
          plRegionID: disableRegion ? null : location.plRegionID,
          limit: 50,
          offset: 0,
        },
      });
      prevLocation.current = location;
    }
  }, [location, disableRegion]);

  return {
    all: allDeliveries,
  };
};

export const useVerifiedDeliveriesStatic = async (
  context: GetServerSidePropsContext,
  disableRegion?: boolean,
) => {
  const { selectedLocation, currentLocation } = await useCurrentLocationStatic(
    context,
  );

  const { data: verifiedData } = await getApolloClient(context).query<
    BusinessVerifiedDeliveriesQuery,
    BusinessVerifiedDeliveriesQueryVariables
  >({
    errorPolicy: 'all',
    query: BusinessVerifiedDeliveriesDocument,
    variables: {
      plCountryID:
        !context?.query?.province && !context?.query?.city
          ? selectedLocation?.province?.country?.plCountryID
          : null,
      linkProvinceID: (currentLocation || selectedLocation).plProvinceID,
      plRegionID: disableRegion
        ? null
        : (currentLocation || selectedLocation).plRegionID,
      offset: 0,
      limit: 50,
    },
  });

  return {
    verified: verifiedData?.businessVerifiedDeliveries || [],
  };
};

export const useVerifiedDeliveriesDynamic = (
  props: any,
  disableRegion?: boolean,
) => {
  const router = useRouter();

  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [verifiedDeliveries, setVerifiedDeliveries] = useState<any[]>(
    props.verified || [],
  );

  const [getVerifiedDeliveries] = useBusinessVerifiedDeliveriesLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setVerifiedDeliveries(data?.businessVerifiedDeliveries || []);
    },
  });

  useEffect(() => {
    if (
      !isEqual(location?.plRegionID, prevLocation.current?.plRegionID) &&
      location
    ) {
      getVerifiedDeliveries({
        variables: {
          plCountryID:
            !router?.query?.province && !router?.query?.city
              ? location?.province?.country?.plCountryID
              : null,
          linkProvinceID: location.plProvinceID,
          plRegionID: disableRegion ? null : location.plRegionID,
          limit: 50,
          offset: 0,
        },
      });
      prevLocation.current = location;
    }
  }, [location, disableRegion]);

  return {
    verified: verifiedDeliveries,
  };
};

export const useFeaturedDeliveriesStatic = async (
  context: GetServerSidePropsContext,
  disableRegion?: boolean,
) => {
  const { currentLocation, selectedLocation } = await useCurrentLocationStatic(
    context,
  );

  const { data: featuredData } = await getApolloClient(context).query<
    BusinessFeaturedDeliveriesQuery,
    BusinessFeaturedDeliveriesQueryVariables
  >({
    errorPolicy: 'all',
    query: BusinessFeaturedDeliveriesDocument,
    variables: {
      plCountryID:
        !context?.query?.province && !context?.query?.city
          ? selectedLocation?.province?.country?.plCountryID
          : null,
      linkProvinceID: (currentLocation || selectedLocation).plProvinceID,
      plRegionID: disableRegion
        ? null
        : (currentLocation || selectedLocation).plRegionID,
      offset: 0,
      limit: 15,
    },
  });

  return {
    featured: featuredData?.businessFeaturedDeliveries || [],
  };
};

export const useFeaturedDeliveriesDynamic = (
  props: any,
  disableRegion?: boolean,
) => {
  const router = useRouter();

  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [featuredDeliveries, setFeaturedDeliveries] = useState<any[]>(
    props.featured || [],
  );

  const [getFeaturedDeliveries] = useBusinessFeaturedDeliveriesLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setFeaturedDeliveries(data?.businessFeaturedDeliveries || []);
    },
  });

  useEffect(() => {
    if (
      !isEqual(location?.plRegionID, prevLocation.current?.plRegionID) &&
      location
    ) {
      getFeaturedDeliveries({
        variables: {
          plCountryID:
            !router?.query?.province && !router?.query?.city
              ? location?.province?.country?.plCountryID
              : null,
          linkProvinceID: location.plProvinceID,
          plRegionID: disableRegion ? null : location.plRegionID,
          limit: 15,
          offset: 0,
        },
      });
      prevLocation.current = location;
    }
  }, [location, disableRegion]);

  return {
    featured: featuredDeliveries,
  };
};
