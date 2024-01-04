import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { BreadCrumb } from '../../../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../../../components/common/Grid/Grid';

import {
  useAllDeliveriesDynamic,
  useAllDeliveriesStatic,
} from '../../../../../services/delivery';
import { useBreadCrumbStatic } from '../../../../../services/breadCrumb';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      delivery: await useAllDeliveriesStatic(context),
    },
  };
}

const AllDelivery = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { all } = useAllDeliveriesDynamic(props.delivery);

  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {all.map(business => (
          <BusinessCard
            key={`all-delivery-${business.bizBusinessID}`}
            business={business}
            gridMode
            showClaim
          />
        ))}
      </Grid>
    </>
  );
};

export default AllDelivery;
