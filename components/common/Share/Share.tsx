import React, { useCallback, useEffect, useState } from 'react';
import { useMediaQueries } from '@react-hook/media-query';
import s from './Share.module.css';
import { Share as ShareIcon } from '../../icons/Share';
import { AnalyticsAction, useSaveAnalytics } from '../../../services/analytics';
import { ShareFacebook } from '../../icons/ShareFacebook';
import { ShareMessenger } from '../../icons/ShareMessenger';
import { ShareTwitter } from '../../icons/ShareTwitter';
import { ShareMail } from '../../icons/ShareMail';
import { ShareWhatsapp } from '../../icons/ShareWhatsapp';
import { ShareClose } from '../../icons/ShareClose';
import { hasWindow } from '../../../utils/window';
import { ShareCopy } from '../../icons/ShareCopy';
import { Portal } from '../Portal/Portal';

interface Props {
  businessID: string;
  direction?: 'left' | 'right';
}

export const Share = React.memo(
  ({ businessID, direction = 'right' }: Props) => {
    const { saveAnalytics } = useSaveAnalytics();

    const [showSharePopup, setShowSharePopup] = useState<boolean>(false);

    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
    });

    const close = useCallback(() => setShowSharePopup(false), []);
    useEffect(() => {
      if (hasWindow) {
        if (showSharePopup) {
          document.addEventListener('click', close);
          return () => document.removeEventListener('click', close);
        }
      }
    }, [showSharePopup, close]);

    const onClickToggle = useCallback(
      (e: any) => {
        e.stopPropagation();
        setShowSharePopup(!showSharePopup);
      },
      [matches, showSharePopup],
    );

    useEffect(() => {
      if (hasWindow) {
        const foundRootContent = document.getElementById(
          'side-top-navigation-root-content',
        );
        const foundFadeContent = document.getElementById(
          'side-top-navigation-fade',
        );
        if (foundFadeContent) {
          if (!showSharePopup) {
            foundFadeContent.style.display = 'none';
          } else {
            foundFadeContent.style.display = 'flex';
          }
        }
        if (foundRootContent) {
          if (!matches.isMobile) {
            if (!showSharePopup) {
              foundRootContent.style.overflowY = 'scroll';
            } else {
              foundRootContent.style.overflowY = 'visible';
            }
          } else {
            foundRootContent.style.overflowY = 'visible';
          }
        }
        if (showSharePopup && matches?.isMobile) {
          document.body.style.overflowY = 'hidden';
        } else if (!showSharePopup && matches?.isMobile) {
          document.body.style.overflowY = 'scroll';
        }
      }
    }, [showSharePopup, matches.isMobile]);

    const onShareFacebook = useCallback(
      (e: any) => {
        e.stopPropagation();
        setShowSharePopup(false);
        saveAnalytics(businessID, AnalyticsAction.Share);
      },
      [businessID],
    );

    const onShareTwitter = useCallback(
      (e: any) => {
        e.stopPropagation();
        setShowSharePopup(false);
        saveAnalytics(businessID, AnalyticsAction.Share);
      },
      [businessID],
    );

    const onShareWhatsapp = useCallback(
      (e: any) => {
        e.stopPropagation();
        setShowSharePopup(false);
        saveAnalytics(businessID, AnalyticsAction.Share);
      },
      [businessID],
    );

    const onShareMail = useCallback(
      (e: any) => {
        e.stopPropagation();
        setShowSharePopup(false);
        saveAnalytics(businessID, AnalyticsAction.Share);
      },
      [businessID],
    );

    const onShareMessenger = useCallback(
      (e: any) => {
        e.stopPropagation();
        setShowSharePopup(false);
        saveAnalytics(businessID, AnalyticsAction.Share);
      },
      [businessID],
    );

    const onShareCopy = useCallback(
      (e: any) => {
        e.stopPropagation();
        setShowSharePopup(false);
        if (hasWindow) {
          try {
            navigator?.clipboard?.writeText(window.location.href);
            // eslint-disable-next-line no-empty
          } catch (error) {}
        }
        saveAnalytics(businessID, AnalyticsAction.Share);
      },
      [businessID],
    );

    const stopPropagation = useCallback(
      (e: any) => {
        e.stopPropagation();
        close();
      },
      [close],
    );

    const popupContent = (
      <div
        onClick={stopPropagation}
        className={
          direction === 'right'
            ? s.sharePopupContainer
            : s.shareLeftPopupContainer
        }>
        <div
          onClick={onClickToggle}
          className={
            direction === 'right' ? s.shareIconActive : s.shareIconActiveLeft
          }>
          <ShareIcon fill="#FFFFFF" />
        </div>
        <div
          className={direction === 'right' ? s.sharePopup : s.sharePopupLeft}>
          <div className={s.shareTitle}>Share now</div>
          <div className={s.shareRow}>
            <a
              aria-label="ShareFacebook"
              onClick={onShareFacebook}
              href={`https://www.facebook.com/sharer/sharer.php?u=${
                hasWindow ? window.location.href : ''
              }`}
              target="_blank"
              className={s.shareItemContainer}>
              <div className={s.shareItemIcon}>
                <ShareFacebook />
              </div>
              <div className={s.shareDescription}>Facebook</div>
            </a>
            <a
              aria-label="ShareTwitter"
              onClick={onShareTwitter}
              href={`https://twitter.com/share?url=${
                hasWindow ? window.location.href : ''
              }&text=Check%20us%20out%20at%20Leafythings!`}
              target="_blank"
              className={s.shareItemContainer}>
              <div className={s.shareItemIcon}>
                <ShareTwitter />
              </div>
              <div className={s.shareDescription}>Twitter</div>
            </a>
            <a
              aria-label="ShareMessenger"
              onClick={onShareMessenger}
              href={`https://www.messenger.com/login/`}
              target="_blank"
              className={s.shareItemContainer}>
              <div className={s.shareItemIcon}>
                <ShareMessenger />
              </div>
              <div className={s.shareDescription}>Messenger</div>
            </a>
          </div>
          <div className={s.shareRow}>
            <a
              aria-label="ShareMail"
              onClick={onShareMail}
              href={`mailto:?&subject=&body=Check us out at Leafythings! ${
                hasWindow ? window.location.href : ''
              }`}
              target="_blank"
              className={s.shareItemContainer}>
              <div className={s.shareItemIcon}>
                <ShareMail />
              </div>
              <div className={s.shareDescription}>Email</div>
            </a>
            <a
              aria-label="ShareWhatsapp"
              onClick={onShareWhatsapp}
              href={`https://wa.me/?text=Check%20us%20out%20at%20Leafythings!%20${
                hasWindow ? window.location.href : ''
              }`}
              target="_blank"
              className={s.shareItemContainer}>
              <div className={s.shareItemIcon}>
                <ShareWhatsapp />
              </div>
              <div className={s.shareDescription}>Whatsapp</div>
            </a>
            <div onClick={onShareCopy} className={s.shareItemContainer}>
              <div className={s.shareItemIcon}>
                <ShareCopy />
              </div>
              <div className={s.shareDescription}>Copy</div>
            </div>
          </div>
          <div onClick={onClickToggle} className={s.closeIcon}>
            <ShareClose />
          </div>
        </div>
      </div>
    );

    return (
      <>
        <div className={s.root} onClick={onClickToggle}>
          <div className={s.shareIcon}>
            <ShareIcon />
          </div>
        </div>
        {showSharePopup ? (
          matches.isMobile ? (
            <Portal>{popupContent}</Portal>
          ) : (
            popupContent
          )
        ) : null}
      </>
    );
  },
);
