import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { useMediaQueries } from '@react-hook/media-query';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import s from './Layout.module.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { withModal } from '../../../utils/transition';
import {
  hasWindow,
  userHeaderScrollDetect,
  getBrowserInfo,
} from '../../../utils/window';
import { serverStorage } from '../../../utils/storage';
import { setCookie } from '../../../services/cookie';
import { useLayoutPageLoading } from '../../../services/app';
import { useCurrentLocationDynamic } from '../../../services/location';
import { Route } from '../../../config/Routes';

const ScrollTrigger = dynamic<any>(
  // @ts-ignore
  () => import('../ScrollTrigger/ScrollTrigger').then(mod => mod.ScrollTrigger),
  {
    ssr: false,
  },
);

const BrowserSupport = dynamic<any>(
  // @ts-ignore
  () =>
    import('../BrowserSupport/BrowserSupport').then(mod => mod.BrowserSupport),
  {
    ssr: false,
  },
);

const SearchDropdown = dynamic<any>(
  // @ts-ignore
  () =>
    import('../SearchDropdown/SearchDropdown').then(mod => mod.SearchDropdown),
  {
    ssr: false,
  },
);

const LocationDropdown = dynamic<any>(
  // @ts-ignore
  () =>
    import('../LocationDropdown/LocationDropdown').then(
      mod => mod.LocationDropdown,
    ),
  {
    ssr: false,
  },
);

const Age = dynamic<any>(
  // @ts-ignore
  () => import('../Age/Age').then(mod => mod.Age),
  {
    ssr: false,
  },
);

const MailPop = dynamic<any>(
  // @ts-ignore
  () => import('../MailPop/MailPop').then(mod => mod.MailPop),
  {
    ssr: false,
  },
);

const MailPopSubscription = dynamic<any>(
  // @ts-ignore
  () =>
    import('../MailPopSubscription/MailPopSubscription').then(
      mod => mod.MailPopSubscription,
    ),
  {
    ssr: false,
  },
);

interface Props {
  footer: any;
  header: any;
  noBottom?: boolean;
  fullScreen?: boolean;
  horizontal?: boolean;
  minHeight?: number | string;
  isPageLoadingExternal?: boolean;
  greyBackground?: boolean;
  noModals?: boolean;
  userCountry?: string | null;
}

export const Layout: FC<Props> = React.memo(
  ({
    children,
    fullScreen,
    noBottom,
    horizontal,
    isPageLoadingExternal,
    footer,
    header,
    minHeight,
    greyBackground,
    noModals = false,
    userCountry,
  }) => {
    const router = useRouter();
    const { headerNav } = router.query;
    const { selectedLocation: savedLocation } = useCurrentLocationDynamic();
    const { isPageLoading } = useLayoutPageLoading();

    const [isAgeConfirmed, setIsAgeConfirmed] = useState<string | null>(
      (hasWindow ? localStorage : serverStorage).getItem('age-confirmed') ||
        (hasWindow ? Cookies.get('ageGate') || null : null),
    );
    const [mailPopSubscriptionShouldShow, setMailPopSubscriptionShouldShow] =
      useState<boolean>(false);
    const [mailPopShouldShow, setMailPopShouldShow] = useState<boolean>(false);
    const [isMailPopShown, setIsMailPopShown] = useState<string | null>(
      (hasWindow ? localStorage : serverStorage).getItem('mail-pop-shown') ||
        (hasWindow ? Cookies.get('mailpop') || null : null),
    );
    const [isBrowserNotSupported, setIsBrowserNotSupported] =
      useState<boolean>(false);
    const [isBrowserSupportShown, setIsBrowserSupportShown] = useState<
      string | null
    >(
      (hasWindow ? localStorage : serverStorage).getItem('browser-warned') ||
        (hasWindow ? Cookies.get('browser-warned') || null : null),
    );
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
    const [isLocationSelectVisible, setIsLocationSelectVisible] =
      useState<boolean>(false);

    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
    });

    const { isDown: isScrollingDown, setIsDown: setIsScrollingDown } =
      userHeaderScrollDetect(router.pathname !== Route.Root);
    useEffect(() => {
      if (matches.isMobile && router.pathname !== Route.Root) {
        setIsScrollingDown(true);
        setTimeout(() => {
          window.scrollTo({
            left: 0,
            top: 151,
            behavior: 'smooth',
          });
        }, 300);
      }
    }, [isPageLoading, router.pathname, matches.isMobile]);

    const toggleSearch = useCallback(() => {
      setIsLocationSelectVisible(false);
      setIsSearchVisible(!isSearchVisible);
    }, [isSearchVisible]);

    const toggleLocationSelect = useCallback(() => {
      setIsSearchVisible(false);
      setIsLocationSelectVisible(!isLocationSelectVisible);
    }, [isLocationSelectVisible]);

    const closePopups = useCallback(() => {
      setIsSearchVisible(false);
      setIsLocationSelectVisible(false);
    }, []);

    useEffect(() => {
      if (isAgeConfirmed) {
        localStorage.setItem('age-confirmed', 'true');
        localStorage.setItem('cookie-shown', 'true');
        setCookie('age-confirmed', 'true');
        setCookie('cookie-shown', 'true');
        setCookie('ageGate', 'passed');
      }
      if (isMailPopShown) {
        localStorage.setItem('mail-pop-shown', 'true');
        setCookie('mailpop', 'passed');
      } else {
        const mailPopTime = localStorage.getItem('mail-pop-time');
        const nowTime = new Date();
        if (mailPopTime) {
          const popTime = new Date(mailPopTime);
          if (popTime < nowTime) {
            setMailPopShouldShow(true);
            localStorage.removeItem('mail-pop-time');
          }
        } else {
          const refreshDate = new Date(nowTime.getTime() + 2 * 60000);
          localStorage.setItem('mail-pop-time', refreshDate.toISOString());
        }
      }
      if (isBrowserSupportShown) {
        localStorage.setItem('browser-warned', 'true');
        setCookie('browser-warned', 'true');
      }
    }, [isAgeConfirmed, isMailPopShown, isBrowserSupportShown]);

    useEffect(() => {
      if (hasWindow) {
        const browserInfo = getBrowserInfo();
        if (
          browserInfo &&
          browserInfo?.version &&
          browserInfo?.browser &&
          browserInfo?.browser === 'Safari' &&
          browserInfo?.version < '14'
        ) {
          setIsBrowserNotSupported(true);
        }
      }
    }, []);

    const closeAge = useCallback(() => {
      setIsAgeConfirmed('true');
    }, []);

    const closeMailPop = useCallback(() => {
      setMailPopShouldShow(false);
      setIsMailPopShown('true');
    }, []);

    const closeMailPopSubscription = useCallback(() => {
      setMailPopSubscriptionShouldShow(false);
    }, []);

    const openMailPopSubscription = useCallback(() => {
      setMailPopSubscriptionShouldShow(true);
    }, []);

    const closeBrowserSupport = useCallback(() => {
      setIsBrowserNotSupported(false);
      setIsBrowserSupportShown('true');
    }, []);

    const onEnter = useCallback(() => {}, []);

    const onExit = useCallback(() => {}, []);

    const onRequestClose = useCallback(() => {
      setIsLocationSelectVisible(false);
      setIsSearchVisible(false);
    }, []);

    const hideSearchBarForMobile = useMemo(
      () =>
        router.pathname === Route.Search ||
        router.pathname === Route.HeavySearch,
      [router.pathname],
    );

    const rootClass = cn(s.root, {
      [s.rootGrey]: greyBackground,
    });

    const mainLayoutClass = cn(s.mainLayout, {
      [s.mainLayoutFull]: fullScreen,
      [s.withoutHeaderNav]: headerNav === 'false',
      [s.mainLayoutNoHeader]: !header,
      [s.mainLayoutNoSearch]: hideSearchBarForMobile,
      [s.mainLayoutNoSearchScroll]: hideSearchBarForMobile && isScrollingDown,
    });

    const mainContentClass = cn(s.mainContent, {
      [s.mainContentFull]: fullScreen,
      [s.mainContentHorizontal]: horizontal,
      [s.mainContentNoBottom]: noBottom,
    });

    const mainBackgroundClass = cn(s.mainBackgroundPortal, {
      [s.mainBackgroundPortalFull]: fullScreen,
    });

    const mainContentStyle = useMemo(
      () => (minHeight ? { minHeight } : undefined),
      [minHeight],
    );

    return (
      <div id="layout-main-style" className={rootClass}>
        {header ? (
          <Header
            {...header}
            isScrollingDown={isScrollingDown}
            isHeaderNav={headerNav !== 'false'}
            toggleLocationSelect={toggleLocationSelect}
            toggleSearch={toggleSearch}
            closePopups={closePopups}
            isSearchVisible={isSearchVisible}
            isPageLoadingExternal={isPageLoadingExternal}
          />
        ) : null}
        <div id="main-content-wrapper" className={mainLayoutClass}>
          <div id="main-background-portal" className={mainBackgroundClass} />
          <main
            id="main-content"
            className={mainContentClass}
            style={mainContentStyle}>
            {children}
          </main>
        </div>
        {footer ? (
          <Footer {...footer} onMailPopSubscription={openMailPopSubscription} />
        ) : null}
        {noModals ? null : (
          <>
            {withModal(
              isLocationSelectVisible,
              onEnter,
              onExit,
              onRequestClose,
              styles.overlayLocation(matches.isMobile),
              styles.contentLocation(matches.isMobile),
              <LocationDropdown
                location={savedLocation}
                toggleLocationSelect={toggleLocationSelect}
              />,
            )}
            {withModal(
              isSearchVisible,
              onEnter,
              onExit,
              undefined,
              styles.overlaySearch(matches.isMobile),
              styles.contentSearch(matches.isMobile),
              <SearchDropdown toggleSearch={toggleSearch} />,
            )}
            {withModal(
              !isAgeConfirmed,
              onEnter,
              onExit,
              onRequestClose,
              styles.overlayPopup(matches.isMobile),
              styles.contentPopup(matches.isMobile),
              <Age closeAge={closeAge} userCountry={userCountry} />,
            )}
            {withModal(
              mailPopShouldShow && !isMailPopShown,
              onEnter,
              onExit,
              onRequestClose,
              styles.overlayPopup(matches.isMobile),
              styles.contentPopup(matches.isMobile),
              <MailPop closeMailPop={closeMailPop} />,
            )}
            {withModal(
              mailPopSubscriptionShouldShow,
              onEnter,
              onExit,
              onRequestClose,
              styles.overlayPopup(matches.isMobile),
              styles.contentPopup(matches.isMobile),
              <MailPopSubscription closeMailPop={closeMailPopSubscription} />,
            )}
            {withModal(
              isPageLoading,
              onEnter,
              onExit,
              undefined,
              styles.overlayLoading(matches.isMobile),
              styles.contentLoading(matches.isMobile),
              null,
            )}
            {isBrowserNotSupported && !isBrowserSupportShown ? (
              <BrowserSupport closeBrowserSupport={closeBrowserSupport} />
            ) : null}
          </>
        )}
      </div>
    );
  },
);

const styles = {
  contentPopup: (_: boolean) => ({
    justifyContent: 'center',
  }),
  contentLocation: (_: boolean) => ({}),
  contentSearch: (isMobile: boolean) => ({
    height: `calc(100vh - ${isMobile ? 0 : 61}px)`,
  }),
  overlayPopup: (_: boolean) => ({
    background: 'rgba(0, 0, 0, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  overlaySearch: (isMobile: boolean) => ({
    top: `${isMobile ? 0 : 61}px`,
    height: `calc(100vh - ${isMobile ? 0 : 61}px)`,
    background: '#ffffff',
  }),
  overlayLocation: (_: boolean) => ({
    background: 'rgba(0, 0, 0, 0.4)',
  }),
  overlayLoading: (isMobile: boolean) => ({
    paddingTop: `${isMobile ? 61 : 151}px`,
    height: `calc(100vh - ${isMobile ? 61 : 151}px)`,
    width: '100vw',
    background: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  contentLoading: (isMobile: boolean) => ({
    width: '100vw',
    maxWidth: '100vw',
    height: `calc(100vh - ${isMobile ? 61 : 151}px)`,
    justifyContent: 'center',
    background: '#ffffff',
  }),
};
