import Link from 'next/link';
import React, { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';
import { IMAGE_PLACEHOLDER_PRODUCT } from 'config/Constants';
import s from './ProductCategoryTitle.module.css';
import { Button } from '../../common/Button/Button';
import { Close } from '../../icons/Close';
import { useCurrentLocationDynamic } from '../../../services/location';
import { Cross } from '../../icons/Cross';
import { Modal } from '../../common/Modal/Modal';
import { LocationPermission } from '../../common/LocationPermission/LocationPermission';

interface Props {
  title?: string | null;
  showSubTitle?: boolean;
  showLocationTitle?: boolean;
  showNearByTitle?: boolean;
  showLocationDisabledBanner?: boolean;
  setShowLocationDisabledBanner?: (v: boolean) => void;
  text?: string | null;
  backgroundImage?: { url?: string | null } | null;
  textUrlMap?: { link: string; destination: string };
}

const buttonStyle = {
  marginTop: '16px',
  minHeight: '36px',
  height: '36px',
  maxWidth: '128px',
  padding: '0px 16px',
};

const buttonTextStyle = {
  fontSize: '12px',
};

export const ProductCategoryTitle = React.memo(
  ({
    title,
    showSubTitle,
    showNearByTitle,
    showLocationDisabledBanner,
    setShowLocationDisabledBanner,
    showLocationTitle,
    text,
    textUrlMap: link,
    backgroundImage: image,
  }: Props) => {
    const { selectedLocation } = useCurrentLocationDynamic();

    const [readMore, setReadMore] = useState<boolean>(false);
    const subTitle = useMemo(() => {
      if (readMore) {
        return text;
      }
      if (text && text.length > 120) {
        return `${text.slice(0, 120)}...`;
      }
      return text;
    }, [readMore, text]);

    const toggleReadMore = useCallback(
      () => setReadMore(!readMore),
      [readMore],
    );

    const checkLinkAvailable = useMemo(() => {
      if (link && subTitle) {
        return subTitle?.split(link.link);
      }
    }, [link, subTitle]);

    const [locationAlertOpen, setLocationAlertOpen] = useState<boolean>(false);

    const rootClass = cn(s.root, {
      [s.rootTop]: showLocationDisabledBanner,
    });

    const currentClass = cn(s.subTitle, {
      [s.linkedSubtitle]: checkLinkAvailable,
    });

    return (
      <>
        <div
          className={rootClass}
          style={{
            backgroundImage: `url(${image?.url || IMAGE_PLACEHOLDER_PRODUCT})`,
          }}>
          <h1 className={s.title}>{title || ''}</h1>
          {showSubTitle && showNearByTitle && !showLocationDisabledBanner ? (
            <div className={s.locationTitle}>{`Near You`}</div>
          ) : showSubTitle && showLocationTitle && selectedLocation?.plName ? (
            <div
              className={
                s.locationTitle
              }>{`in ${selectedLocation?.plName}`}</div>
          ) : null}
          {readMore && checkLinkAvailable && subTitle && link ? (
            <>
              <div className={currentClass}>
                {checkLinkAvailable[0]}
                <Link prefetch={false} href={link.destination}>
                  <a className={s.link} href={link.destination}>
                    {link.link}
                  </a>
                </Link>
                {checkLinkAvailable[1]}
              </div>
            </>
          ) : subTitle ? (
            <div className={currentClass}>{subTitle}</div>
          ) : null}
          {text && text.length > 120 ? (
            !readMore ? (
              <Button
                buttonText="Read More"
                buttonStyle={buttonStyle}
                buttonTextStyle={buttonTextStyle}
                onPress={toggleReadMore}
              />
            ) : (
              <div onClick={toggleReadMore} className={s.closeButton}>
                <Close fill="#FFFFFF" />
              </div>
            )
          ) : null}
          {showLocationDisabledBanner ? (
            <div className={s.locationDisabledBanner}>
              <div className={s.locationDisabledBannerText}>
                <span
                  className={s.locationDisabledBannerTextClick}
                  onClick={() => setLocationAlertOpen(true)}>
                  {
                    'Please allow location access from your browser to find products near you. Click here to find out.'
                  }
                </span>
              </div>
              <div
                onClick={() =>
                  setShowLocationDisabledBanner &&
                  setShowLocationDisabledBanner(false)
                }
                className={s.locationCloseButton}>
                <Cross className={s.locationCloseIcon} fill="#000000" />
              </div>
            </div>
          ) : null}
        </div>
        <Modal
          isOpen={locationAlertOpen}
          setIsOpen={setLocationAlertOpen}
          style={style}
          wrapperStyle={wrapperStyle}>
          <LocationPermission />
        </Modal>
      </>
    );
  },
);

const style: any = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.75)',
  },
};

const wrapperStyle = {
  overflowY: 'scroll',
  overflowX: 'hidden',
};
