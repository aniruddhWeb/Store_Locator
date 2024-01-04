import React, { useEffect, useState } from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import {
  SearchType,
  useSearch,
  useSearchStatic,
} from '../../services/searchHeavy';
import { Business, BusinessDeals, Product } from '../../generated/graphql';
import { ProductCard } from '../../components/product/ProductCard/ProductCard';
import { SearchInput } from '../../components/common/SearchInput/SearchInput';
import { Loader } from '../../components/common/Loader/Loader';
import { Grid } from '../../components/common/Grid/Grid';
import { ProductTypeFilterSide } from '../../components/product/ProductTypeFilter/ProductTypeFilterSide';
import { NarrowGrid } from '../../components/common/NarrowGrid/NarrowGrid';
import { DealCard } from '../../components/deal/DealCard/DealCard';
import { BusinessCard } from '../../components/business/BusinessCard/BusinessCard';
import { ProductSearchSuggestion } from '../../components/product/ProductSearchSuggestion/ProductSearchSuggestion';
import { Empty } from '../../components/common/Empty/Empty';
import { getImageLink } from '../../utils/image';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      searchHeavy: await useSearchStatic(context),
    },
  };
}

const Search = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const [selectedTab, setSelectedTab] = useState<SearchType>(
    SearchType.Products,
  );

  const {
    query,
    products,
    businesses,
    isLoading,
    deals,
    isCountLoading,
    isProductLoading,
    isDealLoading,
    isBusinessLoading,
    handleKeyPress,
    onQueryChange,
    isPaginating,
    selectedFilters,
    setSelectedFilters,
    resetAll,
    sorting,
    setSorting,
    productTypes,
    sortingOptions,
    productCount,
    businessCount,
    dealCount,
  } = useSearch({
    ...props.searchHeavy,
    type: selectedTab,
  });

  useEffect(() => {
    if (!isLoading && !isCountLoading) {
      switch (selectedTab) {
        case SearchType.Businesses:
          if (businessCount <= 0) {
            setSelectedTab(SearchType.Products);
          }
          break;
        case SearchType.Deals:
          if (dealCount <= 0) {
            setSelectedTab(SearchType.Products);
          }
          break;
        default:
          break;
      }
    }
  }, [
    isLoading,
    isCountLoading,
    selectedTab,
    businessCount,
    productCount,
    dealCount,
  ]);

  return (
    <>
      <h1 className="displayNone">Search Results</h1>
      <NextSeo
        title={`Search: ${query} | Leafythings`}
        description="Easily find recreational & medicinal marijuana dispensaries, brands, and products near you. Search now for fast, legal access."
        openGraph={{
          images: [
            { url: getImageLink(null, undefined, undefined, true, true) },
          ],
          title: `Search: ${query} | Leafythings`,
          description:
            'Easily find recreational & medicinal marijuana dispensaries, brands, and products near you. Search now for fast, legal access.',
        }}
        noindex
      />
      <SearchInput
        value={query}
        onChange={onQueryChange}
        onKeyPress={handleKeyPress}
        tabs={[
          {
            label: 'Products',
            type: SearchType.Products,
            count: isProductLoading ? 0 : productCount,
            ignore: isProductLoading || (products || []).length > 0,
          },
          {
            label: 'Businesses',
            type: SearchType.Businesses,
            count: isBusinessLoading ? 0 : businessCount,
            ignore: isBusinessLoading || (businesses || []).length > 0,
          },
          {
            label: 'Deals',
            type: SearchType.Deals,
            count: isDealLoading ? 0 : dealCount,
            ignore: isDealLoading || (deals || []).length > 0,
          },
        ].filter(item => (item.ignore ? true : item.count > 0))}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        showLocationFilter
        isSearching={isLoading}
      />
      {!isLoading &&
      !isCountLoading &&
      productCount === 0 &&
      (products || []).length === 0 &&
      businessCount === 0 &&
      (businesses || []).length === 0 &&
      dealCount === 0 &&
      (deals || []).length === 0 ? (
        <Empty text="No results found" />
      ) : (
        <>
          {selectedTab === SearchType.Products ? (
            <>
              <ProductSearchSuggestion
                productTypes={productTypes}
                query={query}
              />
              <div className="flexHorizontalContainer">
                <ProductTypeFilterSide
                  isLoading={
                    isProductLoading &&
                    products.length === 0 &&
                    selectedFilters.length === 0
                  }
                  productTypes={productTypes}
                  selectedProductTypes={selectedFilters}
                  onSelectProductType={setSelectedFilters}
                  sortingOptions={sortingOptions}
                  onSelectSorting={setSorting}
                  selectedSorting={sorting}
                  resetAll={resetAll}
                  ignoreAvailable={false}
                />
                <NarrowGrid
                  showOnEmpty
                  emptyView={isProductLoading ? null : undefined}
                  header={isProductLoading ? <Loader size={40} /> : null}
                  isLoading={isProductLoading || isPaginating}>
                  {products.map((product: Product) => (
                    <ProductCard
                      key={`product-${product.prdProductID}`}
                      product={product}
                      scroll
                      gridMode
                      business={
                        (product?.business || []).length > 0
                          ? product.business[0]
                          : undefined
                      }
                      sendGTMAction="search_bar_clicks"
                    />
                  ))}
                </NarrowGrid>
              </div>
            </>
          ) : selectedTab === SearchType.Businesses ? (
            <Grid
              showOnEmpty
              topMargin={businesses.length === 0}
              emptyView={isBusinessLoading ? null : undefined}
              header={isBusinessLoading ? <Loader size={40} /> : null}
              isLoading={isBusinessLoading || isPaginating}>
              {businesses.map((business: Business) => (
                <BusinessCard
                  key={`business-brand-${business.bizBusinessID}`}
                  business={business}
                  showLocation
                  showClaim
                  gridMode
                  sendGTMAction="search_results_businesses_clicks"
                />
              ))}
            </Grid>
          ) : (
            <Grid
              showOnEmpty
              topMargin={deals.length === 0}
              emptyView={isDealLoading ? null : undefined}
              header={isDealLoading ? <Loader size={40} /> : null}
              isLoading={isDealLoading || isPaginating}>
              {deals.map((deal: BusinessDeals) => (
                <DealCard
                  key={`deal-${deal.dlsDealsID}`}
                  businessDeal={deal}
                  variant="column"
                  gridMode
                  sendGTMAction="search_results_deals_clicks"
                />
              ))}
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default Search;
