import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import {
  useFeaturedBrandsDynamic,
  useFeaturedBrandsStatic,
} from '../../../services/brands';
import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../components/common/Grid/Grid';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';
import { BusinessInterlinking } from '../../../components/business/BusinessInterlinking/BusinessInterlinking';
import { useInterlinking } from '../../../services/seo';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      interLinking: await useInterlinking('brands', context),
      breadCrumb: await useBreadCrumbStatic(context),

      brands: await useFeaturedBrandsStatic(context),
    },
  };
}

const FeaturedBrands = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { featured } = useFeaturedBrandsDynamic(props.brands);

  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {featured.map(business => (
          <BusinessCard
            key={`featured-brands-${business.bizBusinessID}`}
            business={business}
            gridMode
          />
        ))}
      </Grid>
      <BusinessInterlinking type={'brand'} links={props.interLinking} />
    </>
  );
};

export default FeaturedBrands;
