import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../components/common/Grid/Grid';

import {
  useVerifiedDispensaryDynamic,
  useVerifiedDispensaryStatic,
} from '../../../services/dispensary';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';
import { AnalyticsAction } from '../../../services/analytics';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      dispensary: await useVerifiedDispensaryStatic(context),
    },
  };
}

const VerifiedDispensary = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { verified } = useVerifiedDispensaryDynamic(props.dispensary);

  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {verified.map(business => (
          <BusinessCard
            key={`Verified-dispensary-${business.bizBusinessID}`}
            business={business}
            gridMode
            analyticsAction={AnalyticsAction.VerifiedView}
          />
        ))}
      </Grid>
    </>
  );
};

export default VerifiedDispensary;
