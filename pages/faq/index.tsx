import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { useFAQ } from '../../services/staticPages';
import { FAQ } from '../../components/common/FAQ/FAQ';
import { StaticTitle } from '../../components/common/StaticTitle/StaticTitle';
import { useBreadCrumbStatic } from '../../services/breadCrumb';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      faq: await useFAQ(),
      breadCrumb: await useBreadCrumbStatic(context),
    },
  };
}

const FAQPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <NextSeo
        title={props.breadCrumb?.metaTags?.metaTitle || `FAQ`}
        description={props.breadCrumb?.metaTags?.metaDescription || undefined}
        noindex={props.breadCrumb?.noIndex || undefined}
        canonical={props.breadCrumb?.canonicalLink || undefined}
        openGraph={{
          images: props.breadCrumb?.metaTags?.customImages,
          title: props.breadCrumb?.metaTags?.metaTitle || undefined,
          description: props.breadCrumb?.metaTags?.metaDescription || undefined,
        }}
      />
      <StaticTitle
        title={
          props.breadCrumb?.metaTags?.customTitle ||
          'Frequently Asked Questions'
        }
      />
      <FAQ faq={props.faq} />
    </>
  );
};

export default FAQPage;
