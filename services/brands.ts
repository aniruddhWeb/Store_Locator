import { useEffect, useMemo, useRef, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import isEqual from 'lodash/isEqual';
import {
  BusinessFeaturedBrandsDocument,
  BusinessFeaturedBrandsQuery,
  BusinessFeaturedBrandsQueryVariables,
  BusinessVerifiedBrandsDocument,
  BusinessVerifiedBrandsQuery,
  BusinessVerifiedBrandsQueryVariables,
  BusinessAllBrandsDocument,
  BusinessAllBrandsQuery,
  BusinessAllBrandsQueryVariables,
  useBusinessFeaturedBrandsLazyQuery,
  useBusinessVerifiedBrandsLazyQuery,
  useBusinessAllBrandsLazyQuery,
  BusinessMonthlyTopPicksBrandsQuery,
  BusinessMonthlyTopPicksBrandsQueryVariables,
  BusinessMonthlyTopPicksBrandsDocument,
  useBusinessMonthlyTopPicksBrandsLazyQuery,
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

export const useBrandsStatic = async (context: GetServerSidePropsContext) => {
  const { selectedLocation, currentLocation } = await useCurrentLocationStatic(
    context,
  );

  let topPicks: any = null;
  if (
    (context?.query?.province || context?.query?.city) &&
    (currentLocation || selectedLocation).plRegionID
  ) {
    const { data } = await getApolloClient(context).query<
      BusinessMonthlyTopPicksBrandsQuery,
      BusinessMonthlyTopPicksBrandsQueryVariables
    >({
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      query: BusinessMonthlyTopPicksBrandsDocument,
      variables: {
        plRegionID: (currentLocation || selectedLocation).plRegionID,
        offset: 0,
        limit: 50,
      },
    });
    topPicks = data;
  }

  const { data: featuredData } = await getApolloClient(context).query<
    BusinessFeaturedBrandsQuery,
    BusinessFeaturedBrandsQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: BusinessFeaturedBrandsDocument,
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
    BusinessVerifiedBrandsQuery,
    BusinessVerifiedBrandsQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: BusinessVerifiedBrandsDocument,
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
    BusinessAllBrandsQuery,
    BusinessAllBrandsQueryVariables
  >({
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: BusinessAllBrandsDocument,
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
        plType: 'Brand',
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
    monthlyTopPicks: topPicks?.businessMonthlyTopPicksBrands || [],
    featured: featuredData?.businessFeaturedBrands || [],
    verified: verifiedData?.businessVerifiedBrands || [],
    all: allData?.businessAllBrands || [],
    nearby: nearByData?.businessNearBy || [],
  };
};

export const useBrandsDynamic = (props: any) => {
  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const prevSelectLocation = useRef<LocationItemFragment | null>(
    selectedLocation,
  );
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [topPicks, setTopPicks] = useState<any[]>(props.monthlyTopPicks || []);
  const [featuredBrands, setFeaturedBrands] = useState<any[]>(
    props.featured || [],
  );
  const [verifiedBrands, setVerifiedBrands] = useState<any[]>(
    props.verified || [],
  );
  const [allBrands, setAllBrands] = useState<any[]>(props.all || []);

  useEffect(() => {
    setAllBrands(props.all || []);
  }, [props.all]);

  useEffect(() => {
    setVerifiedBrands(props.verified || []);
  }, [props.verified]);

  useEffect(() => {
    setFeaturedBrands(props.featured || []);
  }, [props.featured]);

  useEffect(() => {
    setTopPicks(props.monthlyTopPicks || []);
  }, [props.monthlyTopPicks]);

  const [getTopPicks] = useBusinessMonthlyTopPicksBrandsLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setTopPicks(data?.businessMonthlyTopPicksBrands || []);
    },
  });

  const [getFeaturedBrands] = useBusinessFeaturedBrandsLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setFeaturedBrands(data?.businessFeaturedBrands || []);
    },
  });

  const [getVerifiedBrands] = useBusinessVerifiedBrandsLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setVerifiedBrands(data?.businessVerifiedBrands || []);
    },
  });

  const [getAllBrands] = useBusinessAllBrandsLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setAllBrands(data?.businessAllBrands || []);
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
        getFeaturedBrands({
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
        getVerifiedBrands({
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
        getAllBrands({
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
      featuredBrands &&
      featuredBrands.length === 0 &&
      verifiedBrands &&
      verifiedBrands.length === 0 &&
      allBrands &&
      allBrands.length === 0,
    [topPicks, featuredBrands, verifiedBrands, allBrands],
  );

  const nearbyBusiness = useNearbyBusiness(emptyLists, {
    nearby: props.nearby || [],
    location,
    businessType: 'Brand',
  });

  return {
    isEmptyLists: emptyLists,
    monthlyTopPicks: topPicks,
    featured: featuredBrands,
    verified: verifiedBrands,
    all: allBrands,
    nearbyBusiness,
  };
};

export const useAllBrandsStatic = async (
  context: GetServerSidePropsContext,
) => {
  const { selectedLocation, currentLocation } = await useCurrentLocationStatic(
    context,
  );

  const { data: allData } = await getApolloClient(context).query<
    BusinessAllBrandsQuery,
    BusinessAllBrandsQueryVariables
  >({
    errorPolicy: 'all',
    query: BusinessAllBrandsDocument,
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
    all: allData?.businessAllBrands || [],
  };
};

export const useAllBrandsDynamic = (props: any) => {
  const router = useRouter();

  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [allBrands, setAllBrands] = useState<any[]>(props.all || []);

  const [getAllBrands] = useBusinessAllBrandsLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setAllBrands(data?.businessAllBrands || []);
    },
  });

  useEffect(() => {
    if (
      !isEqual(location?.plProvinceID, prevLocation.current?.plProvinceID) &&
      location
    ) {
      getAllBrands({
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
    all: allBrands,
  };
};

export const useVerifiedBrandsStatic = async (
  context: GetServerSidePropsContext,
) => {
  const { currentLocation, selectedLocation } = await useCurrentLocationStatic(
    context,
  );

  const { data: verifiedData } = await getApolloClient(context).query<
    BusinessVerifiedBrandsQuery,
    BusinessVerifiedBrandsQueryVariables
  >({
    errorPolicy: 'all',
    query: BusinessVerifiedBrandsDocument,
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
    verified: verifiedData?.businessVerifiedBrands || [],
  };
};

export const useVerifiedBrandsDynamic = (props: any) => {
  const router = useRouter();

  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [verifiedBrands, setVerifiedBrands] = useState<any[]>(
    props.verified || [],
  );

  const [getVerifiedBrands] = useBusinessVerifiedBrandsLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setVerifiedBrands(data?.businessVerifiedBrands || []);
    },
  });

  useEffect(() => {
    if (
      !isEqual(location?.plProvinceID, prevLocation.current?.plProvinceID) &&
      location
    ) {
      getVerifiedBrands({
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
    verified: verifiedBrands,
  };
};

export const useFeaturedBrandsStatic = async (
  context: GetServerSidePropsContext,
) => {
  const { selectedLocation, currentLocation } = await useCurrentLocationStatic(
    context,
  );

  const { data: featuredData } = await getApolloClient(context).query<
    BusinessFeaturedBrandsQuery,
    BusinessFeaturedBrandsQueryVariables
  >({
    errorPolicy: 'all',
    query: BusinessFeaturedBrandsDocument,
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
    featured: featuredData?.businessFeaturedBrands || [],
  };
};

export const useFeaturedBrandsDynamic = (props: any) => {
  const router = useRouter();

  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;
  const prevLocation = useRef<LocationItemFragment | null>(location);

  const [featuredBrands, setFeaturedBrands] = useState<any[]>(
    props.featured || [],
  );

  const [getFeaturedBrands] = useBusinessFeaturedBrandsLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setFeaturedBrands(data?.businessFeaturedBrands || []);
    },
  });

  useEffect(() => {
    if (
      !isEqual(location?.plProvinceID, prevLocation.current?.plProvinceID) &&
      location
    ) {
      getFeaturedBrands({
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
    featured: featuredBrands,
  };
};
