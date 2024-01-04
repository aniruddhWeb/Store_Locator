import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { BreadCrumb } from '../../../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../../../components/common/Grid/Grid';

import {
  useFeaturedDispensaryDynamic,
  useFeaturedDispensaryStatic,
} from '../../../../../services/dispensary';
import { useBreadCrumbStatic } from '../../../../../services/breadCrumb';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      dispensary: await useFeaturedDispensaryStatic(context),
    },
  };
}

const FeaturedDispensary = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { featured } = useFeaturedDispensaryDynamic(props.dispensary);

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
    </>
  );
};

export default FeaturedDispensary;
