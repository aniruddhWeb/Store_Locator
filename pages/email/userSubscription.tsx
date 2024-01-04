import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import { useBreadCrumbStatic } from '../../services/breadCrumb';
import { useUserSubscription } from '../../services/auth';
import { EmailSubscription } from '../../components/auth/EmailSubscription/EmailSubscription';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),
      emailSubscribed: await useUserSubscription(
        context?.query?.name as string,
        ((context?.query?.email as string) || '').replace(/ /g, '+'),
        context?.query?.usrRegionID as string,
      ),
    },
  };
}

const EmailSubscriptionPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <NextSeo
        title={props.breadCrumb?.metaTags?.metaTitle || 'Email Subscription'}
        description={props.breadCrumb?.metaTags?.metaDescription || undefined}
        noindex={props.breadCrumb?.noIndex || undefined}
        canonical={props.breadCrumb?.canonicalLink || undefined}
        openGraph={{
          images: props.breadCrumb?.metaTags?.customImages,
          title: props.breadCrumb?.metaTags?.metaTitle || 'Email Subscription',
          description: props.breadCrumb?.metaTags?.metaDescription || undefined,
        }}
      />
      <EmailSubscription emailSubscribed={props.emailSubscribed} />
    </>
  );
};

export default EmailSubscriptionPage;
