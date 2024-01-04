import { GetServerSidePropsContext } from 'next';
import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useMediaQueries } from '@react-hook/media-query';
import { useBusinessDealsDynamic } from 'hooks/business/useBusinessDealsDynamic';
import { useProductFilter } from 'hooks/product/useProductFilter';
import { getApolloClient } from '../api/client';
import {
  Business,
  BusinessDeals,
  BusinessForProductAdsDocument,
  BusinessForProductAdsQuery,
  BusinessForProductAdsQueryVariables,
  BusinessOnlyBySlugDocument,
  BusinessOnlyBySlugQuery,
  BusinessOnlyBySlugQueryVariables,
  Product,
  Review,
} from '../generated/graphql';
import { checkIfRegion } from '../utils/region';
import { SideTopNavigation } from '../components/common/SideTopNavigation/SideTopNavigation';
import { BusinessHeader } from '../components/business/BusinessHeader/BusinessHeader';
import { BusinessFooter } from '../components/business/BusinessFooter/BusinessFooter';
import { FlexContainer } from '../components/common/FlexContainer/FlexContainer';
import { BreadCrumb } from '../components/common/BreadCrumb/BreadCrumb';
import { Marquee } from '../components/common/Marquee/Marquee';
import { DealCard } from '../components/deal/DealCard/DealCard';
import { ProductCard } from '../components/product/ProductCard/ProductCard';
import { Route } from '../config/Routes';
import { BusinessCard } from '../components/business/BusinessCard/BusinessCard';
import { ProductTypeFilter } from '../components/product/ProductTypeFilter/ProductTypeFilter';
import { ReviewCard } from '../components/review/ReviewCard/ReviewCard';
import { BusinessAbout } from '../components/business/BusinessAbout/BusinessAbout';
import { Grid } from '../components/common/Grid/Grid';
import { useWindowFragmentScroll } from '../utils/window';
import { BusinessContact } from '../components/business/BusinessContact/BusinessContact';
import { ReviewButton } from '../components/review/ReviewButton/ReviewButton';
import { ReviewEmpty } from '../components/review/ReviewEmpty/ReviewEmpty';
import { AnalyticsAction, useSaveAnalytics } from './analytics';
import { ProductHorizontalCard } from '../components/product/ProductHorizontalCard/ProductHorizontalCard';
import { Loader } from '../components/common/Loader/Loader';
import { useBusinessDynamic } from '../hooks/business/useBusinessDynamic';
import { useBusinessProductsDynamic } from '../hooks/business/useBusinessProductsDynamic';
import { useBusinessReviewsDynamic } from '../hooks/business/useBusinessReviewDynamic';
import { useBusinessResellersDynamic } from '../hooks/business/useBusinessResellersDynamic';
import { useWithBusinessPage } from '../hooks/business/useWithBusinessPage';
import { ClaimOverlay } from '../components/common/ClaimOverlay/ClaimOverlay';
import { BusinessFilter } from '../components/business/BusinessFilter/BusinessFilter';
import { useBusinessLocationFilter } from '../hooks/business/useBusinessLocationFilter';
import { useBusinessSorting } from '../hooks/business/useBusinessSorting';
import { BusinessMap } from '../components/business/BusinessMap/BusinessMap';
import { UserLocationToggleForProductPage } from '../components/common/UserLocationToggleForProductPage/UserLocationToggleForProductPage';

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const withBusinessPage = (
  regionContent: any,
  props: any,
  shouldRedirect?: boolean,
) => {
  const router = useRouter();

  const {
    searchQuery,
    setSearchQuery,
    productTypes,
    setSelectedFilters,
    selectedFilters,
    productsFilter,
    productsFilterNoDebounce,
    productLimit,
    resellersLimit,
    brandsLimit,
    setNextProductLimit,
    setNextResellersLimit,
    setNextBrandsLimit,
    resetAll,
    showAllPrices,
    setShowAllPrices,
    sortFilter,
    setSortFilter,
  } = useProductFilter(
    props.business?.productType,
    undefined,
    undefined,
    props.business?.bizSortOption,
  );

  const { sorting, setSorting, sortingOptions } = useBusinessSorting(
    sortFilter,
    setSortFilter,
    props.business?.bizSortOption,
    props.business?.plType,
  );

  const {
    businessLocationFilter,
    businessLocationFilterNoDebounce,
    onSelectBusinessType,
    selectedBusinessTypes,
    businessTypes,
  } = useBusinessLocationFilter(
    props.business?.plType === BusinessType.BrandType,
  );

  const {
    businessData,
    refresh,
    isLoading,
    productsLimitPaginating,
    resellersLimitPaginating,
    brandsLimitPaginating,
  } = useBusinessDynamic({
    businessData: props.business,
    context: router,
    productsFilter,
    productsFilterNoDebounce,
    businessLocationFilter,
    businessLocationFilterNoDebounce,
    productLimit,
    resellersLimit,
    brandsLimit,
  });

  const {
    businessProducts,
    businessItemMaxPriceCount,
    onProductCarouselScrollEnd,
    onResellersCarouselScrollEnd,
    onBrandsCarouselScrollEnd,
    isRegionPage,
    onSeeAllProducts,
    onSeeAllDeals,
    onSeeAllReviews,
    onSeeAllCertifiedResellers,
    navItems,
  } = useWithBusinessPage(
    businessData,
    setNextProductLimit,
    setNextResellersLimit,
    setNextBrandsLimit,
    BusinessType,
  );

  const { saveAnalytics } = useSaveAnalytics();

  useEffect(() => {
    if (businessData?.bizBusinessID) {
      saveAnalytics(businessData.bizBusinessID, AnalyticsAction.WebView);
    }
  }, [businessData?.bizBusinessID]);

  useWindowFragmentScroll();

  useEffect(() => {
    if (shouldRedirect && !businessData) {
      router.replace(Route.Root);
    }
  }, [businessData, shouldRedirect]);

  const showWhereMap = useMemo(
    () =>
      businessData?.plType === BusinessType.BrandType &&
      ((businessData?.resellers || []) as Business[]).filter(
        item => item.contact?.bizLongitude && item.contact?.bizLatitude,
      ).length > 0 &&
      (!selectedBusinessTypes ||
        selectedBusinessTypes.length === 0 ||
        selectedBusinessTypes?.includes(BusinessType.DeliveryType) ||
        selectedBusinessTypes?.includes(BusinessType.DispensaryType)),
    [businessData, selectedBusinessTypes],
  );

  const isClaim = useMemo(
    () => businessData?.bizClaim || businessData?.bizClaimUnblurred,
    [businessData],
  );

  const businessContent = useMemo(
    () =>
      !businessData ? null : (
        <div className="horizontalLayout">
          <SideTopNavigation
            header={
              <>
                <BreadCrumb small mobile {...props.breadCrumb} />
                <BusinessHeader business={businessData} />
                <BusinessContact desktop business={businessData} />
                <BusinessFooter desktop business={businessData} />
              </>
            }
            footer={
              <>
                <BusinessContact
                  showBorder
                  mobile
                  mobileVisible
                  business={businessData}
                />
                <BusinessFooter
                  scrollText={
                    (
                      (businessData?.plType === BusinessType.BrandType
                        ? businessData?.resellers
                        : businessData?.brands) || []
                    ).length > 0
                      ? businessData?.plType === BusinessType.BrandType
                        ? 'Where to Buy Our Products'
                        : 'Certified Reseller'
                      : undefined
                  }
                  mobile
                  business={businessData}
                />
              </>
            }
            items={navItems}
          />
          <FlexContainer>
            <BreadCrumb small desktop {...props.breadCrumb} />
            {isClaim ? null : (
              <Marquee
                title="Deals"
                variant="second"
                titleVariant="left"
                seeAllText="Show all"
                seeAllHref={onSeeAllDeals}
                isLargeTitle
                scrollVariant="second">
                {(businessData?.deals || []).map(
                  (businessDeal: BusinessDeals) => (
                    <DealCard
                      key={`business-deal-${businessDeal.dlsDealsID}`}
                      businessDeal={businessDeal}
                      business={businessData}
                    />
                  ),
                )}
              </Marquee>
            )}
            <Marquee
              title="Products"
              variant="third"
              titleVariant="left"
              isLargeTitle
              seeAllText={
                isClaim
                  ? undefined
                  : (businessProducts || []).length > 0
                  ? 'Show all'
                  : undefined
              }
              seeAllHref={
                isClaim
                  ? undefined
                  : (businessProducts || []).length > 0
                  ? onSeeAllProducts
                  : undefined
              }
              showAllOnEmpty
              showOnEmpty
              showThirdOnMobile
              scrollDependency={[productsFilterNoDebounce]}
              onScrollEnd={isClaim ? undefined : onProductCarouselScrollEnd}
              isPaginating={isClaim ? false : productsLimitPaginating}
              controlDisabled={!!isClaim}
              header={
                isClaim ? (
                  <ClaimOverlay />
                ) : (
                  <>
                    <ProductTypeFilter
                      productTypes={businessData?.bizIsLite ? [] : productTypes}
                      selectedProductTypes={selectedFilters}
                      onSelectProductType={setSelectedFilters}
                      setSearch={setSearchQuery}
                      search={searchQuery}
                      showAllPrices={showAllPrices}
                      setShowAllPrices={setShowAllPrices}
                      showAllPricesPriceVisible={
                        businessData?.plType !== BusinessType.BrandType &&
                        (businessProducts || []).length > 0
                      }
                      productCount={businessData?.productCount || 0}
                      searchVisible={
                        !!businessData?.productAvailable &&
                        !businessData?.bizIsLite
                      }
                      sortVisible={
                        !!businessData?.productAvailable &&
                        !businessData?.bizIsLite
                      }
                      sorting={sorting}
                      setSorting={setSorting}
                      sortingOptions={sortingOptions}
                      resetAll={resetAll}
                    />
                    <Loader
                      overlay
                      size={40}
                      isLoading={
                        isLoading &&
                        !productsLimitPaginating &&
                        !resellersLimitPaginating &&
                        !brandsLimitPaginating
                      }
                      overlayProducts={
                        !!businessData?.productAvailable &&
                        !businessData?.bizIsLite
                      }
                    />
                  </>
                )
              }>
              {(isClaim ? [{}, {}, {}] : businessProducts || []).map(
                (product: Product) => (
                  <ProductHorizontalCard
                    key={`product-${product.prdProductID}`}
                    scroll
                    product={product}
                    business={businessData}
                    showAllPrices={showAllPrices}
                    maxPriceCount={businessItemMaxPriceCount}
                  />
                ),
              )}
            </Marquee>
            <>
              {showWhereMap ? (
                <UserLocationToggleForProductPage disableToggle={isLoading} />
              ) : null}
              <div className="relativeContainer">
                {businessData?.plType === BusinessType.BrandType &&
                (businessData?.resellers || []).length === 0 ? null : (
                  <Marquee
                    title={
                      businessData?.plType === BusinessType.BrandType
                        ? 'Where to Buy Our Products'
                        : 'Certified Reseller'
                    }
                    isLargeTitle
                    showOnEmpty={showWhereMap}
                    emptyView={showWhereMap ? null : undefined}
                    isPaginating={
                      resellersLimitPaginating || brandsLimitPaginating
                    }
                    onScrollEnd={
                      businessData?.plType === BusinessType.BrandType
                        ? onResellersCarouselScrollEnd
                        : onBrandsCarouselScrollEnd
                    }
                    showAllOnEmpty
                    seeAllText={
                      isClaim
                        ? undefined
                        : businessData?.plType === BusinessType.BrandType &&
                          (businessData?.resellers || []).length === 0
                        ? undefined
                        : 'Show all'
                    }
                    seeAllHref={
                      isClaim
                        ? undefined
                        : businessData?.plType === BusinessType.BrandType &&
                          (businessData?.resellers || []).length === 0
                        ? undefined
                        : onSeeAllCertifiedResellers
                    }
                    header={
                      businessData?.plType === BusinessType.BrandType &&
                      (businessData?.resellers || []).length > 0 &&
                      businessData?.plType === BusinessType.BrandType ? (
                        <>
                          <BusinessFilter
                            hideTitle
                            hideMargin
                            onSelectBusinessType={onSelectBusinessType}
                            selectedBusinessTypes={selectedBusinessTypes}
                            businessTypes={businessTypes}
                          />
                          {showWhereMap ? null : (
                            <Loader
                              size={40}
                              isLoading={
                                isLoading &&
                                !productsLimitPaginating &&
                                !resellersLimitPaginating &&
                                !brandsLimitPaginating
                              }
                            />
                          )}
                        </>
                      ) : null
                    }
                    noTopMargin={showWhereMap}
                    noBottomMargin={showWhereMap}
                    variant="second"
                    titleVariant="left">
                    {showWhereMap
                      ? []
                      : (
                          (businessData?.plType === BusinessType.BrandType
                            ? businessData?.resellers
                            : businessData?.brands) || []
                        ).map((business: Business) => (
                          <BusinessCard
                            key={`certified-business-${business.bizBusinessID}`}
                            business={business}
                            showLocation={
                              businessData?.plType === BusinessType.BrandType
                            }
                            hideType={
                              businessData?.plType !== BusinessType.BrandType
                            }
                            certified={
                              businessData?.plType !== BusinessType.BrandType
                            }
                            showClaim
                          />
                        ))}
                  </Marquee>
                )}
                {showWhereMap ? (
                  <BusinessMap
                    showClaim
                    business={businessData}
                    selectedBusinessTypes={selectedBusinessTypes}
                  />
                ) : null}
                {showWhereMap &&
                isLoading &&
                !productsLimitPaginating &&
                !resellersLimitPaginating &&
                !brandsLimitPaginating ? (
                  <Loader size={40} overlayMap />
                ) : null}
              </div>
            </>
            {isClaim ? null : (
              <Marquee
                title="Reviews"
                variant="second"
                titleVariant="left"
                scrollVariant="second"
                seeAllText="Show all"
                seeAllHref={onSeeAllReviews}
                isLargeTitle
                showOnEmpty
                emptyView={
                  <ReviewEmpty
                    reviewTo={businessData}
                    refresh={refresh}
                    canAddReview={businessData?.canAddReview}
                  />
                }
                actions={
                  (businessData?.reviews || []).length > 0 ? (
                    <ReviewButton
                      noMargin
                      reviewTo={businessData}
                      refresh={refresh}
                      canAddReview={businessData?.canAddReview}
                    />
                  ) : null
                }>
                {(businessData?.reviews || []).map((review: Review) => (
                  <ReviewCard
                    key={`review-${review.rvwReviewID}`}
                    review={review}
                    refresh={refresh}
                  />
                ))}
              </Marquee>
            )}
            <BusinessAbout business={businessData} />
          </FlexContainer>
        </div>
      ),
    [
      props.business,
      productsLimitPaginating,
      resellersLimitPaginating,
      brandsLimitPaginating,
      isLoading,
      businessData,
      businessProducts,
      searchQuery,
      setSearchQuery,
      productTypes,
      selectedFilters,
      setSelectedFilters,
      onProductCarouselScrollEnd,
      productsFilterNoDebounce,
      resetAll,
      showAllPrices,
      businessItemMaxPriceCount,
      setShowAllPrices,
      onSelectBusinessType,
      selectedBusinessTypes,
      businessTypes,
      sorting,
      setSorting,
      sortingOptions,
      showWhereMap,
    ],
  );

  return isRegionPage ? regionContent : businessContent;
};

export const withBusinessProductsGrid = (props: any) => {
  const router = useRouter();

  const {
    productTypes,
    setSelectedFilters,
    selectedFilters,
    productsFilter,
    productsFilterNoDebounce,
    searchQuery,
    setSearchQuery,
    resetAll,
    sortFilter,
    setSortFilter,
  } = useProductFilter(
    props.business?.productType,
    undefined,
    undefined,
    props.business?.bizSortOption,
  );

  const { sorting, setSorting, sortingOptions } = useBusinessSorting(
    sortFilter,
    setSortFilter,
    props.business?.bizSortOption,
    props.business?.plType,
  );

  const { businessData, isLoading } = useBusinessProductsDynamic({
    businessData: props.business,
    context: router,
    onlyWhenFilterExists: false,
    productsFilter,
    productsFilterNoDebounce,
  });

  const isRegionPage = useMemo(
    () =>
      checkIfRegion(
        (router.query?.business || router.query?.province) as string,
      ),
    [router.query],
  );

  useEffect(() => {
    if (isRegionPage) {
      router.replace(Route.Root);
    }
  }, [isRegionPage]);

  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 860px)',
  });

  return useMemo(
    () =>
      !businessData ? null : (
        <div className="horizontalLayout">
          <SideTopNavigation
            header={
              <>
                <BreadCrumb small mobile {...props.breadCrumb} />
                <BusinessHeader
                  title="Products"
                  displayVariant="side"
                  business={businessData}
                />
                <BusinessContact
                  showBorderRadius
                  desktop
                  business={businessData}
                />
                <BusinessFooter desktop business={businessData} />
              </>
            }
            items={[{ name: 'Products' }]}
            footer={
              <>
                <BusinessContact
                  showBorder
                  mobile
                  mobileVisible
                  business={businessData}
                />
                <BusinessFooter mobile business={businessData} />
              </>
            }
          />
          <FlexContainer>
            <BreadCrumb small desktop {...props.breadCrumb} />
            <Grid
              title={
                (props.business?.products || []).length > 0
                  ? 'Products'
                  : undefined
              }
              withPadding
              showOnEmpty
              emptyView={isLoading ? null : undefined}
              header={
                <>
                  <ProductTypeFilter
                    marginRight
                    productTypes={businessData?.bizIsLite ? [] : productTypes}
                    selectedProductTypes={selectedFilters}
                    onSelectProductType={setSelectedFilters}
                    productCount={businessData?.productCount || 0}
                    searchVisible={
                      !!businessData?.productAvailable &&
                      !businessData?.bizIsLite
                    }
                    showAllPricesPriceVisible={false}
                    search={searchQuery}
                    setSearch={setSearchQuery}
                    sortVisible={
                      !!businessData?.productAvailable &&
                      !businessData?.bizIsLite
                    }
                    sorting={sorting}
                    setSorting={setSorting}
                    sortingOptions={sortingOptions}
                    resetAll={resetAll}
                  />
                  <Loader
                    noMargin
                    smallMargin
                    size={40}
                    isLoading={isLoading}
                  />
                </>
              }>
              {(businessData?.products || []).map((product: Product) => (
                <ProductCard
                  key={`business-${businessData?.bizBusinessID}-product-${product.prdProductID}`}
                  business={businessData}
                  product={product}
                  scroll
                  gridMode
                />
              ))}
            </Grid>
          </FlexContainer>
        </div>
      ),
    [
      isLoading,
      searchQuery,
      setSearchQuery,
      matches,
      businessData,
      productTypes,
      setSelectedFilters,
      selectedFilters,
      resetAll,
      props.business?.products,
      sortingOptions,
      sorting,
      setSorting,
    ],
  );
};

export const withBusinessDealsGrid = (props: any) => {
  const router = useRouter();

  const { businessData, isLoading } = useBusinessDealsDynamic({
    businessData: props.business,
    context: router,
  });

  const isRegionPage = useMemo(
    () =>
      checkIfRegion(
        (router.query?.business || router.query?.province) as string,
      ),
    [router.query],
  );

  useEffect(() => {
    if (isRegionPage) {
      router.replace(Route.Root);
    }
  }, [isRegionPage]);

  return useMemo(
    () =>
      !businessData ? null : (
        <div className="horizontalLayout">
          <SideTopNavigation
            header={
              <>
                <BreadCrumb small mobile {...props.breadCrumb} />
                <BusinessHeader
                  title="Deals"
                  displayVariant="side"
                  business={businessData}
                />
                <BusinessContact
                  showBorderRadius
                  desktop
                  business={businessData}
                />
                <BusinessFooter desktop business={businessData} />
              </>
            }
            items={[{ name: 'Deals' }]}
            footer={
              <>
                <BusinessContact
                  showBorder
                  mobile
                  mobileVisible
                  business={businessData}
                />
                <BusinessFooter mobile business={businessData} />
              </>
            }
          />
          <FlexContainer>
            <BreadCrumb small desktop {...props.breadCrumb} />
            <Grid isLoading={isLoading} title="Deals" horizontal>
              {(businessData?.deals || []).map(
                (businessDeal: BusinessDeals) => (
                  <DealCard
                    key={`business-deal-${businessDeal.dlsDealsID}`}
                    businessDeal={businessDeal}
                    business={businessData}
                    gridMode
                  />
                ),
              )}
            </Grid>
          </FlexContainer>
        </div>
      ),
    [businessData],
  );
};

export const withBusinessCertifiedResellersGrid = (props: any) => {
  const router = useRouter();

  const {
    businessLocationFilterNoDebounce: businessLocationFilter,
    onSelectBusinessType,
    selectedBusinessTypes,
    businessTypes,
  } = useBusinessLocationFilter(
    props.business?.plType === BusinessType.BrandType,
  );

  const { businessData, isLoading } = useBusinessResellersDynamic({
    businessData: props.business,
    context: router,
    businessLocationFilter,
  });

  const isRegionPage = useMemo(
    () =>
      checkIfRegion(
        (router.query?.business || router.query?.province) as string,
      ),
    [router.query],
  );

  useEffect(() => {
    if (isRegionPage) {
      router.replace(Route.Root);
    }
  }, [isRegionPage]);

  return useMemo(
    () =>
      !businessData ? null : (
        <div className="horizontalLayout">
          <SideTopNavigation
            header={
              <>
                <BreadCrumb small mobile {...props.breadCrumb} />
                <BusinessHeader
                  title={
                    businessData?.plType === BusinessType.BrandType
                      ? 'Where to Buy Our Products'
                      : 'Certified Reseller'
                  }
                  displayVariant="side"
                  business={businessData}
                />
                <BusinessContact
                  showBorderRadius
                  desktop
                  business={businessData}
                />
                <BusinessFooter desktop business={businessData} />
              </>
            }
            items={[
              {
                name:
                  businessData?.plType === BusinessType.BrandType
                    ? 'Where to Buy Our Products'
                    : 'Certified Reseller',
              },
            ]}
            footer={
              <>
                <BusinessContact
                  showBorder
                  mobile
                  mobileVisible
                  business={businessData}
                />
                <BusinessFooter mobile business={businessData} />
              </>
            }
          />
          <FlexContainer>
            <BreadCrumb small desktop {...props.breadCrumb} />
            <Grid
              isLoading={isLoading}
              title={
                businessData?.plType === BusinessType.BrandType
                  ? 'Where to Buy Our Products'
                  : 'Certified Reseller'
              }
              withPadding
              showOnEmpty
              emptyView={isLoading ? <Loader size={40} /> : undefined}
              header={
                props.business?.plType === BusinessType.BrandType &&
                (businessData?.resellers || []).length ===
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
              {(
                (businessData?.plType === BusinessType.BrandType
                  ? businessData?.resellers
                  : businessData?.brands) || []
              ).map((business: Business) => (
                <BusinessCard
                  key={`certified-business-${business.bizBusinessID}`}
                  business={business}
                  gridMode
                  showLocation={businessData?.plType === BusinessType.BrandType}
                  hideType={businessData?.plType !== BusinessType.BrandType}
                  showClaim
                />
              ))}
            </Grid>
          </FlexContainer>
        </div>
      ),
    [
      props.business,
      businessData,
      onSelectBusinessType,
      selectedBusinessTypes,
      businessTypes,
    ],
  );
};

export const withBusinessReviewsGrid = (props: any) => {
  const router = useRouter();

  const { businessData, refresh, isLoading } = useBusinessReviewsDynamic({
    businessData: props.business,
    context: router,
  });

  const isRegionPage = useMemo(
    () =>
      checkIfRegion(
        (router.query?.business || router.query?.province) as string,
      ),
    [router.query],
  );

  useEffect(() => {
    if (isRegionPage) {
      router.replace(Route.Root);
    }
  }, [isRegionPage]);

  return useMemo(
    () =>
      !businessData ? null : (
        <div className="horizontalLayout">
          <SideTopNavigation
            header={
              <>
                <BreadCrumb small mobile {...props.breadCrumb} />
                <BusinessHeader
                  title="Reviews"
                  displayVariant="side"
                  business={businessData}
                />
                <BusinessContact
                  showBorderRadius
                  desktop
                  business={businessData}
                />
                <BusinessFooter desktop business={businessData} />
              </>
            }
            items={[{ name: 'Reviews' }]}
            footer={
              <>
                <BusinessContact
                  showBorder
                  mobile
                  mobileVisible
                  business={businessData}
                />
                <BusinessFooter mobile business={businessData} />
              </>
            }
          />
          <FlexContainer>
            <BreadCrumb small desktop {...props.breadCrumb} />
            <Grid
              isLoading={isLoading}
              title={
                (businessData?.reviews || []).length > 0 ? 'Reviews' : undefined
              }
              large
              withPadding
              showOnEmpty
              emptyView={
                <ReviewEmpty
                  reviewTo={businessData}
                  refresh={refresh}
                  canAddReview={businessData?.canAddReview}
                />
              }
              actions={
                (businessData?.reviews || []).length > 0 ? (
                  <ReviewButton
                    noMargin
                    noHorizontal
                    reviewTo={businessData}
                    refresh={refresh}
                    canAddReview={businessData?.canAddReview}
                  />
                ) : null
              }>
              {(businessData?.reviews || []).map((review: Review) => (
                <ReviewCard
                  key={`review-${review.rvwReviewID}`}
                  review={review}
                  gridMode
                  refresh={refresh}
                />
              ))}
            </Grid>
          </FlexContainer>
        </div>
      ),
    [businessData],
  );
};

export const getBusinessLanding = async (
  context: GetServerSidePropsContext,
) => {
  const businessSlugQuery = context?.query?.bizSlug as string | undefined;

  if (businessSlugQuery) {
    const { data: businessData } = await getApolloClient(context).query<
      BusinessOnlyBySlugQuery,
      BusinessOnlyBySlugQueryVariables
    >({
      query: BusinessOnlyBySlugDocument,
      fetchPolicy: 'cache-first',
      variables: {
        bizSlug: businessSlugQuery,
      },
    });
    if (businessData?.businessBySlugHasLanding) {
      return businessData?.businessBySlugHasLanding;
    }
  }
  return null;
};

export const useBusinessForProductAds = async (
  context: GetServerSidePropsContext,
  userId: string,
) => {
  try {
    const { data } = await getApolloClient(context).query<
      BusinessForProductAdsQuery,
      BusinessForProductAdsQueryVariables
    >({
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
      query: BusinessForProductAdsDocument,
      variables: { userId },
    });

    return (data?.businessByUserId.businesses || []).filter(
      item => !item?.bizIsLite,
    );
  } catch (e) {
    return [];
  }
};
