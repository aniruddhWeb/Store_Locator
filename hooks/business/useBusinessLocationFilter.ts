import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCurrentLocationDynamic } from '../../services/location';
import { useDebounce } from '../../utils/debounce';

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const useBusinessLocationFilter = (
  disableFilterByLocation?: boolean,
) => {
  const { userLocation, selectedLocation } = useCurrentLocationDynamic();

  const location = useMemo(() => {
    if (userLocation?.plLatitude && userLocation?.plLongitude) {
      return userLocation;
    }
    return {
      ...selectedLocation,
      plLatitude: null,
      plLongitude: null,
    };
  }, [
    userLocation?.plLatitude,
    userLocation?.plLongitude,
    selectedLocation?.plRegionID,
  ]);

  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<
    BusinessType[]
  >([]);

  const [businessLocationFilterNoDebounce, setBusinessLocationFilter] =
    useState<{
      type?: string | null;
      filterByLocation?: boolean | null;
      latitudeFront?: number | null;
      longitudeFront?: number | null;
      regionID?: number | null;
    }>({
      filterByLocation: disableFilterByLocation
        ? false
        : !!location?.plLatitude && !!location?.plLongitude,
      regionID: location?.plRegionID,
      latitudeFront: location?.plLatitude,
      longitudeFront: location?.plLongitude,
    });

  const [businessLocationFilter] = useDebounce(
    businessLocationFilterNoDebounce,
    2500,
  );

  const businessTypes = useMemo(
    () => [
      BusinessType.DispensaryType,
      BusinessType.DeliveryType,
      BusinessType.MailOrderType,
    ],
    [],
  );

  useEffect(() => {
    setBusinessLocationFilter(s => ({
      ...s,
      filterByLocation: disableFilterByLocation
        ? false
        : !!location?.plLatitude && !!location?.plLongitude,
      regionID: location?.plRegionID,
      latitudeFront: location?.plLatitude,
      longitudeFront: location?.plLongitude,
    }));
  }, [
    disableFilterByLocation,
    location?.plRegionID,
    location?.plLongitude,
    location?.plLatitude,
  ]);

  const onSelectBusinessType = useCallback(
    async (type: string) => {
      if (type) {
        let selectedItem: BusinessType | undefined;
        if (selectedBusinessTypes.length > 0) {
          selectedItem = selectedBusinessTypes[0];
        }
        if (selectedItem === type) {
          setSelectedBusinessTypes([]);
          setBusinessLocationFilter({
            filterByLocation: disableFilterByLocation
              ? false
              : !!location?.plLatitude && !!location?.plLongitude,
            regionID: location?.plRegionID,
            latitudeFront: location?.plLatitude,
            longitudeFront: location?.plLongitude,
          });
        } else {
          setSelectedBusinessTypes([type as BusinessType]);
          setBusinessLocationFilter({
            type,
            filterByLocation: disableFilterByLocation
              ? false
              : !!location?.plLatitude && !!location?.plLongitude,
            regionID: location?.plRegionID,
            latitudeFront: location?.plLatitude,
            longitudeFront: location?.plLongitude,
          });
        }
      }
    },
    [
      selectedBusinessTypes,
      disableFilterByLocation,
      location?.plRegionID,
      location?.plLongitude,
      location?.plLatitude,
    ],
  );

  return {
    businessTypes,
    selectedBusinessTypes,
    onSelectBusinessType,
    businessLocationFilter,
    businessLocationFilterNoDebounce,
  };
};
