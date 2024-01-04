import { useEffect, useMemo, useRef, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import isEqual from 'lodash/isEqual';
import {
  BusinessFeaturedMailDocument,
  BusinessFeaturedMailQuery,
  BusinessFeaturedMailQueryVariables,
  BusinessVerifiedMailDocument,
  BusinessVerifiedMailQuery,
  BusinessVerifiedMailQueryVariables,
  BusinessAllMailDocument,
  BusinessAllMailQuery,
  BusinessAllMailQueryVariables,
  useBusinessFeaturedMailLazyQuery,
  useBusinessAllMailLazyQuery,
  useBusinessVerifiedMailLazyQuery,
  BusinessMonthlyTopPicksMailQuery,
  BusinessMonthlyTopPicksMailQueryVariables,
  BusinessMonthlyTopPicksMailDocument,
  useBusinessMonthlyTopPicksMailLazyQuery,
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
import { checkIfRegion } from '../utils/region';
import { useNearbyBusiness } from '../hooks/business/useNearbyBusiness';

export const useMailStatic = async (context: GetServerSidePropsContext) => {
  const { currentLocation, selectedLocation } = await useCurrentLocationStatic(
    context,
  );

  let topPicks: any = null;
  if (
    (context?.query?.province || context?.query?.city) &&
    (currentLocation || selectedLocation).plRegionID
  ) {
    const { data } = await getApolloClient(context).query<
      BusinessMonthlyTopPicksMailQuery,
      BusinessMonthlyTopPicksMailQueryVariables
    >({
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      query: BusinessMonthlyTopPicksMailDocument,
      variables: {
        plRegionID: (currentLocation || selectedLocation).plRegionID,
        offset: 0,
        limit: 50,
      },
    });
    topPicks = data;
  }

  const { data: featuredData } = await getApolloClient(context).query<
    BusinessFeaturedMailQuery,
    BusinessFeaturedMailQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: BusinessFeaturedMailDocument,
    variables: {
      plCountryID:
        !context?.query?.province && !context?.query?.city
          ? selectedLocation?.province?.country?.plCountryID
          : null,
      linkProvinceID: (currentLocation || selectedLocation).plProvinceID,
      offset: 0,
      limit: 999,
    },
  });

  const { data: verifiedData } = await getApolloClient(context).query<
    BusinessVerifiedMailQuery,
    BusinessVerifiedMailQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: BusinessVerifiedMailDocument,
    variables: {
      plCountryID:
        !context?.query?.province && !context?.query?.city
          ? selectedLocation?.province?.country?.plCountryID
          : null,
      linkProvinceID: (currentLocation || selectedLocation).plProvinceID,
      offset: 0,
      limit: 999,
    },
  });

  const { data: allData } = await getApolloClient(context).query<
    BusinessAllMailQuery,
    BusinessAllMailQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: BusinessAllMailDocument,
    variables: {
      plCountryID:
        !context?.query?.province && !context?.query?.city
          ? selectedLocation?.province?.country?.plCountryID
          : null,
      linkProvinceID: (currentLocation || selectedLocation).plProvinceID,
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
        plType: 'Mail Order',
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
    monthlyTopPicks: topPicks?.businessMonthlyTopPicksMail || [],
    featured: featuredData?.businessFeaturedMail || [],
    verified: verifiedData?.businessVerifiedMail || [],
    all: allData?.businessAllMail || [],
    nearby: nearByData?.businessNearBy || [],
  };
};

export const useMailDynamic = (props: any) => {
  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const prevSelectLocation = useRef<LocationItemFragment | null>(
    selectedLocation,
  );
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [topPicks, setTopPicks] = useState<any[]>(props.monthlyTopPicks || []);
  const [featuredMail, setFeaturedMail] = useState<any[]>(props.featured || []);
  const [verifiedMail, setVerifiedMail] = useState<any[]>(props.verified || []);
  const [allMail, setAllMail] = useState<any[]>(props.all || []);

  useEffect(() => {
    setAllMail(props.all || []);
  }, [props.all]);

  useEffect(() => {
    setVerifiedMail(props.verified || []);
  }, [props.verified]);

  useEffect(() => {
    setFeaturedMail(props.featured || []);
  }, [props.featured]);

  useEffect(() => {
    setTopPicks(props.monthlyTopPicks || []);
  }, [props.monthlyTopPicks]);

  const [getTopPicks] = useBusinessMonthlyTopPicksMailLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setTopPicks(data?.businessMonthlyTopPicksMail || []);
    },
  });

  const [getFeaturedMail] = useBusinessFeaturedMailLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setFeaturedMail(data?.businessFeaturedMail || []);
    },
  });

  const [getVerifiedMail] = useBusinessVerifiedMailLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setVerifiedMail(data?.businessVerifiedMail || []);
    },
  });

  const [getAllMail] = useBusinessAllMailLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setAllMail(data?.businessAllMail || []);
    },
  });

  const router = useRouter();
  const disableFetch = useMemo(
    () =>
      !!((router.query?.business || router.query?.province) as string) &&
      !checkIfRegion(
        (router.query?.business || router.query?.province) as string,
      ),
    [router.query],
  );

  useEffect(() => {
    if (!disableFetch) {
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
        !isEqual(location?.plProvinceID, prevLocation.current?.plProvinceID) &&
        location
      ) {
        getFeaturedMail({
          variables: {
            plCountryID:
              !router?.query?.province && !router?.query?.city
                ? location?.province?.country?.plCountryID
                : null,
            linkProvinceID: location.plProvinceID,
            limit: 999,
            offset: 0,
          },
        });
        getVerifiedMail({
          variables: {
            plCountryID:
              !router?.query?.province && !router?.query?.city
                ? location?.province?.country?.plCountryID
                : null,
            linkProvinceID: location.plProvinceID,
            limit: 999,
            offset: 0,
          },
        });
        getAllMail({
          variables: {
            plCountryID:
              !router?.query?.province && !router?.query?.city
                ? location?.province?.country?.plCountryID
                : null,
            linkProvinceID: location.plProvinceID,
            limit: 50,
            offset: 0,
          },
        });
        prevLocation.current = location;
      }
    }
  }, [disableFetch, router.query, location]);

  const emptyLists = useMemo(
    () =>
      topPicks &&
      topPicks.length === 0 &&
      featuredMail &&
      featuredMail.length === 0 &&
      verifiedMail &&
      verifiedMail.length === 0 &&
      allMail &&
      allMail.length === 0,
    [topPicks, featuredMail, verifiedMail, allMail],
  );

  const nearbyBusiness = useNearbyBusiness(emptyLists, {
    nearby: props.nearby || [],
    location,
    businessType: 'Mail Order',
  });

  return {
    isEmptyLists: emptyLists,
    monthlyTopPicks: topPicks,
    featured: featuredMail,
    verified: verifiedMail,
    all: allMail,
    nearbyBusiness,
  };
};

export const useAllMailStatic = async (context: GetServerSidePropsContext) => {
  const { selectedLocation, currentLocation } = await useCurrentLocationStatic(
    context,
  );

  const { data: allData } = await getApolloClient(context).query<
    BusinessAllMailQuery,
    BusinessAllMailQueryVariables
  >({
    errorPolicy: 'all',
    query: BusinessAllMailDocument,
    variables: {
      plCountryID:
        !context?.query?.province && !context?.query?.city
          ? selectedLocation?.province?.country?.plCountryID
          : null,
      linkProvinceID: (currentLocation || selectedLocation).plProvinceID,
      offset: 0,
      limit: 50,
    },
  });

  return {
    all: allData?.businessAllMail || [],
  };
};

export const useAllMailDynamic = (props: any) => {
  const router = useRouter();

  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [allMail, setAllMail] = useState<any[]>(props.all || []);

  const [getAllMail] = useBusinessAllMailLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setAllMail(data?.businessAllMail || []);
    },
  });

  useEffect(() => {
    if (
      !isEqual(location?.plProvinceID, prevLocation.current?.plProvinceID) &&
      location
    ) {
      getAllMail({
        variables: {
          plCountryID:
            !router?.query?.province && !router?.query?.city
              ? location?.province?.country?.plCountryID
              : null,
          linkProvinceID: location.plProvinceID,
          limit: 50,
          offset: 0,
        },
      });
      prevLocation.current = location;
    }
  }, [location]);

  return {
    all: allMail,
  };
};

export const useVerifiedMailStatic = async (
  context: GetServerSidePropsContext,
) => {
  const { selectedLocation, currentLocation } = await useCurrentLocationStatic(
    context,
  );

  const { data: verifiedData } = await getApolloClient(context).query<
    BusinessVerifiedMailQuery,
    BusinessVerifiedMailQueryVariables
  >({
    errorPolicy: 'all',
    query: BusinessVerifiedMailDocument,
    variables: {
      plCountryID:
        !context?.query?.province && !context?.query?.city
          ? selectedLocation?.province?.country?.plCountryID
          : null,
      linkProvinceID: (currentLocation || selectedLocation).plProvinceID,
      offset: 0,
      limit: 50,
    },
  });

  return {
    verified: verifiedData?.businessVerifiedMail || [],
  };
};

export const useVerifiedMailDynamic = (props: any) => {
  const router = useRouter();

  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [verifiedMail, setVerifiedMail] = useState<any[]>(props.verified || []);

  const [getVerifiedMail] = useBusinessVerifiedMailLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setVerifiedMail(data?.businessVerifiedMail || []);
    },
  });

  useEffect(() => {
    if (
      !isEqual(location?.plProvinceID, prevLocation.current?.plProvinceID) &&
      location
    ) {
      getVerifiedMail({
        variables: {
          plCountryID:
            !router?.query?.province && !router?.query?.city
              ? location?.province?.country?.plCountryID
              : null,
          linkProvinceID: location.plProvinceID,
          limit: 50,
          offset: 0,
        },
      });
      prevLocation.current = location;
    }
  }, [location]);

  return {
    verified: verifiedMail,
  };
};

export const useFeaturedMailStatic = async (
  context: GetServerSidePropsContext,
) => {
  const { currentLocation, selectedLocation } = await useCurrentLocationStatic(
    context,
  );

  const { data: featuredData } = await getApolloClient(context).query<
    BusinessFeaturedMailQuery,
    BusinessFeaturedMailQueryVariables
  >({
    errorPolicy: 'all',
    query: BusinessFeaturedMailDocument,
    variables: {
      plCountryID:
        !context?.query?.province && !context?.query?.city
          ? selectedLocation?.province?.country?.plCountryID
          : null,
      linkProvinceID: (currentLocation || selectedLocation).plProvinceID,
      offset: 0,
      limit: 15,
    },
  });

  return {
    featured: featuredData?.businessFeaturedMail || [],
  };
};

export const useFeaturedMailDynamic = (props: any) => {
  const router = useRouter();

  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [featuredMail, setFeaturedMail] = useState<any[]>(props.featured || []);

  const [getFeaturedMail] = useBusinessFeaturedMailLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setFeaturedMail(data?.businessFeaturedMail || []);
    },
  });

  useEffect(() => {
    if (
      !isEqual(location?.plProvinceID, prevLocation.current?.plProvinceID) &&
      location
    ) {
      getFeaturedMail({
        variables: {
          plCountryID:
            !router?.query?.province && !router?.query?.city
              ? location?.province?.country?.plCountryID
              : null,
          linkProvinceID: location.plProvinceID,
          limit: 15,
          offset: 0,
        },
      });
      prevLocation.current = location;
    }
  }, [location]);

  return {
    featured: featuredMail,
  };
};
