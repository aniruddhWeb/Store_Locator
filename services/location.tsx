import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import requestIp from 'request-ip';
import isEqual from 'lodash/isEqual';
import {
  LocationAllListProvinceForUserDocument,
  LocationAllListProvinceForUserQuery,
  LocationAllListProvinceForUserQueryVariables,
  LocationItemFragment,
  LocationListRegionByProvinceForUserDocument,
  LocationListRegionByProvinceForUserQuery,
  LocationListRegionByProvinceForUserQueryVariables,
  LocationListRegionDocument,
  LocationListRegionQuery,
  LocationListRegionQueryVariables,
  LocationSearchRegionDocument,
  LocationSearchRegionQuery,
  LocationSearchRegionQueryVariables,
  UserRegionDocument,
  UserRegionQuery,
  UserRegionQueryVariables,
  UserRegionCountryDocument,
  UserRegionCountryQuery,
  UserRegionCountryQueryVariables,
} from '../generated/app';
import { hasWindow } from '../utils/window';
import { getCookie, setCookie } from './cookie';
import { apolloClient, getApolloClient } from '../api/client';
import { Route } from '../config/Routes';
import { checkIfRegion } from '../utils/region';
import { isCategoryWord, getCleanUrl } from '../utils/link';
import { FLAGS } from '../components/common/LocationDropdown/constants';

const redirectedUrls = [
  'weed-delivery',
  '/weed-delivery',
  'weed-delivery/',
  '/weed-delivery/',
  'marijuana-dispensary',
  '/marijuana-dispensary',
  'marijuana-dispensary/',
  '/marijuana-dispensary/',
];

export const DEFAULT_USER_LOCATION = {
  plRegionID: 182,
  plProvinceID: 1,
  plName: 'Toronto (West)',
  plSlug: 'toronto-west',
  province: {
    plProvinceID: 1,
    plName: 'Ontario',
    plInitials: 'ON',
    plCountryID: 1,
    country: {
      plCountryID: 1,
      plCountrySlug: 'canada',
      plCountryName: 'Canada',
    },
  },
  plLatitude: 43.6534,
  plLongitude: -79.3841,
};

export const DEFAULT_USA_USER_LOCATION = {
  plRegionID: 260,
  plProvinceID: 15,
  plName: 'New York',
  plSlug: 'new-york',
  province: {
    plProvinceID: 15,
    plName: 'New York',
    plInitials: 'NY',
    country: {
      plCountryID: 2,
      plCountryName: 'USA',
      plCountrySlug: 'usa',
    },
  },
  plLatitude: 40.725523,
  plLongitude: -73.908897,
};

const setLocationCookies = (selectedLocationState: LocationItemFragment) => {
  setCookie(
    'loc_province',
    selectedLocationState.province.plInitials.toLowerCase(),
  );
  setCookie('provinceWide', `${!!selectedLocationState.plRegionID}`);
  setCookie('loc_city', selectedLocationState.plSlug);
  setCookie('loc_city_name', selectedLocationState.plName);
};

const setCurrentLocationCookie = (
  selectedLocationState: LocationItemFragment,
) => {
  setCookie('current-location', JSON.stringify(selectedLocationState));
};

const setUserLocationCookie = (selectedLocationState: LocationItemFragment) => {
  setCookie('user-location', JSON.stringify(selectedLocationState));
};

const setLocationAllowedCookie = (val: boolean) => {
  setCookie('location-allowed', JSON.stringify(val));
};

export const LocationContext = createContext<{
  currentLocation: LocationItemFragment | null;
  selectedLocation: LocationItemFragment;
  userLocation: LocationItemFragment | null;
  setCurrentLocation: (location: LocationItemFragment | null) => void;
  setSelectedLocation: (location: LocationItemFragment) => void;
  setUserLocation: (location: LocationItemFragment | null) => void;
  userLocationAllowed: boolean;
  setUserLocationAllowed: (val: boolean) => void;
}>({
  currentLocation: null,
  selectedLocation: DEFAULT_USER_LOCATION,
  setCurrentLocation: () => {},
  setSelectedLocation: () => {},
  userLocationAllowed: false,
  setUserLocationAllowed: () => {},
  userLocation: null,
  setUserLocation: () => {},
});

export const useLocationState = ({
  currentLocation,
  selectedLocation,
  userLocation,
  userLocationAllowed,
}: {
  currentLocation: LocationItemFragment | null;
  selectedLocation: LocationItemFragment;
  userLocation: LocationItemFragment | null;
  userLocationAllowed: boolean | string;
}) => {
  const [userLocationState, setUserLocationValue] =
    useState<LocationItemFragment | null>(userLocation);
  const [currentLocationState, setCurrentLocationValue] =
    useState<LocationItemFragment | null>(currentLocation);
  const [selectedLocationState, setSelectedLocationValue] =
    useState<LocationItemFragment>(selectedLocation);
  const [isUserLocationAllowed, setUserLocationAllowed] = useState<boolean>(
    !!userLocationAllowed,
  );

  const prevLocationState = useRef<LocationItemFragment>(selectedLocationState);
  useEffect(() => {
    if (hasWindow) {
      if (selectedLocationState) {
        setLocationCookies(selectedLocationState);
      }
      if (
        !isEqual(prevLocationState.current, selectedLocationState) &&
        selectedLocationState
      ) {
        setCurrentLocationCookie(selectedLocationState);
      }
      prevLocationState.current = selectedLocationState;
    }
  }, [selectedLocationState]);

  useEffect(() => {
    if (hasWindow && userLocationState) {
      setUserLocationCookie(userLocationState);
    }
  }, [userLocationState]);

  useEffect(() => {
    if (hasWindow) {
      setLocationAllowedCookie(isUserLocationAllowed);
    }
  }, [isUserLocationAllowed]);

  return {
    userLocation: userLocationState,
    setUserLocation: setUserLocationValue,
    selectedLocation: selectedLocationState,
    setSelectedLocation: setSelectedLocationValue,
    currentLocation: currentLocationState,
    setCurrentLocation: setCurrentLocationValue,
    userLocationAllowed: isUserLocationAllowed,
    setUserLocationAllowed,
  };
};

export const makeSelectableLocation = (item: LocationItemFragment) => ({
  label: `${item.plName}${
    item.province?.plInitials ? `, ${item.province?.plInitials}` : ''
  }`,
  value: item,
});

export const useLocationList = (plCountryID: number, search?: string) => {
  const [sorting, setSorting] = useState<boolean>(false);
  const [canadaLoading, setCanadaLoading] = useState<boolean>(true);
  const [usaLoading, setUsaLoading] = useState<boolean>(true);
  const [canadaData, setCanadaData] = useState<LocationListRegionQuery>();
  const [usaData, setUsaData] = useState<LocationListRegionQuery>();

  useEffect(() => {
    setCanadaLoading(true);
    apolloClient
      .query<LocationListRegionQuery, LocationListRegionQueryVariables>({
        query: LocationListRegionDocument,
        fetchPolicy: 'no-cache',
        variables: {
          limit: 3000,
          offset: 0,
          sortPopular: sorting,
          plCountryID: FLAGS.canada.plCountryID,
        },
      })
      .then(({ data }) => setCanadaData(data))
      .finally(() => setCanadaLoading(false));

    setUsaLoading(true);
    apolloClient
      .query<LocationListRegionQuery, LocationListRegionQueryVariables>({
        query: LocationListRegionDocument,
        fetchPolicy: 'no-cache',
        variables: {
          limit: 3000,
          offset: 0,
          sortPopular: sorting,
          plCountryID: FLAGS.usa.plCountryID,
        },
      })
      .then(({ data }) => setUsaData(data))
      .finally(() => setUsaLoading(false));
  }, [sorting]);

  const canadaList = useMemo(
    () =>
      (canadaData?.locationListRegion || [])
        .map(makeSelectableLocation)
        .filter(item =>
          search
            ? item.label.toLowerCase().includes(search.toLowerCase()) ||
              search.toLowerCase().includes(item.label.toLowerCase())
            : true,
        ),
    [canadaData?.locationListRegion, search, sorting, canadaData],
  );
  const usaList = useMemo(
    () =>
      (usaData?.locationListRegion || [])
        .map(makeSelectableLocation)
        .filter(item =>
          search
            ? item.label.toLowerCase().includes(search.toLowerCase()) ||
              search.toLowerCase().includes(item.label.toLowerCase())
            : true,
        ),
    [usaData?.locationListRegion, search, sorting, usaData],
  );

  const hideCanada = useMemo(
    () => (canadaData?.locationListRegion || []).length === 0,
    [canadaData?.locationListRegion],
  );

  const hideUSA = useMemo(
    () => (usaData?.locationListRegion || []).length === 0,
    [usaData?.locationListRegion],
  );

  const setSortingOption = useCallback((current: boolean) => {
    setSorting(current);
  }, []);
  const selectableList = useMemo(() => {
    return plCountryID === FLAGS.usa.plCountryID ? usaList : canadaList;
  }, [usaList, canadaList, plCountryID]);

  return {
    isLoading: canadaLoading || usaLoading,
    selectableList,
    hideUSA,
    hideCanada,
    setSortingOption,
  };
};

export const useCurrentLocationStatic = async (
  ctx: GetServerSidePropsContext,
  statusCheck?: boolean,
) => {
  let selectedLocation: LocationItemFragment | null = null;
  let currentLocation: LocationItemFragment | null = null;
  let userLocation: LocationItemFragment | null = null;
  if (statusCheck) {
    return {
      userLocation,
      currentLocation,
      selectedLocation: DEFAULT_USER_LOCATION,
    };
  }
  if (ctx?.query?.province || ctx?.query?.city) {
    const location: any = await getLocationBySlug(ctx);
    if (location?.location) {
      currentLocation = location.location;
    }
  }
  const cookieString = getCookie('current-location', ctx?.req?.headers?.cookie);
  if (cookieString) {
    const locationJson = JSON.parse(cookieString);
    if (locationJson) {
      if (locationJson.province?.country?.plCountryID) {
        selectedLocation = locationJson;
      } else if (locationJson.province?.plInitials && locationJson.plSlug) {
        const location: any = await getLocationBySlug({
          query: {
            province: locationJson.province?.plInitials,
            city: locationJson.plSlug,
          },
        });
        if (location?.location) {
          selectedLocation = location.location;
        }
      }
    }
  }
  if (!selectedLocation) {
    const userCurrentLocation = await askUserLocation(ctx);
    if (userCurrentLocation) {
      selectedLocation = userCurrentLocation;
    }
  }
  const userCookieString = getCookie(
    'user-location',
    ctx?.req?.headers?.cookie,
  );
  if (userCookieString) {
    const userLocationJson = JSON.parse(userCookieString);
    if (userLocationJson) {
      userLocation = userLocationJson;
    }
  }
  if (
    (ctx?.resolvedUrl || (ctx as any)?.asPath) &&
    ((ctx?.resolvedUrl || (ctx as any)?.asPath) === '/en-us' ||
      (ctx?.resolvedUrl || (ctx as any)?.asPath) === '/en-ca')
  ) {
    if ((ctx?.resolvedUrl || (ctx as any)?.asPath) === '/en-us') {
      selectedLocation = DEFAULT_USA_USER_LOCATION;
    } else {
      selectedLocation = DEFAULT_USER_LOCATION;
    }
  }
  return {
    userLocation,
    currentLocation,
    selectedLocation: selectedLocation || DEFAULT_USER_LOCATION,
  };
};

export const useCurrentLocationDynamic = () => {
  const router = useRouter();

  const {
    userLocation,
    currentLocation,
    selectedLocation,
    setSelectedLocation,
    setCurrentLocation,
    setUserLocation,
    userLocationAllowed,
    setUserLocationAllowed,
  } = useContext(LocationContext);

  const refreshUserLocation = useCallback(() => {
    getBrowserUserLocation(setUserLocationAllowed, true).then(
      locationCoords => {
        const defaultLocation =
          currentLocation || selectedLocation || DEFAULT_USER_LOCATION;
        if (locationCoords.lat && locationCoords.lng) {
          const userLocationItem = {
            ...defaultLocation,
            plLatitude: locationCoords.lat,
            plLongitude: locationCoords.lng,
          };
          setUserLocation(userLocationItem);
          setUserLocationCookie(userLocationItem);
        } else {
          setUserLocation(defaultLocation);
          setUserLocationCookie(defaultLocation);
        }
      },
    );
  }, [selectedLocation, currentLocation]);

  const setLocationByUser = useCallback(
    async (locationParam: LocationItemFragment) => {
      setSelectedLocation(locationParam);
      setLocationCookies(locationParam);
      setCurrentLocationCookie(locationParam);
      const categoryUrlPart = getCleanUrl(router.asPath)
        .split('/')
        .find(item => isCategoryWord(item));
      if (
        categoryUrlPart &&
        redirectedUrls.includes(categoryUrlPart) &&
        !!router?.query?.business
      ) {
        setCurrentLocation(null);
        router.replace(Route.Root);
      } else if (
        (currentLocation &&
          currentLocation?.plProvinceID !== locationParam.plProvinceID) ||
        currentLocation?.plRegionID !== locationParam.plRegionID
      ) {
        let desiredUrl = getCleanUrl(router.asPath);
        if (
          router.query?.province &&
          checkIfRegion(router.query?.province as string)
        ) {
          const province = router.query.province as string;
          desiredUrl = desiredUrl.replace(
            `/${province}`,
            `/${locationParam.province.plInitials.toLowerCase()}`,
          );
          if (router.query?.city) {
            const city = router.query.city as string;
            desiredUrl = desiredUrl.replace(
              `/${city}`,
              `/${locationParam.plSlug}`,
            );
          }
        }
        if (desiredUrl !== getCleanUrl(router.asPath)) {
          setCurrentLocation(null);
          router.replace(desiredUrl);
        }
      }
    },
    [currentLocation, router.query, router.asPath],
  );

  const prevCountryID = useRef<number | undefined>(
    selectedLocation?.province?.country?.plCountryID,
  );
  useEffect(() => {
    if (
      prevCountryID.current !== selectedLocation?.province?.country?.plCountryID
    ) {
      if (router.asPath === Route.Root) {
        router.reload();
      }
    }
    prevCountryID.current = selectedLocation?.province?.country?.plCountryID;
  }, [router.asPath, selectedLocation?.province?.country?.plCountryID]);

  useEffect(() => {
    if (userLocationAllowed) {
      refreshUserLocation();
    }
  }, [userLocationAllowed, refreshUserLocation]);

  const setUserLocationByUser = useCallback(
    (locationCoords: any) => {
      const defaultLocation =
        currentLocation || selectedLocation || DEFAULT_USER_LOCATION;
      if (locationCoords.lat && locationCoords.lng) {
        const userLocationItem = {
          ...defaultLocation,
          plLatitude: locationCoords.lat,
          plLongitude: locationCoords.lng,
        };
        setUserLocation(userLocationItem);
        setUserLocationCookie(userLocationItem);
      }
    },
    [currentLocation, selectedLocation],
  );

  return {
    userLocation: userLocationAllowed ? userLocation : null,
    currentLocation,
    selectedLocation,
    setCurrentLocation: setLocationByUser,
    setUserLocation: setUserLocationByUser,
  };
};

export const askUserLocation = async (ctx?: GetServerSidePropsContext) => {
  try {
    const clientIp = getUserClientIp(ctx);
    const { data: locationData } = await getApolloClient(ctx).query<
      UserRegionQuery,
      UserRegionQueryVariables
    >({
      fetchPolicy: 'no-cache',
      query: UserRegionDocument,
      variables: {
        clientIp: clientIp || null,
      },
      errorPolicy: 'ignore',
    });
    return locationData?.userRegion || null;
  } catch (e) {
    return null;
  }
};

export const getProvinces = async (context?: any) => {
  const { data: provincesData } = await getApolloClient(context).query<
    LocationAllListProvinceForUserQuery,
    LocationAllListProvinceForUserQueryVariables
  >({
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    query: LocationAllListProvinceForUserDocument,
  });
  return provincesData;
};

const getLocationBySlug = async (context?: any) => {
  if (
    context?.query?.province &&
    checkIfRegion(context?.query?.province) &&
    context?.query?.city
  ) {
    const { data: locationProvinceData } = await getApolloClient(context).query<
      LocationSearchRegionQuery,
      LocationSearchRegionQueryVariables
    >({
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
      query: LocationSearchRegionDocument,
      variables: {
        search: context.query.city as string,
      },
    });

    let foundLocation: any;
    if (
      locationProvinceData?.locationSearchRegion &&
      locationProvinceData?.locationSearchRegion.length > 0
    ) {
      foundLocation = locationProvinceData?.locationSearchRegion.find(
        item =>
          item.plSlug.toLowerCase() ===
            (context.query.city as string).toLowerCase() &&
          item?.province?.plInitials.toUpperCase() ===
            context?.query?.province?.toUpperCase(),
      );
    }
    return {
      notFound: !foundLocation,
      location: foundLocation,
    };
  }
  if (context?.query?.province && checkIfRegion(context?.query?.province)) {
    const { data: provincesData } = await getApolloClient(context).query<
      LocationAllListProvinceForUserQuery,
      LocationAllListProvinceForUserQueryVariables
    >({
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
      query: LocationAllListProvinceForUserDocument,
    });

    const resolvedUrlParts = getCleanUrl(
      context.resolvedUrl || context.asPath,
    ).split('/');
    if (resolvedUrlParts.length > 0) {
      resolvedUrlParts.shift();
    }
    const foundProvince = (
      provincesData?.locationListProvinceForUser || []
    ).find(
      item =>
        item?.plInitials &&
        item?.plInitials.toUpperCase() ===
          context?.query?.province?.toUpperCase(),
    );

    if (foundProvince && foundProvince.plProvinceID) {
      const { data: locationData } = await getApolloClient(context).query<
        LocationListRegionByProvinceForUserQuery,
        LocationListRegionByProvinceForUserQueryVariables
      >({
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
        query: LocationListRegionByProvinceForUserDocument,
        variables: {
          provinceId: foundProvince.plProvinceID,
        },
      });

      const location =
        (locationData?.locationListRegionByProvinceForUser || []).length > 0
          ? (locationData
              ?.locationListRegionByProvinceForUser[0] as LocationItemFragment)
          : undefined;

      return {
        notFound: false,
        location: {
          ...(location || {}),
          province: foundProvince,
          plProvinceID: foundProvince.plProvinceID,
          plRegionID: location?.plRegionID,
        },
      };
    }
    return {
      notFound: true,
      location: null,
    };
  }
  return {
    notFound: false,
    location: null,
  };
};

export const getLocationPermissionAskCookie = (cookieValue?: string) => {
  return getCookie('permission-location', cookieValue);
};

export const setLocationPermissionAskCookie = (asked: boolean) => {
  setCookie('permission-location', JSON.stringify(asked));
};

export const getBrowserUserLocation = async (
  setUserLocationAllowed: (val: boolean) => void = (val: boolean) => {},
  noTimeout?: boolean,
) => {
  const sessionResolve = new Promise<{ lat: number; lng: number }>(resolve => {
    if (hasWindow) {
      const locationSessionLat = sessionStorage.getItem('gps-location-lat');
      const locationSessionLng = sessionStorage.getItem('gps-location-lng');
      if (locationSessionLat && locationSessionLng) {
        resolve({
          lat: Number(locationSessionLat),
          lng: Number(locationSessionLng),
        });
      }
    }
    setTimeout(() => {
      resolve({
        lat: 0,
        lng: 0,
      });
    }, 2000);
  });
  const timeoutPromise = new Promise<{ lat: number; lng: number }>(resolve => {
    setTimeout(() => {
      resolve({
        lat: 0,
        lng: 0,
      });
    }, 1500);
  });
  const locationPromise = new Promise<{ lat: number; lng: number }>(resolve => {
    const onLocationSuccess = (position: GeolocationPosition) => {
      const crd = position.coords;
      if (crd.latitude && hasWindow) {
        sessionStorage.setItem('gps-location-lat', `${crd.latitude}`);
      }
      if (crd.longitude && hasWindow) {
        sessionStorage.setItem('gps-location-lng', `${crd.longitude}`);
      }
      resolve({
        lat: crd.latitude || 0,
        lng: crd.longitude || 0,
      });
    };
    const onLocationError = () => {
      resolve({
        lat: 0,
        lng: 0,
      });
    };
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(
            onLocationSuccess,
            onLocationError,
            {
              enableHighAccuracy: true,
              timeout: noTimeout ? 15000 : 1500,
              maximumAge: 0,
            },
          );
        } else if (result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(
            onLocationSuccess,
            () => {},
            {
              enableHighAccuracy: true,
              timeout: 30000,
              maximumAge: 0,
            },
          );
          result.onchange = newResult => {
            if (
              ((newResult.currentTarget || newResult.target) as any)?.state ===
              'granted'
            ) {
              navigator.geolocation.getCurrentPosition(
                onLocationSuccess,
                onLocationError,
                {
                  enableHighAccuracy: true,
                  timeout: noTimeout ? 15000 : 1500,
                  maximumAge: 0,
                },
              );
              setTimeout(() => {
                navigator.geolocation.getCurrentPosition(
                  onLocationSuccess,
                  onLocationError,
                  {
                    enableHighAccuracy: true,
                    timeout: noTimeout ? 15000 : 1500,
                    maximumAge: 0,
                  },
                );
              }, 3000);
            } else {
              setUserLocationAllowed(false);
            }
          };
        } else {
          setUserLocationAllowed(false);
          resolve({
            lat: 0,
            lng: 0,
          });
        }
      });
    } else {
      resolve({
        lat: 0,
        lng: 0,
      });
    }
  });
  if (noTimeout) {
    return Promise.race([locationPromise]);
  }
  return Promise.race([sessionResolve, timeoutPromise, locationPromise]);
};

export const getUserClientIp = (ctx?: GetServerSidePropsContext) => {
  let clientIp;
  if (ctx?.req) {
    const ipResult = requestIp.getClientIp(ctx?.req);
    if (ipResult !== '::1') {
      clientIp = ipResult;
    }
  }
  return clientIp || null;
};

export const getUserClientIpDynamic = async () => {
  let clientIp;
  try {
    const ipResult = await fetch('https://api.ipify.org');
    if (ipResult.ok) {
      clientIp = await ipResult.text();
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return clientIp || null;
};

const distanceByLatLng = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist *= 1.609344;
  return dist;
};

export const getNearestLocationIndex = (
  target: { lat: number; lng: number },
  locations: { lat: number; lng: number }[],
) => {
  const locationDistances = (locations || []).map(item =>
    distanceByLatLng(item.lat, item.lng, target.lat, target.lng),
  );
  const minimumDistanceObject = locationDistances.reduce(
    (previous, current) => {
      return current < previous ? current : previous;
    },
  );
  return locationDistances.findIndex(item => item === minimumDistanceObject);
};

export const askUserCountry = async (ctx?: GetServerSidePropsContext) => {
  try {
    const clientIp = getUserClientIp(ctx);
    const { data: locationData } = await getApolloClient(ctx).query<
      UserRegionCountryQuery,
      UserRegionCountryQueryVariables
    >({
      fetchPolicy: 'no-cache',
      query: UserRegionCountryDocument,
      variables: {
        clientIp: clientIp || null,
      },
      errorPolicy: 'ignore',
    });
    return locationData?.userRegionCountry || null;
  } catch (e) {
    return null;
  }
};
