import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import NProgress from 'nprogress';
import isEqual from 'lodash/isEqual';
import {
  Business,
  BusinessItemFragment,
  useMapBusinessQueryLazyQuery,
  useMapDealsQueryLazyQuery,
} from '../generated/graphql';
import { DEFAULT_USER_LOCATION, useCurrentLocationDynamic } from './location';

export const MAP_OPTIONS = {
  streetViewControl: false,
  fullscreenControl: true,
  maxZoom: 19,
  zoomControl: true,
  clickableIcons: false,
  styles: [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      featureType: 'administrative',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'administrative.province',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'administrative.province',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#999999',
        },
        {
          visibility: 'on',
        },
        {
          weight: 2,
        },
      ],
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ],
};

export const getMapColor = (business?: Business | null) => {
  if (business?.bizFeaturedPosition) {
    if (business.bizFeaturedPosition === 1) {
      return '#EF845C';
    }
    if (business.bizFeaturedPosition === 2) {
      return '#FFB229';
    }
    if (business.bizFeaturedPosition === 3) {
      return '#61AB62';
    }
    if (business.bizFeaturedPosition === 4) {
      return '#98CCC6';
    }
    if (
      business.bizFeaturedPosition >= 5 &&
      business.bizFeaturedPosition <= 20
    ) {
      return '#000000';
    }
  }
  return '#A7B3B1';
};

export const isPinBigger = (business?: Business | null) => {
  if (business?.bizFeaturedPosition) {
    if (business.bizFeaturedPosition === 1) {
      return true;
    }
    if (business.bizFeaturedPosition === 2) {
      return true;
    }
    if (business.bizFeaturedPosition === 3) {
      return true;
    }
    if (business.bizFeaturedPosition === 4) {
      return true;
    }
    if (
      business.bizFeaturedPosition >= 5 &&
      business.bizFeaturedPosition <= 20
    ) {
      return false;
    }
  }
  return false;
};

export const getFillColor = (business: BusinessItemFragment) => {
  return '#FFFFFF';
};

export const useMapDynamic = (props: any) => {
  const { selectedLocation } = useCurrentLocationDynamic();

  const [isMapLoading, setIsMapLoading] = useState<boolean>(false);
  const [deals, setDeals] = useState<any[]>(props.deals || []);
  const [business, setBusiness] = useState<any[]>(props.business || []);

  const lastBusinessType = useRef<'delivery' | 'dispensary' | null>(null);
  const lastSorting = useRef<'rating' | 'largest' | 'distance' | null>(null);

  const [getBusinessQuery, { loading }] = useMapBusinessQueryLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setBusiness(data?.businessByCoordinates || []);
    },
  });

  const [getDeals] = useMapDealsQueryLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setDeals(data?.dealListByRegRandom || []);
    },
  });

  const variables = useMemo(
    () => ({
      lat1:
        (selectedLocation?.plLatitude || DEFAULT_USER_LOCATION.plLatitude) +
        0.125,
      lng1:
        (selectedLocation?.plLongitude || DEFAULT_USER_LOCATION.plLongitude) -
        0.125,
      lat2:
        (selectedLocation?.plLatitude || DEFAULT_USER_LOCATION.plLatitude) -
        0.125,
      lng2:
        (selectedLocation?.plLongitude || DEFAULT_USER_LOCATION.plLongitude) +
        0.125,
      plSlugType: lastBusinessType.current || null,
      sort: lastSorting.current || null,
      plRegionID: selectedLocation?.plRegionID || null,
    }),
    [
      selectedLocation?.plLatitude,
      selectedLocation?.plLongitude,
      selectedLocation?.plRegionID,
    ],
  );
  const prevVariables = useRef<any>(null);

  useEffect(() => {
    if (selectedLocation) {
      getDeals({
        variables: {
          plRegionID: selectedLocation.plRegionID,
          limit: 15,
          offset: 0,
        },
      });
      if (!isEqual(variables, prevVariables.current)) {
        getBusinessQuery({
          variables,
        });
      }
      prevVariables.current = variables;
    }
  }, [selectedLocation?.plRegionID, variables]);

  const getBusiness = useCallback(
    (
      lat1: number,
      lng1: number,
      lat2: number,
      lng2: number,
      businessType?: 'delivery' | 'dispensary' | null,
      sorting?: 'rating' | 'largest' | 'distance' | null,
    ) => {
      if (
        !isEqual(
          {
            lat1,
            lng1,
            lat2,
            lng2,
          },
          prevVariables.current,
        ) ||
        businessType !== undefined ||
        sorting !== undefined
      ) {
        setIsMapLoading(true);
        lastBusinessType.current = businessType || null;
        lastSorting.current = sorting || null;
        getBusinessQuery({
          variables: {
            lat1,
            lng1,
            lat2,
            lng2,
            plSlugType: businessType || null,
            sort: sorting || null,
            plRegionID: selectedLocation?.plRegionID || null,
          },
        }).finally(() => setTimeout(() => setIsMapLoading(false), 1000));
      }
    },
    [selectedLocation?.plRegionID],
  );

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else if (!loading) {
      NProgress.done();
    }
  }, [loading]);

  return {
    deals,
    business,
    getBusiness,
    isMapLoading,
  };
};
