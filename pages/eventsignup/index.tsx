import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { EventRegisterForm } from 'components/auth/EventRegisterForm/EventRegisterForm';
import { useBreadCrumbStatic } from '../../services/breadCrumb';
import { Route } from '../../config/Routes';
import { useCurrentUserStatic } from '../../services/user';
import { askUserLocation } from '../../services/location';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const currentUser = await useCurrentUserStatic(context);
  const currentRegion = await askUserLocation(context);
  return {
    redirect: !!currentUser && {
      destination: Route.Root,
      permanent: false,
    },
    props: {
      currentRegion: currentRegion || null,

      breadCrumb: await useBreadCrumbStatic(context),
    },
  };
}

const RegisterPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <NextSeo
        title={props.breadCrumb?.metaTags?.metaTitle || 'Sign Up'}
        description={props.breadCrumb?.metaTags?.metaDescription || undefined}
        noindex={props.breadCrumb?.noIndex || undefined}
        canonical={props.breadCrumb?.canonicalLink || undefined}
        openGraph={{
          images: props.breadCrumb?.metaTags?.customImages,
          title: props.breadCrumb?.metaTags?.metaTitle || 'Sign Up',
          description: props.breadCrumb?.metaTags?.metaDescription || undefined,
        }}
      />
      <EventRegisterForm userRegion={props.currentRegion} />
    </>
  );
};

export default RegisterPage;
