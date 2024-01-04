import React, { useCallback } from 'react';
import cn from 'classnames';
import { Business } from '../../../generated/graphql';
import s from './BusinessFooter.module.css';
import { InfoLink } from '../../common/InfoLink/InfoLink';
import { Button } from '../../common/Button/Button';
import { formatLink, formatPhone } from '../../../utils/string';
import { Mail } from '../../icons/Mail';
import { Call } from '../../icons/Call';
import { Web } from '../../icons/Web';

interface Props {
  desktop?: boolean;
  mobile?: boolean;
  business: Business;
  scrollText?: string;
}

const buttonStyle = { height: 38, padding: '0 16px' };
const buttonGreenStyle = {
  padding: '0 16px',
  height: 38,
  background: '#61AB62',
};

export const BusinessFooter = React.memo(
  ({ business, desktop, mobile, scrollText }: Props) => {
    const onWhereToBuy = useCallback(() => {
      if (scrollText) {
        const foundElement = document.getElementById(scrollText.toLowerCase());
        if (foundElement) {
          const rect = foundElement.getBoundingClientRect();
          window.scrollTo({
            left: 0,
            top: (rect?.top || 0) + (window.scrollY || 0) - 180,
            behavior: 'smooth',
          });
        }
      }
    }, [scrollText]);

    const onBuyOnline = useCallback(() => {
      window.open(
        `${window.location.protocol}//${window.location.host}/dutchie?url=${business?.dutchieAPI}`,
        '_blank',
        'location=yes,resizable=0,height=1000,width=1000,scrollbars=yes,status=yes',
      );
    }, [business?.dutchieAPI]);

    const rootClass = cn(s.root, {
      [s.rootMobile]: mobile,
      [s.rootDesktop]: desktop,
    });

    const buttonContainerClass = cn(s.buttonsContainer, {
      [s.singleButtonsContainer]:
        (!scrollText && business?.dutchieAPI) ||
        (scrollText && !business?.dutchieAPI),
    });

    if (!business) {
      return null;
    }
    return (
      <div className={rootClass}>
        <div className={s.linkColumn}>
          {business.contact?.bizEmailAddress &&
          business?.contact?.linkContactMethod?.includes('Email') ? (
            <>
              <div className={s.marginMedium} />
              <InfoLink
                type="Email"
                icon={<Mail fill="#545D5C" className={s.icon} />}
                link={`mailto:${business.contact.bizEmailAddress}`}
                displayName={business.contact.bizEmailAddress}
                businessID={business.bizBusinessID}
                businessClaim={business.bizClaim || business.bizClaimUnblurred}
              />
              {(business.contact?.bizPhone &&
                business?.contact?.linkContactMethod?.includes('Phone')) ||
              (business.contact?.bizWebsiteURL &&
                business?.contact?.linkContactMethod?.includes(
                  'Web',
                )) ? null : (
                <>
                  <div className={s.margin} />
                  <div className={s.margin} />
                </>
              )}
            </>
          ) : null}
          {business.contact?.bizPhone &&
          business?.contact?.linkContactMethod?.includes('Phone') ? (
            <>
              {business.contact?.bizEmailAddress &&
              business?.contact?.linkContactMethod?.includes('Email') ? (
                <div className={s.margin} />
              ) : (
                <div className={s.marginMedium} />
              )}
              <InfoLink
                type="Phone"
                icon={<Call fill="#545D5C" className={s.icon} />}
                link={`tel:${business.contact.bizPhone}`}
                displayName={formatPhone(business.contact.bizPhone)}
                businessID={business.bizBusinessID}
                businessClaim={business.bizClaim || business.bizClaimUnblurred}
              />
              {business.contact?.bizWebsiteURL &&
              business?.contact?.linkContactMethod?.includes('Web') ? null : (
                <>
                  <div className={s.margin} />
                  <div className={s.margin} />
                </>
              )}
            </>
          ) : null}
          {business.contact?.bizWebsiteURL &&
          business?.contact?.linkContactMethod?.includes('Web') ? (
            <>
              {(business.contact?.bizPhone &&
                business?.contact?.linkContactMethod?.includes('Phone')) ||
              (business.contact?.bizEmailAddress &&
                business?.contact?.linkContactMethod?.includes('Email')) ? (
                <div className={s.margin} />
              ) : (
                <>
                  <div className={s.marginMedium} />
                </>
              )}
              <InfoLink
                type="Web"
                icon={<Web fill="#545D5C" className={s.icon} />}
                link={business.contact.bizWebsiteURL}
                displayName={formatLink(business.contact.bizWebsiteURL)}
                businessID={business.bizBusinessID}
                businessClaim={business.bizClaim || business.bizClaimUnblurred}
              />
              <div className={s.margin} />
              <div className={s.margin} />
            </>
          ) : null}
        </div>
        {!business?.bizClaim &&
        !business?.bizClaimUnblurred &&
        (scrollText || business?.dutchieAPI) ? (
          <div className={s.buttonShareColumn}>
            <div className={s.margin} />
            <div className={s.margin} />
            <div className={buttonContainerClass}>
              {scrollText ? (
                <Button
                  fullWidth
                  mobile
                  buttonText={scrollText}
                  onPress={onWhereToBuy}
                  buttonStyle={buttonGreenStyle}
                />
              ) : null}
              {business?.dutchieAPI ? (
                <Button
                  fullWidth
                  buttonText={'Buy online'}
                  onPress={onBuyOnline}
                  buttonStyle={buttonStyle}
                />
              ) : null}
            </div>
            <div className={s.margin} />
            <div className={s.margin} />
          </div>
        ) : null}
      </div>
    );
  },
);
