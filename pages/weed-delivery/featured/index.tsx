import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../components/common/Grid/Grid';

import {
  useFeaturedDeliveriesDynamic,
  useFeaturedDeliveriesStatic,
} from '../../../services/delivery';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';
import { BusinessInterlinking } from '../../../components/business/BusinessInterlinking/BusinessInterlinking';
import { useInterlinking } from '../../../services/seo';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      interLinking: await useInterlinking('deliveries', context),
      breadCrumb: await useBreadCrumbStatic(context),

      delivery: await useFeaturedDeliveriesStatic(context, true),
    },
  };
}

const FeaturedDelivery = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { featured } = useFeaturedDeliveriesDynamic(props.delivery, true);

  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {featured.map(business => (
          <BusinessCard
            key={`featured-delivery-${business.bizBusinessID}`}
            business={business}
            gridMode
          />
        ))}
      </Grid>
      <BusinessInterlinking type={'delivery'} links={props.interLinking} />
    </>
  );
};

export default FeaturedDelivery;
