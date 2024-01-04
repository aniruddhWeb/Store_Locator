import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';
import { ChangeResetForm } from '../../../components/auth/ChangeResetForm/ChangeResetForm';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),
    },
  };
}

const LoginPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <NextSeo
        title={props.breadCrumb?.metaTags?.metaTitle || 'Change Password'}
        description={props.breadCrumb?.metaTags?.metaDescription || undefined}
        noindex={props.breadCrumb?.noIndex || undefined}
        canonical={props.breadCrumb?.canonicalLink || undefined}
        openGraph={{
          images: props.breadCrumb?.metaTags?.customImages,
          title: props.breadCrumb?.metaTags?.metaTitle || 'Change Password',
          description: props.breadCrumb?.metaTags?.metaDescription || undefined,
        }}
      />
      <ChangeResetForm />
    </>
  );
};

export default LoginPage;
