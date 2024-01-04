import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { useTermsOfService } from '../../services/staticPages';
import { StaticTitle } from '../../components/common/StaticTitle/StaticTitle';
import { StaticDescription } from '../../components/common/StaticDescription/StaticDescription';
import { useBreadCrumbStatic } from '../../services/breadCrumb';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      termsOfService: await useTermsOfService(),
      breadCrumb: await useBreadCrumbStatic(context),
    },
  };
}

const TermsOfService = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <NextSeo
        title={
          props.breadCrumb?.metaTags?.metaTitle ||
          `${props.termsOfService.title}`
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
      <StaticTitle title={props.termsOfService.title} />
      <StaticDescription body={props.termsOfService.body} />
    </>
  );
};

export default TermsOfService;
