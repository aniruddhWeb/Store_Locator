import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import { useBreadCrumbStatic } from '../../../../services/breadCrumb';
import { useUserEmailResend } from '../../../../services/auth';
import { EmailResend } from '../../../../components/auth/EmailResend/EmailResend';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),
      emailResent: await useUserEmailResend(context?.query?.userId as string),
    },
  };
}

const EmailResendPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <NextSeo
        title={
          props.breadCrumb?.metaTags?.metaTitle || 'Resend Confirmation Email'
        }
        description={props.breadCrumb?.metaTags?.metaDescription || undefined}
        noindex={props.breadCrumb?.noIndex || undefined}
        canonical={props.breadCrumb?.canonicalLink || undefined}
        openGraph={{
          images: props.breadCrumb?.metaTags?.customImages,
          title:
            props.breadCrumb?.metaTags?.metaTitle ||
            'Resend Confirmation Email',
          description: props.breadCrumb?.metaTags?.metaDescription || undefined,
        }}
      />
      <EmailResend emailResent={props.emailResent} />
    </>
  );
};

export default EmailResendPage;
