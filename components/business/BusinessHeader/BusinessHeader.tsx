import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import { useMediaQueries } from '@react-hook/media-query';
import { DateTime } from 'luxon';
import { Business } from '../../../generated/graphql';
import s from './BusinessHeader.module.css';
import { Delivery } from '../../icons/Delivery';
import { MailOrder } from '../../icons/MailOrder';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { Share } from '../../common/Share/Share';
import { Brand } from '../../icons/Brand';
import { Dispensary } from '../../icons/Dispensary';
import { Verified } from '../../icons/Verified';
import { Loop } from '../../icons/Loop';
import { InfoTime } from '../../icons/InfoTime';
import { useFragmentScroll } from '../../../utils/window';
import { ClaimModal } from '../../common/ClaimModal/ClaimModal';

const ReactViewer = dynamic<any>(() => import('react-viewer'), { ssr: false });

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
  displayVariant?: 'side' | 'main';
  title?: string;
}

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const BusinessHeader = React.memo(
  ({ business, title, displayVariant }: Props) => {
    const cardContainer = cn(s.cardColumn, {
      [s.cardColumnReverse]: displayVariant === 'side',
    });

    const cardRowContainer = cn(s.cardRow, {
      [s.cardRowReverse]: displayVariant === 'side',
    });
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [toolTipPosition, setToolTipPosition] = useState<{
      [key: string]: number;
    }>({ top: 0, left: 0 });

    const scrollTo = useFragmentScroll();

    const scrollIntoView = useCallback(() => {
      setIsOpenModal(false);
      scrollTo('hours');
    }, []);

    useEffect(() => {
      const wrapper = document.getElementById('tooltip-wrapper');
      if (wrapper) {
        const { top, left } = wrapper.getBoundingClientRect();
        setToolTipPosition({
          top,
          left,
        });
      }
    }, [isOpenModal]);

    const imageContainer = cn(s.productImageContainer, {
      [s.productImageContainerSmall]: displayVariant === 'side',
    });

    const businessHourClass = cn(s.businessHour, {
      [s.isIcon]: !business.willOpen,
    });

    const rateContainer = cn(s.rateContainer, {
      [s.rateContainerSide]: displayVariant === 'side',
    });
    const titleClass = displayVariant === 'side' ? s.title : s.nameBusiness;

    const shareClass =
      displayVariant === 'side' && title
        ? s.shareContainerHideMobile
        : s.shareContainer;

    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
    });

    const openData = useMemo(() => {
      if (business?.willOpen) {
        const currentDay = DateTime.fromFormat(
          business?.willOpen,
          'yyyy-MM-dd HH:mm:ss',
        ).toFormat('ccc');
        const time = business?.willOpen || '';
        return `${currentDay} ${DateTime.fromFormat(
          time.slice(time.length - 8),
          'HH:mm:ss',
        ).toFormat('hh:mm a')}`;
      }
      return '';
    }, [business]);

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
    const [showImageViewer, setShowImageViewer] = useState<boolean>(false);

    const onShowImageViewer = useCallback(() => {
      document.body.style.overflow = 'hidden';
      setShowImageViewer(true);
    }, []);

    const onHideImageViewer = useCallback(() => {
      document.body.style.overflow = 'scroll';
      setShowImageViewer(false);
    }, []);

    const [claimModalVisible, setClaimModalVisible] = useState<boolean>(false);
    const onClaimListing = useCallback(() => {
      setClaimModalVisible(true);
    }, []);

    const onHideOpen = useCallback(() => setIsOpenModal(false), []);
    const onShowOpen = useCallback(() => setIsOpenModal(true), []);
    const openModalStyle = useMemo(
      () => ({
        display: isOpenModal ? 'block' : 'hidden',
        opacity: isOpenModal ? 1 : 0,
        top: toolTipPosition.top + 27,
        left: toolTipPosition.left + 10,
      }),
      [toolTipPosition, isOpenModal],
    );

    const isBizClaim = useMemo(
      () => !!business?.bizClaim,
      [business?.bizClaim],
    );

    const isBizClaimUnblurred = useMemo(
      () => !!business?.bizClaimUnblurred,
      [business?.bizClaimUnblurred],
    );

    return (
      <>
        <div className={s.root}>
          <div className={cardContainer}>
            <div
              onClick={isBizClaim ? undefined : onShowImageViewer}
              className={imageContainer}>
              <img
                className={cn(s.productImage, {
                  [s.productImageBlur]: isBizClaim,
                })}
                src={getImageLink(business.mdaLocalFileName, 210)}
                onError={setDefaultImageOnError}
                alt={business.bizName}
              />
              {isBizClaim ? (
                <div className={s.claimImageContainer}>
                  <div className={s.claimImageText}>Claim This Listing</div>
                </div>
              ) : (
                <Loop className={s.imageLoop} />
              )}
            </div>
            <div className={cardRowContainer}>
              <div className={s.nameContainer}>
                <h1 className={titleClass}>
                  {matches?.isMobile
                    ? title || business.bizName
                    : business.bizName}
                </h1>
                {!isBizClaim &&
                !isBizClaimUnblurred &&
                !title &&
                business.bizName &&
                business.bizIsVerified ? (
                  <Verified className={s.verifiedDesktop} />
                ) : null}
              </div>
              {!isBizClaim && !isBizClaimUnblurred ? (
                <div className={rateContainer}>
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
                  <div className={s.productTypeContainer}>
                    {business.plType === BusinessType.BrandType ? (
                      <Brand />
                    ) : null}
                    {business.plType === BusinessType.DispensaryType ? (
                      <Dispensary />
                    ) : null}
                    {business.plType === BusinessType.DeliveryType ? (
                      <Delivery />
                    ) : null}
                    {business.plType === BusinessType.MailOrderType ? (
                      <MailOrder />
                    ) : null}
                    <div className={s.typeBusiness}>{business.plType}</div>
                  </div>
                </div>
              ) : (
                <div onClick={onClaimListing} className={s.claimContainer}>
                  Claim This Listing
                </div>
              )}
            </div>
          </div>
          {!isBizClaim &&
          !isBizClaimUnblurred &&
          displayVariant !== 'side' &&
          businessOpenText ? (
            <div
              className={
                businessOpenText === 'Closed Now'
                  ? s.businessHourMobile
                  : s.businessHourOpenMobile
              }>
              {businessOpenText === 'Closed Now' && !!business.willOpen
                ? `closed until ${openData}`
                : businessOpenText}
            </div>
          ) : null}
          <div className={shareClass}>
            <Share businessID={business.bizBusinessID} />
            {!title && business.bizName && business.bizIsVerified ? (
              <Verified className={s.verifiedMobile} />
            ) : null}
          </div>
          {!isBizClaim && !isBizClaimUnblurred && businessOpenText ? (
            <div
              className={
                businessOpenText === 'Closed Now'
                  ? businessHourClass
                  : s.businessHourOpen
              }>
              {businessOpenText}
              {businessOpenText === 'Closed Now' && !!business.willOpen && (
                <div
                  className={s.infoTime}
                  id="tooltip-wrapper"
                  onMouseLeave={onHideOpen}
                  onMouseEnter={onShowOpen}>
                  <InfoTime />
                  <div style={openModalStyle} className={s.openTime}>
                    <p>
                      Opens on <span>{openData}</span>
                    </p>
                    <div onClick={scrollIntoView}>Show working hours</div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
        {showImageViewer ? (
          <ReactViewer
            className={s.imageViewer}
            visible
            onClose={onHideImageViewer}
            noImgDetails
            noNavbar
            zoomable={false}
            showTotal={false}
            changeable={false}
            scalable={false}
            drag={false}
            images={[
              {
                src: getImageLink(
                  business.mdaLocalFileName,
                  matches.isMobile ? 500 : undefined,
                  undefined,
                  !matches.isMobile,
                ),
              },
            ]}
          />
        ) : null}
        {!isBizClaim && !isBizClaimUnblurred ? null : (
          <ClaimModal
            isOpen={claimModalVisible}
            setIsOpen={setClaimModalVisible}
          />
        )}
      </>
    );
  },
);
