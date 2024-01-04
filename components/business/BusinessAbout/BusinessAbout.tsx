import React, { useMemo } from 'react';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';
import DOMPurify from 'isomorphic-dompurify';
import { Business } from '../../../generated/graphql';
import s from './BusinessAbout.module.css';
import {
  DEFAULT_USER_LOCATION,
  useCurrentLocationDynamic,
} from '../../../services/location';
import { MAP_OPTIONS } from '../../../services/map';
import { Marker } from '../../map/Marker/Marker';
import { getImageLink } from '../../../utils/image';
import { getBusinessAbout } from '../../../services/seo';
import { GOOGLE_MAPS_API_KEY } from '../../../config/Constants';

const GoogleMapReact = dynamic<any>(
  // @ts-ignore
  () => import('google-map-react'),
  {
    ssr: false,
  },
);

const dayItems = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface Props {
  business: Business;
}

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const BusinessAbout = React.memo(({ business }: Props) => {
  const { currentLocation: linkLocation, selectedLocation } =
    useCurrentLocationDynamic();

  const mapLocation = useMemo(() => {
    if (business?.contact?.bizLatitude && business?.contact?.bizLongitude) {
      return {
        latitude: business?.contact?.bizLatitude,
        longitude: business?.contact?.bizLongitude,
      };
    }
    return null;
  }, [business?.contact?.bizLatitude, business?.contact?.bizLongitude]);

  const addressText = useMemo(() => {
    let resultText = '';

    if (
      business?.contact?.bizStreetAddress ||
      business?.contact?.bizIntersection
    ) {
      resultText += `${
        business?.contact?.bizStreetAddress ||
        business?.contact?.bizIntersection
      }`;
    }

    if (business?.contact?.regionName || business?.contact?.provinceName) {
      resultText += `${resultText ? ', ' : ''}${
        business?.contact?.regionName
      }, ${business?.contact?.provinceName}`;
    }

    if (business?.contact?.bizPostal) {
      resultText += `${resultText ? ', ' : ''}${business?.contact?.bizPostal}`;
    }

    return resultText;
  }, [business]);

  const defaultCenter = useMemo(() => {
    let lat: number =
      linkLocation?.plLatitude || DEFAULT_USER_LOCATION.plLatitude;
    let lng: number =
      linkLocation?.plLongitude || DEFAULT_USER_LOCATION.plLongitude;
    if (mapLocation?.latitude && mapLocation?.longitude) {
      if (
        Math.abs(mapLocation?.latitude) > 90 &&
        Math.abs(mapLocation?.longitude) < 90
      ) {
        lat = mapLocation?.longitude;
        lng = mapLocation?.latitude;
      } else {
        lat = mapLocation?.latitude;
        lng = mapLocation?.longitude;
      }
    }
    return {
      lat,
      lng,
    };
  }, [mapLocation, linkLocation]);

  const todayIndex = useMemo(() => {
    return business?.isToday || DateTime.now().weekday - 1;
  }, [business?.isToday]);

  const businessOpenText = useMemo(() => {
    if (
      (business && business.plType === BusinessType.DeliveryType) ||
      business.plType === BusinessType.DispensaryType
    ) {
      if (business?.isOpen) {
        return 'Open Now';
      }
      return 'Closed Now';
    }
    return '';
  }, [business]);

  return (
    <div className={s.root}>
      <h2 id="about" className={s.title}>
        About
      </h2>
      <div className={s.description}>
        {business?.bizClaim || business?.bizClaimUnblurred ? (
          <p>{getBusinessAbout(business, selectedLocation, linkLocation)}</p>
        ) : business?.bizDescription ? (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(business?.bizDescription || ''),
            }}
          />
        ) : null}
      </div>
      {business.plType !== BusinessType.BrandType &&
      business.plType !== BusinessType.MailOrderType ? (
        <div className={s.mapScheduleContainer}>
          {mapLocation ? (
            <div className={s.mapContainer}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                yesIWantToUseGoogleMapApiInternals
                options={{
                  ...MAP_OPTIONS,
                  zoomControl:
                    !business?.bizClaim && !business?.bizClaimUnblurred,
                  fullscreenControl:
                    !business?.bizClaim && !business?.bizClaimUnblurred,
                }}
                draggable={!business?.bizClaim && !business?.bizClaimUnblurred}
                defaultCenter={defaultCenter}
                defaultZoom={12}>
                <Marker
                  id={`single-marker-${business?.bizBusinessID}`}
                  lat={defaultCenter.lat}
                  lng={defaultCenter.lng}
                  type={
                    business?.bizClaim || business?.bizClaimUnblurred
                      ? 'question'
                      : business.plType
                  }
                  showImage={
                    business?.bizClaim || business?.bizClaimUnblurred
                      ? false
                      : !!business.bizHasMapPin
                  }
                  image={
                    business?.bizClaim || business?.bizClaimUnblurred
                      ? undefined
                      : getImageLink(business.mdaLocalFileName, 72)
                  }
                />
              </GoogleMapReact>
            </div>
          ) : null}
          {business.plType !== BusinessType.BrandType &&
          business.plType !== BusinessType.MailOrderType &&
          addressText ? (
            business?.bizClaim || business?.bizClaimUnblurred ? (
              <div className={s.streetAddressMobileClaimContainer}>
                <div className={s.aboutClaimBarShort} />
                <div className={s.aboutClaimBar} />
              </div>
            ) : (
              <div className={s.streetAddressMobile}>{addressText}</div>
            )
          ) : null}
          {business?.bizClaim ||
          business?.bizClaimUnblurred ||
          business?.workingHours ? (
            <div className={s.workingHoursContainer}>
              <div className={s.workingHoursRowContainer}>
                <div className={s.workingHourTitle}>Working Hours</div>
                {business?.bizClaim || business?.bizClaimUnblurred ? (
                  <div className={s.workingHourClaim}>
                    <div className={s.aboutClaimBar} />
                  </div>
                ) : (
                  <div
                    id="hours"
                    className={
                      businessOpenText === 'Open Now'
                        ? s.workingHourOpen
                        : s.workingHourClose
                    }>
                    {businessOpenText}
                  </div>
                )}
                <div className={s.workingHoursDisclaimerMobile}>
                  * Hours of operation are listed in the business’ timezone
                </div>
              </div>
              <div className={s.workingTimeRowContainer}>
                <div className={s.timeTableContainer}>
                  <div className={s.timeTableDayColumn}>
                    {dayItems.map((item, dayIndex: number) => (
                      <div
                        key={item}
                        className={
                          todayIndex === dayIndex
                            ? s.timeTableItemActive
                            : s.timeTableItem
                        }>
                        {`${item}:`}
                      </div>
                    ))}
                  </div>
                  <div className={s.timeTableColumn}>
                    {business?.bizClaim || business?.bizClaimUnblurred
                      ? dayItems.map((hour, dayIndex: number) => (
                          <div
                            key={`open-${dayIndex}`}
                            className={
                              todayIndex === dayIndex
                                ? s.timeTableItemActive
                                : s.timeTableItem
                            }>
                            {'09:00 AM - 05:00 PM'}
                          </div>
                        ))
                      : (business?.workingHours || []).map(
                          (hour, dayIndex: number) => (
                            <div
                              key={`open-${dayIndex}`}
                              className={
                                todayIndex === dayIndex
                                  ? s.timeTableItemActive
                                  : s.timeTableItem
                              }>
                              {business?.workingHours &&
                              business?.workingHours.length > dayIndex &&
                              business?.workingHours[dayIndex] &&
                              business?.workingHours[dayIndex]?.ophIsOpen === 1
                                ? `${DateTime.fromFormat(
                                    hour?.ophOpenTime,
                                    'hh:mm:ss',
                                  ).toFormat(
                                    'hh:mm a',
                                  )} - ${DateTime.fromFormat(
                                    hour?.ophCloseTime,
                                    'hh:mm:ss',
                                  ).toFormat('hh:mm a')}`
                                : 'Closed'}
                            </div>
                          ),
                        )}
                  </div>
                </div>
                <div className={s.workingHoursDisclaimer}>
                  * Hours of operation are listed in the business’ timezone
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      {business.plType !== BusinessType.BrandType &&
      business.plType !== BusinessType.MailOrderType &&
      addressText ? (
        business?.bizClaim || business?.bizClaimUnblurred ? (
          <div className={s.streetAddressClaimContainer}>
            <div className={s.aboutClaimBar} />
            <div className={s.aboutClaimBarLong} />
          </div>
        ) : (
          <div className={s.streetAddress}>{addressText}</div>
        )
      ) : null}
    </div>
  );
});
