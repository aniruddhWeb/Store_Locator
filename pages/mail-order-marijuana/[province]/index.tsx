import React, { useMemo } from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { Marquee } from '../../../components/common/Marquee/Marquee';
import { BusinessCard } from '../../../components/business/BusinessCard/BusinessCard';
import { useMailDynamic, useMailStatic } from '../../../services/mailOrder';
import { withBusinessPage } from '../../../services/business';
import { Route } from '../../../config/Routes';
import { checkIfRegion } from '../../../utils/region';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';
import { BusinessInterlinking } from '../../../components/business/BusinessInterlinking/BusinessInterlinking';
import { useInterlinking } from '../../../services/seo';
import { AnalyticsAction } from '../../../services/analytics';
import { CategoryDescription } from '../../../components/common/CategoryDescription/CategoryDescription';
import { Business, BusinessItemFragment } from '../../../generated/graphql';
import { useBusinessStatic } from '../../../hooks/business/useBusinessStatic';
import { useBusinessNavigation } from '../../../hooks/business/useBusinessNavigation';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const business = await useBusinessStatic(context);
  return {
    redirect: !checkIfRegion(context.query.province as string) &&
      !business && {
        destination: Route.Root,
        permanent: false,
      },
    props: {
      interLinking: await useInterlinking('mail orders', context),
      breadCrumb: await useBreadCrumbStatic(context),

      mail: await useMailStatic(context),
      business,
    },
  };
}

const MailOrder = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const {
    isEmptyLists,
    monthlyTopPicks,
    featured,
    verified,
    all,
    nearbyBusiness,
  } = useMailDynamic(props.mail);
  const { onFeatured, onVerified, onAll } = useBusinessNavigation();

  const regionContent = useMemo(
    () => (
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
                  <Marquee title="Monthly Top Picks" variant="second">
                    {monthlyTopPicks.map(business => (
                      <BusinessCard
                        key={`top-pick-mail-${business.bizBusinessID}`}
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
          title={isEmptyLists ? undefined : 'Featured Mail Order Marijuana'}
          showOnEmpty={isEmptyLists}
          emptyText="Sorry, there are no mail orders available. Please, check the provinces nearby"
          variant="second"
          seeAllText="Show all"
          seeAllHref={onFeatured('mail', false)}>
          {featured.map(business => (
            <BusinessCard
              key={`featured-mail-${business.bizBusinessID}`}
              business={business}
            />
          ))}
        </Marquee>
        <Marquee
          title="Verified Mail Order Marijuana"
          variant="second"
          seeAllText="Show all"
          seeAllHref={onVerified('mail', false)}>
          {verified.map(business => (
            <BusinessCard
              key={`verified-mail-${business.bizBusinessID}`}
              business={business}
              analyticsAction={AnalyticsAction.VerifiedView}
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
        <BusinessInterlinking type={'mail'} links={props.interLinking} />
      </>
    ),
    [
      featured,
      verified,
      all,
      onFeatured,
      onVerified,
      onAll,
      monthlyTopPicks,
      isEmptyLists,
      nearbyBusiness,
    ],
  );

  return withBusinessPage(regionContent, props);
};

export default MailOrder;
