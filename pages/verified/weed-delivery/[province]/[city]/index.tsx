import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { BreadCrumb } from '../../../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../../../components/common/Grid/Grid';

import {
  useVerifiedDeliveriesDynamic,
  useVerifiedDeliveriesStatic,
} from '../../../../../services/delivery';
import { useBreadCrumbStatic } from '../../../../../services/breadCrumb';
import { AnalyticsAction } from '../../../../../services/analytics';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      delivery: await useVerifiedDeliveriesStatic(context),
    },
  };
}

const VerifiedDelivery = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { verified } = useVerifiedDeliveriesDynamic(props.delivery);

  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {verified.map(business => (
          <BusinessCard
            key={`Verified-delivery-${business.bizBusinessID}`}
            business={business}
            gridMode
            analyticsAction={AnalyticsAction.VerifiedView}
          />
        ))}
      </Grid>
    </>
  );
};

export default VerifiedDelivery;
