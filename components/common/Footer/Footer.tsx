import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useMediaQueries } from '@react-hook/media-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import s from './Footer.module.css';
import { Route } from '../../../config/Routes';
import { useCurrentLocationDynamic } from '../../../services/location';
import {
  getNavItems,
  getSocialIcons,
  serviceItems,
  TNavBarItems,
  TServiceItem,
  TSocialIcons,
} from './footerData';
import { Region } from '../../../generated/app';
import { useCurrentUserDynamic } from '../../../services/user';
import { Button } from '../Button/Button';
import { hasWindow } from '../../../utils/window';

const Report = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/Report').then(mod => mod.Report),
  {
    ssr: false,
  },
);
const MailingList = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/MailingList').then(mod => mod.MailingList),
  {
    ssr: false,
  },
);
const LeafyThingsTxt = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/LeafyThingsTxt').then(mod => mod.LeafyThingsTxt),
  {
    ssr: false,
  },
);
const GooglePlay = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/GooglePlay').then(mod => mod.GooglePlay),
  {
    ssr: false,
  },
);
const AppStore = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/AppStore').then(mod => mod.AppStore),
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

const mailingButtonStyle = {
  height: 48,
  padding: '0 16px',
};

interface Props {
  instagram: string;
  email: string;
  youtube: string;
  facebook: string;
  google: string;
  apple: string;
  regions: Region[];
  showMailPop?: boolean;
  onMailPopSubscription?: () => void;
  shouldHideAppDownload: boolean;
}

export const Footer: FC<Props> = props => {
  const userProps = useCurrentUserDynamic();
  const { selectedLocation: location } = useCurrentLocationDynamic();

  const [reportModal, setReportModal] = useState<boolean>(false);
  const modalOpen = useCallback(e => {
    setReportModal(true);
  }, []);
  const modalClose = useCallback(e => {
    setReportModal(false);
  }, []);

  const navItems = useMemo(() => getNavItems(location), [location]);
  const socialIcons = useMemo(
    () =>
      getSocialIcons(
        props.instagram,
        props.email,
        props.facebook,
        props.youtube,
      ),
    [props.instagram, props.email, props.facebook, props.youtube],
  );

  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 860px)',
  });

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      if (hasWindow) {
        setTimeout(() => {
          window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth',
          });
        }, 600);
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <div className={s.footerContainer}>
      {props.showMailPop &&
      (!userProps?.currentUser || !userProps?.currentUser?.usrSubscription) ? (
        <div className={s.mailingListContainer}>
          <div className={s.mailingList}>
            <div className={s.mailingListIconContainer}>
              <MailingList
                fill={matches?.isMobile ? '#EF845C' : '#000000'}
                className={s.mailingListIcon}
              />
            </div>
            <p className={s.mailingListText}>
              {`Receive exclusive offers and weed deals`}
              {matches?.isMobile ? null : <br />}
              {`from the cannabis retailers on Leafythings.`}
            </p>
            <Button
              onPress={props.onMailPopSubscription}
              buttonStyle={mailingButtonStyle}
              buttonText="Join our mailing list"
            />
          </div>
        </div>
      ) : null}
      <div id="footer" className={s.rootContainer}>
        <div className={s.root}>
          <div className={s.leftColumn}>
            <div className={s.navigation}>
              <nav className={s.navigationItems}>
                {navItems.map((current: TNavBarItems) => {
                  return (
                    <Link
                      scroll={false}
                      key={current.title}
                      prefetch={false}
                      href={current.href}>
                      <a className={s.link}>{current.title}</a>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
          <div className={s.middleColumn}>
            <div className={s.logoColumn}>
              <Link scroll={false} prefetch={false} href={Route.Root}>
                <a href={Route.Root} className={s.logoColumn}>
                  <LeafyThingsTxt className={s.logoIcon} alt="Leafythings" />
                </a>
              </Link>
            </div>
            {props.shouldHideAppDownload ||
            (hasWindow && !!(window as any)?.ReactNativeWebView) ? null : (
              <div className={s.vendPlat}>
                <div className={s.appleButton}>
                  <Link scroll={false} prefetch={false} href={props.apple}>
                    <a rel="noreferrer" href={props.apple} target="_blank">
                      <AppStore alt="App Store" className={s.appleIcon} />
                    </a>
                  </Link>
                </div>
                <div className={s.googleButton}>
                  <Link
                    scroll={false}
                    prefetch={false}
                    href={`${props.google}`}>
                    <a
                      rel="noreferrer"
                      href={`${props.google}`}
                      target="_blank">
                      <GooglePlay alt="Google Play" className={s.googleIcon} />
                    </a>
                  </Link>
                </div>
              </div>
            )}
            <div className={s.socialContainer}>
              {socialIcons.map((currentIcon: TSocialIcons) => {
                const Component = currentIcon.component;
                return (
                  <Link
                    prefetch={false}
                    scroll={false}
                    key={currentIcon.href}
                    href={currentIcon.href}>
                    <a
                      rel="noreferrer"
                      href={currentIcon.href}
                      target="_blank"
                      aria-label={currentIcon.ariaLabel}>
                      <Component className={s.locationIcon} />
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={s.rightColumn}>
            <div className={s.navigation}>
              <nav className={s.navigationItemsRight}>
                {!userProps?.currentUser ? (
                  <a href={Route.RegisterUser} className={s.registerButton}>
                    Sign Up
                  </a>
                ) : null}
                {serviceItems.map((currentServiceItem: TServiceItem) => {
                  return (
                    <Link
                      prefetch={false}
                      scroll={false}
                      href={currentServiceItem.href}
                      key={currentServiceItem.title}>
                      <a href={currentServiceItem.href} className={s.linkCorp}>
                        {currentServiceItem.title}
                      </a>
                    </Link>
                  );
                })}
                <p className={s.linkTrademark}>
                  © Leafythings Canada {new Date().getFullYear()}.<br />
                  All Rights Reserved.
                </p>
              </nav>
            </div>
          </div>
        </div>
        <div className={s.rootMobile}>
          <div className={s.top}>
            <a href={Route.Root}>
              <LeafyThingsTxt className={s.logoIcon} alt="Leafythings" />
            </a>
          </div>
          <div className={s.middle}>
            <div className={s.navigationMobile}>
              <nav className={s.navigationItemsMobile}>
                {navItems.map((current: TNavBarItems) => {
                  return (
                    <Link
                      key={current.title}
                      scroll={false}
                      prefetch={false}
                      href={current.href}>
                      <a className={s.linkMobile}>{current.title}</a>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
          <div className={s.bottom}>
            <div className={s.bottomLeft}>
              <div className={s.navigation}>
                <nav className={s.navigationItemsMobileBottom}>
                  {serviceItems.map((currentServiceItem: TServiceItem) => {
                    return (
                      <Link
                        scroll={false}
                        prefetch={false}
                        href={currentServiceItem.href}
                        key={currentServiceItem.title}>
                        <a
                          href={currentServiceItem.href}
                          className={s.linkMobileBottom}>
                          {currentServiceItem.title}
                        </a>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
            <div className={s.bottomRight}>
              {socialIcons.map((currentIcon: TSocialIcons) => {
                const Component = currentIcon.component;
                return (
                  <Link
                    scroll={false}
                    prefetch={false}
                    key={currentIcon.href}
                    href={currentIcon.href}>
                    <a
                      rel="noreferrer"
                      href={currentIcon.href}
                      target="_blank"
                      aria-label={currentIcon.ariaLabel}>
                      <Component className={s.locationIconMobile} />
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
          {props.shouldHideAppDownload ||
          (hasWindow && !!(window as any)?.ReactNativeWebView) ? null : (
            <div className={s.vendPlatMobile}>
              {!userProps?.currentUser ? (
                <a href={Route.RegisterUser} className={s.registerButton}>
                  Sign Up
                </a>
              ) : null}
              <div className={s.appleButtonMobile}>
                <Link scroll={false} prefetch={false} href={props.apple}>
                  <a rel="noreferrer" href={props.apple} target="_blank">
                    <AppStore alt="App Store" className={s.appleIcon} />
                  </a>
                </Link>
              </div>
              <div className={s.googleButtonMobile}>
                <Link scroll={false} prefetch={false} href={`${props.google}`}>
                  <a rel="noreferrer" href={`${props.google}`} target="_blank">
                    <GooglePlay alt="Google Play" className={s.googleIcon} />
                  </a>
                </Link>
              </div>
            </div>
          )}
          <div className={s.reportModalMobile}>
            <div className={s.issueContainer} onClick={modalOpen}>
              <Report />
              <div className={s.issueButton}>Report an Issue</div>
            </div>
          </div>
          <div className={s.bottom}>
            <div className={s.bottomLeftCopyright}>
              <p className={s.linkTrademarkMobile}>
                © Leafythings Canada {new Date().getFullYear()}.<br />
                All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
        <div className={s.reportModalDesktop}>
          <div className={s.issueContainer} onClick={modalOpen}>
            <Report />
            <div className={s.issueButton}>Report an Issue</div>
          </div>
        </div>
        {(props.regions || []).length > 0 ? (
          <div className={s.regionWrapper}>
            <Link scroll={false} prefetch={false} href={Route.TorontoLanding}>
              <a className={s.region} href={Route.TorontoLanding}>
                {'Toronto'}
              </a>
            </Link>
            {props.regions.map((region: Region) => (
              <Link
                scroll={false}
                prefetch={false}
                href={`${
                  Route.Delivery
                }/${region.province.plInitials.toLowerCase()}/${region.plSlug.toLowerCase()}`}
                key={`${region.plRegionID}`}>
                <a
                  className={s.region}
                  href={`${
                    Route.Delivery
                  }/${region.province.plInitials.toLowerCase()}/${region.plSlug.toLowerCase()}`}>
                  {region.plName}
                </a>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      <ReportModal isOpen={reportModal} setIsOpen={modalClose} />
    </div>
  );
};
