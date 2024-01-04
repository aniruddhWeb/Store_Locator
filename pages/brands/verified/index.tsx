import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import {
  useVerifiedBrandsDynamic,
  useVerifiedBrandsStatic,
} from '../../../services/brands';
import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../components/common/Grid/Grid';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';
import { BusinessInterlinking } from '../../../components/business/BusinessInterlinking/BusinessInterlinking';
import { useInterlinking } from '../../../services/seo';
import { AnalyticsAction } from '../../../services/analytics';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      interLinking: await useInterlinking('brands', context),
      breadCrumb: await useBreadCrumbStatic(context),

      brands: await useVerifiedBrandsStatic(context),
    },
  };
}

const FeaturedBrands = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { verified } = useVerifiedBrandsDynamic(props.brands);

  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {verified.map(business => (
          <BusinessCard
            key={`verified-brands-${business.bizBusinessID}`}
            business={business}
            gridMode
            analyticsAction={AnalyticsAction.VerifiedView}
          />
        ))}
      </Grid>
      <BusinessInterlinking type={'brand'} links={props.interLinking} />
    </>
  );
};

export default FeaturedBrands;
