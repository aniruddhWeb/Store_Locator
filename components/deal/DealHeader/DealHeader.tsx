import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import cn from 'classnames';
import { BusinessItemFragment } from '../../../generated/graphql';
import s from './DealHeader.module.css';
import { transformBusinessTypeToSlug } from '../../../utils/string';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { Share } from '../../common/Share/Share';

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
  desktop?: boolean;
  mobile?: boolean;
  business: BusinessItemFragment;
}

enum BusinessType {
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const DealHeader = React.memo(({ business, desktop, mobile }: Props) => {
  const businessHref = useMemo(() => {
    if (
      business.plType === BusinessType.DeliveryType ||
      business.plType === BusinessType.DispensaryType
    ) {
      return `/${transformBusinessTypeToSlug(
        business.plType,
      )}/${business.contact?.provinceInitial?.toLowerCase()}/${
        business.contact?.regionSlug
      }/${business.bizSlug}`;
    }
    return `/${transformBusinessTypeToSlug(business.plType)}/${
      business.bizSlug
    }`;
  }, [business]);

  const rootClass = cn(s.root, {
    [s.rootMobile]: mobile,
    [s.rootDesktop]: desktop,
  });

  const businessImageRowClass = cn(s.businessImageContainer, {
    [s.businessImage]: true,
  });

  return (
    <div className={rootClass}>
      <div className={s.cardRow}>
        <img
          className={businessImageRowClass}
          src={getImageLink(business.mdaLocalFileName, 240)}
          onError={setDefaultImageOnError}
          alt={business.bizName}
        />
        <div className={s.cardColumn}>
          <Link prefetch={false} href={businessHref}>
            <a
              href={businessHref}
              className={s.nameBusiness}>{`By ${business.bizName}`}</a>
          </Link>
          <div className={s.rateContainer}>
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
          </div>
        </div>
      </div>
      <div className={s.shareContainer}>
        <Share businessID={business.bizBusinessID} />
      </div>
    </div>
  );
});
