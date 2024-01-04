import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useBreadCrumbStatic } from '../services/breadCrumb';
import { useServicesStatic } from '../services/services';
import { BreadCrumb } from '../components/common/BreadCrumb/BreadCrumb';
import { ServiceCard } from '../components/service/ServiceCard/ServiceCard';
import { Grid } from '../components/common/Grid/Grid';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      services: await useServicesStatic(),
      breadCrumb: await useBreadCrumbStatic(context),
    },
  };
}

const Services = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      {props.services.serviceGroups.map(serviceGroup => (
        <Grid
          key={serviceGroup.title}
          title={serviceGroup.title}
          showOnEmpty={false}
          topMargin
          centerTitle
          largestGrid>
          {serviceGroup.services.map((serviceItem: any) => (
            <ServiceCard
              key={`${serviceGroup.title}-${serviceItem?.name}`}
              service={serviceItem}
            />
          ))}
        </Grid>
      ))}
    </>
  );
};

export default Services;
