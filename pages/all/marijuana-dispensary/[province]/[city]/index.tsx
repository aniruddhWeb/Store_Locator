import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { BreadCrumb } from '../../../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../../../components/common/Grid/Grid';

import {
  useAllDispensaryDynamic,
  useAllDispensaryStatic,
} from '../../../../../services/dispensary';
import { useBreadCrumbStatic } from '../../../../../services/breadCrumb';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      dispensary: await useAllDispensaryStatic(context),
    },
  };
}

const AllDispensary = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { all } = useAllDispensaryDynamic(props.dispensary);

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
    </>
  );
};

export default AllDispensary;
