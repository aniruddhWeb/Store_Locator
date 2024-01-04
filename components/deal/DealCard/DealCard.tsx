import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Business, BusinessDeals } from '../../../generated/graphql';
import s from './DealCard.module.css';
import { transformBusinessTypeToSlug } from '../../../utils/string';
import { Route } from '../../../config/Routes';
import { Delivery } from '../../icons/Delivery';
import { MailOrder } from '../../icons/MailOrder';
import { Brand } from '../../icons/Brand';
import { Dispensary } from '../../icons/Dispensary';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { getCleanUrl } from '../../../utils/link';
import { hasWindow } from '../../../utils/window';

interface Props {
  business?: Business;
  businessDeal: BusinessDeals;
  gridMode?: boolean;
  variant?: 'column' | 'row';
  sendGTMAction?: string;
}

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const DealCard = React.memo(
  ({
    businessDeal,
    business,
    gridMode,
    variant = 'row',
    sendGTMAction = '',
  }: Props) => {
    const router = useRouter();

    const dealBusiness = useMemo(
      () =>
        business ||
        (businessDeal?.business && businessDeal?.business.length > 0
          ? businessDeal?.business[0]
          : null),
      [business, businessDeal?.business],
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

    const onHref = useCallback(() => {
      if (hasWindow && businessDeal && sendGTMAction) {
        (window as any)?.dataLayer?.push({
          event: sendGTMAction || '',
          deal_name: businessDeal?.dlsName || '',
        });
      }
    }, [sendGTMAction, businessDeal]);

    const dealCardImageRowClass = cn(s.dealCardImageRowContainer, {
      [s.dealCardImage]: true,
    });

    return (
      <Link prefetch={false} href={dealHref}>
        <a
          href={dealHref}
          onClick={onHref}
          onAuxClick={onHref}
          onContextMenu={onHref}
          className={
            gridMode ? s.rootGrid : variant === 'column' ? s.rootColumn : s.root
          }>
          {gridMode ? (
            <div className={s.cardGrid}>
              <div className={s.dealCardImageGridContainer}>
                <img
                  className={s.dealCardImage}
                  src={getImageLink(businessDeal.mdaLocalFileName)}
                  onError={setDefaultImageOnError}
                  alt={businessDeal.dlsName}
                />
                {dealBusiness?.plType === BusinessType.DeliveryType ? (
                  <div className={s.businessTypeWrapper}>
                    <div className={s.businessTypeContainer}>
                      <Delivery />
                    </div>
                  </div>
                ) : null}
                {dealBusiness?.plType === BusinessType.MailOrderType ? (
                  <div className={s.businessTypeWrapper}>
                    <div className={s.businessTypeContainer}>
                      <MailOrder />
                    </div>
                  </div>
                ) : null}
                {dealBusiness?.plType === BusinessType.BrandType ? (
                  <div className={s.businessTypeWrapper}>
                    <div className={s.businessTypeContainer}>
                      <Brand />
                    </div>
                  </div>
                ) : null}
                {dealBusiness?.plType === BusinessType.DispensaryType ? (
                  <div className={s.businessTypeWrapper}>
                    <div className={s.businessTypeContainer}>
                      <Dispensary />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className={s.typeDealGrid}>{businessDeal.dlsApplyTo}</div>
              <div className={s.nameDealGrid}>{businessDeal.dlsName}</div>
              <div className={s.businessDealGrid}>
                {dealBusiness?.bizName || ''}
              </div>
            </div>
          ) : variant === 'column' ? (
            <div className={s.cardColumn}>
              <div className={s.dealCardImageColumnContainer}>
                <img
                  className={s.dealCardImage}
                  src={getImageLink(businessDeal.mdaLocalFileName)}
                  onError={setDefaultImageOnError}
                  alt={businessDeal.dlsName}
                />
                {dealBusiness?.plType === BusinessType.DeliveryType ? (
                  <div className={s.businessTypeWrapper}>
                    <div className={s.businessTypeContainer}>
                      <Delivery />
                    </div>
                  </div>
                ) : null}
                {dealBusiness?.plType === BusinessType.MailOrderType ? (
                  <div className={s.businessTypeWrapper}>
                    <div className={s.businessTypeContainer}>
                      <MailOrder />
                    </div>
                  </div>
                ) : null}
                {dealBusiness?.plType === BusinessType.BrandType ? (
                  <div className={s.businessTypeWrapper}>
                    <div className={s.businessTypeContainer}>
                      <Brand />
                    </div>
                  </div>
                ) : null}
                {dealBusiness?.plType === BusinessType.DispensaryType ? (
                  <div className={s.businessTypeWrapper}>
                    <div className={s.businessTypeContainer}>
                      <Dispensary />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className={s.typeDealColumn}>{businessDeal.dlsApplyTo}</div>
              <div className={s.nameDealColumn}>{businessDeal.dlsName}</div>
              <div className={s.businessDealColumn}>
                {dealBusiness?.bizName || ''}
              </div>
            </div>
          ) : (
            <div className={s.cardRow}>
              <img
                src={getImageLink(businessDeal.mdaLocalFileName)}
                onError={setDefaultImageOnError}
                className={dealCardImageRowClass}
                alt={businessDeal.dlsName}
              />
              <div className={s.cardContent}>
                <div className={s.typeDealRow}>{businessDeal.dlsApplyTo}</div>
                <div className={s.nameDealRow}>{businessDeal.dlsName}</div>
              </div>
            </div>
          )}
        </a>
      </Link>
    );
  },
);
