import React from 'react';
import Link from 'next/link';
import s from './BusinessInterlinking.module.css';
import { useCurrentLocationDynamic } from '../../../services/location';
import { Leafythings } from '../../icons/Leafythings';
import {
  LocationItemFragment,
  ProvinceItemFragment,
} from '../../../generated/graphql';
import { Route } from '../../../config/Routes';

const getTypeText = (type: 'brand' | 'mail' | 'dispensary' | 'delivery') => {
  switch (type) {
    case 'dispensary':
      return 'Local Marijuana Dispensaries';
    case 'delivery':
      return 'Local Cannabis Delivery';
    case 'brand':
      return 'Brands';
    case 'mail':
      return 'Mail Order Marijuana';
    default:
      return '';
  }
};

const getLocationHref = (
  type: 'brand' | 'mail' | 'dispensary' | 'delivery',
  location: ProvinceItemFragment | LocationItemFragment,
) => {
  switch (type) {
    case 'dispensary':
      return `${Route.Dispensary}/${(
        location as LocationItemFragment
      ).province.plInitials.toLowerCase()}/${
        (location as LocationItemFragment).plSlug
      }`;
    case 'delivery':
      return `${Route.Delivery}/${(
        location as LocationItemFragment
      ).province.plInitials.toLowerCase()}/${
        (location as LocationItemFragment).plSlug
      }`;
    case 'brand':
      return `${Route.Brands}/${(
        location as ProvinceItemFragment
      ).plInitials.toLowerCase()}`;
    case 'mail':
      return `${Route.MailOrder}/${(
        location as ProvinceItemFragment
      ).plInitials.toLowerCase()}`;
    default:
      return '';
  }
};

interface Props {
  type: 'brand' | 'mail' | 'dispensary' | 'delivery';
  links: any[];
}

export const BusinessInterlinking = React.memo(({ type, links }: Props) => {
  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;

  if (!links || links.length === 0) {
    return null;
  }
  return (
    <div className={s.root}>
      <div className={s.logoContainer}>
        <Leafythings className={s.backgroundLogo} />
      </div>
      <div className={s.contentContainer}>
        <div className={s.title}>{`Find ${getTypeText(type)} In${
          type === 'brand' || type === 'mail'
            ? ''
            : ` ${location?.province.plName}`
        }`}</div>
        <div className={s.linkContainer}>
          {(links || []).map(link => (
            <Link
              prefetch={false}
              key={
                type === 'brand' || type === 'mail'
                  ? (link as ProvinceItemFragment).plProvinceID
                  : (link as LocationItemFragment).plRegionID
              }
              href={getLocationHref(type, link)}>
              <a href={getLocationHref(type, link)} className={s.linkItem}>
                {link.plName}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});
