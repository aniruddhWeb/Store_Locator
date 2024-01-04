import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Route } from '../../../../../config/Routes';
import { checkIfRegion } from '../../../../../utils/region';
import { useBreadCrumbStatic } from '../../../../../services/breadCrumb';
import { getCleanUrl, getParentUrl } from '../../../../../utils/link';
import { useBusinessLocationFilter } from '../../../../../hooks/business/useBusinessLocationFilter';
import { useBusinessResellersDynamic } from '../../../../../hooks/business/useBusinessResellersDynamic';
import { Grid } from '../../../../../components/common/Grid/Grid';
import { BusinessFilter } from '../../../../../components/business/BusinessFilter/BusinessFilter';
import { Business } from '../../../../../generated/graphql';
import { BusinessCard } from '../../../../../components/business/BusinessCard/BusinessCard';
import { useBusinessStatic } from '../../../../../hooks/business/useBusinessStatic';
import { Loader } from '../../../../../components/common/Loader/Loader';
import { BusinessMapIframe } from '../../../../../components/business/BusinessMapIframe/BusinessMapIframe';
import { PoweredBy } from '../../../../../components/common/PoweredBy/PoweredBy';

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const business = await useBusinessStatic(context);
  return {
    redirect:
      (!checkIfRegion(context.query.province as string) &&
        !business && {
          destination: Route.Root,
          permanent: false,
        }) ||
      ((!!business?.bizClaim || !!business?.bizClaimUnblurred) && {
        destination: getParentUrl(getCleanUrl(context.resolvedUrl)),
        permanent: false,
      }),
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      business,
    },
  };
}

const ProductMaPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const router = useRouter();

  const {
    businessLocationFilterNoDebounce: businessLocationFilter,
    onSelectBusinessType,
    selectedBusinessTypes,
    businessTypes,
  } = useBusinessLocationFilter(true);

  const { businessData, isLoading } = useBusinessResellersDynamic({
    businessData: props.business,
    context: router,
    businessLocationFilter,
  });

  const [isLoadingExt, setIsLoadingExt] = useState<boolean>(true);
  useEffect(() => {
    setIsLoadingExt(true);
    setTimeout(() => {
      setIsLoadingExt(false);
    }, 1200);
  }, [selectedBusinessTypes]);

  useEffect(() => {
    if (!businessData) {
      router.replace(Route.Root);
    }
  }, [businessData]);

  const overflowStyle = useMemo(
    () =>
      !selectedBusinessTypes ||
      selectedBusinessTypes.length === 0 ||
      selectedBusinessTypes?.includes(BusinessType.DeliveryType) ||
      selectedBusinessTypes?.includes(BusinessType.DispensaryType)
        ? undefined
        : { overflowY: 'scroll' as any, maxHeight: '100vh' },
    [selectedBusinessTypes],
  );

  if (!businessData) {
    return null;
  }
  return (
    <div className="fullContainer" style={overflowStyle}>
      {!selectedBusinessTypes ||
      selectedBusinessTypes.length === 0 ||
      selectedBusinessTypes?.includes(BusinessType.DeliveryType) ||
      selectedBusinessTypes?.includes(BusinessType.DispensaryType) ? (
        <>
          <Grid
            noBottomMargin
            showOnEmpty
            emptyView={null}
            header={
              props.business?.plType === BusinessType.BrandType &&
              (props.business?.resellers || []).length ===
                0 ? null : businessData?.plType === BusinessType.BrandType ? (
                <BusinessFilter
                  hideTitle
                  hideMargin
                  marginTop
                  onSelectBusinessType={onSelectBusinessType}
                  selectedBusinessTypes={selectedBusinessTypes}
                  businessTypes={businessTypes}
                />
              ) : null
            }>
            {null}
          </Grid>
          <BusinessMapIframe business={businessData} />
        </>
      ) : (
        <Grid
          showOnEmpty
          withPadding
          emptyView={
            isLoadingExt || isLoading ? <Loader size={40} /> : undefined
          }
          isLoading={isLoadingExt || isLoading}
          header={
            props.business?.plType === BusinessType.BrandType &&
            (props.business?.resellers || []).length ===
              0 ? null : businessData?.plType === BusinessType.BrandType ? (
              <BusinessFilter
                hideTitle
                hideMargin
                marginTop
                onSelectBusinessType={onSelectBusinessType}
                selectedBusinessTypes={selectedBusinessTypes}
                businessTypes={businessTypes}
              />
            ) : null
          }>
          {(isLoadingExt || isLoading
            ? []
            : (businessData?.plType === BusinessType.BrandType
                ? businessData?.resellers
                : businessData?.brands) || []
          ).map((business: Business) => (
            <BusinessCard
              key={`certified-business-${business.bizBusinessID}`}
              business={business}
              gridMode
              openNewWindow
              showLocation={businessData?.plType === BusinessType.BrandType}
              hideType={businessData?.plType !== BusinessType.BrandType}
              linkQueryParams={`?search=${encodeURIComponent(
                businessData?.bizName || '',
              )}#products`}
              showClaim
            />
          ))}
        </Grid>
      )}
      <PoweredBy />
    </div>
  );
};

export default ProductMaPage;
