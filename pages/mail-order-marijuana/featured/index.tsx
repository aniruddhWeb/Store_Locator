import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../components/common/Grid/Grid';
import {
  useFeaturedMailDynamic,
  useFeaturedMailStatic,
} from '../../../services/mailOrder';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';
import { BusinessInterlinking } from '../../../components/business/BusinessInterlinking/BusinessInterlinking';
import { useInterlinking } from '../../../services/seo';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      interLinking: await useInterlinking('mail orders', context),
      breadCrumb: await useBreadCrumbStatic(context),

      mail: await useFeaturedMailStatic(context),
    },
  };
}

const FeaturedMail = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { featured } = useFeaturedMailDynamic(props.mail);

  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {featured.map(business => (
          <BusinessCard
            key={`featured-mail-${business.bizBusinessID}`}
            business={business}
            gridMode
          />
        ))}
      </Grid>
      <BusinessInterlinking type={'mail'} links={props.interLinking} />
    </>
  );
};

export default FeaturedMail;
