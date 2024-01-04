import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { BreadCrumb } from '../../../../components/common/BreadCrumb/BreadCrumb';
import { Marquee } from '../../../../components/common/Marquee/Marquee';
import { BusinessCard } from '../../../../components/business/BusinessCard/BusinessCard';
import {
  useDispensaryDynamic,
  useDispensaryStatic,
} from '../../../../services/dispensary';

import { checkIfRegion } from '../../../../utils/region';
import { Route } from '../../../../config/Routes';
import { useBreadCrumbStatic } from '../../../../services/breadCrumb';
import { BusinessInterlinking } from '../../../../components/business/BusinessInterlinking/BusinessInterlinking';
import { useInterlinking } from '../../../../services/seo';
import { AnalyticsAction } from '../../../../services/analytics';
import { CategoryDescription } from '../../../../components/common/CategoryDescription/CategoryDescription';
import { Business, BusinessItemFragment } from '../../../../generated/graphql';
import { useBusinessNavigation } from '../../../../hooks/business/useBusinessNavigation';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    redirect: !checkIfRegion(context.query.province as string) && {
      destination: Route.Root,
      permanent: false,
    },
    props: {
      interLinking: await useInterlinking('dispensaries', context),
      breadCrumb: await useBreadCrumbStatic(context),

      dispensary: await useDispensaryStatic(context),
    },
  };
}

const Dispensary = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const {
    isEmptyLists,
    monthlyTopPicks,
    featured,
    verified,
    all,
    nearbyBusiness,
  } = useDispensaryDynamic(props.dispensary);
  const { onFeatured, onVerified, onAll } = useBusinessNavigation();

  return (
    <>
      <BreadCrumb
        {...props.breadCrumb}
        footer={
          !!props.breadCrumb.metaTags?.customDescription1 ||
          (monthlyTopPicks && monthlyTopPicks.length > 0) ? (
            <>
              {props.breadCrumb.metaTags?.customDescription1 ? (
                <CategoryDescription
                  body={props.breadCrumb.metaTags?.customDescription1}
                  marginBottom={
                    !(monthlyTopPicks && monthlyTopPicks.length > 0)
                  }
                />
              ) : null}
              {monthlyTopPicks && monthlyTopPicks.length > 0 ? (
                <Marquee title="Monthly Top Picks" variant="second" noTopMargin>
                  {monthlyTopPicks.map(business => (
                    <BusinessCard
                      key={`top-pick-dispensary-${business.bizBusinessID}`}
                      business={business}
                      analyticsAction={AnalyticsAction.TopPickView}
                      sendGTMAction="monthly_top_clicks"
                    />
                  ))}
                </Marquee>
              ) : null}
            </>
          ) : null
        }
      />
      <Marquee
        title={isEmptyLists ? undefined : 'Featured Marijuana Dispensaries'}
        showOnEmpty={isEmptyLists}
        emptyText="Sorry, there are no dispensaries available. Please, check the cities nearby"
        variant="second"
        seeAllText="Show all"
        seeAllHref={onFeatured('dispensary', false)}>
        {featured.map(business => (
          <BusinessCard
            key={`featured-dispensary-${business.bizBusinessID}`}
            business={business}
          />
        ))}
      </Marquee>
      <Marquee
        title="Verified Marijuana Dispensaries"
        variant="second"
        seeAllText="Show all"
        seeAllHref={onVerified('dispensary', false)}>
        {verified.map(business => (
          <BusinessCard
            key={`verified-dispensary-${business.bizBusinessID}`}
            business={business}
            analyticsAction={AnalyticsAction.VerifiedView}
          />
        ))}
      </Marquee>
      <Marquee
        title="All Marijuana Dispensaries"
        variant="second"
        seeAllText="Show all"
        seeAllHref={onAll('dispensary', false)}>
        {all.map(business => (
          <BusinessCard
            key={`all-dispensary-${business.bizBusinessID}`}
            business={business}
            showClaim
          />
        ))}
      </Marquee>
      {isEmptyLists ? (
        <Marquee
          title="Businesses Nearby"
          variant="third"
          onScrollEnd={nearbyBusiness.onNextPage}
          scrollDependency={[nearbyBusiness.location]}
          isPaginating={nearbyBusiness.isPaginating}>
          {(nearbyBusiness.nearbyBusiness || []).map(
            (business: BusinessItemFragment) => (
              <BusinessCard
                key={`nearby-business-${business.bizBusinessID}`}
                business={business as Business}
                variant="row"
              />
            ),
          )}
        </Marquee>
      ) : null}
      {props.breadCrumb.metaTags?.customDescription2 ? (
        <CategoryDescription
          noBorder
          body={props.breadCrumb.metaTags?.customDescription2}
        />
      ) : null}
      <BusinessInterlinking type={'dispensary'} links={props.interLinking} />
    </>
  );
};

export default Dispensary;
