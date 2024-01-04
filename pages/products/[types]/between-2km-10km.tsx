import React, { useMemo } from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import {
  BreadCrumbType,
  useBreadCrumbStatic,
} from '../../../services/breadCrumb';
import { Grid } from '../../../components/common/Grid/Grid';
import { ProductCard } from '../../../components/product/ProductCard/ProductCard';
import { Product } from '../../../generated/graphql';
import { ProductCategoryTitle } from '../../../components/product/ProductCategoryTitle/ProductCategoryTitle';
import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { ProductTypeFilter } from '../../../components/product/ProductTypeFilter/ProductTypeFilter';
import { Loader } from '../../../components/common/Loader/Loader';
import {
  filterProductType,
  getProductSubTypes,
} from '../../../hooks/product/useProductFilter';
import { formatProductFilter } from '../../../utils/string';
import { Route } from '../../../config/Routes';
import { useProductsAllStatic } from '../../../hooks/product/useProductsAllStatic';
import { useProducts10kmDynamic } from '../../../hooks/product/useProducts10kmDynamic';
import { useDetectScrollEnd } from '../../../utils/window';
import { useWithProductCategories } from '../../../hooks/product/useWithProductCategories';

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
  const {
    products10km,
    isLoading,
    isProduct10kmPaginating,
    showNearByTitle,
    setShowLocationDisabledBanner,
    showLocationTitle,
    productTypes,
    selectedFilters,
    resetAll,
    searchQuery,
    setSearchQuery,
    getMore10kmProducts,
    setSelectedFilters,
    strainNames,
    brandNames,
  } = useProducts10kmDynamic();

  const {
    productTypeName,
    productHeader: productHeaderContent,
    productTypeSlug,
  } = useWithProductCategories(props.products.productHeaderContents);

  useDetectScrollEnd(getMore10kmProducts, true);

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
        {
          breadcrumb: 'Between 2km And 10km',
          clickable: false,
          href: Route.Root,
        },
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
      .concat([
        {
          breadcrumb: 'Between 2km And 10km',
          clickable: false,
          href: Route.Root,
        },
      ])
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

  return (
    <>
      {productTypeName ? (
        <ProductCategoryTitle
          title={productsHeaderTitle.trim()}
          showSubTitle
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
        small
        marginTop
      />
      <Grid
        isLoading={isLoading || isProduct10kmPaginating}
        emptyView={isLoading ? null : undefined}
        showOnEmpty
        noBottomMargin
        topMarginSmall
        title="Between 2km and 10km Products"
        header={
          <>
            <ProductTypeFilter
              showLocationToggle
              productTypes={productTypes}
              selectedProductTypes={selectedFilters}
              onSelectProductType={setSelectedFilters}
              strainNames={strainNames}
              brandNames={brandNames}
              showAllPricesPriceVisible={false}
              sortVisible={false}
              searchVisible
              setSearch={setSearchQuery}
              search={searchQuery}
              resetAll={resetAll}
              layoutDirection="vertical"
              flexDirection="left"
              ignoreAvailable
              marginTop
              marginBottom
              disableLocationToggle={isLoading}
              isLocationToggleLoading={isLoading}
            />
            {isLoading ? <Loader size={40} /> : null}
          </>
        }>
        {products10km.map((product: Product) => (
          <ProductCard
            key={`10km-all-product-${product.prdProductID}`}
            product={product}
            scroll
            business={
              (product?.business || []).length > 0
                ? product.business[0]
                : undefined
            }
            shouldShowBrandDiscontinued
            shouldShowNearbyPlaces
          />
        ))}
      </Grid>
    </>
  );
};

export default ProductsWithTypes;
