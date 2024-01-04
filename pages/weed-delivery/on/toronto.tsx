import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { Toronto } from '../../../components/common/TorontoLayout/Toronto';
import { useTorontoLanding } from '../../../services/staticPages';
import { ITorontoLanding } from '../../../components/common/TorontoLayout/Torotnto.types';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),
      torontoLanding: await useTorontoLanding(),
    },
  };
}

const TorontoLanding = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { apple, google } = (props as any).layout.footer;
  return (
    <>
      <NextSeo
        title={
          props.breadCrumb?.metaTags?.metaTitle ||
          'Weed Delivery Toronto Ontario. Marijuana Delivery Near Me | Leafythings'
        }
        description={props.breadCrumb?.metaTags?.metaDescription || undefined}
        noindex={props.breadCrumb?.noIndex || undefined}
        canonical={props.breadCrumb?.canonicalLink || undefined}
      />
      <Toronto
        torontoProducts={props.torontoLanding.torontoProducts}
        torontoLandingData={
          props.torontoLanding.torontoLandingData as ITorontoLanding
        }
        currentUrls={{ apple, google }}
      />
    </>
  );
};

export default TorontoLanding;
