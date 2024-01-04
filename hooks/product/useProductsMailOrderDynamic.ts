import { useCallback, useEffect, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {
  StrainNameByRegionByTypeDocument,
  StrainNameByRegionByTypeQuery,
  StrainNameByRegionByTypeQueryVariables,
  BrandBusinessByProductTypeDocument,
  BrandBusinessByProductTypeQuery,
  BrandBusinessByProductTypeQueryVariables,
  ProductAllByTypeMailOrderDocument,
  ProductAllByTypeMailOrderQuery,
  ProductAllByTypeMailOrderQueryVariables,
} from '../../generated/graphql';
import { useProductSorting } from './useProductSorting';
import { useProductFilter } from './useProductFilter';
import { apolloClient } from '../../api/client';
import { useProductTypes } from './useProductTypes';
import { useCurrentLocationDynamic } from '../../services/location';

export const useProductsMailOrderDynamic = () => {
  const [productsData, setProductsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isLoadingInternal = useRef<boolean>(true);
  const noMorePagination = useRef<boolean>(false);
  const allLimit = useRef<number>(productsData.length);
  const currentWorkingFilter = useRef<any>(null);

  const [strainNamesProp, setStrainNames] = useState<string[]>([]);
  const [brandNamesProp, setBrandNames] = useState<string[]>([]);

  const { productTypes: originProductTypes } = useProductTypes();
  const { selectedLocation } = useCurrentLocationDynamic();

  const {
    searchQuery,
    setSearchQuery,
    productTypes,
    setSelectedFilters,
    selectedFilters,
    productsFilter,
    productsFilterNoDebounce,
    resetAll,
    sortFilter,
    setSortFilter,
    strainNames,
    brandNames,
  } = useProductFilter(
    originProductTypes,
    undefined,
    undefined,
    undefined,
    true,
    true,
    true,
    strainNamesProp,
    brandNamesProp,
  );

  const { sorting, setSorting, sortingOptions } = useProductSorting(
    sortFilter,
    setSortFilter,
    true,
    productsFilter,
  );

  const getProducts = useCallback(
    async (
      variablesParam: ProductAllByTypeMailOrderQueryVariables,
      compareVariables: any,
    ) => {
      const { data } = await apolloClient.query<
        ProductAllByTypeMailOrderQuery,
        ProductAllByTypeMailOrderQueryVariables
      >({
        query: ProductAllByTypeMailOrderDocument,
        fetchPolicy: 'no-cache',
        variables: variablesParam,
      });
      if (isEqual(currentWorkingFilter.current, compareVariables)) {
        noMorePagination.current =
          (data?.productAllByTypeBrandLinkMailOrder || []).length <
          allLimit.current;
        setProductsData(data?.productAllByTypeBrandLinkMailOrder || []);
        setIsLoading(false);
        isLoadingInternal.current = false;
      }
      apolloClient
        .query<
          StrainNameByRegionByTypeQuery,
          StrainNameByRegionByTypeQueryVariables
        >({
          query: StrainNameByRegionByTypeDocument,
          fetchPolicy: 'no-cache',
          variables: {
            ...(variablesParam as any),
            prdProductCategories: variablesParam?.prdProductCategories || [],
          },
        })
        .then(({ data: dataStrainNames }) => {
          setStrainNames(
            (dataStrainNames?.strainNameByRegionByType || []) as string[],
          );
        });
      let brandProductCategories = (variablesParam?.prdProductCategories ||
        []) as string[];
      const brandCategoryIndex = brandProductCategories.findIndex(
        (subItem: string) => subItem === 'Brand',
      );
      if (brandCategoryIndex > -1) {
        brandProductCategories = brandProductCategories.filter(
          (item: string, index: number) =>
            index !== brandCategoryIndex && index - 1 !== brandCategoryIndex,
        );
      }
      apolloClient
        .query<
          BrandBusinessByProductTypeQuery,
          BrandBusinessByProductTypeQueryVariables
        >({
          query: BrandBusinessByProductTypeDocument,
          fetchPolicy: 'no-cache',
          variables: {
            ...(variablesParam as any),
            prdProductCategories: brandProductCategories || [],
          },
        })
        .then(({ data: dataBrandNames }) => {
          setBrandNames(
            (dataBrandNames?.brandBusinessByProductType || []) as string[],
          );
        });
    },
    [],
  );

  const getAllProducts = useCallback(() => {
    if (
      productsFilter.prdProductType &&
      productsFilter.prdProductType.length > 0
    ) {
      currentWorkingFilter.current = productsFilter;
      setIsLoading(true);
      isLoadingInternal.current = true;
      allLimit.current = 12;
      getProducts(
        {
          ...productsFilter,
          limit: allLimit.current,
          offset: 0,
          plRegionID: selectedLocation?.plRegionID,
        },
        productsFilter,
      );
    }
  }, [JSON.stringify(productsFilter), selectedLocation?.plRegionID]);

  const getMoreProducts = useCallback(() => {
    if (
      !noMorePagination.current &&
      currentWorkingFilter.current &&
      currentWorkingFilter.current.prdProductType &&
      currentWorkingFilter.current.prdProductType.length > 0
    ) {
      setIsLoading(true);
      isLoadingInternal.current = true;
      allLimit.current += 12;
      getProducts(
        {
          ...currentWorkingFilter.current,
          limit: allLimit.current,
          offset: 0,
          plRegionID: selectedLocation?.plRegionID,
        },
        currentWorkingFilter.current,
      );
    } else {
      setIsLoading(false);
      isLoadingInternal.current = false;
    }
  }, [JSON.stringify(productsFilter), selectedLocation?.plRegionID]);

  useDeepCompareEffect(() => {
    setIsLoading(true);
    setProductsData([]);
    allLimit.current = 0;
    noMorePagination.current = false;
    isLoadingInternal.current = true;
  }, [productsFilterNoDebounce]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return {
    isLoading,
    products: productsData,
    sorting,
    setSorting,
    sortingOptions,
    productTypes,
    setSelectedFilters,
    selectedFilters,
    resetAll,
    searchQuery,
    setSearchQuery,
    getMoreProducts,
    strainNames,
    brandNames,
  };
};
