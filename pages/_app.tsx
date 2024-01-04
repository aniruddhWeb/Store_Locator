import '../assets/main.css';
import '@djthoms/pretty-checkbox';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-spring-bottom-sheet/dist/style.css';
import 'react-virtualized/styles.css';
import App, { AppContext, AppProps } from 'next/app';
import React, { FC } from 'react';
import { ApolloProvider } from '@apollo/client';
import smoothScroll from 'smoothscroll-polyfill';
import Head from 'next/head';
import { apolloClient } from '../api/client';
import { hasWindow } from '../utils/window';
import { LayoutLoadingContext, useLayoutLoadingState } from '../services/app';
import {
  askUserCountry,
  LocationContext,
  useCurrentLocationStatic,
  useLocationState,
} from '../services/location';
import {
  UserContext,
  useCurrentUserStatic,
  useUserState,
} from '../services/user';
import { getCookie, setCookieStatic } from '../services/cookie';
import { DISABLE_IMAGES } from '../config/Constants';
import { useLayoutStatic } from '../services/layout';
import { BasicLayout } from '../components/common/BasicLayout/BasicLayout';
import { Layout } from '../components/common/Layout/Layout';
import { Route } from '../config/Routes';
import {
  SearchContext,
  useSearchState,
} from '../hooks/search/useSearchContext';

if (hasWindow) {
  smoothScroll.polyfill();
}

if (DISABLE_IMAGES) {
  if (hasWindow) {
    const images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i += 1) {
      images[i].style.visibility = 'hidden';
    }
  }
}

const MyApp = ({
  Component,
  pageProps,
  router,
}: AppProps & { pageProps?: any; Component: { Layout: FC } }) => {
  const userState = useUserState(pageProps?.user || null);
  const locationState = useLocationState(pageProps?.location || null);
  const searchState = useSearchState(pageProps?.search || null);
  const pageLoadingState = useLayoutLoadingState();
  const LayoutComponent =
    router.pathname === Route.StatusCheck
      ? React.Fragment
      : pageProps?.layout?.shouldUseBasicLayout
      ? BasicLayout
      : Layout;
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Head>
          <meta
            name="description"
            content="Easily find recreational & medicinal marijuana dispensaries, weed delivery, mail order, doctors and resources near you. Efficient, fast, legal access"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5"
          />
          <title>Leafythings</title>
        </Head>
        <SearchContext.Provider value={searchState}>
          <LocationContext.Provider value={locationState}>
            <UserContext.Provider value={userState}>
              <LayoutLoadingContext.Provider value={pageLoadingState}>
                <LayoutComponent
                  {...pageProps?.layout}
                  userCountry={pageProps?.location?.userCountry}>
                  <Component key={router.pathname} {...pageProps} />
                </LayoutComponent>
              </LayoutLoadingContext.Provider>
            </UserContext.Provider>
          </LocationContext.Provider>
        </SearchContext.Provider>
      </ApolloProvider>
    </>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  let layout: any;
  if (appContext.router.pathname === Route.StatusCheck) {
    layout = null;
  } else {
    layout = await useLayoutStatic(appContext.ctx as any);
  }
  let user: any;
  if (appContext.router.pathname === Route.StatusCheck) {
    user = null;
  } else {
    user = await useCurrentUserStatic(appContext.ctx as any);
  }
  const location = await useCurrentLocationStatic(
    appContext.ctx as any,
    appContext.router.pathname === Route.StatusCheck,
  );
  let userLocationAllowed: boolean = false;
  const userLocationAllowedCookie = getCookie(
    'location-allowed',
    (appContext.ctx as any)?.req?.headers?.cookie,
  );
  if (userLocationAllowedCookie) {
    try {
      userLocationAllowed = !!JSON.parse(userLocationAllowedCookie);
    } catch (e) {
      userLocationAllowed = false;
    }
  }
  const searchLocationType: string | undefined = getCookie(
    'search-location-type',
    (appContext.ctx as any)?.req?.headers?.cookie,
  );
  const searchLocationLat: number = Number(
    getCookie(
      'search-location-lat',
      (appContext.ctx as any)?.req?.headers?.cookie,
    ) || 0,
  );
  const searchLocationLng: number = Number(
    getCookie(
      'search-location-lng',
      (appContext.ctx as any)?.req?.headers?.cookie,
    ) || 0,
  );
  const ageGateConfirmed = getCookie(
    'ageGate',
    (appContext.ctx as any)?.req?.headers?.cookie,
  );
  let userCountry: string | null | undefined = '';
  if (!ageGateConfirmed) {
    userCountry = await askUserCountry(appContext.ctx as any);
  }
  setCookieStatic(
    appContext.ctx as any,
    'current-location',
    JSON.stringify(location.selectedLocation),
  );
  setCookieStatic(
    appContext.ctx as any,
    'user-location',
    JSON.stringify(location.userLocation),
  );
  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      layout,
      user,
      location: {
        ...location,
        userLocationAllowed,
        userCountry,
      },
      search: {
        locationType: searchLocationType,
        userLocationLat: searchLocationLat,
        userLocationLng: searchLocationLng,
      },
    },
  };
};

export default MyApp;
