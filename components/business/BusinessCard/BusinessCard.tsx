import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import { Business, Product } from '../../../generated/graphql';
import s from './BusinessCard.module.css';
import { Delivery } from '../../icons/Delivery';
import { MailOrder } from '../../icons/MailOrder';
import {
  formatPrice,
  transformBusinessTypeToSlug,
} from '../../../utils/string';
import { Certified } from '../../icons/Certified';
import { Brand } from '../../icons/Brand';
import { Dispensary } from '../../icons/Dispensary';
import { AnalyticsAction, useSaveAnalytics } from '../../../services/analytics';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { Verified } from '../../icons/Verified';
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
  business: Business;
  product?: Product | null;
  variant?: 'column' | 'row';
  gridMode?: boolean;
  showLocation?: boolean;
  showClaim?: boolean;
  hideType?: boolean;
  certified?: boolean;
  analyticsAction?: AnalyticsAction;
  priority?: boolean;
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

export const BusinessCard = React.memo(
  ({
    business,
    product,
    variant = 'column',
    gridMode,
    showClaim,
    showLocation,
    hideType,
    certified: certifiedProp,
    analyticsAction,
    priority = false,
    openNewWindow = false,
    linkQueryParams = '',
    sendGTMAction = '',
  }: Props) => {
    const businessHref = useMemo(() => {
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
    }, [business, linkQueryParams]);

    const showBusinessLocation = useMemo(
      () =>
        (showLocation &&
          business.contact?.regionName &&
          business.contact?.provinceInitial) ||
        (showLocation === undefined &&
          business.contact?.regionName &&
          business.contact?.provinceInitial &&
          (business.plType === BusinessType.DeliveryType ||
            business.plType === BusinessType.DispensaryType)),
      [showLocation, business?.plType, business?.contact],
    );

    const { saveAnalytics } = useSaveAnalytics();
    const onHref = useCallback(() => {
      if (analyticsAction && business) {
        saveAnalytics(business?.bizBusinessID, analyticsAction);
      }
      if (hasWindow && business && sendGTMAction) {
        (window as any)?.dataLayer?.push({
          event: sendGTMAction || '',
          store_name: business?.bizName || '',
        });
      }
    }, [sendGTMAction, business, analyticsAction]);

    const isBizClaim = useMemo(
      () => showClaim && !!business?.bizClaim,
      [showClaim, business?.bizClaim],
    );

    const isBizClaimUnblurred = useMemo(
      () => showClaim && !!business?.bizClaimUnblurred,
      [showClaim, business?.bizClaimUnblurred],
    );

    const certified = useMemo(
      () => !isBizClaim && !isBizClaimUnblurred && certifiedProp,
      [isBizClaim, isBizClaimUnblurred, certifiedProp],
    );

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

    const businessImageClass = cn(
      certified
        ? s.certifiedBusinessImageContainer
        : gridMode
        ? s.businessImageContainerGrid
        : s.businessImageContainer,
      {
        [s.businessImage]: true,
        [s.businessImageBlur]: isBizClaim,
      },
    );

    return (
      <Link prefetch={false} href={businessHref}>
        <a
          className={gridMode ? s.rootGrid : s.root}
          href={businessHref}
          target={openNewWindow ? '_blank' : undefined}
          onClick={onHref}
          onAuxClick={onHref}
          onContextMenu={onHref}>
          {variant === 'column' ? (
            <>
              <div className={gridMode ? s.cardColumnGrid : s.cardColumn}>
                <div
                  className={
                    gridMode
                      ? s.businessImageWrapperGrid
                      : s.businessImageWrapper
                  }>
                  {certified ? (
                    <div className={s.certifiedImageContainer}>
                      <Certified className={s.certifiedImage} />
                    </div>
                  ) : null}
                  <img
                    src={getImageLink(business.mdaLocalFileName)}
                    onError={setDefaultImageOnError}
                    className={businessImageClass}
                    alt={business.bizName}
                  />
                  {business.plType === BusinessType.DeliveryType ? (
                    <div className={s.businessTypeWrapper}>
                      <div className={s.businessTypeContainer}>
                        <Delivery />
                      </div>
                    </div>
                  ) : null}
                  {business.plType === BusinessType.MailOrderType ? (
                    <div className={s.businessTypeWrapper}>
                      <div className={s.businessTypeContainer}>
                        <MailOrder />
                      </div>
                    </div>
                  ) : null}
                  {business.plType === BusinessType.BrandType ? (
                    <div className={s.businessTypeWrapper}>
                      <div className={s.businessTypeContainer}>
                        <Brand />
                      </div>
                    </div>
                  ) : null}
                  {business.plType === BusinessType.DispensaryType ? (
                    <div className={s.businessTypeWrapper}>
                      <div className={s.businessTypeContainer}>
                        <Dispensary />
                      </div>
                    </div>
                  ) : null}
                  {isBizClaim ? (
                    <div className={s.claimContainer}>
                      <div className={s.claimText}>Claim This Listing</div>
                    </div>
                  ) : null}
                </div>
                <div className={s.nameContainer}>
                  <div
                    className={cn(s.nameBusiness, {
                      [s.nameBusinessGrey]: !!isBizClaim,
                    })}>
                    {business.bizName}
                  </div>
                  {!isBizClaim &&
                  !isBizClaimUnblurred &&
                  business?.bizIsVerified ? (
                    <Verified className={s.verified} />
                  ) : null}
                </div>
                {hideType ? null : (
                  <div
                    className={cn(s.typeBusiness, {
                      [s.typeBusinessGrey]: !!isBizClaim,
                    })}>
                    {business.plType}
                  </div>
                )}
                {showBusinessLocation ? (
                  <div
                    className={cn(s.locationBusiness, {
                      [s.locationBusinessGrey]: !!isBizClaim,
                    })}>{`${business.contact?.regionName}, ${business.contact?.provinceInitial}`}</div>
                ) : null}
                <div className={s.rate}>
                  {business.rvwCount ? (
                    <>
                      <DynamicStarRatings
                        numberOfStars={5}
                        starDimension="16px"
                        starSpacing="1px"
                        rating={
                          isBizClaim || isBizClaimUnblurred
                            ? 0
                            : business.rvwScoreAvg || 0
                        }
                        starRatedColor="#DFB300"
                        starEmptyColor="#E4E9E8"
                      />
                      {isBizClaim || isBizClaimUnblurred ? null : (
                        <div className={s.reviewCount}>{business.rvwCount}</div>
                      )}
                    </>
                  ) : (
                    <div className={s.noReview}>NO REVIEWS</div>
                  )}
                </div>
                {product ? (
                  <div className={s.priceBusiness}>
                    {formatPrice(getProductMinPrice(product).value)}
                  </div>
                ) : null}
                {businessOpenText ? (
                  <div
                    className={
                      businessOpenText === 'Closed Now'
                        ? s.businessClose
                        : s.businessOpen
                    }>
                    <span>{businessOpenText}</span>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <div className={s.cardRow}>
                <div className={s.businessImageRowContainer}>
                  <img
                    src={getImageLink(business.mdaLocalFileName)}
                    onError={setDefaultImageOnError}
                    className={cn(s.businessImage, {
                      [s.businessImageBlur]: !!isBizClaim,
                    })}
                    alt={business.bizName}
                  />
                  {business.plType === BusinessType.DeliveryType ? (
                    <div className={s.businessTypeWrapper}>
                      <div className={s.businessTypeContainer}>
                        <Delivery />
                      </div>
                    </div>
                  ) : null}
                  {business.plType === BusinessType.MailOrderType ? (
                    <div className={s.businessTypeWrapper}>
                      <div className={s.businessTypeContainer}>
                        <MailOrder />
                      </div>
                    </div>
                  ) : null}
                  {business.plType === BusinessType.BrandType ? (
                    <div className={s.businessTypeWrapper}>
                      <div className={s.businessTypeContainer}>
                        <Brand />
                      </div>
                    </div>
                  ) : null}
                  {business.plType === BusinessType.DispensaryType ? (
                    <div className={s.businessTypeWrapper}>
                      <div className={s.businessTypeContainer}>
                        <Dispensary />
                      </div>
                    </div>
                  ) : null}
                  {isBizClaim ? (
                    <div className={s.claimContainerRow}>
                      <div className={s.claimText}>Claim This Listing</div>
                    </div>
                  ) : null}
                </div>
                <div className={s.cardContent}>
                  <div className={s.nameContainerRow}>
                    <div
                      className={cn(s.nameBusinessRow, {
                        [s.nameBusinessGrey]: !!isBizClaim,
                      })}>
                      {business.bizName}
                    </div>
                    {business?.bizIsVerified ? (
                      <Verified className={s.verified} />
                    ) : null}
                  </div>
                  {hideType ? null : (
                    <div
                      className={cn(s.typeBusinessRow, {
                        [s.typeBusinessGrey]:
                          !!isBizClaim || !!isBizClaimUnblurred,
                      })}>
                      {business.plType}
                    </div>
                  )}
                  {showBusinessLocation ? (
                    <div
                      className={cn(s.locationBusinessRow, {
                        [s.locationBusinessGrey]:
                          !!isBizClaim || !isBizClaimUnblurred,
                      })}>{`${business.contact?.regionName}, ${business.contact?.provinceInitial}`}</div>
                  ) : null}
                  <div className={s.rate}>
                    {business.rvwCount ? (
                      <>
                        <DynamicStarRatings
                          numberOfStars={5}
                          starDimension="16px"
                          starSpacing="1px"
                          rating={
                            isBizClaim || isBizClaimUnblurred
                              ? 0
                              : business.rvwScoreAvg || 0
                          }
                          starRatedColor="#DFB300"
                          starEmptyColor="#E4E9E8"
                        />
                        {isBizClaim || isBizClaimUnblurred ? null : (
                          <div className={s.reviewCount}>
                            {business.rvwCount}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={s.noReview}>NO REVIEWS</div>
                    )}
                  </div>
                  {product ? (
                    <div className={s.priceBusinessRow}>
                      {formatPrice(getProductMinPrice(product).value)}
                    </div>
                  ) : null}
                  {businessOpenText ? (
                    <div
                      className={
                        businessOpenText === 'Closed Now'
                          ? s.businessClose
                          : s.businessOpen
                      }>
                      <span>{businessOpenText}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          )}
        </a>
      </Link>
    );
  },
);
