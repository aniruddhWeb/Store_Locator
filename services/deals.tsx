import { GetServerSidePropsContext } from 'next';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import isEqual from 'lodash/isEqual';
import { getApolloClient } from '../api/client';
import {
  useCurrentLocationStatic,
  useCurrentLocationDynamic,
} from './location';
import {
  DealListByTypeByRegQuery,
  DealListByTypeByRegDocument,
  DealListByTypeByRegQueryVariables,
  DealBySlugDocument,
  DealBySlugQuery,
  DealBySlugQueryVariables,
  useDealBySlugLazyQuery,
  DealItemFragment,
  BusinessDeals,
  useDealListByTypeByRegLazyQuery,
  Business,
} from '../generated/graphql';
import { checkIfRegion } from '../utils/region';
import { useWindowFragmentScroll } from '../utils/window';
import { Route } from '../config/Routes';
import { SideTopNavigation } from '../components/common/SideTopNavigation/SideTopNavigation';
import { BreadCrumb } from '../components/common/BreadCrumb/BreadCrumb';
import { BusinessContact } from '../components/business/BusinessContact/BusinessContact';
import { FlexContainer } from '../components/common/FlexContainer/FlexContainer';
import { DealHeader } from '../components/deal/DealHeader/DealHeader';
import { DealAbout } from '../components/deal/DealAbout/DealAbout';
import { DealInfo } from '../components/deal/DealInfo/DealInfo';
import { AnalyticsAction, useSaveAnalytics } from './analytics';

export enum DealType {
  THC = 'THC',
  Accessories = 'Accessories',
  Weed = 'Weed',
  Edibles = 'Edibles',
  Concentrates = 'Concentrates',
  Storewide = 'Storewide',
}

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const useDealsStatic = async (
  context: GetServerSidePropsContext,
  type?: DealType | null,
) => {
  const { currentLocation, selectedLocation } = await useCurrentLocationStatic(
    context,
  );
  const { data: dealPageData } = await getApolloClient(context).query<
    DealListByTypeByRegQuery,
    DealListByTypeByRegQueryVariables
  >({
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
    query: DealListByTypeByRegDocument,
    variables: {
      type: type || null,
      offset: 0,
      limit: 100,
      linkProvinceID: (currentLocation || selectedLocation).plProvinceID,
      plRegionID: (currentLocation || selectedLocation).plRegionID,
    },
  });
  return {
    type: type || null,
    deals: dealPageData?.dealListByTypeByReg || [],
  };
};

export const useDealsDynamic = (props: any) => {
  const { currentLocation, selectedLocation } = useCurrentLocationDynamic();
  const location = currentLocation || selectedLocation;

  const [deals, setDeals] = useState<any[]>(props.deals || []);
  const [dealTypeFilter, setDealTypeFilter] = useState<string[]>([]);
  const [deliveryTypeFilter, setDeliveryTypeFilter] = useState<string[]>([]);
  const [storeTypeFilter, setStoreTypeFilter] = useState<string[]>([]);

  const [getDeals] = useDealListByTypeByRegLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setDeals(data?.dealListByTypeByReg || []);
    },
  });

  const variables = useMemo(() => {
    if (location) {
      return {
        type: props.type || null,
        offset: 0,
        limit: 100,
        linkProvinceID: location.plProvinceID,
        plRegionID: location.plRegionID,
      };
    }
    return null;
  }, [location, props.type]);
  const prevVariables = useRef<any>(variables);

  const flowers = useMemo(
    () =>
      deals.filter(
        flower => flower.dlsApplyTo === DealType.Weed,
      ) as BusinessDeals[],
    [deals],
  );

  const edibles = useMemo(
    () =>
      deals.filter(
        edible => edible.dlsApplyTo === DealType.Edibles,
      ) as BusinessDeals[],
    [deals],
  );

  const storeWides = useMemo(
    () =>
      deals.filter(
        storeWide => storeWide.dlsApplyTo === DealType.Storewide,
      ) as BusinessDeals[],
    [deals],
  );

  const concentrates = useMemo(
    () =>
      deals.filter(
        concentrate => concentrate.dlsApplyTo === DealType.Concentrates,
      ) as BusinessDeals[],
    [deals],
  );

  const thc = useMemo(
    () =>
      deals.filter(
        thcItem => thcItem.dlsApplyTo === DealType.THC,
      ) as BusinessDeals[],
    [deals],
  );

  const accessories = useMemo(
    () =>
      deals.filter(
        accessory => accessory.dlsApplyTo === DealType.Accessories,
      ) as BusinessDeals[],
    [deals],
  );

  useEffect(() => {
    if (variables && !isEqual(variables, prevVariables.current)) {
      prevVariables.current = { ...variables };
      getDeals({
        variables,
      });
    }
  }, [variables, deals]);

  const filteredDeals = useMemo(
    () =>
      deals.filter((dealItem: DealItemFragment) =>
        dealTypeFilter.length === 0 &&
        deliveryTypeFilter.length === 0 &&
        storeTypeFilter.length === 0
          ? true
          : (dealTypeFilter.length > 0 && dealItem.dlsApplyTo
              ? dealTypeFilter.includes(dealItem.dlsApplyTo as DealType)
              : true) &&
            (deliveryTypeFilter.concat(storeTypeFilter).length > 0
              ? (dealItem.business || []).length > 0 &&
                dealItem.business[0].plType &&
                deliveryTypeFilter
                  .concat(storeTypeFilter)
                  .includes(dealItem.business[0].plType as BusinessType)
              : true),
      ),
    [deals, dealTypeFilter, deliveryTypeFilter, storeTypeFilter],
  );

  const dealTypes = useMemo(
    () => [
      DealType.Storewide,
      DealType.Concentrates,
      DealType.Edibles,
      DealType.Weed,
      DealType.THC,
      DealType.Accessories,
    ],
    [],
  );

  const deliveryTypes = useMemo(
    () => [BusinessType.DeliveryType, BusinessType.MailOrderType],
    [],
  );

  const storeTypes = useMemo(() => [BusinessType.DispensaryType], []);

  const setDealTypeFilterFunc = useCallback(
    (type: string) => {
      if (dealTypeFilter.includes(type as DealType)) {
        setDealTypeFilter(dealTypeFilter.filter(item => item !== type));
      } else {
        setDealTypeFilter([...dealTypeFilter, type]);
      }
    },
    [dealTypeFilter],
  );

  const setDeliveryTypeFilterFunc = useCallback(
    (type: string) => {
      if (deliveryTypeFilter.includes(type as BusinessType)) {
        setDeliveryTypeFilter(deliveryTypeFilter.filter(item => item !== type));
      } else {
        setDeliveryTypeFilter([...deliveryTypeFilter, type]);
      }
    },
    [deliveryTypeFilter],
  );

  const setStoreTypeFilterFunc = useCallback(
    (type: string) => {
      if (storeTypeFilter.includes(type as BusinessType)) {
        setStoreTypeFilter(storeTypeFilter.filter(item => item !== type));
      } else {
        setStoreTypeFilter([...storeTypeFilter, type]);
      }
    },
    [storeTypeFilter],
  );

  return {
    deals: filteredDeals,
    dealTypes,
    deliveryTypes,
    storeTypes,
    selectedDealTypes: dealTypeFilter,
    selectedDeliveryTypes: deliveryTypeFilter,
    selectedStoreTypes: storeTypeFilter,
    setDealType: setDealTypeFilterFunc,
    setDeliveryType: setDeliveryTypeFilterFunc,
    setStoreType: setStoreTypeFilterFunc,
    thc,
    accessories,
    flowers,
    edibles,
    storeWides,
    concentrates,
  };
};

export const useDealStatic = async (context: GetServerSidePropsContext) => {
  const dealQuery = context?.query?.deal;
  const businessQuery = context?.query?.business || context?.query?.province;
  if (dealQuery && businessQuery && !checkIfRegion(businessQuery as string)) {
    const { data: dealData } = await getApolloClient(context).query<
      DealBySlugQuery,
      DealBySlugQueryVariables
    >({
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
      query: DealBySlugDocument,
      variables: {
        bizSlug: businessQuery as string,
        dealSlug: dealQuery as string,
      },
    });
    return {
      deal: dealData?.dealBySlug || null,
      business:
        ((dealData?.dealBySlug?.business || []).length > 0
          ? (dealData?.dealBySlug?.business || [])[0]
          : null) || null,
    };
  }
  return {
    deal: null,
    business: null,
  };
};

export const useDealDynamic = (props: any) => {
  const [dealData, setDealData] = useState<DealItemFragment | null>(
    (props.dealData as DealItemFragment) || null,
  );

  const variables = useMemo(() => {
    const dealQuery = props.context?.query?.deal;
    const businessQuery =
      props.context?.query?.business || props.context?.query?.province;
    if (dealQuery && businessQuery && !checkIfRegion(businessQuery as string)) {
      const resolvedUrlParts = props.context?.asPath.split('/');
      if (resolvedUrlParts.length > 0) {
        resolvedUrlParts.shift();
      }
      if (resolvedUrlParts.length > 0) {
        return {
          bizSlug: businessQuery as string,
          dealSlug: dealQuery as string,
        };
      }
    }
    return {
      bizSlug: businessQuery as string,
      dealSlug: dealQuery as string,
    };
  }, [props.context]);

  const [getDeal] = useDealBySlugLazyQuery({
    fetchPolicy: 'cache-and-network',
    variables,
    onCompleted: data => {
      setDealData(data?.dealBySlug || null);
    },
  });

  useEffect(() => {
    if (variables.bizSlug && variables.dealSlug) {
      getDeal();
    }
  }, [variables]);

  return {
    dealData,
  };
};

export const withDealPage = (
  originalContent: any,
  props: any,
  shouldRedirect?: boolean,
) => {
  const router = useRouter();

  useWindowFragmentScroll();

  const { dealData } = useDealDynamic({
    dealData: props.deal,
    context: router,
  });

  useEffect(() => {
    if (!dealData && shouldRedirect) {
      router.replace(Route.Root);
    }
  }, [dealData, shouldRedirect]);

  const dealBusiness = useMemo<Business | undefined>(
    () =>
      dealData?.business && dealData?.business.length > 0
        ? (dealData?.business.find(
            item =>
              item.bizSlug === (router.query.business as string) ||
              item.bizSlug === (router.query.province as string),
          ) as Business)
        : undefined,
    [dealData, router.query],
  );

  const { saveAnalytics } = useSaveAnalytics();
  useEffect(() => {
    if (dealBusiness?.bizBusinessID) {
      saveAnalytics(
        dealBusiness.bizBusinessID,
        AnalyticsAction.DealView,
        dealData?.dlsDealsID,
      );
    }
  }, [dealBusiness?.bizBusinessID, dealData?.dlsDealsID]);

  return !dealData ? (
    originalContent
  ) : (
    <div className="horizontalLayout">
      <SideTopNavigation
        header={
          <>
            <BreadCrumb small mobile {...props.breadCrumb} />
            <DealInfo
              mobile
              businessDeal={dealData as BusinessDeals}
              business={dealBusiness}
            />
            {dealBusiness ? (
              <DealHeader desktop business={dealBusiness} />
            ) : null}
            {dealBusiness ? (
              <BusinessContact
                showBorderRadius
                desktop
                business={dealBusiness}
              />
            ) : null}
          </>
        }
        items={[]}
      />
      <FlexContainer>
        <BreadCrumb small desktop {...props.breadCrumb} />
        <DealInfo desktop businessDeal={dealData as BusinessDeals} />
        {dealBusiness ? <DealHeader mobile business={dealBusiness} /> : null}
        <DealAbout businessDeal={dealData as BusinessDeals} />
      </FlexContainer>
    </div>
  );
};
