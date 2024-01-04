import { useEffect, useMemo, useRef, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import isEqual from 'lodash/isEqual';
import { useRouter } from 'next/router';
import {
  BusinessFeaturedDispensaryDocument,
  BusinessFeaturedDispensaryQuery,
  BusinessFeaturedDispensaryQueryVariables,
  BusinessVerifiedDispensaryDocument,
  BusinessVerifiedDispensaryQuery,
  BusinessVerifiedDispensaryQueryVariables,
  BusinessAllDispensaryDocument,
  BusinessAllDispensaryQuery,
  BusinessAllDispensaryQueryVariables,
  useBusinessFeaturedDispensaryLazyQuery,
  useBusinessAllDispensaryLazyQuery,
  useBusinessVerifiedDispensaryLazyQuery,
  BusinessMonthlyTopPicksDispensariesQuery,
  BusinessMonthlyTopPicksDispensariesQueryVariables,
  BusinessMonthlyTopPicksDispensariesDocument,
  useBusinessMonthlyTopPicksDispensariesLazyQuery,
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

export const useDispensaryStatic = async (
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
      BusinessMonthlyTopPicksDispensariesQuery,
      BusinessMonthlyTopPicksDispensariesQueryVariables
    >({
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      query: BusinessMonthlyTopPicksDispensariesDocument,
      variables: {
        plRegionID: (currentLocation || selectedLocation).plRegionID,
        offset: 0,
        limit: 50,
      },
    });
    topPicks = data;
  }

  const { data: featuredData } = await getApolloClient(context).query<
    BusinessFeaturedDispensaryQuery,
    BusinessFeaturedDispensaryQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: BusinessFeaturedDispensaryDocument,
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
    BusinessVerifiedDispensaryQuery,
    BusinessVerifiedDispensaryQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: BusinessVerifiedDispensaryDocument,
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
    BusinessAllDispensaryQuery,
    BusinessAllDispensaryQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: BusinessAllDispensaryDocument,
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
        plType: 'Dispensary',
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
    monthlyTopPicks: topPicks?.businessMonthlyTopPicksDispensary || [],
    featured: featuredData?.businessFeaturedDispensary || [],
    verified: verifiedData?.businessVerifiedDispensary || [],
    all: allData?.businessAllDispensary || [],
    nearby: nearByData?.businessNearBy || [],
  };
};

export const useDispensaryDynamic = (props: any, disableRegion?: boolean) => {
  const router = useRouter();

  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const prevSelectLocation = useRef<LocationItemFragment | null>(
    selectedLocation,
  );
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [topPicks, setTopPicks] = useState<any[]>(props.monthlyTopPicks || []);
  const [featuredDispensary, setFeaturedDispensary] = useState<any[]>(
    props.featured || [],
  );
  const [verifiedDispensary, setVerifiedDispensary] = useState<any[]>(
    props.verified || [],
  );
  const [allDispensary, setAllDispensary] = useState<any[]>(props.all || []);

  useEffect(() => {
    setAllDispensary(props.all || []);
  }, [props.all]);

  useEffect(() => {
    setVerifiedDispensary(props.verified || []);
  }, [props.verified]);

  useEffect(() => {
    setFeaturedDispensary(props.featured || []);
  }, [props.featured]);

  useEffect(() => {
    setTopPicks(props.monthlyTopPicks || []);
  }, [props.monthlyTopPicks]);

  const [getTopPicks] = useBusinessMonthlyTopPicksDispensariesLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setTopPicks(data?.businessMonthlyTopPicksDispensary || []);
    },
  });

  const [getFeaturedDispensary] = useBusinessFeaturedDispensaryLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setFeaturedDispensary(data?.businessFeaturedDispensary || []);
    },
  });

  const [getVerifiedDispensary] = useBusinessVerifiedDispensaryLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setVerifiedDispensary(data?.businessVerifiedDispensary || []);
    },
  });

  const [getAllDispensary] = useBusinessAllDispensaryLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setAllDispensary(data?.businessAllDispensary || []);
    },
  });

  useEffect(() => {
    if (
      (!isEqual(
        selectedLocation?.plProvinceID,
        prevSelectLocation.current?.plProvinceID,
      ) ||
        !isEqual(location?.plRegionID, prevLocation.current?.plRegionID)) &&
      (selectedLocation || location)
    ) {
      if (
        (router?.query?.province || router?.query?.city) &&
        (currentLocation || selectedLocation).plRegionID
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
      (!isEqual(location?.plProvinceID, prevLocation.current?.plProvinceID) ||
        !isEqual(location?.plRegionID, prevLocation.current?.plRegionID)) &&
      location
    ) {
      getFeaturedDispensary({
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
      getVerifiedDispensary({
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
      getAllDispensary({
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
      featuredDispensary &&
      featuredDispensary.length === 0 &&
      verifiedDispensary &&
      verifiedDispensary.length === 0 &&
      allDispensary &&
      allDispensary.length === 0,
    [topPicks, verifiedDispensary, allDispensary, featuredDispensary],
  );

  const nearbyBusiness = useNearbyBusiness(emptyLists, {
    nearby: props.nearby || [],
    location,
    businessType: 'Dispensary',
  });

  return {
    isEmptyLists: emptyLists,
    monthlyTopPicks: topPicks,
    featured: featuredDispensary,
    verified: verifiedDispensary,
    all: allDispensary,
    nearbyBusiness,
  };
};

export const useAllDispensaryStatic = async (
  context: GetServerSidePropsContext,
  disableRegion?: boolean,
) => {
  const { currentLocation, selectedLocation } = await useCurrentLocationStatic(
    context,
  );

  const { data: allData } = await getApolloClient(context).query<
    BusinessAllDispensaryQuery,
    BusinessAllDispensaryQueryVariables
  >({
    errorPolicy: 'all',
    query: BusinessAllDispensaryDocument,
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
    all: allData?.businessAllDispensary || [],
  };
};

export const useAllDispensaryDynamic = (
  props: any,
  disableRegion?: boolean,
) => {
  const router = useRouter();

  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [allDispensary, setAllDispensary] = useState<any[]>(props.all || []);

  const [getAllDispensary] = useBusinessAllDispensaryLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setAllDispensary(data?.businessAllDispensary || []);
    },
  });

  useEffect(() => {
    if (
      !isEqual(location?.plRegionID, prevLocation.current?.plRegionID) &&
      location
    ) {
      getAllDispensary({
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
    all: allDispensary,
  };
};

export const useVerifiedDispensaryStatic = async (
  context: GetServerSidePropsContext,
  disableRegion?: boolean,
) => {
  const { currentLocation, selectedLocation } = await useCurrentLocationStatic(
    context,
  );

  const { data: verifiedData } = await getApolloClient(context).query<
    BusinessVerifiedDispensaryQuery,
    BusinessVerifiedDispensaryQueryVariables
  >({
    errorPolicy: 'all',
    query: BusinessVerifiedDispensaryDocument,
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
    verified: verifiedData?.businessVerifiedDispensary || [],
  };
};

export const useVerifiedDispensaryDynamic = (
  props: any,
  disableRegion?: boolean,
) => {
  const router = useRouter();

  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [verifiedDispensary, setVerifiedDispensary] = useState<any[]>(
    props.verified || [],
  );

  const [getVerifiedDispensary] = useBusinessVerifiedDispensaryLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setVerifiedDispensary(data?.businessVerifiedDispensary || []);
    },
  });

  useEffect(() => {
    if (
      !isEqual(location?.plRegionID, prevLocation.current?.plRegionID) &&
      location
    ) {
      getVerifiedDispensary({
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
    verified: verifiedDispensary,
  };
};

export const useFeaturedDispensaryStatic = async (
  context: GetServerSidePropsContext,
  disableRegion?: boolean,
) => {
  const { currentLocation, selectedLocation } = await useCurrentLocationStatic(
    context,
  );

  const { data: featuredData } = await getApolloClient(context).query<
    BusinessFeaturedDispensaryQuery,
    BusinessFeaturedDispensaryQueryVariables
  >({
    errorPolicy: 'all',
    query: BusinessFeaturedDispensaryDocument,
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
    featured: featuredData?.businessFeaturedDispensary || [],
  };
};

export const useFeaturedDispensaryDynamic = (
  props: any,
  disableRegion?: boolean,
) => {
  const router = useRouter();

  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [featuredDispensary, setFeaturedDispensary] = useState<any[]>(
    props.featured || [],
  );

  const [getFeaturedDispensary] = useBusinessFeaturedDispensaryLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setFeaturedDispensary(data?.businessFeaturedDispensary || []);
    },
  });

  useEffect(() => {
    if (
      !isEqual(location?.plRegionID, prevLocation.current?.plRegionID) &&
      location
    ) {
      getFeaturedDispensary({
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
    featured: featuredDispensary,
  };
};
