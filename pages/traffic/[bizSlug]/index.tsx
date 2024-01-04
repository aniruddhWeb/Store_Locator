import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getBusinessLanding } from '../../../services/business';
import { BusinessLanding } from '../../../components/business/BusinessLanding/BusinessLanding';
import { Route } from '../../../config/Routes';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const business = await getBusinessLanding(context);
  return {
    redirect: !business && {
      destination: Route.Root,
      permanent: false,
    },
    props: {
      businessLanding: {
        business,
      },
    },
  };
}

const TrafficBusiness = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <BusinessLanding business={props.businessLanding.business} />
    </>
  );
};

export default TrafficBusiness;
