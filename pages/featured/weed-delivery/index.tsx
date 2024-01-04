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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      delivery: await useFeaturedDeliveriesStatic(context),
    },
  };
}

const FeaturedDelivery = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { featured } = useFeaturedDeliveriesDynamic(props.delivery);

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
    </>
  );
};

export default FeaturedDelivery;
