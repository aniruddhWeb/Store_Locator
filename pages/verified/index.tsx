import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { BreadCrumb } from '../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../components/business/BusinessCard/BusinessCard';
import {
  useVerifiedAllDynamic,
  useVerifiedAllStatic,
} from '../../services/verified';
import { useBreadCrumbStatic } from '../../services/breadCrumb';
import { AnalyticsAction } from '../../services/analytics';
import { BusinessFilter } from '../../components/business/BusinessFilter/BusinessFilter';
import { Grid } from '../../components/common/Grid/Grid';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      verified: await useVerifiedAllStatic(context),
    },
  };
}

const VerifiedAll = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const {
    verifiedAll,
    businessTypes,
    businessTypeFilter,
    setBusinessTypeFilter,
    isLoading,
  } = useVerifiedAllDynamic(props.verified);

  return (
    <>
      <BreadCrumb
        {...props.breadCrumb}
        hideSub
        footer={
          <BusinessFilter
            businessTypes={businessTypes}
            selectedBusinessTypes={businessTypeFilter}
            onSelectBusinessType={setBusinessTypeFilter}
          />
        }
      />
      <Grid
        showOnEmpty={!!verifiedAll && verifiedAll.length === 0}
        isLoading={isLoading}>
        {verifiedAll.map(business => (
          <BusinessCard
            key={`verified-all-business-${business.bizBusinessID}`}
            business={business}
            gridMode
            analyticsAction={AnalyticsAction.VerifiedView}
          />
        ))}
      </Grid>
    </>
  );
};

export default VerifiedAll;
