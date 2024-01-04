import React, { useEffect } from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  };
}

const Dutchie = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement('script');

    script.src = router.query?.url as string;
    script.async = true;
    script.id = 'dutchie--embed__script';

    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.appendChild(script);
    }
  }, []);

  return <></>;
};

export default Dutchie;
