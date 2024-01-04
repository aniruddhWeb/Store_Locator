import React from 'react';
import { NextSeo } from 'next-seo';
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next/types';
import { useBreadCrumbStatic } from 'services/breadCrumb';
import { BetaFeedbackForm } from 'components/contact/BetaFeedbackForm/BetaFeedbackForm';
import { AdaptiveTitle } from 'components/common/AdaptiveTitle/AdaptiveTitle';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),
    },
  };
}

const BetaFeedback = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <NextSeo
        title={props.breadCrumb?.metaTags?.metaTitle || `Beta Feedback`}
        description={props.breadCrumb?.metaTags?.metaDescription || undefined}
        noindex={props.breadCrumb?.noIndex || undefined}
        canonical={props.breadCrumb?.canonicalLink || undefined}
        openGraph={{
          images: props.breadCrumb?.metaTags?.customImages,
          title: props.breadCrumb?.metaTags?.metaTitle || undefined,
          description: props.breadCrumb?.metaTags?.metaDescription || undefined,
        }}
      />
      <AdaptiveTitle>Beta Feedback</AdaptiveTitle>
      <BetaFeedbackForm />
    </>
  );
};

export default BetaFeedback;
