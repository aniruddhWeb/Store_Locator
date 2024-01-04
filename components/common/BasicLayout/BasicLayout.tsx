import React, { FC, useCallback, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import s from './BasicLayout.module.css';
import { Route } from '../../../config/Routes';

const Report = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/Report').then(mod => mod.Report),
  {
    ssr: false,
  },
);
const Instagram = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/Instagram').then(mod => mod.Instagram),
  {
    ssr: false,
  },
);
const WhiteLogo = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/WhiteLogo').then(mod => mod.WhiteLogo),
  {
    ssr: false,
  },
);
const Facebook = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/Facebook').then(mod => mod.Facebook),
  {
    ssr: false,
  },
);
const Email = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/Email').then(mod => mod.Email),
  {
    ssr: false,
  },
);
const Logo = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/Logo').then(mod => mod.Logo),
  {
    ssr: false,
  },
);
const ReportModal = dynamic<any>(
  // @ts-ignore
  () => import('../ReportModal/ReportModal').then(mod => mod.ReportModal),
  {
    ssr: false,
  },
);

interface Props {
  disabledHref?: boolean;
  useRemoteBackground?: boolean;
  dark?: boolean;
  footer?: any;
  hideHeader?: boolean;
  hideBugReport?: boolean;
}

export const BasicLayout: FC<Props> = React.memo(props => {
  const [reportModal, setReportModal] = useState<boolean>(false);
  const modalOpen = useCallback(e => {
    setReportModal(true);
  }, []);
  const modalClose = useCallback(e => {
    setReportModal(false);
  }, []);
  return (
    <>
      <div id="layout-basic-style" className={s.root}>
        <div className={s.background}>
          <img
            src="/images/background.webp"
            alt="BackgroundImage"
            className={s.image}
          />
          <div
            className={
              props.dark
                ? s.backgroundOverlayBlenderDark
                : s.backgroundOverlayBlender
            }
          />
          <div
            className={
              props.dark ? s.backgroundOverlayDark : s.backgroundOverlay
            }
          />
        </div>
        <div className={s.mainLayout}>
          {props.hideHeader ? null : !props.disabledHref ? (
            <Link prefetch={false} href={Route.Root}>
              <a href={Route.Root} className={s.header} aria-label="Logo">
                <WhiteLogo />
                <Logo className={s.logo} />
              </a>
            </Link>
          ) : (
            <div className={s.headerDisabled}>
              <WhiteLogo />
              <Logo className={s.logo} />
            </div>
          )}
          {props.children}
          {props.footer ? (
            <div className={s.footerContainer}>
              <div className={s.socialContainer}>
                <Link prefetch={false} href={props.footer.facebook}>
                  <a href={props.footer.facebook} target="_blank">
                    <Facebook className={s.locationIcon} />
                  </a>
                </Link>
                <Link prefetch={false} href={props.footer.email}>
                  <a href={props.footer.email} target="_blank">
                    <Email className={s.locationIcon} />
                  </a>
                </Link>
                <Link prefetch={false} href={props.footer.instagram}>
                  <a href={props.footer.instagram} target="_blank">
                    <Instagram className={s.locationIcon} />
                  </a>
                </Link>
              </div>
            </div>
          ) : null}
          {!props.hideBugReport ? (
            <div className={s.issueContainer} onClick={modalOpen}>
              <Report />
              <div className={s.issueButton}>Report an Issue</div>
            </div>
          ) : null}
        </div>
      </div>
      <ReportModal isOpen={reportModal} setIsOpen={modalClose} />
    </>
  );
});
