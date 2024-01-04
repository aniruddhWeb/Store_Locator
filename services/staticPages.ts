import { apolloClient, getContentfulClient } from '../api/client';
import {
  AboutConnectDocument,
  AboutConnectQuery,
  AboutConnectQueryVariables,
  AboutMissionDocument,
  AboutMissionQuery,
  AboutMissionQueryVariables,
  AboutVideoDocument,
  AboutVideoQuery,
  AboutVideoQueryVariables,
  FaqItemsDocument,
  FaqItemsQuery,
  FaqItemsQueryVariables,
  PrivacyPolicyDocument,
  PrivacyPolicyQuery,
  PrivacyPolicyQueryVariables,
  TermsOfServiceDocument,
  TermsOfServiceQuery,
  TermsOfServiceQueryVariables,
  TorontoLandingDocument,
  TorontoLandingQuery,
  TorontoLandingQueryVariables,
} from '../generated/contentful';
import {
  Product,
  TorontoProductsDocument,
  TorontoProductsQuery,
  TorontoProductsQueryVariables,
} from '../generated/graphql';

export const useTermsOfService = async () => {
  const { data: termsData } = await getContentfulClient().query<
    TermsOfServiceQuery,
    TermsOfServiceQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: TermsOfServiceDocument,
  });

  return {
    title: termsData?.staticPage?.title || '',
    body: termsData?.staticPage?.body?.json || null,
  };
};

export const usePrivacyPolicy = async () => {
  const { data: privacyData } = await getContentfulClient().query<
    PrivacyPolicyQuery,
    PrivacyPolicyQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: PrivacyPolicyDocument,
  });

  return {
    title: privacyData?.staticPage?.title || '',
    body: privacyData?.staticPage?.body?.json || null,
  };
};

export const useFAQ = async () => {
  const { data: faqData } = await getContentfulClient().query<
    FaqItemsQuery,
    FaqItemsQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: FaqItemsDocument,
  });

  const faqs = [...(faqData?.faqCollection?.items || [])];
  faqs.sort((a, b) => {
    if (
      a?.index !== null &&
      a?.index !== undefined &&
      b?.index !== null &&
      b?.index !== undefined &&
      a?.index > b?.index
    )
      return 1;
    if (
      a?.index !== null &&
      a?.index !== undefined &&
      b?.index !== null &&
      b?.index !== undefined &&
      a?.index < b?.index
    )
      return -1;
    return 0;
  });

  return faqs;
};

export const useAboutUs = async () => {
  const { data: aboutConnectData } = await getContentfulClient().query<
    AboutConnectQuery,
    AboutConnectQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: AboutConnectDocument,
  });

  const { data: aboutMissionData } = await getContentfulClient().query<
    AboutMissionQuery,
    AboutMissionQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: AboutMissionDocument,
  });

  const { data: aboutVideoData } = await getContentfulClient().query<
    AboutVideoQuery,
    AboutVideoQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: AboutVideoDocument,
  });

  return {
    whatWeDo: aboutConnectData?.aboutItem || null,
    ourMission: aboutMissionData?.aboutItem || null,
    promoVideo: aboutVideoData?.aboutVideo || null,
  };
};

export const useTorontoLanding = async () => {
  const { data: torontoLandingProduct } = await apolloClient.query<
    TorontoProductsQuery,
    TorontoProductsQueryVariables
  >({
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    query: TorontoProductsDocument,
  });

  const { data: torontoLandingData } = await getContentfulClient().query<
    TorontoLandingQuery,
    TorontoLandingQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: TorontoLandingDocument,
  });

  return {
    torontoLandingData: torontoLandingData?.torontoLanding || null,
    torontoProducts: (torontoLandingProduct?.productsByRegions ||
      []) as Product[],
  };
};
