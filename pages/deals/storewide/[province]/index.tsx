import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { BreadCrumb } from '../../../../components/common/BreadCrumb/BreadCrumb';
import { useBreadCrumbStatic } from '../../../../services/breadCrumb';
import {
  DealType,
  useDealsDynamic,
  useDealsStatic,
} from '../../../../services/deals';
import { DealCard } from '../../../../components/deal/DealCard/DealCard';
import { Grid } from '../../../../components/common/Grid/Grid';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      deals: await useDealsStatic(context, DealType.Storewide),
    },
  };
}

const Deals = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { storeWides } = useDealsDynamic(props.deals);
  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {storeWides.map(deal => (
          <DealCard
            key={`storeWides-deal-${deal.dlsDealsID}`}
            businessDeal={deal}
            gridMode
          />
        ))}
      </Grid>
    </>
  );
};

export default Deals;
