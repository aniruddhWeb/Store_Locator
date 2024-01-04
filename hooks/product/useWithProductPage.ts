import { useCallback, useMemo, useRef } from 'react';
import { useMediaQueries } from '@react-hook/media-query';
import { useRouter } from 'next/router';
import { Business, Product } from '../../generated/graphql';
import { getCleanUrl } from '../../utils/link';
import { Route } from '../../config/Routes';
import { getValidPricesCountForProducts } from '../../utils/product';

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const useWithProductPage = (
  businessData: any,
  productData: any,
  setNextProductLimit: any,
  sponsoredProducts?: any[],
) => {
  const router = useRouter();
  const businessProducts = useMemo(
    () =>
      (businessData?.products || []).filter(
        (product: Product) =>
          product.prdProductID !== productData?.prdProductID,
      ),
    [businessData?.products],
  );

  const businessItemMaxPriceCount = useMemo(
    () => getValidPricesCountForProducts(businessProducts),
    [businessProducts],
  );

  const onProductCarouselScrollEnd = useCallback(() => {
    setNextProductLimit((businessProducts || []).length + 12);
  }, [(businessProducts || []).length, setNextProductLimit]);

  const productBusinesses = useMemo(
    () =>
      (productData?.business || []).filter(
        (business: Business) =>
          business.bizBusinessID !== businessData?.bizBusinessID,
      ),
    [businessData?.bizBusinessID, productData?.business],
  );

  const productNonBrandMapBusinesses = useMemo(
    () =>
      (productData?.business || []).filter(
        (business: Business) =>
          business?.plType === BusinessType.MailOrderType ||
          (!!business?.contact?.bizLongitude &&
            !!business?.contact?.bizLatitude),
      ),
    [businessData?.bizBusinessID, productData?.business],
  );

  const onSeeAlsoAvailable = useMemo(
    () => `${getCleanUrl(router.asPath)}${Route.AlsoAvailableAt}`,
    [router.asPath],
  );

  const onSeeAllReviews = useMemo(
    () => `${getCleanUrl(router.asPath)}${Route.Reviews}`,
    [router.asPath],
  );

  const navItems = useMemo(() => {
    const items = [];
    if (productData?.prdDescription) {
      items.push({ name: 'Description' });
    }
    if (
      businessData?.plType === BusinessType.BrandType &&
      (sponsoredProducts || []).length > 0
    ) {
      items.push({
        name: 'Sponsored Resellers',
      });
    }
    if (
      (businessData?.plType === BusinessType.BrandType &&
        (productData?.businessProductReseller || []).length > 0) ||
      (productNonBrandMapBusinesses || []).length
    ) {
      items.push({
        name: 'Where to Buy This Product',
      });
    }
    items.push({ name: 'Reviews' });
    if (
      (productNonBrandMapBusinesses || []).length === 0 &&
      (productBusinesses || []).length > 0
    ) {
      items.push({ name: 'Also Available At' });
    }
    if ((businessProducts || []).length > 0) {
      items.push({ name: `More by ${businessData.bizName}` });
    }
    return items;
  }, [
    productData,
    businessData,
    productBusinesses,
    businessProducts,
    sponsoredProducts,
  ]);

  const greenContainerRef = useRef<HTMLDivElement | null | undefined>();
  const { matches } = useMediaQueries({
    isTablet: 'only screen and (max-width: 860px)',
    isMobile: 'only screen and (max-width: 560px)',
  });

  return {
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
  };
};
