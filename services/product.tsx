import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { UserLocationToggleForProductPage } from 'components/common/UserLocationToggleForProductPage/UserLocationToggleForProductPage';
import { Business, Product, Review } from '../generated/graphql';
import { SideTopNavigation } from '../components/common/SideTopNavigation/SideTopNavigation';
import { FlexContainer } from '../components/common/FlexContainer/FlexContainer';
import { BreadCrumb } from '../components/common/BreadCrumb/BreadCrumb';
import { Marquee } from '../components/common/Marquee/Marquee';
import { ProductTypeFilter } from '../components/product/ProductTypeFilter/ProductTypeFilter';
import { ReviewCard } from '../components/review/ReviewCard/ReviewCard';
import { Route } from '../config/Routes';
import { ProductFooter } from '../components/product/ProductFooter/ProductFooter';
import { BusinessCard } from '../components/business/BusinessCard/BusinessCard';
import { ProductHeader } from '../components/product/ProductHeader/ProductHeader';
import { ProductInfo } from '../components/product/ProductInfo/ProductInfo';
import {
  hasWindow,
  useWindowDimensions,
  useWindowFragmentScroll,
} from '../utils/window';
import { BusinessContact } from '../components/business/BusinessContact/BusinessContact';
import { ProductAbout } from '../components/product/ProductAbout/ProductAbout';
import s from '../components/common/Marquee/Marquee.module.css';
import { ReviewButton } from '../components/review/ReviewButton/ReviewButton';
import { ReviewEmpty } from '../components/review/ReviewEmpty/ReviewEmpty';
import { BusinessHeader } from '../components/business/BusinessHeader/BusinessHeader';
import { Grid } from '../components/common/Grid/Grid';
import { Loader } from '../components/common/Loader/Loader';
import { ProductHorizontalCard } from '../components/product/ProductHorizontalCard/ProductHorizontalCard';
import { useProductFilter } from '../hooks/product/useProductFilter';
import { useProductDynamic } from '../hooks/product/useProductDynamic';
import { useProductResellersDynamic } from '../hooks/product/useProductReasellersDynamic';
import { useProductReviewsDynamic } from '../hooks/product/useProductReviewDynamic';
import { useWithProductPage } from '../hooks/product/useWithProductPage';
import { BusinessFilter } from '../components/business/BusinessFilter/BusinessFilter';
import { ProductMap } from '../components/product/ProductMap/ProductMap';
import { useBusinessSponsoredForProduct } from '../hooks/business/useBusinessSponsoredForProduct';
import { ProductMapNonBrand } from '../components/product/ProductMapNonBrand/ProductMapNonBrand';
import { useBusinessLocationFilter } from '../hooks/business/useBusinessLocationFilter';

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const withProductPage = (
  originalContent: any,
  props: any,
  shouldRedirect?: boolean,
) => {
  const router = useRouter();

  useWindowFragmentScroll();

  const {
    searchQuery,
    setSearchQuery,
    productTypes,
    setSelectedFilters,
    selectedFilters,
    productsFilter,
    productsFilterNoDebounce,
    productLimit,
    setNextProductLimit,
    resetFilters,
    resetAll,
    showAllPrices,
    setShowAllPrices,
  } = useProductFilter(props.business?.productType, props.product);

  const { businessLocationFilter, businessLocationFilterNoDebounce } =
    useBusinessLocationFilter(
      props.business?.plType === BusinessType.BrandType,
    );

  const { productData, businessData, refresh, isLoading, isPaginating } =
    useProductDynamic({
      productData: props.product,
      businessData: props.business,
      context: router,
      productsFilter,
      productsFilterNoDebounce,
      productLimit,
      businessLocationFilter,
      businessLocationFilterNoDebounce,
    });

  const {
    businesses: sponsoredBusinesses,
    getMoreBusinesses: getMoreSponsoredBusinesses,
    isPaginating: isSponsoredPaginating,
  } = useBusinessSponsoredForProduct(
    businessData?.plType === BusinessType.BrandType
      ? productData?.prdProductID
      : null,
  );

  useEffect(() => {
    if ((!productData || !businessData) && shouldRedirect) {
      router.replace(Route.Root);
    }
  }, [productData, businessData, shouldRedirect]);

  const previousProductID = useRef<string | undefined | null>(
    productData?.prdProductID,
  );
  const previousBusinessID = useRef<string | undefined | null>(
    businessData?.bizBusinessID,
  );

  useEffect(() => {
    if (
      (productData?.prdProductID &&
        previousProductID.current !== productData?.prdProductID) ||
      (businessData?.bizBusinessID &&
        previousBusinessID.current !== businessData?.bizBusinessID)
    ) {
      resetFilters(true);
      window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
    }
    previousProductID.current = productData?.prdProductID;
    previousBusinessID.current = businessData?.bizBusinessID;
  }, [productData?.prdProductID, businessData?.bizBusinessID]);

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const {
    greenContainerRef,
    matches,
    navItems,
    onSeeAllReviews,
    onSeeAlsoAvailable,
    productBusinesses,
    productNonBrandMapBusinesses,
    onProductCarouselScrollEnd,
    businessProducts,
    businessItemMaxPriceCount,
  } = useWithProductPage(
    businessData,
    productData,
    setNextProductLimit,
    sponsoredBusinesses,
  );

  useEffect(() => {
    if (hasWindow) {
      const handleLoad = () => {
        const mainContent = document.getElementById('main-background-portal');
        if (mainContent) {
          const existingBackgroundContent = document.getElementById(
            'marquee-background-green',
          );
          const backgroundContent = document.createElement('div');
          backgroundContent.id = 'marquee-background-green';
          backgroundContent.className = s.greenBackground;
          backgroundContent.style.height = `${
            greenContainerRef.current?.offsetHeight
              ? greenContainerRef.current.offsetHeight +
                (matches?.isMobile || matches?.isTablet ? 48 : 0)
              : 0
          }px`;

          if (
            existingBackgroundContent &&
            typeof existingBackgroundContent.replaceWith === 'function'
          ) {
            existingBackgroundContent.replaceWith(backgroundContent);
          } else {
            mainContent.appendChild(backgroundContent);
          }
        }
      };
      setTimeout(() => {
        handleLoad();
      }, 1000);
      window.addEventListener('load', handleLoad);
      return () => {
        window.removeEventListener('load', handleLoad);
        const mainContent = document.getElementById('main-background-portal');
        if (mainContent) {
          while (mainContent.firstChild) {
            if (mainContent.lastChild) {
              mainContent.removeChild(mainContent.lastChild);
            }
          }
        }
      };
    }
  }, [matches, windowWidth, windowHeight]);

  const businessSelectionOptions = useMemo(() => {
    if (
      ((productData?.businessProductReseller || []) as Business[]).filter(
        item =>
          item.plType !== BusinessType.MailOrderType &&
          item.plType !== BusinessType.BrandType &&
          !!productData?.productReseller?.find(
            (resellerProduct: Product | null | undefined) =>
              resellerProduct?.business.some(
                subItem => subItem.bizBusinessID === item.bizBusinessID,
              ),
          ),
      ).length > 0
    ) {
      if (
        ((productData?.businessProductReseller || []) as Business[]).filter(
          (item: Business) =>
            item.plType === BusinessType.MailOrderType &&
            !!productData?.productReseller?.find((resellerProduct: Product) =>
              resellerProduct?.business.some(
                subItem => subItem.bizBusinessID === item.bizBusinessID,
              ),
            ),
        ).length > 0
      ) {
        return [
          `${BusinessType.DeliveryType} & ${BusinessType.DispensaryType}`,
          BusinessType.MailOrderType,
        ];
      }
      return [`${BusinessType.DeliveryType} & ${BusinessType.DispensaryType}`];
    }
    if (
      ((productData?.businessProductReseller || []) as Business[]).filter(
        (item: Business) =>
          item.plType === BusinessType.MailOrderType &&
          !!productData?.productReseller?.find((resellerProduct: Product) =>
            resellerProduct?.business.some(
              subItem => subItem.bizBusinessID === item.bizBusinessID,
            ),
          ),
      ).length > 0
    ) {
      return [BusinessType.MailOrderType];
    }
    return [`${BusinessType.DeliveryType} & ${BusinessType.DispensaryType}`];
  }, [productData]);
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>(
    businessSelectionOptions.length > 1
      ? BusinessType.DeliveryType
      : businessSelectionOptions.length > 0
      ? businessSelectionOptions[0] === BusinessType.MailOrderType
        ? BusinessType.MailOrderType
        : BusinessType.DeliveryType
      : BusinessType.DeliveryType,
  );
  const setSelectedBusinessTypeFunc = useCallback((v: string) => {
    setSelectedBusinessType(v);
  }, []);

  const businessNonBrandSelectionOptions = useMemo(() => {
    if (
      (productNonBrandMapBusinesses || []).filter(
        (item: Business) =>
          item.plType !== BusinessType.MailOrderType &&
          item.plType !== BusinessType.BrandType,
      ).length > 0
    ) {
      if (
        (productNonBrandMapBusinesses || []).filter(
          (item: Business) => item.plType === BusinessType.MailOrderType,
        ).length > 0
      ) {
        return [
          `${BusinessType.DeliveryType} & ${BusinessType.DispensaryType}`,
          BusinessType.MailOrderType,
        ];
      }
      return [`${BusinessType.DeliveryType} & ${BusinessType.DispensaryType}`];
    }
    if (
      (productNonBrandMapBusinesses || []).filter(
        (item: Business) => item.plType === BusinessType.MailOrderType,
      ).length > 0
    ) {
      return [BusinessType.MailOrderType];
    }
    return [`${BusinessType.DeliveryType} & ${BusinessType.DispensaryType}`];
  }, [productNonBrandMapBusinesses]);
  const [selectedBusinessNonBrandType, setSelectedBusinessNonBrandType] =
    useState<string>(
      businessNonBrandSelectionOptions.length > 1
        ? BusinessType.DeliveryType
        : businessNonBrandSelectionOptions.length > 0
        ? businessNonBrandSelectionOptions[0] === BusinessType.MailOrderType
          ? BusinessType.MailOrderType
          : BusinessType.DeliveryType
        : BusinessType.DeliveryType,
    );
  const setSelectedBusinessNonBrandTypeFunc = useCallback((v: string) => {
    setSelectedBusinessNonBrandType(v);
  }, []);

  return !productData || !businessData ? (
    originalContent
  ) : (
    <div className="horizontalLayout">
      <SideTopNavigation
        header={
          <>
            <BreadCrumb small mobile {...props.breadCrumb} />
            <ProductHeader
              business={businessData}
              product={productData}
              scrollText={
                (props.product?.businessProductReseller || []).length > 0 &&
                businessData?.plType === BusinessType.BrandType
                  ? 'Where to Buy This Product'
                  : undefined
              }
            />
            <BusinessContact disableAnalytics desktop business={businessData} />
          </>
        }
        footer={
          <ProductFooter
            desktop
            product={productData}
            business={businessData}
          />
        }
        items={navItems}
      />
      <FlexContainer>
        <BreadCrumb small desktop {...props.breadCrumb} />
        <ProductInfo product={productData} business={businessData} />
        <ProductFooter
          mobile
          whiteBackground
          noMargin
          product={productData}
          business={businessData}
        />
        <ProductAbout product={productData} />
        {((productNonBrandMapBusinesses || []).length > 0 &&
          (businessData?.plType === BusinessType.MailOrderType ||
            businessData?.plType === BusinessType.DeliveryType ||
            businessData?.plType === BusinessType.DispensaryType) &&
          selectedBusinessNonBrandType !== BusinessType.MailOrderType) ||
        ((productData?.businessProductReseller || []).length > 0 &&
          businessData?.plType === BusinessType.BrandType &&
          selectedBusinessType !== BusinessType.MailOrderType) ? (
          <UserLocationToggleForProductPage disableToggle={isLoading} />
        ) : null}
        {businessData?.plType === BusinessType.BrandType &&
        (sponsoredBusinesses || []).length > 0 ? (
          <Marquee
            title="Sponsored Resellers"
            variant="second"
            titleVariant="left"
            showAllOnEmpty={false}
            showOnEmpty
            showListOnEmpty
            emptyView={null}
            showThirdOnMobile={false}
            onScrollEnd={getMoreSponsoredBusinesses}
            isPaginating={isSponsoredPaginating}>
            {(sponsoredBusinesses || []).map((business: Business) => {
              const productItem = business?.products.find(
                (resellerProduct: Product) =>
                  resellerProduct?.business.some(
                    subItem => subItem.bizBusinessID === business.bizBusinessID,
                  ),
              );
              return (
                <BusinessCard
                  key={`sponsored-product-business-${business.bizBusinessID}`}
                  business={business}
                  showLocation
                  hideType={false}
                  certified={false}
                  variant="row"
                  product={productItem}
                />
              );
            })}
          </Marquee>
        ) : null}
        {(productNonBrandMapBusinesses || []).length > 0 &&
        (businessData?.plType === BusinessType.MailOrderType ||
          businessData?.plType === BusinessType.DeliveryType ||
          businessData?.plType === BusinessType.DispensaryType) ? (
          selectedBusinessNonBrandType === BusinessType.MailOrderType ? (
            <Marquee
              title="Where to Buy This Product"
              variant="second"
              showOnEmpty
              actions={
                <BusinessFilter
                  hideTitle
                  withIcon
                  hideMargin
                  hidePaddingRight
                  white
                  desktop
                  selectedBusinessTypes={[BusinessType.MailOrderType]}
                  onSelectBusinessType={setSelectedBusinessNonBrandTypeFunc}
                  businessTypes={businessNonBrandSelectionOptions}
                />
              }
              header={
                <BusinessFilter
                  hideTitle
                  withIcon
                  hideMargin
                  hidePaddingRight
                  white
                  mobile
                  selectedBusinessTypes={[BusinessType.MailOrderType]}
                  onSelectBusinessType={setSelectedBusinessNonBrandTypeFunc}
                  businessTypes={businessNonBrandSelectionOptions}
                />
              }
              titleVariant="left">
              {(productNonBrandMapBusinesses || [])
                .filter(
                  (item: Business) =>
                    item?.plType === BusinessType.MailOrderType,
                )
                .map((business: Business) => {
                  return (
                    <BusinessCard
                      key={`product-reseller-delivery-business-${business.bizBusinessID}`}
                      business={business}
                      showLocation
                      hideType={false}
                      certified={false}
                      variant="row"
                      product={productData}
                    />
                  );
                })}
            </Marquee>
          ) : (
            <div className="relativeContainer">
              <Marquee
                title="Where to Buy This Product"
                variant="second"
                showAllOnEmpty
                showOnEmpty
                noBottomMargin
                emptyView={null}
                actions={
                  <BusinessFilter
                    hideTitle
                    withIcon
                    hideMargin
                    hidePaddingRight
                    white
                    desktop
                    selectedBusinessTypes={[
                      `${BusinessType.DeliveryType} & ${BusinessType.DispensaryType}`,
                    ]}
                    onSelectBusinessType={setSelectedBusinessNonBrandTypeFunc}
                    businessTypes={businessNonBrandSelectionOptions}
                  />
                }
                header={
                  <BusinessFilter
                    hideTitle
                    withIcon
                    hideMargin
                    hidePaddingRight
                    white
                    mobile
                    selectedBusinessTypes={[
                      `${BusinessType.DeliveryType} & ${BusinessType.DispensaryType}`,
                    ]}
                    onSelectBusinessType={setSelectedBusinessNonBrandTypeFunc}
                    businessTypes={businessNonBrandSelectionOptions}
                  />
                }
                titleVariant="left">
                {null}
              </Marquee>
              <ProductMapNonBrand
                product={productData}
                productBusinesses={productNonBrandMapBusinesses}
              />
              {isLoading ? <Loader size={40} overlayMap /> : null}
            </div>
          )
        ) : null}
        {(props.product?.businessProductReseller || []).length > 0 &&
        businessData?.plType === BusinessType.BrandType ? (
          selectedBusinessType === BusinessType.MailOrderType ? (
            <Marquee
              title="Where to Buy This Product"
              variant="second"
              showOnEmpty
              actions={
                <BusinessFilter
                  hideTitle
                  withIcon
                  hideMargin
                  hidePaddingRight
                  white
                  desktop
                  selectedBusinessTypes={[BusinessType.MailOrderType]}
                  onSelectBusinessType={setSelectedBusinessTypeFunc}
                  businessTypes={businessSelectionOptions}
                />
              }
              header={
                <BusinessFilter
                  hideTitle
                  withIcon
                  hideMargin
                  hidePaddingRight
                  white
                  mobile
                  selectedBusinessTypes={[BusinessType.MailOrderType]}
                  onSelectBusinessType={setSelectedBusinessTypeFunc}
                  businessTypes={businessSelectionOptions}
                />
              }
              titleVariant="left">
              {(productData?.businessProductReseller || [])
                .filter(
                  (item: Business) =>
                    item.plType === BusinessType.MailOrderType &&
                    !!productData?.productReseller?.find(
                      (resellerProduct: Product) =>
                        resellerProduct?.business.some(
                          subItem =>
                            subItem.bizBusinessID === item.bizBusinessID,
                        ),
                    ),
                )
                .map((business: Business) => {
                  const productItem = productData?.productReseller?.find(
                    (resellerProduct: Product) =>
                      resellerProduct?.business.some(
                        subItem =>
                          subItem.bizBusinessID === business.bizBusinessID,
                      ),
                  );
                  return (
                    <BusinessCard
                      key={`product-reseller-brand-business-${business.bizBusinessID}`}
                      business={business}
                      showLocation
                      hideType={false}
                      certified={false}
                      variant="row"
                      product={productItem}
                    />
                  );
                })}
            </Marquee>
          ) : (
            <div className="relativeContainer">
              <Marquee
                title="Where to Buy This Product"
                variant="second"
                showAllOnEmpty
                showOnEmpty
                noBottomMargin
                emptyView={null}
                actions={
                  <BusinessFilter
                    hideTitle
                    withIcon
                    hideMargin
                    hidePaddingRight
                    white
                    desktop
                    selectedBusinessTypes={[
                      `${BusinessType.DeliveryType} & ${BusinessType.DispensaryType}`,
                    ]}
                    onSelectBusinessType={setSelectedBusinessTypeFunc}
                    businessTypes={businessSelectionOptions}
                  />
                }
                header={
                  <BusinessFilter
                    hideTitle
                    withIcon
                    hideMargin
                    hidePaddingRight
                    white
                    mobile
                    selectedBusinessTypes={[
                      `${BusinessType.DeliveryType} & ${BusinessType.DispensaryType}`,
                    ]}
                    onSelectBusinessType={setSelectedBusinessTypeFunc}
                    businessTypes={businessSelectionOptions}
                  />
                }
                titleVariant="left">
                {null}
              </Marquee>
              <ProductMap
                product={productData}
                showClaim={businessData?.plType === BusinessType.BrandType}
              />
              {isLoading ? <Loader size={40} overlayMap /> : null}
            </div>
          )
        ) : null}
        <Marquee
          title="Reviews"
          variant="second"
          titleVariant="left"
          scrollVariant="second"
          showOnEmpty
          seeAllText="Show all"
          seeAllHref={onSeeAllReviews}
          emptyView={
            <ReviewEmpty
              reviewTo={productData}
              refresh={refresh}
              canAddReview={productData?.canAddReview}
            />
          }
          actions={
            (productData?.reviews || []).length > 0 ? (
              <ReviewButton
                noMargin
                reviewTo={productData}
                refresh={refresh}
                canAddReview={productData?.canAddReview}
              />
            ) : null
          }>
          {(productData?.reviews || []).map((review: Review) => (
            <ReviewCard
              key={`review-${review.rvwReviewID}`}
              review={review}
              refresh={refresh}
            />
          ))}
        </Marquee>
        {(businessData?.plType === BusinessType.MailOrderType ||
          businessData?.plType === BusinessType.DeliveryType ||
          businessData?.plType === BusinessType.DispensaryType) &&
        (productNonBrandMapBusinesses || []).length > 0 ? null : (
          <Marquee
            title="Also Available At"
            variant="second"
            titleVariant="left"
            seeAllText="Show all"
            seeAllHref={onSeeAlsoAvailable}>
            {(productBusinesses || []).map((business: Business) => (
              <BusinessCard
                key={`business-${business.bizBusinessID}`}
                business={business}
                showLocation
              />
            ))}
          </Marquee>
        )}
        <Marquee
          containerRef={greenContainerRef}
          title={`More by ${businessData.bizName}`}
          variant="third"
          showAllOnEmpty
          titleVariant="left"
          showOnEmpty
          showThirdOnMobile
          scrollDependency={[productsFilterNoDebounce]}
          onScrollEnd={onProductCarouselScrollEnd}
          isPaginating={isPaginating}
          header={
            <>
              <ProductTypeFilter
                dropdownDirection="top"
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
                  !!businessData?.productAvailable && !businessData?.bizIsLite
                }
                sortVisible={false}
                resetAll={resetAll}
              />
              <Loader
                overlay
                size={40}
                isLoading={isLoading && !isPaginating}
                overlayProductsInProduct={
                  !!businessData?.productAvailable && !businessData?.bizIsLite
                }
              />
            </>
          }>
          {(businessProducts || []).map((product: Product) => (
            <ProductHorizontalCard
              key={`more-product-${product.prdProductID}`}
              scroll
              product={product}
              business={businessData}
              showAllPrices={showAllPrices}
              maxPriceCount={businessItemMaxPriceCount}
            />
          ))}
        </Marquee>
      </FlexContainer>
    </div>
  );
};

export const withProductAlsoAvailableGrid = (
  props: any,
  shouldRedirect?: boolean,
) => {
  const router = useRouter();

  const { productData, businessData, isLoading } = useProductResellersDynamic({
    productData: props.product,
    businessData: props.business,
    context: router,
  });

  useEffect(() => {
    if ((!productData || !businessData) && shouldRedirect) {
      router.replace(Route.Root);
    }
  }, [productData, businessData, shouldRedirect]);

  const productBusinesses = useMemo(
    () =>
      (productData?.business || []).filter(
        (business: Business) =>
          business.bizBusinessID !== businessData?.bizBusinessID,
      ),
    [businessData?.bizBusinessID, productData?.business],
  );

  return (
    <div className="horizontalLayout">
      <SideTopNavigation
        header={
          <>
            <BreadCrumb small mobile {...props.breadCrumb} />
            <BusinessHeader
              title="Also Available At"
              displayVariant="side"
              business={businessData}
            />
          </>
        }
        items={[]}
      />
      <FlexContainer>
        <BreadCrumb small desktop {...props.breadCrumb} />
        <Grid
          isLoading={isLoading}
          title={
            (productBusinesses || []).length > 0
              ? 'Also Available At'
              : undefined
          }
          withPadding
          showOnEmpty>
          {(productBusinesses || []).map((business: Business) => (
            <BusinessCard
              key={`available-business-${business.bizBusinessID}`}
              business={business}
              gridMode
              showLocation
            />
          ))}
        </Grid>
      </FlexContainer>
    </div>
  );
};

export const withProductReviewsGrid = (
  props: any,
  shouldRedirect?: boolean,
) => {
  const router = useRouter();

  const { productData, businessData, refresh, isLoading } =
    useProductReviewsDynamic({
      productData: props.product,
      businessData: props.business,
      context: router,
    });

  useEffect(() => {
    if ((!productData || !businessData) && shouldRedirect) {
      router.replace(Route.Root);
    }
  }, [productData, businessData, shouldRedirect]);

  return (
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
          </>
        }
        items={[]}
      />
      <FlexContainer>
        <BreadCrumb small desktop {...props.breadCrumb} />
        <Grid
          isLoading={isLoading}
          title={
            (productData?.reviews || []).length > 0 ? 'Reviews' : undefined
          }
          large
          withPadding
          showOnEmpty
          emptyView={
            <ReviewEmpty
              reviewTo={productData}
              refresh={refresh}
              canAddReview={productData?.canAddReview}
            />
          }
          actions={
            (productData?.reviews || []).length > 0 ? (
              <ReviewButton
                noMargin
                noHorizontal
                reviewTo={productData}
                refresh={refresh}
                canAddReview={productData?.canAddReview}
              />
            ) : null
          }>
          {(productData?.reviews || []).map((review: Review) => (
            <ReviewCard
              key={`product-review-${review.rvwReviewID}`}
              review={review}
              gridMode
              refresh={refresh}
            />
          ))}
        </Grid>
      </FlexContainer>
    </div>
  );
};
