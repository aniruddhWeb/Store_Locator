import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';
import { Marquee } from '../../../components/common/Marquee/Marquee';
import { useDealsDynamic, useDealsStatic } from '../../../services/deals';
import { DealCard } from '../../../components/deal/DealCard/DealCard';
import { DealFilter } from '../../../components/deal/DealFilter/DealFilter';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      deals: await useDealsStatic(context),
    },
  };
}

const Deals = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const {
    deals,
    dealTypes,
    deliveryTypes,
    storeTypes,
    selectedStoreTypes,
    selectedDeliveryTypes,
    selectedDealTypes,
    setDeliveryType,
    setStoreType,
    setDealType,
  } = useDealsDynamic(props.deals);
  return (
    <>
      <BreadCrumb
        {...props.breadCrumb}
        hideSub
        footer={
          <DealFilter
            dealTypes={dealTypes}
            deliveryTypes={deliveryTypes}
            storeTypes={storeTypes}
            selectedStoreTypes={selectedStoreTypes}
            selectedDeliveryTypes={selectedDeliveryTypes}
            selectedDealTypes={selectedDealTypes}
            onSelectDealType={setDealType}
            onSelectDeliveryType={setDeliveryType}
            onSelectStoreType={setStoreType}
          />
        }
      />
      <Marquee
        variant="second"
        noTitleMargin={!(!!deals && deals.length === 0)}
        showOnEmpty={!!deals && deals.length === 0}>
        {deals.map(deal => (
          <DealCard
            key={`all-deal-${deal.dlsDealsID}`}
            businessDeal={deal}
            variant="column"
          />
        ))}
      </Marquee>
    </>
  );
};

export default Deals;
