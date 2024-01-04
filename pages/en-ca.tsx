import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { useHomeDynamic, useHomeStatic } from '../services/home';
import { Banner } from '../components/common/Banner/Banner';
import { Marquee } from '../components/common/Marquee/Marquee';
import { BusinessCard } from '../components/business/BusinessCard/BusinessCard';
import { OurStory } from '../components/home/OurStory/OurStory';
import { EducationalResources } from '../components/home/EducationalResources/EducationalResources';
import { AnalyticsAction } from '../services/analytics';
import { useBreadCrumbStatic } from '../services/breadCrumb';
import { TopSection } from '../components/home/TopSection/TopSection';
import { Route } from '../config/Routes';
import { useBusinessNavigation } from '../hooks/business/useBusinessNavigation';
import { TopCarousel } from '../components/home/TopCarousel/TopCarousel';
import { PUBLIC_WEBSITE } from '../config/Constants';

const homePageLanguages = [
  {
    hrefLang: 'en-ca',
    href: `${PUBLIC_WEBSITE}/en-ca`,
  },
  {
    hrefLang: 'en-us',
    href: `${PUBLIC_WEBSITE}/en-us`,
  },
  {
    hrefLang: 'en',
    href: `${PUBLIC_WEBSITE}`,
  },
  {
    hrefLang: 'x-default',
    href: `${PUBLIC_WEBSITE}`,
  },
];

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      home: await useHomeStatic(context),
      breadCrumb: await useBreadCrumbStatic(context),
    },
  };
}

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const {
    carousel,
    banners,
    ourStory,
    topSection,
    blogs,
    monthlyTopPicks,
    featuredBrands,
    featuredDeliveries,
    featuredMails,
    featuredDispensaries,
    verifiedBusinesses,
    allBusinesses,
  } = useHomeDynamic(props.home);

  const { onFeatured } = useBusinessNavigation();

  return (
    <>
      <>
        <NextSeo
          languageAlternates={homePageLanguages}
          title={props.breadCrumb?.metaTags?.metaTitle || undefined}
          description={props.breadCrumb?.metaTags?.metaDescription || undefined}
          canonical={props.breadCrumb?.canonicalLink || undefined}
          noindex={props.breadCrumb?.noIndex || undefined}
          openGraph={{
            images: props.breadCrumb?.metaTags?.customImages,
            title: props.breadCrumb?.metaTags?.metaTitle || undefined,
            description:
              props.breadCrumb?.metaTags?.metaDescription || undefined,
          }}
        />
        <TopCarousel carousel={carousel} />
        <TopSection topSection={topSection} />
        <Marquee title="Monthly Top Picks">
          {monthlyTopPicks.map(business => (
            <BusinessCard
              priority
              key={`top-pick-${business.bizBusinessID}`}
              business={business}
              analyticsAction={AnalyticsAction.TopPickView}
              sendGTMAction="monthly_top_clicks"
            />
          ))}
        </Marquee>
        <Marquee
          title="Featured Brands"
          variant="second"
          seeAllText="Show all"
          seeAllHref={onFeatured('brand', false)}>
          {featuredBrands.map(business => (
            <BusinessCard
              key={`brand-${business.bizBusinessID}`}
              business={business}
              priority={!monthlyTopPicks || monthlyTopPicks.length === 0}
            />
          ))}
        </Marquee>
        <Marquee
          title="Featured Cannabis Delivery"
          variant="third"
          seeAllText="Show all"
          seeAllHref={onFeatured('delivery', false)}>
          {featuredDeliveries.map(business => (
            <BusinessCard
              key={`delivery-${business.bizBusinessID}`}
              business={business}
              variant="row"
              sendGTMAction="featured_cannabis_delivery_clicks"
            />
          ))}
        </Marquee>
        <Marquee
          title="Featured Marijuana Dispensaries"
          variant="second"
          seeAllText="Show all"
          seeAllHref={onFeatured('dispensary', false)}>
          {featuredDispensaries.map(business => (
            <BusinessCard
              key={`dispensary-${business.bizBusinessID}`}
              business={business}
              variant="row"
            />
          ))}
        </Marquee>
        <Marquee
          title="Featured Mail Order Marijuana"
          variant="third"
          seeAllText="Show all"
          seeAllHref={onFeatured('mail', false)}>
          {featuredMails.map(business => (
            <BusinessCard
              key={`mail-order-${business.bizBusinessID}`}
              business={business}
              variant="row"
            />
          ))}
        </Marquee>
        <Marquee
          title="Verified Businesses"
          variant="second"
          seeAllText="Show all"
          seeAllHref={Route.Verified}>
          {verifiedBusinesses.map(business => (
            <BusinessCard
              key={`verified-${business.bizBusinessID}`}
              business={business}
              showLocation={false}
              analyticsAction={AnalyticsAction.VerifiedView}
            />
          ))}
        </Marquee>
        <Marquee
          title="All Businesses"
          variant="second"
          seeAllText="Show all"
          seeAllHref={Route.All}>
          {allBusinesses.map(business => (
            <BusinessCard
              key={`all-${business.bizBusinessID}`}
              business={business}
              showLocation={false}
              showClaim
            />
          ))}
        </Marquee>
        <Banner banners={banners} />
        <EducationalResources blogs={blogs} />
        <OurStory ourStory={ourStory} />
      </>
    </>
  );
};

export default Home;
