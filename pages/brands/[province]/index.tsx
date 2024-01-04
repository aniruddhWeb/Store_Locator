import React, { useMemo } from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { useBrandsDynamic, useBrandsStatic } from '../../../services/brands';
import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { Marquee } from '../../../components/common/Marquee/Marquee';
import { BusinessCard } from '../../../components/business/BusinessCard/BusinessCard';
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
import { useCurrentLocationDynamic } from '../../../services/location';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const business = await useBusinessStatic(context);
  return {
    redirect: !checkIfRegion(context.query.province as string) &&
      !business && {
        destination: Route.Root,
        permanent: false,
      },
    props: {
      interLinking: await useInterlinking('brands', context),
      breadCrumb: await useBreadCrumbStatic(context),

      brands: await useBrandsStatic(context),
      business,
    },
  };
}

const Brands = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const {
    isEmptyLists,
    monthlyTopPicks,
    featured,
    verified,
    all,
    nearbyBusiness,
  } = useBrandsDynamic(props.brands);
  const { onFeatured, onVerified, onAll } = useBusinessNavigation();
  const { selectedLocation } = useCurrentLocationDynamic();

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
                        key={`top-pick-brand-${business.bizBusinessID}`}
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
          title={isEmptyLists ? undefined : 'Featured Brands'}
          showOnEmpty={isEmptyLists}
          emptyText="Sorry, there are no brands available. Please, check the provinces nearby"
          variant="second"
          seeAllText="Show all"
          seeAllHref={onFeatured('brand', false)}>
          {featured.map(business => (
            <BusinessCard
              key={`featured-brands-${business.bizBusinessID}`}
              business={business}
            />
          ))}
        </Marquee>
        <Marquee
          title="Verified Brands"
          variant="second"
          seeAllText="Show all"
          seeAllHref={onVerified('brand', false)}>
          {verified.map(business => (
            <BusinessCard
              key={`verified-brands-${business.bizBusinessID}`}
              business={business}
              analyticsAction={AnalyticsAction.VerifiedView}
            />
          ))}
        </Marquee>
        <Marquee
          title={
            props.breadCrumb?.province
              ? `All Marijuana Brands in ${props.breadCrumb?.province}`
              : props.breadCrumb?.region?.province?.country?.plCountryName ||
                selectedLocation?.province?.country?.plCountryName
              ? `All Marijuana Brands in ${
                  props.breadCrumb?.region?.province?.country?.plCountryName ||
                  selectedLocation?.province?.country?.plCountryName ||
                  ''
                }`
              : `All Marijuana Brands`
          }
          variant="second"
          seeAllText="Show all"
          seeAllHref={onAll('brand', false)}>
          {all.map(business => (
            <BusinessCard
              key={`all-brands-${business.bizBusinessID}`}
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
        <BusinessInterlinking type={'brand'} links={props.interLinking} />
      </>
    ),
    [
      all,
      verified,
      featured,
      onAll,
      onVerified,
      onFeatured,
      monthlyTopPicks,
      isEmptyLists,
      nearbyBusiness,
    ],
  );

  return withBusinessPage(regionContent, props);
};

export default Brands;
