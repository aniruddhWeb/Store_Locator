import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { useHomeStatic } from '../services/home';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      home: await useHomeStatic(context, true),
    },
  };
}

const StatusCheck = () => {
  return <p>Status Check Success!</p>;
};

export default StatusCheck;
