import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { BreadCrumb } from '../../../../../components/common/BreadCrumb/BreadCrumb';
import { useBreadCrumbStatic } from '../../../../../services/breadCrumb';
import { Grid } from '../../../../../components/common/Grid/Grid';
import {
  DealType,
  useDealsDynamic,
  useDealsStatic,
} from '../../../../../services/deals';
import { DealCard } from '../../../../../components/deal/DealCard/DealCard';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      deals: await useDealsStatic(context, DealType.Concentrates),
    },
  };
}

const Deals = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { concentrates } = useDealsDynamic(props.deals);
  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <Grid>
        {concentrates.map(deal => (
          <DealCard
            key={`concentrates-deal-${deal.dlsDealsID}`}
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
