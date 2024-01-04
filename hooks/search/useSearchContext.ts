import { createContext, useContext, useEffect, useState } from 'react';
import { setCookie } from '../../services/cookie';

export const SearchContext = createContext<{
  locationType: string;
  setLocationType: (v: string) => void;
  setUserLocationLat: (v: number) => void;
  setUserLocationLng: (v: number) => void;
  userLocationLat: number;
  userLocationLng: number;
}>({
  locationType: 'country',
  userLocationLng: 0,
  userLocationLat: 0,
  setLocationType: () => {},
  setUserLocationLat: () => {},
  setUserLocationLng: () => {},
});

export const useSearchState = ({
  locationType: locationTypeProp,
  userLocationLat: userLocationLatProp,
  userLocationLng: userLocationLngProp,
}: {
  locationType: string;
  userLocationLat?: number;
  userLocationLng?: number;
}) => {
  const [userLocationLat, setUserLocationLat] = useState<number>(
    userLocationLatProp || 0,
  );
  const [userLocationLng, setUserLocationLng] = useState<number>(
    userLocationLngProp || 0,
  );
  const [locationType, setLocationType] = useState<string>(
    locationTypeProp || 'country',
  );

  useEffect(() => {
    setCookie('search-location-type', locationType);
    setCookie('search-location-lat', `${userLocationLat || 0}`);
    setCookie('search-location-lng', `${userLocationLng || 0}`);
  }, [locationType, userLocationLat, userLocationLng]);

  return {
    locationType,
    setLocationType,
    userLocationLat,
    setUserLocationLat,
    userLocationLng,
    setUserLocationLng,
  };
};

export const useSearchValues = () => {
  return useContext(SearchContext);
};
