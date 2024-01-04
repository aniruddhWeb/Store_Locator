import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { getValidPricesCountForProducts } from '../../utils/product';
import { checkIfRegion } from '../../utils/region';
import { getCleanUrl } from '../../utils/link';
import { Route } from '../../config/Routes';

export const useWithBusinessPage = (
  businessData: Record<string, any>,
  setNextProductLimit: (limit: number) => void,
  setNextResellersLimit: (limit: number) => void,
  setNextBrandsLimit: (limit: number) => void,
  BusinessType: { [key: string]: string },
) => {
  const businessProducts = useMemo(
    () => businessData?.products || [],
    [businessData?.products],
  );

  const businessResellers = useMemo(
    () => businessData?.resellers || [],
    [businessData?.resellers],
  );

  const businessBrands = useMemo(
    () => businessData?.brands || [],
    [businessData?.brands],
  );

  const router = useRouter();

  const businessItemMaxPriceCount = useMemo(
    () => getValidPricesCountForProducts(businessProducts),
    [businessProducts],
  );

  const onProductCarouselScrollEnd = useCallback(() => {
    setNextProductLimit((businessProducts || []).length + 12);
  }, [(businessProducts || []).length, setNextProductLimit]);

  const onResellersCarouselScrollEnd = useCallback(() => {
    setNextResellersLimit((businessResellers || []).length + 12);
  }, [(businessResellers || []).length, setNextResellersLimit]);

  const onBrandsCarouselScrollEnd = useCallback(() => {
    setNextBrandsLimit((businessBrands || []).length + 12);
  }, [(businessBrands || []).length, setNextBrandsLimit]);

  const isRegionPage = useMemo(
    () =>
      checkIfRegion(
        (router.query?.business || router.query?.province) as string,
      ),
    [router.query],
  );
  const onSeeAllProducts = useMemo(
    () =>
      router.asPath.replace(
        getCleanUrl(router.asPath),
        `${getCleanUrl(router.asPath)}${Route.Products}`,
      ),
    [router.asPath],
  );

  const onSeeAllDeals = useMemo(
    () => `${getCleanUrl(router.asPath)}${Route.Deals}`,
    [router.asPath],
  );

  const onSeeAllReviews = useMemo(
    () => `${getCleanUrl(router.asPath)}${Route.Reviews}`,
    [router.asPath],
  );

  const onSeeAllCertifiedResellers = useMemo(
    () =>
      businessData?.plType === BusinessType.BrandType
        ? `${getCleanUrl(router.asPath)}${Route.WhereToBuy}`
        : `${getCleanUrl(router.asPath)}${Route.CertifiedResellers}`,
    [router.asPath, businessData?.plType],
  );

  const navItems = useMemo(() => {
    const items = [];
    if (
      !businessData?.bizClaim &&
      !businessData?.bizClaimUnblurred &&
      (businessData?.deals || []).length > 0
    ) {
      items.push({ name: 'Deals' });
    }
    items.push({ name: 'Products' });
    if (
      (
        (businessData?.plType === BusinessType.BrandType
          ? businessData?.resellers
          : businessData?.brands) || []
      ).length > 0
    ) {
      items.push({
        name:
          businessData?.plType === BusinessType.BrandType
            ? 'Where to Buy Our Products'
            : 'Certified Reseller',
      });
    }
    if (!businessData?.bizClaim && !businessData?.bizClaimUnblurred) {
      items.push({ name: 'Reviews' });
    }
    items.push({ name: 'About' });
    return items;
  }, [businessData]);

  return {
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
  };
};
