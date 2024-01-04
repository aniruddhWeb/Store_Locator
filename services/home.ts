import { useEffect, useRef, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import isEqual from 'lodash/isEqual';
import {
  HomePageDataDocument,
  HomePageDataQuery,
  HomePageDataQueryVariables,
  HomePageDataStatusDocument,
  HomePageDataStatusQuery,
  HomePageDataStatusQueryVariables,
  LocationItemFragment,
  useHomePageDataLazyQuery,
} from '../generated/graphql';
import { getApolloClient, getContentfulClient } from '../api/client';
import {
  useCurrentLocationDynamic,
  useCurrentLocationStatic,
} from './location';
import {
  BannersDocument,
  BannersQuery,
  BannersQueryVariables,
  CarouselDocument,
  CarouselQuery,
  CarouselQueryVariables,
  HomeTopSectionDocument,
  HomeTopSectionQuery,
  HomeTopSectionQueryVariables,
  OurStoryDocument,
  OurStoryQuery,
  OurStoryQueryVariables,
} from '../generated/contentful';
import { shuffle } from '../utils/array';

export const useHomeStatic = async (
  context: GetServerSidePropsContext,
  withoutContentful?: boolean,
) => {
  const { selectedLocation: savedCurrentLocation } =
    await useCurrentLocationStatic(context, withoutContentful);

  if (withoutContentful) {
    const { data: homePageData } = await getApolloClient(context).query<
      HomePageDataStatusQuery,
      HomePageDataStatusQueryVariables
    >({
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
      query: HomePageDataStatusDocument,
      variables: {
        provinceID: savedCurrentLocation.plProvinceID,
        regionID: savedCurrentLocation.plRegionID,
        offset: 0,
        limit: 24,
      },
    });
    return {
      blogs: [],
      monthlyTopPicks: [],
      featuredBrands: [],
      featuredMails: [],
      featuredDeliveries: [],
      featuredDispensaries: [],
      verifiedBusinesses: [],
      allBusinesses: homePageData?.businessAllByLocation || [],
    };
  }
  const { data: topHomeSectionData } = await getContentfulClient().query<
    HomeTopSectionQuery,
    HomeTopSectionQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: HomeTopSectionDocument,
  });

  const { data: carouselData } = await getContentfulClient().query<
    CarouselQuery,
    CarouselQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: CarouselDocument,
  });

  const { data: bannersData } = await getContentfulClient().query<
    BannersQuery,
    BannersQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: BannersDocument,
  });

  const { data: ourStoryData } = await getContentfulClient().query<
    OurStoryQuery,
    OurStoryQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: OurStoryDocument,
  });

  const { data: homePageData } = await getApolloClient(context).query<
    HomePageDataQuery,
    HomePageDataQueryVariables
  >({
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
    query: HomePageDataDocument,
    variables: {
      provinceID: savedCurrentLocation.plProvinceID,
      regionID: savedCurrentLocation.plRegionID,
      offset: 0,
      limit: 24,
      featuredOffset: 0,
      featuredLimit: 24,
    },
  });

  let topSection = topHomeSectionData?.homeTopSection || null;
  const topSections = (
    topHomeSectionData?.homeTopSectionCollection?.items || []
  ).filter(item =>
    savedCurrentLocation?.province?.country?.plCountryID === 1
      ? !item?.plCountryId || item?.plCountryId === 1
      : savedCurrentLocation?.province?.country?.plCountryID === 2
      ? item?.plCountryId === 2
      : false,
  );
  if (topSections.length > 0) {
    topSection = topSections[0];
  }

  const carousel = (carouselData?.carouselImageCollection?.items || []).filter(
    item =>
      savedCurrentLocation?.province?.country?.plCountryID === 1
        ? !item?.plCountryId || item?.plCountryId === 1
        : savedCurrentLocation?.province?.country?.plCountryID === 2
        ? item?.plCountryId === 2
        : false,
  );

  const banners = shuffle(
    (bannersData?.bannerCollection?.items || []).filter(item =>
      savedCurrentLocation?.province?.country?.plCountryID === 1
        ? !item?.plCountryId || item?.plCountryId === 1
        : savedCurrentLocation?.province?.country?.plCountryID === 2
        ? item?.plCountryId === 2
        : false,
    ),
  );

  return {
    topSection,
    carousel,
    banners,
    ourStory: ourStoryData?.ourStoryContent || null,
    blogs: homePageData?.blogListByType || [],
    monthlyTopPicks: homePageData?.businessMonthlyTopPicks || [],
    featuredBrands: homePageData?.businessFeaturedBrands || [],
    featuredMails: homePageData?.businessFeaturedMail || [],
    featuredDeliveries: homePageData?.businessFeaturedDeliveries || [],
    featuredDispensaries: homePageData?.businessFeaturedDispensary || [],
    verifiedBusinesses: homePageData?.businessAllVerified || [],
    allBusinesses: homePageData?.businessAllByLocation || [],
  };
};

export const useHomeDynamic = (props: any) => {
  const { selectedLocation } = useCurrentLocationDynamic();
  const prevLocation = useRef<LocationItemFragment | null>(selectedLocation);

  const [monthlyTopPicks, setMonthlyTopPicks] = useState<any[]>(
    props.monthlyTopPicks || [],
  );
  const [featuredBrands, setFeaturedBrands] = useState<any[]>(
    props.featuredBrands || [],
  );
  const [featuredDeliveries, setFeaturedDeliveries] = useState<any[]>(
    props.featuredDeliveries || [],
  );
  const [featuredMails, setFeaturedMails] = useState<any[]>(
    props.featuredMails || [],
  );
  const [featuredDispensaries, setFeaturedDispensaries] = useState<any[]>(
    props.featuredDispensaries || [],
  );
  const [verifiedBusinesses, setVerifiedBusinesses] = useState<any[]>(
    props.verifiedBusinesses || [],
  );
  const [allBusinesses, setAllBusinesses] = useState<any[]>(
    props.allBusinesses || [],
  );

  const [getHomePageData] = useHomePageDataLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setMonthlyTopPicks(data?.businessMonthlyTopPicks || []);
      setFeaturedBrands(data?.businessFeaturedBrands || []);
      setFeaturedMails(data?.businessFeaturedMail || []);
      setFeaturedDeliveries(data?.businessFeaturedDeliveries || []);
      setFeaturedDispensaries(data?.businessFeaturedDispensary || []);
      setVerifiedBusinesses(data?.businessAllVerified || []);
      setAllBusinesses(data?.businessAllByLocation || []);
    },
  });

  useEffect(() => {
    if (!isEqual(selectedLocation, prevLocation.current) && selectedLocation) {
      getHomePageData({
        variables: {
          regionID: selectedLocation.plRegionID,
          provinceID: selectedLocation.plProvinceID,
          limit: 50,
          offset: 0,
        },
      });
      prevLocation.current = selectedLocation;
    }
  }, [selectedLocation]);

  return {
    topSection: props.topSection,
    carousel: props.carousel,
    banners: props.banners,
    ourStory: props.ourStory,
    blogs: props.blogs,
    monthlyTopPicks,
    featuredBrands,
    featuredDeliveries,
    featuredMails,
    featuredDispensaries,
    verifiedBusinesses,
    allBusinesses,
  };
};
