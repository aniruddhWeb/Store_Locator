import React, { useCallback, useMemo, useState } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import cn from 'classnames';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';
import { useMediaQueries } from '@react-hook/media-query';
import { Business, BusinessDeals } from '../../../generated/graphql';
import s from './DealInfo.module.css';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { BusinessContact } from '../../business/BusinessContact/BusinessContact';
import { Loop } from '../../icons/Loop';
import { Copy } from '../../icons/Copy';
import { hasWindow } from '../../../utils/window';
import { Button } from '../../common/Button/Button';
import { escapeHtml } from '../../../utils/string';

const ReactViewer = dynamic<any>(() => import('react-viewer'), { ssr: false });

interface Props {
  businessDeal: BusinessDeals;
  business?: Business | null;
  mobile?: boolean;
  desktop?: boolean;
}

export const DealInfo = React.memo(
  ({ mobile, desktop, businessDeal, business }: Props) => {
    const countDownDate = useMemo(() => {
      return businessDeal?.dlsExpireDateToronto
        ? DateTime.fromISO(businessDeal?.dlsExpireDateToronto, {
            zone: 'utc',
          }).toJSDate()
        : undefined;
    }, [businessDeal?.dlsExpireDateToronto]);

    const countDownRenderer = useCallback(
      ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
        return (
          <>
            <div className={s.dealDetailsValue}>
              {completed ? 'Expired' : 'Expires'}
            </div>
            <div className={s.dealDetailsTimeTitle}>
              {completed
                ? '00:00:00'
                : `${days > 0 ? `${days}D ` : ''}${
                    hours < 10 ? `0${hours}` : hours
                  }:${minutes < 10 ? `0${minutes}` : minutes}:${
                    seconds < 10 ? `0${seconds}` : seconds
                  }`}
            </div>
          </>
        );
      },
      [],
    );

    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
    });

    const [showImageViewer, setShowImageViewer] = useState<boolean>(false);

    const onShowImageViewer = useCallback(() => {
      document.body.style.overflow = 'hidden';
      setShowImageViewer(true);
    }, []);

    const onHideImageViewer = useCallback(() => {
      document.body.style.overflow = 'scroll';
      setShowImageViewer(false);
    }, []);

    const onCouponCopy = useCallback(
      (e: any) => {
        e.stopPropagation();
        if (hasWindow && businessDeal?.dlsCouponCode) {
          try {
            navigator?.clipboard?.writeText(businessDeal?.dlsCouponCode);
            // eslint-disable-next-line no-empty
          } catch (error) {}
        }
      },
      [businessDeal],
    );

    const rootClass = cn(s.root, {
      [s.rootDesktop]: desktop,
      [s.rootMobile]: mobile,
    });

    return (
      <>
        <div className={rootClass}>
          <div className={s.dealRowContainer}>
            <div className={s.imageColumnContainer}>
              <div onClick={onShowImageViewer} className={s.dealImageContainer}>
                <img
                  className={s.dealImage}
                  src={getImageLink(businessDeal.mdaLocalFileName, 240)}
                  onError={setDefaultImageOnError}
                  alt={businessDeal.dlsName}
                />
                <Loop className={s.imageLoop} />
              </div>
              <div className={s.claimDesktop}>
                {businessDeal?.dlsUrl ? (
                  <Button
                    fullWidth
                    hrefProps={{
                      target: '_blank',
                    }}
                    href={businessDeal?.dlsUrl}
                    buttonText="Claim This Deal"
                    buttonStyle={buttonGreenStyle}
                  />
                ) : null}
              </div>
            </div>
            <div className={s.dealNameContainer}>
              {desktop ? (
                <h1 className={s.nameDeal}>{businessDeal.dlsName}</h1>
              ) : (
                <div className={s.nameDeal}>{businessDeal.dlsName}</div>
              )}
              {businessDeal.dlsInstructions ? (
                <div className={s.dealsInstructionsMobile}>
                  {escapeHtml(businessDeal.dlsInstructions || '')}
                </div>
              ) : null}
              <div className={s.claimMobile}>
                {businessDeal?.dlsUrl ? (
                  <Button
                    fullWidth
                    hrefProps={{
                      target: '_blank',
                    }}
                    href={businessDeal?.dlsUrl}
                    buttonText="Claim This Deal"
                    buttonStyle={buttonGreenMobileStyle}
                  />
                ) : null}
              </div>
              {business && mobile ? (
                <BusinessContact
                  showBorderRadius
                  mobile
                  mobileVisible
                  noMargin
                  business={business}
                />
              ) : null}
              <div className={s.dealDetailsRowContainer}>
                <div className={s.dealDetailsItemsRow}>
                  {businessDeal.dlsExpireDateToronto ? (
                    <div className={s.dealDetailsTimeContainer}>
                      <Countdown
                        date={countDownDate}
                        renderer={countDownRenderer}
                      />
                    </div>
                  ) : null}
                  {businessDeal.dlsApplyTo ? (
                    <div className={s.dealDetailsTypeContainer}>
                      <div className={s.dealDetailsValue}>{'Applies to'}</div>
                      <div className={s.dealDetailsTypeTitle}>
                        {businessDeal.dlsApplyTo}
                      </div>
                    </div>
                  ) : null}
                  {businessDeal.dlsCouponCode ? (
                    <div className={s.dealDetailsCouponContainer}>
                      <div className={s.dealDetailsCouponValue}>
                        {'Coupon'}
                        <div
                          onClick={onCouponCopy}
                          className={s.dealDetailsCouponCopy}>
                          <Copy />
                        </div>
                      </div>
                      <div className={s.dealDetailsCouponTitle}>
                        {businessDeal.dlsCouponCode}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              {businessDeal.dlsInstructions ? (
                <div className={s.dealsInstructions}>
                  {escapeHtml(businessDeal.dlsInstructions || '')}
                </div>
              ) : null}
            </div>
          </div>
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
            images={[
              {
                src: getImageLink(
                  businessDeal.mdaLocalFileName,
                  matches.isMobile ? 500 : undefined,
                  undefined,
                  !matches.isMobile,
                ),
              },
            ]}
          />
        ) : null}
      </>
    );
  },
);

const buttonGreenStyle = {
  padding: '0 16px',
  height: 38,
  marginTop: '16px',
  background: '#61AB62',
  maxWidth: 210,
  width: 'calc(100% - 32px)',
};

const buttonGreenMobileStyle = {
  padding: '0 16px',
  height: 38,
  marginTop: '16px',
  background: '#61AB62',
};
