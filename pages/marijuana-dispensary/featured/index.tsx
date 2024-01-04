import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../components/common/Grid/Grid';

import {
  useFeaturedDispensaryDynamic,
  useFeaturedDispensaryStatic,
} from '../../../services/dispensary';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';
import { BusinessInterlinking } from '../../../components/business/BusinessInterlinking/BusinessInterlinking';
import { useInterlinking } from '../../../services/seo';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      interLinking: await useInterlinking('dispensaries', context),
      breadCrumb: await useBreadCrumbStatic(context),

      dispensary: await useFeaturedDispensaryStatic(context, true),
    },
  };
}

const FeaturedDispensary = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { featured } = useFeaturedDispensaryDynamic(props.dispensary, true);

  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {featured.map(business => (
          <BusinessCard
            key={`featured-dispensary-${business.bizBusinessID}`}
            business={business}
            gridMode
          />
        ))}
      </Grid>
      <BusinessInterlinking type={'dispensary'} links={props.interLinking} />
    </>
  );
};

export default FeaturedDispensary;
