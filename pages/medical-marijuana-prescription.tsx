import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { useBreadCrumbStatic } from '../services/breadCrumb';
import { StaticTitle } from '../components/common/StaticTitle/StaticTitle';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),
    },
  };
}

const MedicalPrescription = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <NextSeo
        title={
          props.breadCrumb?.metaTags?.metaTitle ||
          `Medical Marijuana Prescription`
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
      <StaticTitle title={`Medical Marijuana Prescription`} />
    </>
  );
};

export default MedicalPrescription;
