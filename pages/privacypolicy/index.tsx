import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { usePrivacyPolicy } from '../../services/staticPages';
import { StaticTitle } from '../../components/common/StaticTitle/StaticTitle';
import { StaticDescription } from '../../components/common/StaticDescription/StaticDescription';
import { useBreadCrumbStatic } from '../../services/breadCrumb';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      privacyPolicy: await usePrivacyPolicy(),
      breadCrumb: await useBreadCrumbStatic(context),
    },
  };
}

const PrivacyPolicy = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <NextSeo
        title={
          props.breadCrumb?.metaTags?.metaTitle ||
          `${props.privacyPolicy.title}`
        }
        description={props.breadCrumb?.metaTags?.metaDescription || undefined}
        noindex={props.breadCrumb?.noIndex || undefined}
        canonical={props.breadCrumb?.canonicalLink || undefined}
        openGraph={{
          images: props.breadCrumb?.metaTags?.customImages,
          title: props.breadCrumb?.metaTags?.metaTitle || undefined,
          description: props.breadCrumb?.metaTags?.metaDescription || undefined,
        }}
      />
      <StaticTitle title={props.privacyPolicy.title} />
      <StaticDescription body={props.privacyPolicy.body} />
    </>
  );
};

export default PrivacyPolicy;
