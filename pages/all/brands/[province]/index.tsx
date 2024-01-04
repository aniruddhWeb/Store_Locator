import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import {
  useAllBrandsDynamic,
  useAllBrandsStatic,
} from '../../../../services/brands';
import { BreadCrumb } from '../../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../../components/common/Grid/Grid';
import { useBreadCrumbStatic } from '../../../../services/breadCrumb';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),
      brands: await useAllBrandsStatic(context),
    },
  };
}

const FeaturedBrands = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { all } = useAllBrandsDynamic(props.brands);

  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {all.map(business => (
          <BusinessCard
            key={`all-brands-${business.bizBusinessID}`}
            business={business}
            gridMode
            showClaim
          />
        ))}
      </Grid>
    </>
  );
};

export default FeaturedBrands;
