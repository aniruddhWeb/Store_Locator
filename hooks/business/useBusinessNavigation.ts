import { useCallback } from 'react';
import { useCurrentLocationDynamic } from '../../services/location';
import { Route } from '../../config/Routes';

export const useBusinessNavigation = () => {
  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;

  const onFeatured = useCallback(
    (
      type: 'brand' | 'mail' | 'dispensary' | 'delivery',
      onlyProvince?: boolean,
      noProvince?: boolean,
    ) => {
      switch (type) {
        case 'brand':
          return `${
            Route.FeaturedBrands
          }/${noProvince ? '' : location?.province.plInitials.toLowerCase()}`;

        case 'delivery':
          return `${
            Route.FeaturedDelivery
          }/${noProvince ? '' : location?.province.plInitials.toLowerCase()}${
            onlyProvince || noProvince ? '' : '/' + location?.plSlug
          }`;

        case 'dispensary':
          return `${
            Route.FeaturedDispensary
          }/${noProvince ? '' : location?.province.plInitials.toLowerCase()}${
            onlyProvince || noProvince ? '' : '/' + location?.plSlug
          }`;

        case 'mail':
          return `${
            Route.FeaturedMail
          }/${noProvince ? '' : location?.province.plInitials.toLowerCase()}`;

        default:
          return '';
      }
    },
    [location],
  );

  const onVerified = useCallback(
    (
      type: 'brand' | 'mail' | 'dispensary' | 'delivery',
      onlyProvince?: boolean,
      noProvince?: boolean,
    ) => {
      switch (type) {
        case 'brand':
          return `${
            Route.VerifiedBrands
          }/${noProvince ? '' : location?.province.plInitials.toLowerCase()}`;

        case 'delivery':
          return `${
            Route.VerifiedDelivery
          }/${noProvince ? '' : location?.province.plInitials.toLowerCase()}${
            onlyProvince || noProvince ? '' : '/' + location?.plSlug
          }`;

        case 'dispensary':
          return `${
            Route.VerifiedDispensary
          }/${noProvince ? '' : location?.province.plInitials.toLowerCase()}${
            onlyProvince || noProvince ? '' : '/' + location?.plSlug
          }`;

        case 'mail':
          return `${
            Route.VerifiedMail
          }/${noProvince ? '' : location?.province.plInitials.toLowerCase()}`;

        default:
          return '';
      }
    },
    [location],
  );

  const onAll = useCallback(
    (
      type: 'brand' | 'mail' | 'dispensary' | 'delivery',
      onlyProvince?: boolean,
      noProvince?: boolean,
    ) => {
      switch (type) {
        case 'brand':
          return `${
            Route.AllBrands
          }/${noProvince ? '' : location?.province.plInitials.toLowerCase()}`;

        case 'delivery':
          return `${
            Route.AllDelivery
          }/${noProvince ? '' : location?.province.plInitials.toLowerCase()}${
            onlyProvince || noProvince ? '' : '/' + location?.plSlug
          }`;

        case 'dispensary':
          return `${
            Route.AllDispensary
          }/${noProvince ? '' : location?.province.plInitials.toLowerCase()}${
            onlyProvince || noProvince ? '' : '/' + location?.plSlug
          }`;

        case 'mail':
          return `${
            Route.AllMail
          }/${noProvince ? '' : location?.province.plInitials.toLowerCase()}`;

        default:
          return '';
      }
    },
    [location],
  );

  return {
    onFeatured,
    onVerified,
    onAll,
  };
};
