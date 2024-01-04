import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { BreadCrumb } from '../../../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../../../components/business/BusinessCard/BusinessCard';
import { Grid } from '../../../../components/common/Grid/Grid';
import {
  useAllMailDynamic,
  useAllMailStatic,
} from '../../../../services/mailOrder';
import { useBreadCrumbStatic } from '../../../../services/breadCrumb';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      mail: await useAllMailStatic(context),
    },
  };
}

const AllMail = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { all } = useAllMailDynamic(props.mail);

  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {all.map(business => (
          <BusinessCard
            key={`all-mail-${business.bizBusinessID}`}
            business={business}
            gridMode
            showClaim
          />
        ))}
      </Grid>
    </>
  );
};

export default AllMail;
