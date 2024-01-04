import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { StaticTitle } from '../../components/common/StaticTitle/StaticTitle';
import { useBreadCrumbStatic } from '../../services/breadCrumb';
import { Sitemap } from '../../components/sitemap/Sitemap/Sitemap';
import { useSiteMapStatic } from '../../services/sitemap';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      sitemap: await useSiteMapStatic(),
      breadCrumb: await useBreadCrumbStatic(context),
    },
  };
}

const SiteMapPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <NextSeo
        title={props.breadCrumb?.metaTags?.metaTitle || `Sitemap`}
        description={props.breadCrumb?.metaTags?.metaDescription || undefined}
        noindex={props.breadCrumb?.noIndex || undefined}
        canonical={props.breadCrumb?.canonicalLink || undefined}
        openGraph={{
          images: props.breadCrumb?.metaTags?.customImages,
          title: props.breadCrumb?.metaTags?.metaTitle || undefined,
          description: props.breadCrumb?.metaTags?.metaDescription || undefined,
        }}
      />
      <StaticTitle title={'Sitemap'} />
      <Sitemap sitemap={props.sitemap} />
    </>
  );
};

export default SiteMapPage;
