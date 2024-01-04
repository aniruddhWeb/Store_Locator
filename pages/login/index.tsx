import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { useBreadCrumbStatic } from '../../services/breadCrumb';
import { LoginForm } from '../../components/auth/LoginForm/LoginForm';
import { Route } from '../../config/Routes';
import { useCurrentUserStatic } from '../../services/user';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const currentUser = await useCurrentUserStatic(context);
  return {
    redirect: !!currentUser && {
      destination: Route.Root,
      permanent: false,
    },
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
        title={props.breadCrumb?.metaTags?.metaTitle || 'Sign In'}
        description={props.breadCrumb?.metaTags?.metaDescription || undefined}
        noindex={props.breadCrumb?.noIndex || undefined}
        canonical={props.breadCrumb?.canonicalLink || undefined}
        openGraph={{
          images: props.breadCrumb?.metaTags?.customImages,
          title: props.breadCrumb?.metaTags?.metaTitle || 'Sign In',
          description: props.breadCrumb?.metaTags?.metaDescription || undefined,
        }}
      />
      <LoginForm />
    </>
  );
};

export default LoginPage;
