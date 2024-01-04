import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { BreadCrumb } from '../../components/common/BreadCrumb/BreadCrumb';
import { BusinessCard } from '../../components/business/BusinessCard/BusinessCard';
import { useAllAllDynamic, useAllAllStatic } from '../../services/all';
import { useBreadCrumbStatic } from '../../services/breadCrumb';
import { BusinessFilter } from '../../components/business/BusinessFilter/BusinessFilter';
import { Grid } from '../../components/common/Grid/Grid';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      all: await useAllAllStatic(context),
    },
  };
}

const All = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    allAll,
    setBusinessTypeFilter,
    businessTypeFilter,
    businessTypes,
    isLoading,
  } = useAllAllDynamic(props.all);
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
      <Grid showOnEmpty={!!allAll && allAll.length === 0} isLoading={isLoading}>
        {allAll.map(business => (
          <BusinessCard
            key={`all-all-business-${business.bizBusinessID}`}
            business={business}
            gridMode
            showClaim
          />
        ))}
      </Grid>
    </>
  );
};

export default All;
