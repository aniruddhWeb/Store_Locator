import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../components/common/Grid/Grid';
import {
  useVerifiedMailDynamic,
  useVerifiedMailStatic,
} from '../../../services/mailOrder';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';
import { BusinessInterlinking } from '../../../components/business/BusinessInterlinking/BusinessInterlinking';
import { useInterlinking } from '../../../services/seo';
import { AnalyticsAction } from '../../../services/analytics';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      interLinking: await useInterlinking('mail orders', context),
      breadCrumb: await useBreadCrumbStatic(context),

      mail: await useVerifiedMailStatic(context),
    },
  };
}

const VerifiedMail = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { verified } = useVerifiedMailDynamic(props.mail);

  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {verified.map(business => (
          <BusinessCard
            key={`Verified-mail-${business.bizBusinessID}`}
            business={business}
            gridMode
            analyticsAction={AnalyticsAction.VerifiedView}
          />
        ))}
      </Grid>
      <BusinessInterlinking type={'mail'} links={props.interLinking} />
    </>
  );
};

export default VerifiedMail;
