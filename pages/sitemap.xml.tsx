import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { SITEMAP_URL } from '../config/Constants';

const Sitemap: React.FC = () => null;

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const response = await fetch(SITEMAP_URL + (req.url?.replace('/', '') || ''));
  const xmlText = await response.text();
  if (res) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(xmlText);
    res.end();
  }
  return {
    props: {},
  };
};

export default Sitemap;
