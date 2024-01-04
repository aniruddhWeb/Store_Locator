import React, { useMemo } from 'react';
import StarRatings from 'react-star-ratings';
import cn from 'classnames';
import s from './BusinessLanding.module.css';
import { BusinessItemFragment } from '../../../generated/graphql';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { Button } from '../../common/Button/Button';
import { Leafythings } from '../../icons/Leafythings';
import { Share } from '../../common/Share/Share';
import { Route } from '../../../config/Routes';
import { transformBusinessTypeToSlug } from '../../../utils/string';

interface Props {
  business?: BusinessItemFragment | null;
}

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const BusinessLanding = React.memo(({ business }: Props) => {
  const businessDealsHref = useMemo(() => {
    if (business) {
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
    }
    return Route.Root;
  }, [business]);

  if (!business) {
    return null;
  }
  const businessImageClass = cn(s.businessImageContainer, s.businessImage);

  return (
    <div className={s.root}>
      <div className={s.background}>
        <Leafythings className={s.backgroundLogo} />
      </div>
      <div className={s.contentContainer}>
        <img
          src={getImageLink(business.mdaLocalFileName, 280)}
          onError={setDefaultImageOnError}
          className={businessImageClass}
          alt={business.bizName}
        />
        <div className={s.detailsContainer}>
          <div className={s.businessName}>{business.bizName}</div>
          <div className={s.rate}>
            <StarRatings
              numberOfStars={5}
              starDimension="24px"
              starSpacing="2px"
              rating={business.rvwScoreAvg || 0}
              starRatedColor="#DFB300"
              starEmptyColor="#E4E9E8"
            />
            <div className={s.rateCount}>{business.rvwCount}</div>
          </div>
          <Button
            buttonText="View Deals"
            href={businessDealsHref}
            buttonStyle={buttonStyle}
          />
        </div>
        <div className={s.shareContainer}>
          <Share direction="left" businessID={business.bizBusinessID} />
        </div>
      </div>
    </div>
  );
});

const buttonStyle = {
  marginTop: '56px',
};
