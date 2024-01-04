import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { BreadCrumb } from '../../components/common/BreadCrumb/BreadCrumb';
import { Marquee } from '../../components/common/Marquee/Marquee';
import { BusinessCard } from '../../components/business/BusinessCard/BusinessCard';
import { useFeaturedDynamic, useFeaturedStatic } from '../../services/featured';
import { useBreadCrumbStatic } from '../../services/breadCrumb';
import { useBusinessNavigation } from '../../hooks/business/useBusinessNavigation';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      featured: await useFeaturedStatic(context),
    },
  };
}

const Featured = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const {
    featuredBrands,
    featuredDeliveries,
    featuredMails,
    featuredDispensaries,
  } = useFeaturedDynamic(props.featured);

  const { onFeatured } = useBusinessNavigation();

  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Marquee
        title="Featured Brands"
        variant="second"
        seeAllText="Show all"
        seeAllHref={onFeatured('brand', false)}>
        {featuredBrands.map(business => (
          <BusinessCard
            key={`brand-${business.bizBusinessID}`}
            business={business}
          />
        ))}
      </Marquee>
      <Marquee
        title="Featured Cannabis Delivery"
        variant="second"
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
        title="Featured Mail Order Marijuana"
        variant="third"
        seeAllText="Show all"
        seeAllHref={onFeatured('mail', false)}>
        {featuredMails.map((business, businessIndex) => (
          <BusinessCard
            key={`mail-order-${business.bizBusinessID}`}
            business={business}
            variant="row"
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
    </>
  );
};

export default Featured;
