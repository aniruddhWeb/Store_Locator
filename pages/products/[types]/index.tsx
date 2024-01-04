import React, { useMemo } from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  BreadCrumbType,
  useBreadCrumbStatic,
} from '../../../services/breadCrumb';
import { useProductsAllStatic } from '../../../hooks/product/useProductsAllStatic';
import { useProductsAllDynamic } from '../../../hooks/product/useProductsAllDynamic';
import { ProductCard } from '../../../components/product/ProductCard/ProductCard';
import { Product } from '../../../generated/graphql';
import { ProductCategoryTitle } from '../../../components/product/ProductCategoryTitle/ProductCategoryTitle';
import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { ProductTypeFilter } from '../../../components/product/ProductTypeFilter/ProductTypeFilter';
import {
  filterProductType,
  getProductSubTypes,
} from '../../../hooks/product/useProductFilter';
import { formatProductFilter } from '../../../utils/string';
import { Route } from '../../../config/Routes';
import { ProductTypeEmpty } from '../../../components/product/ProductTypeEmpty/ProductTypeEmpty';
import { UserLocationToggleForProductCategoryPage } from '../../../components/common/UserLocationToggleForProductCategoryPage/UserLocationToggleForProductCategoryPage';
import { Loader } from '../../../components/common/Loader/Loader';
import { useWithProductCategories } from '../../../hooks/product/useWithProductCategories';

const Marquee = dynamic<any>(
  // @ts-ignore
  () =>
    import('../../../components/common/Marquee/Marquee').then(m => m.Marquee),
  {
    ssr: false,
  },
);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),
      products: await useProductsAllStatic(context),
    },
  };
}

const ProductsWithTypes = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const router = useRouter();

  const {
    showNearByTitle,
    showLocationTitle,
    setShowLocationDisabledBanner,
    products2km,
    products10km,
    productsMailOrder,
    productsSponsored,
    isProduct2kmPaginating,
    isProduct10kmPaginating,
    isProductMailOrderPaginating,
    isProductSponsoredPaginating,
    getMore2kmProducts,
    getMore10kmProducts,
    getMoreMailOrderProducts,
    getMoreSponsoredProducts,
    isLoading2km,
    isLoading10km,
    isLoadingMail,
    sorting,
    setSorting,
    sortingOptions,
    productTypes,
    selectedFilters,
    setSelectedFilters,
    resetAll,
    searchQuery,
    setSearchQuery,
    productsFilter,
    strainNames,
    brandNames,
  } = useProductsAllDynamic();

  const {
    productTypeName,
    productHeader: productHeaderContent,
    productTypeSlug,
  } = useWithProductCategories(props.products.productHeaderContents);

  const productsBreadCrumbAddition = useMemo(() => {
    if (!productTypes || productTypes.length === 0) {
      return [
        {
          breadcrumb: 'Home',
          clickable: true,
          href: Route.Root,
        } as BreadCrumbType,
        {
          breadcrumb: productTypeName,
          clickable: true,
          href: `${Route.Products}/${
            productTypeSlug || ''
          }?filters=${encodeURIComponent(productTypeName || '')}`,
        } as BreadCrumbType,
      ];
    }
    const filters: BreadCrumbType[] = [];
    (selectedFilters || [])
      .filter(item =>
        productTypes.some(typeItem => filterProductType(typeItem, item)),
      )
      .forEach((item, itemIndex) => {
        const splits = item.split(',');
        const parentType = productTypes.find(typeItem =>
          filterProductType(typeItem, item),
        );
        if (splits.length > 0) {
          filters.push({
            breadcrumb: splits[0],
            clickable: true,
            href: `${Route.Products}/${
              parentType?.slug || ''
            }?filters=${encodeURIComponent(splits[0] || '')}`,
          });
        }
        if (splits.length > 1) {
          splits.forEach((split, index) => {
            if (index > 0) {
              filters.push({
                breadcrumb: split,
                clickable: true,
                href: `${Route.Products}/${
                  parentType?.slug || ''
                }?filters=${encodeURIComponent(item || '')}`,
              });
            }
          });
        }
      });

    const finalBreadCrumbs = [
      {
        breadcrumb: 'Home',
        clickable: true,
        href: Route.Root,
      } as BreadCrumbType,
    ]
      .concat(filters)
      .filter(
        (item, pos, self) =>
          self.findIndex(sub => sub.breadcrumb === item.breadcrumb) === pos,
      );
    return finalBreadCrumbs.map((item, itemIndex) => ({
      ...item,
      clickable: itemIndex < finalBreadCrumbs.length - 1,
    }));
  }, [selectedFilters, productTypes]);

  const productsSubProductTypes = useMemo(
    () => getProductSubTypes(productTypes, selectedFilters, true),
    [productTypes, selectedFilters],
  );

  const productsHeaderTitle = useMemo(
    () =>
      formatProductFilter(
        (selectedFilters || [])
          .filter(item =>
            productTypes.some(typeItem => filterProductType(typeItem, item)),
          )
          .join(', '),
      ) || `${productTypeName || ''}`,
    [selectedFilters, productTypes, productsSubProductTypes, productTypeName],
  );

  const showSponsored = useMemo(
    () => (productsSponsored || []).length > 0,
    [productsSponsored],
  );

  const showWithExistingFilters = useMemo(
    () =>
      (selectedFilters || []).length > 1 ||
      ((selectedFilters || []).length > 0 &&
        selectedFilters.some(item => item.includes(','))) ||
      !!searchQuery,
    [searchQuery, selectedFilters],
  );

  const showFilters = useMemo(
    () =>
      showWithExistingFilters ||
      (productsMailOrder || []).length > 0 ||
      (products2km || []).length > 0 ||
      (products10km || []).length > 0,
    [showWithExistingFilters, products10km, products2km, productsMailOrder],
  );

  const showOnEmpty = useMemo(
    () =>
      (productsMailOrder || []).length === 0 &&
      (products2km || []).length === 0 &&
      (products10km || []).length === 0,
    [products10km, products2km, productsMailOrder],
  );

  return (
    <>
      {productTypeName ? (
        <ProductCategoryTitle
          title={productsHeaderTitle.trim()}
          showNearByTitle={showNearByTitle}
          showLocationTitle={showLocationTitle}
          setShowLocationDisabledBanner={setShowLocationDisabledBanner}
          text={
            props.breadCrumb?.metaTags?.customDescription1 ||
            productHeaderContent?.text ||
            ''
          }
          textUrlMap={
            props.breadCrumb?.metaTags?.customDescription1
              ? null
              : productHeaderContent?.textUrlMap || null
          }
          backgroundImage={productHeaderContent?.backgroundImage || null}
        />
      ) : null}
      <BreadCrumb
        {...props.breadCrumb}
        breadCrumbs={productsBreadCrumbAddition}
        small={!showSponsored}
        marginTop={!showSponsored}
        hidePath={showSponsored}
        footer={
          <>
            <UserLocationToggleForProductCategoryPage
              isLoadingExternal={isLoading2km || isLoading10km || isLoadingMail}
              disableToggle={isLoading2km || isLoading10km || isLoadingMail}
              layoutAbsolute
              isHidden={!showSponsored}
            />
            {showSponsored ? (
              <Marquee
                key="Sponsored Products"
                title="Sponsored Products"
                variant="second"
                noTopMargin
                noAutoScrollOnPagination
                preventPrevFetching
                onScrollStart={getMoreSponsoredProducts}
                isPaginating={isProductSponsoredPaginating}>
                {(productsSponsored || []).map((product: Product) => (
                  <ProductCard
                    key={`sponsored-product-${product.prdProductID}`}
                    scroll
                    fixedHeight
                    product={product}
                    business={
                      (product?.business || []).length > 0
                        ? product.business[0]
                        : undefined
                    }
                    shouldShowBrandDiscontinued
                    shouldShowNearbyPlaces
                  />
                ))}
              </Marquee>
            ) : null}
          </>
        }
      />
      {showFilters ? (
        <ProductTypeFilter
          productTypes={productTypes}
          selectedProductTypes={selectedFilters}
          onSelectProductType={setSelectedFilters}
          showAllPricesPriceVisible={false}
          searchVisible
          setSearch={setSearchQuery}
          search={searchQuery}
          sortVisible
          marginBottom
          marginTop
          sorting={sorting}
          setSorting={setSorting}
          sortingOptions={sortingOptions}
          resetAll={resetAll}
          layoutDirection="vertical"
          flexDirection="left"
          ignoreAvailable
          strainNames={strainNames}
          brandNames={brandNames}
          showLocationToggle={!showSponsored}
          disableLocationToggle={isLoading2km || isLoading10km || isLoadingMail}
          isLocationToggleLoading={
            isLoading2km || isLoading10km || isLoadingMail
          }
        />
      ) : null}
      {showOnEmpty && !isLoading2km && !isLoading10km && !isLoadingMail ? (
        <ProductTypeEmpty
          showWithExistingFilters={showWithExistingFilters}
          productTypeName={productsHeaderTitle.trim()}
          productsFilter={productsFilter}
        />
      ) : (
        <>
          <Marquee
            id="2km-carousel"
            key="2km-carousel"
            title="Less than 2km"
            noAutoScrollOnPagination
            noRowBorder
            showOnEmpty={isLoading2km}
            emptyView={isLoading2km ? null : undefined}
            header={isLoading2km ? <Loader size={40} /> : null}
            variant="third"
            seeAllText="Show all"
            seeAllHref={`${Route.Products}/${router.query.types as string}${
              Route.Products2km
            }?${router.asPath.split('?')[1]}`}
            showAllOnEmpty
            showThirdOnMobile={false}
            onScrollEnd={getMore2kmProducts}
            isPaginating={isProduct2kmPaginating}>
            {(products2km || []).map((product: Product) => (
              <ProductCard
                key={`2km-product-${product.prdProductID}`}
                scroll
                fixedHeight
                product={product}
                business={
                  (product?.business || []).length > 0
                    ? product.business[0]
                    : undefined
                }
                shouldShowBrandDiscontinued
                shouldShowNearbyPlaces
              />
            ))}
          </Marquee>
          <Marquee
            id="10km-carousel"
            key="10km-carousel"
            noAutoScrollOnPagination
            noRowBorder
            title="Between 2km and 10km"
            showOnEmpty={isLoading10km}
            emptyView={isLoading10km ? null : undefined}
            header={isLoading10km ? <Loader size={40} /> : null}
            variant="third"
            seeAllText="Show all"
            seeAllHref={`${Route.Products}/${router.query.types as string}${
              Route.Products10km
            }?${router.asPath.split('?')[1]}`}
            showAllOnEmpty
            showThirdOnMobile={false}
            onScrollEnd={getMore10kmProducts}
            isPaginating={isProduct10kmPaginating}>
            {(products10km || []).map((product: Product) => (
              <ProductCard
                key={`10km-product-${product.prdProductID}`}
                scroll
                fixedHeight
                product={product}
                business={
                  (product?.business || []).length > 0
                    ? product.business[0]
                    : undefined
                }
                shouldShowBrandDiscontinued
                shouldShowNearbyPlaces
              />
            ))}
          </Marquee>
          <Marquee
            id="mail-order-carousel"
            key="mail-order-carousel"
            title="Mail Orders"
            noAutoScrollOnPagination
            noRowBorder
            showOnEmpty={
              (products2km || []).length === 0 &&
              (products10km || []).length === 0
            }
            emptyView={isLoadingMail ? null : undefined}
            header={isLoadingMail ? <Loader size={40} /> : null}
            variant="third"
            seeAllText="Show all"
            seeAllHref={`${Route.Products}/${router.query.types as string}${
              Route.ProductsMailOrder
            }?${router.asPath.split('?')[1]}`}
            showAllOnEmpty
            showThirdOnMobile={false}
            onScrollEnd={getMoreMailOrderProducts}
            isPaginating={isProductMailOrderPaginating}>
            {(productsMailOrder || []).map((product: Product) => (
              <ProductCard
                key={`mail-order-product-${product.prdProductID}`}
                scroll
                fixedHeight
                product={product}
                business={
                  (product?.business || []).length > 0
                    ? product.business[0]
                    : undefined
                }
                shouldShowBrandDiscontinued
              />
            ))}
          </Marquee>
        </>
      )}
    </>
  );
};

export default ProductsWithTypes;
