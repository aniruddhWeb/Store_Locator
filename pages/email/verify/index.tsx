import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';
import { BasicLayout } from '../../../components/common/BasicLayout/BasicLayout';
import { useUserEmailVerify } from '../../../services/auth';
import { EmailVerify } from '../../../components/auth/EmailVerify/EmailVerify';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),
      emailVerified: await useUserEmailVerify(
        context?.query?.code as string,
        context?.query?.id as string,
      ),
    },
  };
}

const EmailVerifyPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <NextSeo
        title={props.breadCrumb?.metaTags?.metaTitle || 'Confirm Email'}
        description={props.breadCrumb?.metaTags?.metaDescription || undefined}
        noindex={props.breadCrumb?.noIndex || undefined}
        canonical={props.breadCrumb?.canonicalLink || undefined}
        openGraph={{
          images: props.breadCrumb?.metaTags?.customImages,
          title: props.breadCrumb?.metaTags?.metaTitle || 'Confirm Email',
          description: props.breadCrumb?.metaTags?.metaDescription || undefined,
        }}
      />
      <EmailVerify emailVerified={props.emailVerified} />
    </>
  );
};

export default EmailVerifyPage;
