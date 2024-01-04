import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { BreadCrumb } from '../../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../../components/common/Grid/Grid';

import {
  useVerifiedDispensaryDynamic,
  useVerifiedDispensaryStatic,
} from '../../../../services/dispensary';
import { useBreadCrumbStatic } from '../../../../services/breadCrumb';
import { BusinessInterlinking } from '../../../../components/business/BusinessInterlinking/BusinessInterlinking';
import { useInterlinking } from '../../../../services/seo';
import { AnalyticsAction } from '../../../../services/analytics';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      interLinking: await useInterlinking('dispensaries', context),
      breadCrumb: await useBreadCrumbStatic(context),

      dispensary: await useVerifiedDispensaryStatic(context, true),
    },
  };
}

const VerifiedDispensary = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { verified } = useVerifiedDispensaryDynamic(props.dispensary, true);

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
      <BusinessInterlinking type={'dispensary'} links={props.interLinking} />
    </>
  );
};

export default VerifiedDispensary;
