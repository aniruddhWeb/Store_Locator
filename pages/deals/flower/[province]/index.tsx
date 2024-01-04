import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { BreadCrumb } from '../../../../components/common/BreadCrumb/BreadCrumb';
import { useBreadCrumbStatic } from '../../../../services/breadCrumb';
import { Grid } from '../../../../components/common/Grid/Grid';
import {
  DealType,
  useDealsDynamic,
  useDealsStatic,
} from '../../../../services/deals';
import { DealCard } from '../../../../components/deal/DealCard/DealCard';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      deals: await useDealsStatic(context, DealType.Weed),
    },
  };
}

const Deals = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { flowers } = useDealsDynamic(props.deals);
  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {flowers.map(deal => (
          <DealCard
            key={`weed-deal-${deal.dlsDealsID}`}
            businessDeal={deal}
            variant="column"
            gridMode
          />
        ))}
      </Grid>
    </>
  );
};

export default Deals;
