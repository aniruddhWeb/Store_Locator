import { GetServerSidePropsContext } from 'next';
import { getApolloClient, getContentfulClient } from '../api/client';
import {
  AppleStoreLinkDocument,
  AppleStoreLinkQuery,
  AppleStoreLinkQueryVariables,
  EmailLinkDocument,
  EmailLinkQuery,
  EmailLinkQueryVariables,
  FacebookLinkDocument,
  FacebookLinkQuery,
  FacebookLinkQueryVariables,
  GooglePlayLinkDocument,
  GooglePlayLinkQuery,
  GooglePlayLinkQueryVariables,
  InstagramLinkDocument,
  InstagramLinkQuery,
  InstagramLinkQueryVariables,
  ProductTypeBannersDocument,
  ProductTypeBannersQuery,
  ProductTypeBannersQueryVariables,
  YoutubeLinkDocument,
  YoutubeLinkQuery,
  YoutubeLinkQueryVariables,
} from '../generated/contentful';
import {
  LocationFooterPositionDocument,
  LocationFooterPositionQuery,
  LocationFooterPositionQueryVariables,
  ProductTypeItemsDocument,
  ProductTypeItemsQuery,
  ProductTypeItemsQueryVariables,
} from '../generated/app';
import { Route } from '../config/Routes';
import { getCookie, setCookieStatic } from './cookie';

const noBottomLayoutPages = [
  Route.Root,
  Route.EnCa,
  Route.EnUs,
  Route.Dutchie,
  Route.FAQ,
  Route.ContactUs,
  Route.BetaFeedback,
  Route.SiteMap,
  Route.TorontoLanding,
  Route.Map,
  Route.Traffic,
  Route.ProductAds,
  Route.ProductAdsBusiness,
  Route.ProductAdsAdmin,
  `${Route.WhereToBuy}${Route.BusinessMap}`,
];

const fullScreenLayoutPages = [
  Route.ProductAds,
  Route.ProductAdsBusiness,
  Route.ProductAdsAdmin,
  Route.Map,
  Route.Traffic,
  `${Route.WhereToBuy}${Route.BusinessMap}`,
];

const noHeaderLayoutPages = [
  Route.ProductAds,
  Route.ProductAdsBusiness,
  Route.ProductAdsAdmin,
  `${Route.WhereToBuy}${Route.BusinessMap}`,
];

const noFooterLayoutPages = [
  Route.ProductAds,
  Route.ProductAdsBusiness,
  Route.ProductAdsAdmin,
  Route.Map,
  `${Route.WhereToBuy}${Route.BusinessMap}`,
];

const noModalLayoutPages = [
  Route.ProductAds,
  Route.ProductAdsBusiness,
  Route.ProductAdsAdmin,
  `${Route.WhereToBuy}${Route.BusinessMap}`,
];

const basicLayoutPages = [
  Route.ForgotPassword,
  Route.RegisterUser,
  Route.Login,
  Route.EventRegisterUser,
  Route.EmailUserSubscription,
  Route.EmailVerify,
  Route.EmailResend,
];

const basicNoHeaderLayoutPages = [
  Route.EmailUserSubscription,
  Route.EmailVerify,
  Route.EmailResend,
];

const greyBackgroundPages = [
  Route.Search,
  Route.SearchBusinesses,
  Route.SearchDeals,
  Route.SearchProducts,
];

const allowUrlInclude = [
  Route.Search,
  Route.SearchBusinesses,
  Route.SearchDeals,
  Route.SearchProducts,
  Route.Traffic,
  Route.EmailUserSubscription,
  Route.EmailVerify,
  Route.EmailResend,
  Route.ForgotPassword,
  `${Route.WhereToBuy}${Route.BusinessMap}`,
];

export const useLayoutStatic = async (ctx?: GetServerSidePropsContext) => {
  const { data: instagramData } = await getContentfulClient().query<
    InstagramLinkQuery,
    InstagramLinkQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: InstagramLinkDocument,
  });

  const { data: emailData } = await getContentfulClient().query<
    EmailLinkQuery,
    EmailLinkQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: EmailLinkDocument,
  });

  const { data: youtubeData } = await getContentfulClient().query<
    YoutubeLinkQuery,
    YoutubeLinkQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: YoutubeLinkDocument,
  });

  const { data: facebookData } = await getContentfulClient().query<
    FacebookLinkQuery,
    FacebookLinkQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: FacebookLinkDocument,
  });

  const { data: appleStoreData } = await getContentfulClient().query<
    AppleStoreLinkQuery,
    AppleStoreLinkQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: AppleStoreLinkDocument,
  });

  const { data: googlePlayData } = await getContentfulClient().query<
    GooglePlayLinkQuery,
    GooglePlayLinkQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: GooglePlayLinkDocument,
  });

  const { data: locationData } = await getApolloClient(ctx).query<
    LocationFooterPositionQuery,
    LocationFooterPositionQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: LocationFooterPositionDocument,
    errorPolicy: 'ignore',
  });

  const { data: productListTypesData } = await getApolloClient(ctx).query<
    ProductTypeItemsQuery,
    ProductTypeItemsQueryVariables
  >({
    fetchPolicy: 'no-cache',
    query: ProductTypeItemsDocument,
    errorPolicy: 'ignore',
  });

  const { data: categoryContentData } = await getContentfulClient().query<
    ProductTypeBannersQuery,
    ProductTypeBannersQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: ProductTypeBannersDocument,
  });

  const currentUrl = ctx?.resolvedUrl || (ctx as any)?.asPath;

  const layoutProps = {
    noBottom: noBottomLayoutPages.some(
      pageRoute =>
        currentUrl === pageRoute ||
        (currentUrl?.includes(pageRoute) &&
          allowUrlInclude.includes(pageRoute)),
    ),
    fullScreen: fullScreenLayoutPages.some(
      pageRoute =>
        currentUrl === pageRoute ||
        (currentUrl?.includes(pageRoute) &&
          allowUrlInclude.includes(pageRoute)),
    ),
    shouldUseBasicLayout: basicLayoutPages.some(
      pageRoute =>
        currentUrl === pageRoute ||
        (currentUrl?.includes(pageRoute) &&
          allowUrlInclude.includes(pageRoute)),
    ),
    hideHeader:
      basicLayoutPages.some(
        pageRoute =>
          currentUrl === pageRoute ||
          (currentUrl?.includes(pageRoute) &&
            allowUrlInclude.includes(pageRoute)),
      ) &&
      basicNoHeaderLayoutPages.some(
        pageRoute =>
          currentUrl === pageRoute ||
          (currentUrl?.includes(pageRoute) &&
            allowUrlInclude.includes(pageRoute)),
      ),
    greyBackground: greyBackgroundPages.some(
      pageRoute =>
        currentUrl === pageRoute ||
        (currentUrl?.includes(pageRoute) &&
          allowUrlInclude.includes(pageRoute)),
    ),
    noModals: noModalLayoutPages.some(
      pageRoute =>
        currentUrl === pageRoute ||
        (currentUrl?.includes(pageRoute) &&
          allowUrlInclude.includes(pageRoute)),
    ),
  };

  const shouldRemoveByAppleGuidelines =
    !!getCookie('shouldRemoveByAppleGuidelines', ctx?.req?.headers?.cookie) ||
    ctx?.req?.headers?.platform === 'ios' ||
    ctx?.req?.headers?.platform === 'android';

  const header = noHeaderLayoutPages.some(
    pageRoute =>
      currentUrl === pageRoute ||
      (currentUrl?.includes(pageRoute) && allowUrlInclude.includes(pageRoute)),
  )
    ? null
    : {
        shouldRemoveByAppleGuidelines,
        categoryBanners:
          categoryContentData?.productMenuItemCollection?.items || [],
        categories: productListTypesData?.productListTypes?.productTypes || [],
      };

  const shouldHideAppDownload =
    !!getCookie('shouldHideAppDownload', ctx?.req?.headers?.cookie) ||
    ctx?.req?.headers?.platform === 'ios' ||
    ctx?.req?.headers?.platform === 'android';

  if (shouldHideAppDownload && ctx) {
    setCookieStatic(
      ctx,
      'shouldHideAppDownload',
      JSON.stringify(shouldHideAppDownload),
    );
  }

  if (shouldRemoveByAppleGuidelines && ctx) {
    setCookieStatic(
      ctx,
      'shouldRemoveByAppleGuidelines',
      JSON.stringify(shouldRemoveByAppleGuidelines),
    );
  }

  const footer = noFooterLayoutPages.some(
    pageRoute =>
      currentUrl === pageRoute ||
      (currentUrl?.includes(pageRoute) && allowUrlInclude.includes(pageRoute)),
  )
    ? null
    : {
        shouldHideAppDownload,
        regions: locationData?.locationFooterPosition || [],
        instagram: instagramData?.socialLink?.url || '',
        email: emailData?.socialLink?.url || '',
        youtube: youtubeData.socialLink?.url || '',
        facebook: facebookData?.socialLink?.url || '',
        google: googlePlayData?.socialLink?.url || '',
        apple: appleStoreData?.socialLink?.url || '',
      };

  return {
    ...layoutProps,
    footer,
    header,
  };
};
