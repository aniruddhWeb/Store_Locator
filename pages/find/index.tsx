import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { FindMapProps } from '../../components/map/FindMap/FindMap';
import { useMapDynamic } from '../../services/map';
import { useBreadCrumbStatic } from '../../services/breadCrumb';

const DynamicFindMap = dynamic<FindMapProps>(
  // @ts-ignore
  () => import('../../components/map/FindMap/FindMap').then(mod => mod.FindMap),
  {
    ssr: false,
  },
);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      map: {}, // await useMapStatic(context),

      breadCrumb: await useBreadCrumbStatic(context),
    },
  };
}

const Map = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    deals,
    business: businesses,
    getBusiness,
    isMapLoading,
  } = useMapDynamic(props.map);
  return (
    <>
      <NextSeo
        title={props.breadCrumb?.metaTags?.metaTitle || `Find`}
        description={props.breadCrumb?.metaTags?.metaDescription || undefined}
        openGraph={{
          images: props.breadCrumb?.metaTags?.customImages,
          title: props.breadCrumb?.metaTags?.metaTitle || `Find`,
          description: props.breadCrumb?.metaTags?.metaDescription || undefined,
        }}
        canonical={props.breadCrumb?.canonicalLink || undefined}
        noindex
      />
      <h1 className="displayNone">Maps</h1>
      <DynamicFindMap
        isMapLoading={isMapLoading}
        businesses={businesses}
        deals={deals}
        onBoundsChanged={getBusiness}
      />
    </>
  );
};

export default Map;
