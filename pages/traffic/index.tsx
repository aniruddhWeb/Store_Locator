import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { Route } from '../../config/Routes';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    redirect: {
      destination: Route.Root,
      permanent: false,
    },
    props: {},
  };
}

const TrafficEmpty = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return <></>;
};

export default TrafficEmpty;
