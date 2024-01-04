import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../components/common/Grid/Grid';

import {
  useAllDispensaryDynamic,
  useAllDispensaryStatic,
} from '../../../services/dispensary';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';
import { BusinessInterlinking } from '../../../components/business/BusinessInterlinking/BusinessInterlinking';
import { useInterlinking } from '../../../services/seo';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      interLinking: await useInterlinking('dispensaries', context),
      breadCrumb: await useBreadCrumbStatic(context),

      dispensary: await useAllDispensaryStatic(context, true),
    },
  };
}

const AllDispensary = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { all } = useAllDispensaryDynamic(props.dispensary, true);

  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {all.map(business => (
          <BusinessCard
            key={`all-dispensary-${business.bizBusinessID}`}
            business={business}
            gridMode
            showClaim
          />
        ))}
      </Grid>
      <BusinessInterlinking type={'dispensary'} links={props.interLinking} />
    </>
  );
};

export default AllDispensary;
