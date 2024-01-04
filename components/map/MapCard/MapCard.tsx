import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Business, BusinessDeals, Product } from '../../../generated/graphql';
import s from './MapCard.module.css';
import {
  formatMapPrice,
  transformBusinessTypeToSlug,
} from '../../../utils/string';
import { Route } from '../../../config/Routes';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { Featured } from '../../icons/Featured';
import { Verified } from '../../icons/Verified';
import { getCleanUrl } from '../../../utils/link';
import { AnalyticsAction, useSaveAnalytics } from '../../../services/analytics';
import { getProductMinPrice } from '../../../utils/product';
import { hasWindow } from '../../../utils/window';

type SliderType = {
  numberOfStars: number;
  starDimension: string;
  starSpacing: string;
  rating: number;
  starRatedColor: string;
  starEmptyColor: string;
};

const DynamicStarRatings = dynamic<SliderType>(
  // @ts-ignore
  () => import('react-star-ratings'),
  {
    ssr: false,
  },
);

interface Props {
  product?: Product;
  business?: Business;
  deal?: BusinessDeals;
  selected?: boolean;
  setHoverBusiness?: (
    props: { businessId: string | number; lat: number; lng: number } | null,
  ) => void;
  analyticsAction?: AnalyticsAction;
  onClick?: () => void;
  mobile?: boolean;
  showClaim?: boolean;
  openNewWindow?: boolean;
  linkQueryParams?: string;
  sendGTMAction?: string;
}

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const MapCard = React.memo(
  ({
    business,
    product,
    deal: businessDeal,
    selected,
    setHoverBusiness,
    analyticsAction,
    onClick,
    showClaim,
    mobile,
    openNewWindow = false,
    linkQueryParams = '',
    sendGTMAction = '',
  }: Props) => {
    const router = useRouter();

    const businessHref = useMemo(() => {
      if (business && product) {
        if (
          business.plType === BusinessType.DeliveryType ||
          business.plType === BusinessType.DispensaryType
        ) {
          return `/${transformBusinessTypeToSlug(
            business.plType,
          )}/${business.contact?.provinceInitial?.toLowerCase()}/${
            business.contact?.regionSlug
          }/${business.bizSlug}/${product.prdSlug}${linkQueryParams}`;
        }
        return `/${transformBusinessTypeToSlug(business.plType)}/${
          business.bizSlug
        }/${product.prdSlug}${linkQueryParams}`;
      }
      if (business) {
        if (
          business.plType === BusinessType.DeliveryType ||
          business.plType === BusinessType.DispensaryType
        ) {
          return `/${transformBusinessTypeToSlug(
            business.plType,
          )}/${business.contact?.provinceInitial?.toLowerCase()}/${
            business.contact?.regionSlug
          }/${business.bizSlug}${linkQueryParams}`;
        }
        return `/${transformBusinessTypeToSlug(business.plType)}/${
          business.bizSlug
        }${linkQueryParams}`;
      }
      return '';
    }, [business, product, linkQueryParams]);

    const dealBusiness = useMemo(
      () =>
        businessDeal?.business && businessDeal?.business.length > 0
          ? businessDeal?.business[0]
          : null,
      [businessDeal?.business],
    );

    const dealHref = useMemo(() => {
      if (dealBusiness) {
        if (
          dealBusiness.plType === BusinessType.DeliveryType ||
          dealBusiness.plType === BusinessType.DispensaryType
        ) {
          return `/${transformBusinessTypeToSlug(
            dealBusiness.plType,
          )}/${dealBusiness.contact?.provinceInitial?.toLowerCase()}/${
            dealBusiness.contact?.regionSlug
          }/${dealBusiness.bizSlug}${Route.Deals}/${businessDeal?.dlsSlug}`;
        }
        return `/${transformBusinessTypeToSlug(dealBusiness.plType)}/${
          dealBusiness.bizSlug
        }${Route.Deals}/${businessDeal?.dlsSlug}`;
      }
      return `${getCleanUrl(router.asPath)}/${businessDeal?.dlsSlug}`;
    }, [dealBusiness, router.asPath]);

    const rootClass = cn(s.root, {
      [s.rootSelected]: selected,
    });

    const onHoverIn = useCallback(() => {
      if (
        business?.bizBusinessID &&
        business.contact?.bizLongitude &&
        business.contact?.bizLatitude &&
        setHoverBusiness
      ) {
        let lat: number = 0;
        let lng: number = 0;
        if (business.contact?.bizLatitude && business.contact?.bizLongitude) {
          if (
            Math.abs(business.contact?.bizLatitude) > 90 &&
            Math.abs(business.contact?.bizLongitude) < 90
          ) {
            lat = business.contact?.bizLongitude;
            lng = business.contact?.bizLatitude;
          } else {
            lat = business.contact?.bizLatitude;
            lng = business.contact?.bizLongitude;
          }
        }
        if (lat && lng) {
          setHoverBusiness({
            businessId: business.bizBusinessID,
            lat,
            lng,
          });
        }
      }
    }, [business, setHoverBusiness]);

    const onHoverOut = useCallback(() => {
      if (business?.bizBusinessID && setHoverBusiness) {
        setHoverBusiness(null);
      }
    }, [business, setHoverBusiness]);

    const { saveAnalytics } = useSaveAnalytics();
    const onHref = useCallback(() => {
      if (onClick) {
        onClick();
      }
      if (analyticsAction && business) {
        saveAnalytics(business?.bizBusinessID, analyticsAction);
      }
      if (hasWindow && business && sendGTMAction) {
        (window as any)?.dataLayer?.push({
          event: sendGTMAction || '',
          store_name: business?.bizName || '',
        });
      }
    }, [sendGTMAction, onClick, business, analyticsAction]);

    const isBizClaim = useMemo(
      () => showClaim && !!business?.bizClaim,
      [showClaim, business?.bizClaim],
    );

    const isBizClaimUnblurred = useMemo(
      () => showClaim && !!business?.bizClaimUnblurred,
      [showClaim, business?.bizClaimUnblurred],
    );

    return (
      <Link
        prefetch={false}
        href={business ? businessHref : businessDeal ? dealHref : '#'}>
        <a
          id={
            business
              ? `${mobile ? 'mobile-' : ''}business-${business.bizBusinessID}`
              : businessDeal
              ? `deal-${businessDeal.dlsDealsID}`
              : undefined
          }
          onClick={onHref}
          onAuxClick={onHref}
          onContextMenu={onHref}
          className={rootClass}
          target={openNewWindow ? '_blank' : undefined}
          href={business ? businessHref : businessDeal ? dealHref : '#'}>
          {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
          <div
            onMouseOver={onHoverIn}
            onMouseLeave={onHoverOut}
            className={s.cardRow}>
            <div className={s.businessImageRowContainer}>
              <img
                src={getImageLink(
                  business
                    ? business.mdaLocalFileName
                    : businessDeal
                    ? businessDeal.mdaLocalFileName
                    : null,
                )}
                onError={setDefaultImageOnError}
                className={cn(s.businessImage, {
                  [s.businessImageBlur]: isBizClaim,
                })}
                alt={
                  business
                    ? business.bizName
                    : businessDeal
                    ? businessDeal.dlsName
                    : 'bizImage'
                }
              />
              {business &&
              business.bizIsFeatured &&
              !isBizClaim &&
              !isBizClaimUnblurred ? (
                <div className={s.businessFeaturedContainer}>
                  <Featured />
                </div>
              ) : null}
            </div>
            <div className={s.cardContent}>
              <div className={s.nameContainer}>
                <div className={s.nameBusinessRow}>
                  {business
                    ? business.bizName
                    : businessDeal
                    ? businessDeal.dlsName
                    : ''}
                </div>
                {business?.bizIsVerified && !isBizClaim ? (
                  <Verified className={s.verified} />
                ) : null}
              </div>
              {business && !isBizClaim && !isBizClaimUnblurred ? (
                <div className={s.typeBusinessRow}>
                  {business
                    ? business.plType
                    : dealBusiness
                    ? dealBusiness.bizName
                    : ''}
                </div>
              ) : null}
              {business &&
              business.contact &&
              !isBizClaim &&
              !isBizClaimUnblurred ? (
                <div
                  className={
                    s.locationBusinessRow
                  }>{`${business.contact?.regionName}, ${business.contact?.provinceInitial}`}</div>
              ) : null}
              {business && !isBizClaim && !isBizClaimUnblurred ? (
                <div className={s.rate}>
                  {business.rvwCount ? (
                    <>
                      <DynamicStarRatings
                        numberOfStars={5}
                        starDimension="16px"
                        starSpacing="1px"
                        rating={business.rvwScoreAvg || 0}
                        starRatedColor="#DFB300"
                        starEmptyColor="#E4E9E8"
                      />
                      <div className={s.reviewCount}>{business.rvwCount}</div>
                    </>
                  ) : (
                    <div className={s.noReview}>NO REVIEWS</div>
                  )}
                </div>
              ) : null}
            </div>
            {product && !isBizClaim && !isBizClaimUnblurred ? (
              <div className={s.productPrice}>
                {formatMapPrice(getProductMinPrice(product).value)}
              </div>
            ) : null}
            {isBizClaim || isBizClaimUnblurred ? (
              <div className={s.claimContainerRow}>
                <div className={s.claimText}>Claim This Listing</div>
              </div>
            ) : null}
          </div>
        </a>
      </Link>
    );
  },
);
