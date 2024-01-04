import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useMediaQueries } from '@react-hook/media-query';
import { Business } from '../../../generated/graphql';
import s from './BusinessContact.module.css';
import { Call } from '../../icons/Call';
import { Web as WebIcon } from '../../icons/Web';
import { Message } from '../../icons/Message';
import { Mail } from '../../icons/Mail';
import { Location as LocationIcon } from '../../icons/Location';
import { Question } from '../../icons/Question';
import { transformBusinessTypeToSlug } from '../../../utils/string';
import { AnalyticsAction, useSaveAnalytics } from '../../../services/analytics';
import { QuestionCircle } from '../../icons/QuestionCircle';
import { hasWindow } from '../../../utils/window';

enum ContactMethod {
  Phone = 'Phone',
  Location = 'Location',
  LiveChat = 'Live Chat',
  Email = 'Email',
  Text = 'Text',
  Web = 'Web',
}

interface Props {
  mobile?: boolean;
  mobileVisible?: boolean;
  desktop?: boolean;
  disableAnalytics?: boolean;
  business: Business;
  marginTop?: boolean;
  noMargin?: boolean;
  showBorder?: boolean;
  showBorderRadius?: boolean;
}

export const BusinessContact = React.memo(
  ({
    business,
    mobile = false,
    desktop = false,
    mobileVisible = false,
    showBorder = false,
    showBorderRadius = false,
    marginTop = false,
    noMargin = false,
    disableAnalytics,
  }: Props) => {
    const [showQuestionPopup, setShowQuestionPopup] = useState<boolean>(false);

    const close = useCallback(() => setShowQuestionPopup(false), []);
    useEffect(() => {
      if (hasWindow) {
        if (showQuestionPopup) {
          document.addEventListener('click', close);
          return () => document.removeEventListener('click', close);
        }
      }
    }, [showQuestionPopup, close]);

    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
    });

    const onClickToggle = useCallback(
      (e: any) => {
        e.stopPropagation();
        setShowQuestionPopup(!showQuestionPopup);
      },
      [matches, showQuestionPopup],
    );

    useEffect(() => {
      setShowQuestionPopup(false);
    }, [matches.isMobile]);

    useEffect(() => {
      if (hasWindow) {
        const foundHeaderContent = document.getElementById('header');
        const foundRootContent = document.getElementById(
          'side-top-navigation-root-content',
        );
        const foundFadeContent = document.getElementById(
          'side-top-navigation-fade',
        );
        if (foundHeaderContent) {
          if (!showQuestionPopup) {
            foundHeaderContent.style.zIndex = '12';
          } else {
            foundHeaderContent.style.zIndex = '1';
          }
        }
        if (foundFadeContent) {
          if (!showQuestionPopup) {
            foundFadeContent.style.display = 'flex';
          } else {
            foundFadeContent.style.display = 'none';
          }
        }
        if (foundRootContent) {
          if (!showQuestionPopup) {
            foundRootContent.style.overflowY = 'scroll';
          } else {
            foundRootContent.style.overflowY = 'visible';
          }
        }
        if (showQuestionPopup) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'scroll';
        }
      }
    }, [showQuestionPopup, matches.isMobile]);

    const { saveAnalytics } = useSaveAnalytics();

    const analyticsFunc = useCallback(
      (e: any, method: string) => {
        e.stopPropagation();
        if (!disableAnalytics) {
          saveAnalytics(
            business?.bizBusinessID,
            AnalyticsAction.Engagements + method,
          );
        }
      },
      [business?.bizBusinessID, disableAnalytics],
    );

    const businessContactMethods: (string | null)[] =
      business?.contact?.linkContactMethod || [];

    const locationHref = useMemo(
      () =>
        business
          ? `/${transformBusinessTypeToSlug(
              business.plType,
            )}/${business.contact?.provinceInitial?.toLowerCase()}/${
              business.contact?.regionSlug
            }/${business.bizSlug}#about`
          : '',
      [business],
    );

    const rootClass = cn(s.root, {
      [s.rootMobile]: mobile,
      [s.rootMobileVisible]: mobileVisible,
      [s.rootDesktop]: desktop,
      [s.rootBorder]: showBorder,
      [s.rootBorderRadius]: showBorderRadius,
      [s.rootMarginTop]: marginTop,
      [s.rootShadow]: showQuestionPopup,
    });
    const titleClass = cn(s.title, {
      [s.titleMobileVisibleNoMargin]: noMargin,
    });
    const contactRowClass = cn(s.contactRowContainer, {
      [s.contactRowContainerNoMargin]: noMargin,
    });

    return (
      <>
        {showQuestionPopup ? (
          <div className={s.questionPopupBackground} />
        ) : null}
        <div className={rootClass}>
          <div className={titleClass}>Order Now By</div>
          <div className={s.questionIcon} onClick={onClickToggle}>
            <QuestionCircle />
          </div>
          <div className={contactRowClass}>
            {!business?.bizClaim &&
            !business?.bizClaimUnblurred &&
            businessContactMethods.includes(ContactMethod.Phone) &&
            business?.contact?.bizPhone ? (
              <Link
                prefetch={false}
                href={`tel:${business?.contact?.bizPhone}`}>
                <a
                  id="iconPhone"
                  href={`tel:${business?.contact?.bizPhone}`}
                  onClick={e => analyticsFunc(e, 'Phone')}
                  className={s.contactContainer}>
                  <Call className={s.enabledContactIcon} />
                </a>
              </Link>
            ) : (
              <div className={s.disabledContactContainer}>
                <Call className={s.disabledContactIcon} fill="#545D5C" />
              </div>
            )}
            {!business?.bizClaim &&
            !business?.bizClaimUnblurred &&
            businessContactMethods.includes(ContactMethod.Web) &&
            business?.contact?.bizWebsiteURL ? (
              <Link prefetch={false} href={business?.contact?.bizWebsiteURL}>
                <a
                  id="iconWeb"
                  target="_blank"
                  href={business?.contact?.bizWebsiteURL}
                  onClick={e => analyticsFunc(e, 'Web')}
                  className={s.contactContainer}>
                  <WebIcon className={s.enabledContactIcon} />
                </a>
              </Link>
            ) : (
              <div className={s.disabledContactContainer}>
                <WebIcon className={s.disabledContactIcon} fill="#545D5C" />
              </div>
            )}
            {!business?.bizClaim &&
            !business?.bizClaimUnblurred &&
            businessContactMethods.includes(ContactMethod.Text) &&
            business?.contact?.bizText ? (
              <Link prefetch={false} href={`sms:${business?.contact?.bizText}`}>
                <a
                  id="iconText"
                  href={`sms:${business?.contact?.bizText}`}
                  onClick={e => analyticsFunc(e, 'Text')}
                  className={s.contactContainer}>
                  <Message className={s.enabledContactIcon} />
                </a>
              </Link>
            ) : (
              <div className={s.disabledContactContainer}>
                <Message className={s.disabledContactIcon} fill="#545D5C" />
              </div>
            )}
            {!business?.bizClaim &&
            !business?.bizClaimUnblurred &&
            businessContactMethods.includes(ContactMethod.Email) &&
            business?.contact?.bizEmailAddress ? (
              <Link
                prefetch={false}
                href={`mailto:${business?.contact?.bizEmailAddress}`}>
                <a
                  id="iconEmail"
                  href={`mailto:${business?.contact?.bizEmailAddress}`}
                  onClick={e => analyticsFunc(e, 'Email')}
                  className={s.contactContainer}>
                  <Mail className={s.enabledContactIcon} />
                </a>
              </Link>
            ) : (
              <div className={s.disabledContactContainer}>
                <Mail className={s.disabledContactIcon} fill="#545D5C" />
              </div>
            )}
            {!business?.bizClaim &&
            !business?.bizClaimUnblurred &&
            businessContactMethods.includes(ContactMethod.Location) &&
            locationHref ? (
              <Link prefetch={false} href={locationHref}>
                <a
                  id="iconMap"
                  href={locationHref}
                  onClick={e => analyticsFunc(e, 'Location')}
                  className={s.contactContainer}>
                  <LocationIcon
                    className={s.enabledContactIcon}
                    fill="#545D5C"
                  />
                </a>
              </Link>
            ) : (
              <div className={s.disabledContactContainer}>
                <LocationIcon
                  className={s.disabledContactIcon}
                  fill="#545D5C"
                />
              </div>
            )}
            {!business?.bizClaim &&
            !business?.bizClaimUnblurred &&
            businessContactMethods.includes(ContactMethod.LiveChat) &&
            business?.contact?.bizChat ? (
              <Link prefetch={false} href={business?.contact?.bizChat}>
                <a
                  id="iconChat"
                  href={business?.contact?.bizChat}
                  onClick={e => analyticsFunc(e, 'LiveChat')}
                  className={s.contactContainer}>
                  <Question className={s.enabledContactIcon} />
                </a>
              </Link>
            ) : (
              <div className={s.disabledContactContainer}>
                <Question className={s.disabledContactIcon} fill="#545D5C" />
              </div>
            )}
          </div>
          {showQuestionPopup ? (
            <div className={s.questionPopupContainer}>
              <div className={s.questionPopupTitle}>
                Order products using available methods
              </div>
              <div className={s.questionPopupDescription}>
                To place an order or claim a deal, contact the business offering
                the product/deal. To do so, click the preferred contact method
                icons in green. Another way to place an order is by clicking the
                listed email or phone number below (if applicable).
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  },
);
