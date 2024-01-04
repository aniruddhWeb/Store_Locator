import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { useAboutUs } from '../../services/staticPages';
import { AboutHeader } from '../../components/about/AboutHeader/AboutHeader';
import { AboutMission } from '../../components/about/AboutMission/AboutMission';
import { AboutPartner } from '../../components/about/AboutPartner/AboutPartner';
import { useBreadCrumbStatic } from '../../services/breadCrumb';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      about: await useAboutUs(),
      breadCrumb: await useBreadCrumbStatic(context),
    },
  };
}

const FAQPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <NextSeo
        title={props.breadCrumb?.metaTags?.metaTitle || `About Us`}
        description={props.breadCrumb?.metaTags?.metaDescription || undefined}
        noindex={props.breadCrumb?.noIndex || undefined}
        canonical={props.breadCrumb?.canonicalLink || undefined}
        openGraph={{
          images: props.breadCrumb?.metaTags?.customImages,
          title: props.breadCrumb?.metaTags?.metaTitle || `About Us`,
          description: props.breadCrumb?.metaTags?.metaDescription || undefined,
        }}
      />
      <h1 className="displayNone">
        {props.breadCrumb?.metaTags?.customTitle || 'About Us'}
      </h1>
      <AboutHeader
        title={props.about.whatWeDo?.title}
        description={props.about.whatWeDo?.description}
        image={props.about.whatWeDo?.image?.url}
      />
      <AboutMission
        title={props.about.ourMission?.title}
        description={props.about.ourMission?.description}
        image={props.about.ourMission?.image?.url}
      />
      <AboutPartner
        title={props.about.promoVideo?.title}
        description={props.about.promoVideo?.description}
        video={props.about.promoVideo?.url}
      />
    </>
  );
};

export default FAQPage;
