import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { ContactForm } from '../../components/contact/ContactForm/ContactForm';
import { StaticTitle } from '../../components/common/StaticTitle/StaticTitle';
import { useBreadCrumbStatic } from '../../services/breadCrumb';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),
    },
  };
}

const ContactPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <NextSeo
        title={props.breadCrumb?.metaTags?.metaTitle || `Contact Us`}
        description={props.breadCrumb?.metaTags?.metaDescription || undefined}
        noindex={props.breadCrumb?.noIndex || undefined}
        canonical={props.breadCrumb?.canonicalLink || undefined}
        openGraph={{
          images: props.breadCrumb?.metaTags?.customImages,
          title: props.breadCrumb?.metaTags?.metaTitle || undefined,
          description: props.breadCrumb?.metaTags?.metaDescription || undefined,
        }}
      />
      <StaticTitle
        title={props.breadCrumb?.metaTags?.customTitle || 'Contact Us'}
        subTitle="Do you have any questions? Please do not hesitate to contact us directly. If it’s convenience and quality that matters most then look no further than our list of Toronto weed delivery services! We are always updating our listings so that we can provide up-to-date information about all of our partners who deliver weed across Canada and beyond."
        link={{
          destination: '/weed-delivery/on/toronto',
          link: 'Toronto weed delivery services',
        }}
      />
      <ContactForm />
    </>
  );
};

export default ContactPage;
