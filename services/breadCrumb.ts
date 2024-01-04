import { GetServerSidePropsContext } from 'next';
import absoluteUrl from 'next-absolute-url';
import { transformCapitalWords, transformTitle } from '../utils/string';
import { checkIfRegion, regionNameBySlug } from '../utils/region';
import {
  isCategoryWord,
  isServiceWord,
  isSubPageWord,
  isServiceOrCategoryWord,
  getCleanUrl,
} from '../utils/link';
import { Route } from '../config/Routes';
import { getApolloClient } from '../api/client';
import {
  BlogNameBySlugDocument,
  BlogNameBySlugQuery,
  BlogNameBySlugQueryVariables,
  BusinessNameBySlugDocument,
  BusinessNameBySlugQuery,
  BusinessNameBySlugQueryVariables,
  DealNameBySlugDocument,
  DealNameBySlugQuery,
  DealNameBySlugQueryVariables,
  ProductNameBySlugDocument,
  ProductNameBySlugQuery,
  ProductNameBySlugQueryVariables,
  ProductTypeNameBySlugDocument,
  ProductTypeNameBySlugQuery,
  ProductTypeNameBySlugQueryVariables,
  RegionNameBySlugDocument,
  RegionNameBySlugQuery,
  RegionNameBySlugQueryVariables,
} from '../generated/graphql';
import {
  getMetaTagsByTemplate,
  getMetaTagsForCategory,
  getMetaTagsForProductCategory,
  getProductCanonicalLink,
  getSEOBreadcrumb,
  getSEOBusiness,
  getSEOPath,
  getSEOProduct,
} from './seo';
import { getImageLink } from '../utils/image';
import { useCurrentLocationStatic } from './location';

export type BreadCrumbType = {
  breadcrumb: string;
  href: string;
  clickable: boolean;
};

const getCurrentPath = (breadCrumbs: BreadCrumbType[], region: any) => {
  if (breadCrumbs.length > 0) {
    const paths = breadCrumbs.map(item => item.breadcrumb);
    const reversedPaths = paths.reverse();
    const lastPathIndex = reversedPaths.findIndex(item => {
      return (
        item !== 'Home' &&
        !checkIfRegion(item) &&
        (region
          ? item.toLowerCase() !== region.plName.toLowerCase() &&
            item.toLowerCase() !== region.plSlug.toLowerCase() &&
            item.toLowerCase() !== region.province.plName.toLowerCase() &&
            item.toLowerCase() !== region.province.plInitials.toLowerCase()
          : true)
      );
    });
    if (lastPathIndex > -1) {
      let lastPath = reversedPaths[lastPathIndex];
      if (
        lastPathIndex + 1 <= reversedPaths.length - 1 &&
        isServiceOrCategoryWord(reversedPaths[lastPathIndex + 1])
      ) {
        if (isServiceWord(reversedPaths[lastPathIndex + 1])) {
          lastPath = `${reversedPaths[lastPathIndex + 1]} ${transformTitle(
            lastPath,
            true,
          )}`;
        } else {
          lastPath = `${lastPath} ${transformTitle(
            reversedPaths[lastPathIndex + 1],
            true,
          )}`;
        }
      }
      if (
        lastPathIndex - 1 >= 0 &&
        isServiceOrCategoryWord(reversedPaths[lastPathIndex - 1])
      ) {
        if (isServiceWord(reversedPaths[lastPathIndex - 1])) {
          lastPath = `${reversedPaths[lastPathIndex - 1]} ${transformTitle(
            lastPath,
            true,
          )} `;
        } else {
          lastPath = `${lastPath} ${transformTitle(
            reversedPaths[lastPathIndex - 1],
            true,
          )}`;
        }
      }
      return transformCapitalWords(transformTitle(lastPath));
    }
  }
  return '';
};

const getBreadCrumbsAndSEO = async (
  context: GetServerSidePropsContext,
  urlParts: string[],
  originUrl: string,
  cleanUrl: string,
) => {
  let province: any;
  let region: any;
  let business: any;
  let product: any;
  let deal: any;
  let blog: any;
  let productType: any;
  let productTypeSlug: any;
  let lastProductType: any;
  let productCategory: any;
  let breadCrumbs: BreadCrumbType[] = [];
  const categoryUrlPart = urlParts.find(item => isCategoryWord(item));
  const categoryUrlPartIndex = urlParts.findIndex(item => isCategoryWord(item));

  // eslint-disable-next-line no-restricted-syntax
  for await (const urlPartIndex of urlParts.keys()) {
    const urlPart: string = urlParts[urlPartIndex];
    if (!urlPart) {
      breadCrumbs.push({
        breadcrumb: 'Home',
        href: Route.Root,
        clickable: urlPartIndex !== urlParts.length - 1,
      });
      // eslint-disable-next-line no-continue
      continue;
    }
    if (!!business && isSubPageWord(urlPart)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (
      urlPart &&
      categoryUrlPart === 'products' &&
      categoryUrlPartIndex === 1
    ) {
      const { data: productTypeNameData } = await getApolloClient(
        context,
      ).query<ProductTypeNameBySlugQuery, ProductTypeNameBySlugQueryVariables>({
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
        query: ProductTypeNameBySlugDocument,
        variables: {
          prdTypeSlug: urlPart,
        },
      });
      if (productType && productTypeSlug) {
        productCategory = productTypeNameData?.productTypeBySlug || null;
        if (productCategory) {
          breadCrumbs = breadCrumbs.filter(
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            item =>
              item.href !== Route.Products &&
              item.href !== `${Route.Products}/${productTypeSlug}${Route.All}`,
          );
          breadCrumbs.push({
            breadcrumb: productCategory,
            href: urlParts.slice(0, urlPartIndex + 1).join('/'),
            clickable: urlPartIndex !== urlParts.length - 1,
          });
          // eslint-disable-next-line no-continue
          continue;
        }
      } else {
        productType = productTypeNameData?.productTypeBySlug || null;
        if (productType) {
          productTypeSlug = urlPart;
          breadCrumbs = breadCrumbs.filter(
            item => item.href !== Route.Products,
          );
          breadCrumbs.push({
            breadcrumb: productType,
            href: urlParts.slice(0, urlPartIndex + 1).join('/'),
            clickable: urlPartIndex !== urlParts.length - 1,
          });
          // eslint-disable-next-line no-continue
          continue;
        }
      }
    }
    if (isServiceOrCategoryWord(urlPart)) {
      breadCrumbs.push({
        breadcrumb: transformCapitalWords(transformTitle(urlPart, true)),
        href: urlParts.slice(0, urlPartIndex + 1).join('/'),
        clickable: urlPartIndex !== urlParts.length - 1,
      });
      // eslint-disable-next-line no-continue
      continue;
    }
    if (checkIfRegion(urlPart)) {
      province = regionNameBySlug(urlPart);
      breadCrumbs.push({
        breadcrumb: urlPart.toUpperCase(),
        href: urlParts.slice(0, urlPartIndex + 1).join('/'),
        clickable: urlPartIndex !== urlParts.length - 1,
      });
      // eslint-disable-next-line no-continue
      continue;
    }
    if (region === undefined && urlPart) {
      const { data: regionData } = await getApolloClient(context).query<
        RegionNameBySlugQuery,
        RegionNameBySlugQueryVariables
      >({
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
        query: RegionNameBySlugDocument,
        variables: {
          regionSlug: urlPart,
        },
      });
      region =
        regionData?.locationSearchRegion &&
        regionData?.locationSearchRegion.length > 0
          ? regionData.locationSearchRegion.find(
              item => item.plSlug?.toLowerCase() === urlPart?.toLowerCase(),
            ) || null
          : null;
      if (region) {
        breadCrumbs.push({
          breadcrumb: region.plName,
          href: urlParts.slice(0, urlPartIndex + 1).join('/'),
          clickable: urlPartIndex !== urlParts.length - 1,
        });
        // eslint-disable-next-line no-continue
        continue;
      }
    }
    if (
      !blog &&
      business === undefined &&
      (!!region ||
        categoryUrlPart === 'brands' ||
        categoryUrlPart === 'mail-order-marijuana')
    ) {
      if (categoryUrlPart && urlPart) {
        const { data: businessData } = await getApolloClient(context).query<
          BusinessNameBySlugQuery,
          BusinessNameBySlugQueryVariables
        >({
          fetchPolicy: 'cache-first',
          errorPolicy: 'all',
          query: BusinessNameBySlugDocument,
          variables: {
            bizSlug: urlPart,
            plSlugType: categoryUrlPart,
            regionSlug: region?.plSlug || null,
          },
        });
        business = businessData?.businessBySlug || null;
        if (business) {
          breadCrumbs.push({
            breadcrumb: business.bizName,
            href: urlParts.slice(0, urlPartIndex + 1).join('/'),
            clickable:
              urlPartIndex !== urlParts.length - 1 ||
              (urlPartIndex + 1 === urlParts.length - 1 &&
                isSubPageWord(urlParts[urlPartIndex + 1])),
          });
          // eslint-disable-next-line no-continue
          continue;
        }
      }
    }
    if (!business && blog === undefined && categoryUrlPart === 'blog') {
      if (categoryUrlPart && urlPart) {
        const { data: blogData } = await getApolloClient(context).query<
          BlogNameBySlugQuery,
          BlogNameBySlugQueryVariables
        >({
          fetchPolicy: 'cache-first',
          errorPolicy: 'all',
          query: BlogNameBySlugDocument,
          variables: {
            blgSlug: urlPart,
          },
        });
        blog = blogData?.blogBySlug || null;
        if (blog) {
          breadCrumbs.push({
            breadcrumb: blog.blgTitle,
            href: urlParts.slice(0, urlPartIndex + 1).join('/'),
            clickable: urlPartIndex !== urlParts.length - 1,
          });
          // eslint-disable-next-line no-continue
          continue;
        }
      }
    }
    if (!product && deal === undefined && !!business) {
      if (categoryUrlPart && business.bizSlug && urlPart) {
        const { data: dealData } = await getApolloClient(context).query<
          DealNameBySlugQuery,
          DealNameBySlugQueryVariables
        >({
          fetchPolicy: 'cache-first',
          errorPolicy: 'all',
          query: DealNameBySlugDocument,
          variables: {
            bizSlug: business.bizSlug,
            dlsSlug: urlPart,
          },
        });
        deal = dealData?.dealBySlug || null;
        if (deal) {
          breadCrumbs.push({
            breadcrumb: deal.dlsName,
            href: urlParts.slice(0, urlPartIndex + 1).join('/'),
            clickable: urlPartIndex !== urlParts.length - 1,
          });
          // eslint-disable-next-line no-continue
          continue;
        }
      }
    }
    if (!deal && product === undefined && !!business) {
      if (categoryUrlPart && business.bizSlug && urlPart) {
        const { data: productData } = await getApolloClient(context).query<
          ProductNameBySlugQuery,
          ProductNameBySlugQueryVariables
        >({
          fetchPolicy: 'cache-first',
          errorPolicy: 'all',
          query: ProductNameBySlugDocument,
          variables: {
            bizSlug: business.bizSlug,
            prdSlug: urlPart,
            plSlugType: categoryUrlPart,
            regionSlug: region?.plSlug || null,
          },
        });
        product =
          productData?.productBySlug && productData?.productBySlug.length > 0
            ? productData.productBySlug[0]
            : null;
        if (product) {
          breadCrumbs.push({
            breadcrumb: product.prdName,
            href: urlParts.slice(0, urlPartIndex + 1).join('/'),
            clickable:
              urlPartIndex !== urlParts.length - 1 ||
              (urlPartIndex + 1 === urlParts.length - 1 &&
                isSubPageWord(urlParts[urlPartIndex + 1])),
          });
        }
      }
    }
  }

  const { selectedLocation } = await useCurrentLocationStatic(context);

  // SEO
  let canonical = getProductCanonicalLink(product);
  if (!canonical) {
    canonical = cleanUrl;
  }
  const seoBusiness = getSEOBusiness(business);
  const seoProduct = getSEOProduct(product);
  const seoBreadcrumb = getSEOBreadcrumb(originUrl, breadCrumbs);

  let metaTags;

  if (productType && productTypeSlug) {
    if (context?.query?.filters && Array.isArray(context?.query?.filters)) {
      const firstItem = context?.query?.filters[0];
      const categorySplits = firstItem.split(',');
      lastProductType = categorySplits[categorySplits.length - 1];
    } else if (context?.query?.filters) {
      const categorySplits = (context?.query?.filters as string).split(',');
      lastProductType = categorySplits[categorySplits.length - 1];
    }
    metaTags = await getMetaTagsForProductCategory(
      context,
      (urlParts || []).includes('products'),
      productType,
      lastProductType,
    );
  }
  if (!metaTags) {
    if (cleanUrl.trim() !== Route.TorontoLanding.trim()) {
      metaTags = await getMetaTagsForCategory(
        context,
        (urlParts || []).length >= 2 && (urlParts || []).length <= 4,
        categoryUrlPart === 'weed-delivery'
          ? 'Weed Delivery'
          : categoryUrlPart === 'marijuana-dispensary'
          ? 'Marijuana Dispensary'
          : categoryUrlPart === 'mail-order-marijuana'
          ? 'Mail Order'
          : categoryUrlPart === 'brands'
          ? 'Brand'
          : null,
        region,
        province,
      );
    }
  }
  if (!metaTags) {
    const metaTagsWithoutDescriptions = getMetaTagsByTemplate(
      urlParts,
      province,
      region,
      selectedLocation as any,
      business,
      product,
      deal,
    );
    metaTags = {
      ...metaTagsWithoutDescriptions,
      customDescription1: null,
      customDescription2: null,
    };
  }
  metaTags = {
    ...(metaTags || {}),
    customImages: [
      {
        url: getImageLink(null, undefined, undefined, true, true),
      },
    ],
  };
  if (business?.bizName) {
    metaTags = {
      ...metaTags,
      customImages: [
        {
          url: getImageLink(
            business?.mdaLocalFileName,
            undefined,
            undefined,
            true,
            true,
          ),
        },
      ],
    };
  }
  if (product?.prdName) {
    metaTags = {
      ...metaTags,
      customImages: [
        {
          url: getImageLink(
            product?.mdaLocalFileName,
            undefined,
            undefined,
            true,
            true,
          ),
        },
      ],
    };
  }
  if (deal?.dlsName) {
    metaTags = {
      ...metaTags,
      customImages: [
        {
          url: getImageLink(
            deal?.mdaLocalFileName,
            undefined,
            undefined,
            true,
            true,
          ),
        },
      ],
    };
  }
  if (blog?.blgTitle) {
    metaTags = {
      ...metaTags,
      customImages: [
        {
          url: getImageLink(
            blog?.mdaLocalFileName,
            undefined,
            undefined,
            true,
            true,
          ),
        },
      ],
    };
  }

  return {
    breadCrumbs,
    province: province || null,
    region: region || null,
    selectedLocation: selectedLocation || null,
    product: product || null,
    business: business || null,
    deal: deal || null,
    blog: blog || null,
    productType: productType || null,
    lastProductType: lastProductType || null,
    productCategory: productCategory || null,
    // SEO
    canonical: canonical || null,
    seoBusiness: seoBusiness || null,
    seoProduct: seoProduct || null,
    seoBreadcrumb: seoBreadcrumb || null,
    metaTags: metaTags || null,
    categoryUrlPart: categoryUrlPart || null,
  };
};

export const useBreadCrumbStatic = async (
  context: GetServerSidePropsContext,
) => {
  const { origin: originUrl } = absoluteUrl(context.req);
  const cleanUrl = getCleanUrl(context.resolvedUrl);
  const urlParts: string[] = cleanUrl.split('/');

  const {
    breadCrumbs,
    province,
    region,
    product,
    business,
    deal,
    canonical,
    seoBreadcrumb,
    seoBusiness,
    seoProduct,
    metaTags,
    productType,
    productCategory,
    selectedLocation,
  } = await getBreadCrumbsAndSEO(context, urlParts, originUrl, cleanUrl);

  const canonicalLink = product
    ? canonical
      ? `${originUrl}${canonical}`
      : ''
    : `${originUrl}${canonical || ''}`;

  const noIndex = product
    ? `${originUrl}${getCleanUrl(context.resolvedUrl)}` !== canonicalLink
    : false;

  const currentPath =
    metaTags?.customTitle ||
    getSEOPath(
      getCurrentPath(breadCrumbs, region),
      province,
      region,
      selectedLocation as any,
      productType,
      productCategory,
    );

  const currentSub = '';

  const currentTitle = metaTags?.metaTitle || currentPath;

  return {
    breadCrumbs,
    currentPath,
    currentSub,
    currentTitle,
    canonicalLink,
    noIndex,
    seoBreadcrumb,
    seoBusiness,
    seoProduct,
    metaTags,
    province,
    region: region || null,
    business: business || null,
    product: product || null,
    deal: deal || null,
  };
};

export const useBreadCrumbDynamic = (props: any) => {
  // if additional logics required
  return {
    breadCrumbs: props.breadCrumbs as BreadCrumbType[],
    currentPath: props.currentPath as string,
    currentSub: props.currentSub as string,
    currentTitle: props.currentTitle as string,
    canonicalLink: props.canonicalLink as string,
    noIndex: !!props.noIndex as boolean,
    seoBusiness: props.seoBusiness as any,
    seoProduct: props.seoProduct as any,
    seoBreadcrumb: props.seoBreadcrumb as any,
    metaTags: props.metaTags as any,
  };
};
