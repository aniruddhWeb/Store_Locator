import type { GetServerSidePropsContext } from 'next';
import { getApolloClient } from '../api/client';
import {
  Business,
  BusinessDeals,
  BusinessInterlinkingDocument,
  BusinessInterlinkingQuery,
  BusinessInterlinkingQueryVariables,
  LocationAllListProvinceForUserDocument,
  LocationAllListProvinceForUserQuery,
  LocationAllListProvinceForUserQueryVariables,
  LocationItemFragment,
  MetaTagsProductCategoryDocument,
  MetaTagsProductCategoryQuery,
  MetaTagsProductCategoryQueryVariables,
  MetaTagsProvinceDocument,
  MetaTagsProvinceQuery,
  MetaTagsProvinceQueryVariables,
  MetaTagsRegionDocument,
  MetaTagsRegionQuery,
  MetaTagsRegionQueryVariables,
  Product,
  Region,
} from '../generated/graphql';
import { useCurrentLocationStatic } from './location';
import {
  escapeHtml,
  formatHTML,
  transformBusinessTypeToSlug,
  transformCapitalWords,
} from '../utils/string';
import { IMAGE_BASE_URL, IMAGE_PLACEHOLDER } from '../config/Constants';
import { getProductMinPrice } from '../utils/product';
import { BreadCrumbType } from './breadCrumb';
import { checkIfRegion } from '../utils/region';

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const getSEOPath = (
  title: string,
  province?: string,
  region?: Region,
  selectedLocation?: Region,
  productType?: string,
  productCategory?: string,
) => {
  if (productType && productCategory) {
    return `${productType} ${productCategory} Products`;
  }
  if (productType) {
    return `${productType} Products`;
  }
  switch (title.toLowerCase()) {
    case 'verified': {
      if (province) {
        return `Verified Businesses in ${province}`;
      }
      return 'Verified Businesses';
    }
    case 'featured': {
      if (province) {
        return `Featured Businesses in ${province}`;
      }
      return 'Featured Businesses';
    }
    case 'all': {
      if (province) {
        return `All Businesses in ${province}`;
      }
      return 'All Businesses';
    }
    case 'brands': {
      if (province) {
        return `Brands in ${province}`;
      }
      if (
        region?.province?.country?.plCountryName ||
        selectedLocation?.province?.country?.plCountryName
      ) {
        return `Cannabis Brands ${
          region?.province?.country?.plCountryName ||
          selectedLocation?.province?.country?.plCountryName
        }`;
      }
      return 'Cannabis Brands';
    }
    case 'featured brands': {
      if (province) {
        return `Featured Brands in ${province}`;
      }
      if (
        region?.province?.country?.plCountryName ||
        selectedLocation?.province?.country?.plCountryName
      ) {
        return `Featured Cannabis Brands ${
          region?.province?.country?.plCountryName ||
          selectedLocation?.province?.country?.plCountryName
        }`;
      }
      return 'Featured Cannabis Brands';
    }
    case 'verified brands': {
      if (province) {
        return `Verified Brands in ${province}`;
      }
      if (
        region?.province?.country?.plCountryName ||
        selectedLocation?.province?.country?.plCountryName
      ) {
        return `Verified Cannabis Brands ${
          region?.province?.country?.plCountryName ||
          selectedLocation?.province?.country?.plCountryName
        }`;
      }
      return 'Verified Cannabis Brands';
    }
    case 'all brands': {
      if (province) {
        return `All Brands in ${province}`;
      }
      if (
        region?.province?.country?.plCountryName ||
        selectedLocation?.province?.country?.plCountryName
      ) {
        return `All Cannabis Brands ${
          region?.province?.country?.plCountryName ||
          selectedLocation?.province?.country?.plCountryName
        }`;
      }
      return 'All Cannabis Brands';
    }
    case 'mail order marijuana': {
      if (province) {
        return `Mail Order Marijuana in ${province}`;
      }
      if (
        region?.province?.country?.plCountryName ||
        selectedLocation?.province?.country?.plCountryName
      ) {
        return `Mail Order Marijuana ${
          region?.province?.country?.plCountryName ||
          selectedLocation?.province?.country?.plCountryName
        }`;
      }
      return 'Mail Order Marijuana';
    }
    case 'featured mail order marijuana': {
      if (province) {
        return `Featured Mail Order Marijuana in ${province}`;
      }
      if (
        region?.province?.country?.plCountryName ||
        selectedLocation?.province?.country?.plCountryName
      ) {
        return `Featured Mail Order Marijuana ${
          region?.province?.country?.plCountryName ||
          selectedLocation?.province?.country?.plCountryName
        }`;
      }
      return 'Featured Mail Order Marijuana';
    }
    case 'verified mail order marijuana': {
      if (province) {
        return `Verified Mail Order Marijuana in ${province}`;
      }
      if (
        region?.province?.country?.plCountryName ||
        selectedLocation?.province?.country?.plCountryName
      ) {
        return `Verified Mail Order Marijuana ${
          region?.province?.country?.plCountryName ||
          selectedLocation?.province?.country?.plCountryName
        }`;
      }
      return 'Verified Mail Order Marijuana';
    }
    case 'all mail order marijuana': {
      if (province) {
        return `All Mail Order Marijuana in ${province}`;
      }
      if (
        region?.province?.country?.plCountryName ||
        selectedLocation?.province?.country?.plCountryName
      ) {
        return `All Mail Order Marijuana ${
          region?.province?.country?.plCountryName ||
          selectedLocation?.province?.country?.plCountryName
        }`;
      }
      return 'All Mail Order Marijuana';
    }
    case 'weed delivery': {
      if (region) {
        return `Cannabis Delivery in ${region.plName}`;
      }
      if (province) {
        return `Cannabis Delivery in ${province}`;
      }
      return 'Cannabis Delivery';
    }
    case 'featured weed delivery': {
      if (region) {
        return `Featured Cannabis Delivery in ${region.plName}`;
      }
      if (province) {
        return `Featured Cannabis Delivery in ${province}`;
      }
      return 'Featured Cannabis Delivery';
    }
    case 'verified weed delivery': {
      if (region) {
        return `Verified Cannabis Delivery in ${region.plName}`;
      }
      if (province) {
        return `Verified Cannabis Delivery in ${province}`;
      }
      return 'Verified Cannabis Delivery';
    }
    case 'all weed delivery': {
      if (region) {
        return `All Cannabis Delivery in ${region.plName}`;
      }
      if (province) {
        return `All Cannabis Delivery in ${province}`;
      }
      return 'All Cannabis Delivery';
    }
    case 'marijuana dispensaries': {
      if (region) {
        return `Best Marijuana Dispensaries in ${region.plName}`;
      }
      if (province) {
        return `Best Marijuana Dispensaries in ${province}`;
      }
      return 'Best Marijuana Dispensaries';
    }
    case 'featured marijuana dispensaries': {
      if (region) {
        return `Featured Marijuana Dispensaries in ${region.plName}`;
      }
      if (province) {
        return `Featured Marijuana Dispensaries in ${province}`;
      }
      return 'Featured Marijuana Dispensaries';
    }
    case 'verified marijuana dispensaries': {
      if (region) {
        return `Verified Marijuana Dispensaries in ${region.plName}`;
      }
      if (province) {
        return `Verified Marijuana Dispensaries in ${province}`;
      }
      return 'Verified Marijuana Dispensaries';
    }
    case 'all marijuana dispensaries': {
      if (region) {
        return `All Marijuana Dispensaries in ${region.plName}`;
      }
      if (province) {
        return `All Marijuana Dispensaries in ${province}`;
      }
      return 'All Marijuana Dispensaries';
    }
    case 'deals near you':
    case 'deals':
      return 'Cannabis Deals Near You';
    default:
      return title;
  }
};

export const getMetaTagsByTemplate = (
  urlPartsOriginal: string[],
  province?: string | null,
  region?: Region | null,
  selectedLocation?: Region | null,
  business?: Business | null,
  product?: Product | null,
  deal?: BusinessDeals | null,
) => {
  if (product && business) {
    if (business.plType === BusinessType.MailOrderType) {
      return {
        customTitle: `${product.prdName} - Marijuana Mail Order`,
        metaTitle: `Purchase ${product.prdName} by Mail Order | Leafythings`,
        metaDescription: `Buy ${product.prdName} ᐈ Find the best mail order marijuana services near you at Leafythings ✔️ Hot Deals ✔️ Real Customer Reviews!`,
      };
    }
    return {
      customTitle: `${product.prdName}`,
      metaTitle: `${product.prdName} | ${business.bizName} | Leafythings`,
      metaDescription: `Purchase ${product.prdName} from ${business.bizName} ✔️ Read latest customer reviews about ${product.prdName} ⭐ Browse Leafythings to find out more!`,
    };
  }
  if (business) {
    if (business.bizClaim || business.bizClaimUnblurred) {
      if (business.plType === BusinessType.BrandType) {
        return {
          customTitle: province
            ? `${business.bizName} in ${province}`
            : `${business.bizName} Products & Reviews`,
          metaTitle: `${business.bizName} | Leafythings`,
          metaDescription: `Shop ${business.bizName} here. Cannabis products and services are available from ${business.bizName} here! Click here to shop now.`,
        };
      }
      if (business.plType === BusinessType.MailOrderType) {
        return {
          customTitle: `Marijuana Mail Order - ${business.bizName}`,
          metaTitle: `${business.bizName} Mail-Order Cannabis | Leafythings`,
          metaDescription: `Shop ${business.bizName} mail-order cannabis here. Cannabis products and services are available from ${business.bizName} here! Click here to shop now.`,
        };
      }
      if (business.plType === BusinessType.DispensaryType && region) {
        return {
          customTitle: `Shop ${business.bizName}. Your ${region.plName} Marijuana Dispensary.`,
          metaTitle: `${business.bizName} Dispensary in ${region.plName}, ${region.province.plName} | Leafythings`,
          metaDescription: `Shop ${business.bizName} here. Cannabis products and services available from ${business.bizName} here! Click here to shop now.`,
        };
      }
      if (business.plType === BusinessType.DeliveryType && region) {
        return {
          customTitle: `Shop ${business.bizName}. Weed Delivery in ${region.plName}.`,
          metaTitle: `${business.bizName} Delivery in ${region.plName}, ${region.province.plName} | Leafythings`,
          metaDescription: `Shop ${business.bizName} delivery here. Cannabis products and services are available from ${business.bizName} here! Click here to shop now.`,
        };
      }
    }
    if (business.plType === BusinessType.BrandType) {
      return {
        customTitle: province
          ? `${business.bizName} in ${province}`
          : `${business.bizName} Products & Reviews`,
        metaTitle: `${business.bizName} Marijuana Products${
          province ? `, ${province}` : ''
        } | Details & Reviews | Leafythings`,
        metaDescription: `Read more about ${business.bizName}${
          province ? `, ${province}` : ''
        } ✔️ Buy edibles, CBD, weeds, concentrates from ${
          business.bizName
        }  ᐈ Latest real reviews from customers!`,
      };
    }
    if (business.plType === BusinessType.MailOrderType) {
      return {
        customTitle: `Marijuana Mail Order - ${business.bizName}`,
        metaTitle: `Mail Order Marijuana by ${business.bizName} | Leafythings`,
        metaDescription: `Find the best mail order marijuana services near you from ${business.bizName} at Leafythings ✔️ Hot Deals ✔️ Real Customer Reviews!`,
      };
    }
    if (business.plType === BusinessType.DispensaryType && region) {
      return {
        customTitle: `Shop ${business.bizName}. Your ${region.plName} Marijuana Dispensary.`,
        metaTitle: `${business.bizName} Marijuana Dispensary in ${region.plName} | Leafythings`,
        metaDescription: `Shop ${business.bizName} here. Your ${region.plName} marijuana dispensary. Browse now!`,
      };
    }
    if (business.plType === BusinessType.DeliveryType && region) {
      return {
        customTitle: `Shop ${business.bizName}. Weed Delivery in ${region.plName}.`,
        metaTitle: `${business.bizName} Weed Delivery in ${region.plName} | Leafythings`,
        metaDescription: `Shop ${business.bizName} here. Weed Delivery services in ${region.plName} here!`,
      };
    }
  }
  const urlParts = urlPartsOriginal.filter(
    item =>
      !checkIfRegion(item) &&
      (region
        ? !item.toLowerCase().includes(region?.plName?.toLowerCase()) &&
          !item.toLowerCase().includes(region?.plSlug?.toLowerCase()) &&
          !item
            .toLowerCase()
            .includes(region?.province?.plName?.toLowerCase()) &&
          !item
            .toLowerCase()
            .includes(region?.province?.plInitials?.toLowerCase())
        : true),
  );
  if (urlParts && urlParts.length > 0) {
    const lastUrlPart = urlParts[urlParts.length - 1];
    if (!lastUrlPart) {
      return {
        customTitle: null,
        metaTitle:
          region?.province?.country?.plCountryID === 2
            ? `Best Weed Dispensaries & Delivery in USA | Leafythings`
            : `Marijuana Products & Services in Canada | Leafythings`,
        metaDescription:
          region?.province?.country?.plCountryID === 2
            ? 'Find recreational medicinal marijuana dispensaries, weed delivery, mail order, doctors and resources near you in the USA. Efficient, fast, legal access click here'
            : 'Find recreational & medicinal marijuana dispensaries, weed delivery, mail order, doctors and resources near you. Efficient, fast, legal access.',
      };
    }
    if (lastUrlPart) {
      switch (lastUrlPart.toLowerCase()) {
        case 'all': {
          const prevLastUrlPart =
            urlParts.length > urlParts.length - 2
              ? urlParts[urlParts.length - 2]
              : null;
          if (prevLastUrlPart) {
            switch (prevLastUrlPart) {
              case 'brands':
                if (region) {
                  return {
                    customTitle: null,
                    metaTitle: `All brands in ${region.plName}, ${region.province.plName} | Leafythings`,
                    metaDescription: `All brands in ${region.plName}, ${region.province.plName}. Find all cannabis products available from Leafythings here!`,
                  };
                }
                if (province) {
                  return {
                    customTitle: null,
                    metaTitle: `All brands in ${province} | Leafythings`,
                    metaDescription: `All brands in ${province}. Find all cannabis products available from Leafythings here!`,
                  };
                }
                return {
                  customTitle: null,
                  metaTitle: `All brands | Leafythings`,
                  metaDescription: `All brands. Find all cannabis products available from Leafythings here!`,
                };
              case 'mail-order-marijuana':
                if (region) {
                  return {
                    customTitle: null,
                    metaTitle: `All Mail-Order in ${region.plName}, ${region.province.plName} | Leafythings`,
                    metaDescription: `Shop All Mail-Order cannabis in ${region.plName}, ${region.province.plName}. Cannabis products and services are available for mail-order here!`,
                  };
                }
                if (province) {
                  return {
                    customTitle: null,
                    metaTitle: `All Mail-Order in ${province} | Leafythings`,
                    metaDescription: `Shop All Mail-Order cannabis in ${province}. Cannabis products and services are available for mail-order here!`,
                  };
                }
                return {
                  customTitle: null,
                  metaTitle: 'All Mail-Order | Leafythings',
                  metaDescription: `Shop All Mail-Order cannabis. Cannabis products and services are available for mail-order here!`,
                };
              case 'weed-delivery':
                if (region) {
                  return {
                    customTitle: null,
                    metaTitle: `All Delivery in ${region.plName}, ${region.province.plName} | Leafythings`,
                    metaDescription: `Shop All Delivery in ${region.plName}, ${region.province.plName}. Find all cannabis delivery available from Leafythings here!`,
                  };
                }
                if (province) {
                  return {
                    customTitle: null,
                    metaTitle: `All Delivery in ${province} | Leafythings`,
                    metaDescription: `Shop All Delivery in ${province}. Find all cannabis delivery available from Leafythings here!`,
                  };
                }
                return {
                  customTitle: null,
                  metaTitle: 'All Delivery | Leafythings',
                  metaDescription: `Shop All Delivery. Find all cannabis delivery available from Leafythings here!`,
                };
              case 'marijuana-dispensary':
                if (region) {
                  return {
                    customTitle: null,
                    metaTitle: `All Dispensaries in ${region.plName}, ${region.province.plName} | Leafythings`,
                    metaDescription: `All Dispensaries in ${region.plName}, ${region.province.plName}. Find all cannabis products available from Leafythings here!`,
                  };
                }
                if (province) {
                  return {
                    customTitle: null,
                    metaTitle: `All Dispensaries in ${province} | Leafythings`,
                    metaDescription: `All Dispensaries in ${province}. Find all cannabis products available from Leafythings here!`,
                  };
                }
                return {
                  customTitle: null,
                  metaTitle: 'All Dispensaries | Leafythings',
                  metaDescription: `All Dispensaries. Find all cannabis products available from Leafythings here!`,
                };
              default:
                break;
            }
          }
          return {
            customTitle: null,
            metaTitle: 'All Cannabis Services and Products | Leafythings',
            metaDescription:
              'Leafythings is a cannabis directory where you can find the best weed products and accessories, including vaporizers, grinders, bongs and more.',
          };
        }
        case 'services':
          return {
            customTitle: null,
            metaTitle: 'B2B Cannabis Services & Vendors | Leafythings',
            metaDescription:
              'Find our suggested b2b partner services and vendors for the Cannabis Industry. Looking to run your cannabis business successfully? Click here!',
          };
        case 'toronto':
          return {
            customTitle: null,
            metaTitle:
              'Weed Delivery Toronto Ontario. Marijuana Delivery Near Me | Leafythings',
            metaDescription:
              "Weed Delivery Toronto, Ontario. Toronto's all weed dispensaries that do marijuana home delivery. Free same-day Cannabis delivery in Toronto",
          };
        case 'mail-order-marijuana': {
          if (province) {
            return {
              customTitle: null,
              metaTitle: `Mail Order Marijuana in ${province} | Leafythings`,
              metaDescription: `Find the best Canadian mail order marijuana services in ${province} at Leafythings ✔️ Hot Deals ✔️ Real Customer Reviews!`,
            };
          }
          return {
            customTitle: null,
            metaTitle: `Mail Order Marijuana ${
              region?.province?.country?.plCountryName ||
              selectedLocation?.province?.country?.plCountryName ||
              'Canada'
            } | Leafythings`,
            metaDescription: `Find the best mail order marijuana services in ${
              region?.province?.country?.plCountryName ||
              selectedLocation?.province?.country?.plCountryName ||
              'Canada'
            } on Leafythings ⭐`,
          };
        }
        case 'brands': {
          if (province) {
            return {
              customTitle: null,
              metaTitle: `Brands in ${province} | Leafythings`,
              metaDescription:
                'Leafythings is a cannabis directory where you can find the best weed products and accessories, including vaporizers, grinders, bongs and more. Browse our directory to learn more about the most popular brands in cannabis today',
            };
          }
          return {
            customTitle: null,
            metaTitle: `Cannabis Brands ${
              region?.province?.country?.plCountryName ||
              selectedLocation?.province?.country?.plCountryName ||
              'Canada'
            } | Leafythings`,
            metaDescription:
              'Leafythings is a cannabis directory where you can find the best weed products and accessories, including vaporizers, grinders, bongs and more. Browse our directory to learn more about the most popular brands in cannabis today',
          };
        }
        case 'contactus':
          return {
            customTitle: null,
            metaTitle: 'Contact Us | Leafythings',
            metaDescription:
              'Contact us today to get additional information about weed related products and services.',
          };
        case 'deals': {
          if (region) {
            return {
              customTitle: `Best Weed Deals in ${region.plName}, ${region.province.plName}`,
              metaTitle: `Great Cannabis Deals in ${region.plName}, ${region.province.plName}  | Leafythings`,
              metaDescription: `Are you looking for the best weed deals in ${region.plName}, ${region.province.plName}✔️ Visit Leafythings and find the hottest deals on different marijuana products: edibles, weeds, concentrates and more!`,
            };
          }
          if (province) {
            return {
              customTitle: `Best Weed Deals in ${province}`,
              metaTitle: `Great Cannabis Deals in ${province} | Leafythings`,
              metaDescription: `Are you looking for the best weed deals in ${province}✔️ Visit Leafythings and find the hottest deals on different marijuana products: edibles, weeds, concentrates and more!`,
            };
          }
          return {
            customTitle: null,
            metaTitle: 'Cannabis Deals and Discounts | Leafythings',
            metaDescription:
              'Discover latest deals on weeds,edibles,concentrates ⭐ Subscribe for more great deals from Leafythings and save money today!',
          };
        }
        case 'accessories':
        case 'thc':
        case 'edibles':
        case 'weed':
        case 'storewide':
        case 'concentrates': {
          if (region) {
            return {
              customTitle: `Best Deals on ${transformCapitalWords(
                lastUrlPart,
              )} in ${region.plName}, ${region.province.plInitials}`,
              metaTitle: `Great Deals on ${transformCapitalWords(
                lastUrlPart,
              )} in ${region.plName}, ${region.province.plInitials}`,
              metaDescription: `Check latest deals on ${transformCapitalWords(
                lastUrlPart,
              )} in ${region.plName}, ${
                region.province.plInitials
              } ⭐ Subscribe for more great deals from Leafythings and save money today!`,
            };
          }
          if (province) {
            return {
              customTitle: `Best Deals on ${transformCapitalWords(
                lastUrlPart,
              )} in ${province}`,
              metaTitle: `Great Deals on ${transformCapitalWords(
                lastUrlPart,
              )} in ${province}`,
              metaDescription: `Check latest deals on ${transformCapitalWords(
                lastUrlPart,
              )} in ${province} ⭐ Subscribe for more great deals from Leafythings and save money today!`,
            };
          }
          return {
            customTitle: `Best Deals on ${transformCapitalWords(lastUrlPart)}`,
            metaTitle: `Great Deals on ${transformCapitalWords(lastUrlPart)}`,
            metaDescription: `Check latest deals on ${transformCapitalWords(
              lastUrlPart,
            )} ⭐ Subscribe for more great deals from Leafythings and save money today!`,
          };
        }
        case 'find':
          return {
            customTitle: null,
            metaTitle: `Best Marijuana Directory in ${
              region?.province?.country?.plCountryName ||
              selectedLocation?.province?.country?.plCountryName ||
              'Canada'
            } | Leafythings`,
            metaDescription:
              'Use our Leafythings weeed map and find the closest marijuana dispensary near you.',
          };
        case 'faq':
          return {
            customTitle: null,
            metaTitle: 'Frequently Asked Questions | Leafythings',
            metaDescription:
              'Leafythings FAQ section. Contact us if you have more questions today!',
          };
        case 'get-it-on-android':
          return {
            customTitle: null,
            metaTitle: 'Get it on Android | Leafythings',
            metaDescription: 'Learn how to install Leafythings on Anroid.',
          };
        case 'privacypolicy':
          return {
            customTitle: null,
            metaTitle: 'Privacy Policy | Leafythings',
            metaDescription: 'Read Leafythings privacy policy here.',
          };
        case 'sitemap':
          return {
            customTitle: null,
            metaTitle: 'Sitemap | Leafythings',
            metaDescription: 'Leafythings sitemap.',
          };
        case 'termsofservice':
          return {
            customTitle: null,
            metaTitle: 'Terms of Service | Leafythings',
            metaDescription: 'Read Leafythings terms of service here.',
          };
        case 'marijuana-dispensary': {
          if (region) {
            return {
              customTitle: null,
              metaTitle: `Best Marijuana Dispensaries in ${region.plName}, ${
                region.province.plName
              } ${
                region?.province?.country?.plCountryName ||
                selectedLocation?.province?.country?.plCountryName ||
                'Canada'
              } | Leafythings`,
              metaDescription: `Find top-rated marijuana dispensaries in ${region.plName}, ${region.province.plName} offering a curated collection of recreational & medicinal cannabis products, at the best prices. Shop now!`,
            };
          }
          if (province) {
            return {
              customTitle: null,
              metaTitle: `Best Marijuana Dispensaries in ${province} | Leafythings`,
              metaDescription: `Find top-rated marijuana dispensaries in ${province} offering a curated collection of recreational & medicinal cannabis products, at the best prices. Shop now!`,
            };
          }
          return {
            customTitle: null,
            metaTitle: 'Best Marijuana Dispensaries | Leafythings',
            metaDescription: `Find top-rated marijuana dispensaries offering a curated collection of recreational & medicinal cannabis products, at the best prices. Shop now!`,
          };
        }
        case 'weed-delivery':
          return {
            customTitle: null,
            metaTitle: `Best Weed Delivery Services in ${
              region?.province?.country?.plCountryName ||
              selectedLocation?.province?.country?.plCountryName ||
              'Canada'
            } | Leafythings`,
            metaDescription: `Looking for the fastest cannabis delivery services in ${
              region?.province?.country?.plCountryName ||
              selectedLocation?.province?.country?.plCountryName ||
              'Canada'
            }? Check Leafythings to find the most convinient and quality weed delivery in your town!`,
          };
        default:
          return {
            customTitle: null,
            metaTitle: null,
            metaDescription:
              region?.province?.country?.plCountryID === 2
                ? 'Find recreational medicinal marijuana dispensaries, weed delivery, mail order, doctors and resources near you in the USA. Efficient, fast, legal access click here'
                : 'Easily find recreational & medicinal marijuana dispensaries, weed delivery, mail order, doctors and resources near you. Efficient, fast, legal access',
          };
      }
    }
  }
  return {
    customTitle: null,
    metaTitle: null,
    metaDescription:
      region?.province?.country?.plCountryID === 2
        ? 'Find recreational medicinal marijuana dispensaries, weed delivery, mail order, doctors and resources near you in the USA. Efficient, fast, legal access click here'
        : 'Easily find recreational & medicinal marijuana dispensaries, weed delivery, mail order, doctors and resources near you. Efficient, fast, legal access',
  };
};

export const getMetaTagsForCategory = async (
  context: GetServerSidePropsContext,
  shouldProcess: boolean,
  categoryType?:
    | 'Marijuana Dispensary'
    | 'Weed Delivery'
    | 'Brand'
    | 'Mail Order'
    | null,
  region?: Region | null,
  province?: string | null,
) => {
  if (
    shouldProcess &&
    categoryType &&
    region &&
    region.plRegionID &&
    (categoryType === 'Marijuana Dispensary' ||
      categoryType === 'Weed Delivery')
  ) {
    const { data: metaTagsData } = await getApolloClient(context).query<
      MetaTagsRegionQuery,
      MetaTagsRegionQueryVariables
    >({
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
      query: MetaTagsRegionDocument,
      variables: {
        plRegionID: region.plRegionID,
        categoryType,
      },
    });
    if (
      metaTagsData &&
      metaTagsData.metaTagByRegionIDByType &&
      metaTagsData.metaTagByRegionIDByType.length === 0
    ) {
      return null;
    }
    if ((metaTagsData?.metaTagByRegionIDByType || []).length > 0) {
      return {
        customTitle: metaTagsData.metaTagByRegionIDByType[0].plCustomH1,
        metaTitle: metaTagsData.metaTagByRegionIDByType[0].plMetaTitle
          ? `${metaTagsData.metaTagByRegionIDByType[0].plMetaTitle}`
          : null,
        metaDescription: metaTagsData.metaTagByRegionIDByType[0]
          .plMetaDescription
          ? `${metaTagsData.metaTagByRegionIDByType[0].plMetaDescription}`
              .replace('| Leafythings', '')
              .replace('Leafythings |', '')
              .replace(/\[/g, '<')
              .replace(/]/g, '>')
              .replace(/&nbsp;/g, '')
              .replace(/&nbsp/g, '')
              .replace(/<[^>]*>\s*<\/[^>]*>/g, '') || null
          : null,
        customDescription1: formatHTML(
          metaTagsData.metaTagByRegionIDByType[0].plDescription1,
        ),
        customDescription2: formatHTML(
          metaTagsData.metaTagByRegionIDByType[0].plDescription2,
        ),
      };
    }
  }
  if (shouldProcess && categoryType && province) {
    const { data: provincesData } = await getApolloClient(context).query<
      LocationAllListProvinceForUserQuery,
      LocationAllListProvinceForUserQueryVariables
    >({
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
      query: LocationAllListProvinceForUserDocument,
    });
    const foundProvince = (
      provincesData?.locationListProvinceForUser || []
    ).find(
      item =>
        item?.plInitials &&
        item?.plName?.toLowerCase() === province.toLowerCase(),
    );
    if (foundProvince) {
      const { data: metaTagsData } = await getApolloClient(context).query<
        MetaTagsProvinceQuery,
        MetaTagsProvinceQueryVariables
      >({
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
        query: MetaTagsProvinceDocument,
        variables: {
          plProvinceID: foundProvince.plProvinceID,
          categoryType,
        },
      });
      if ((metaTagsData?.metaTagByProvinceIDByType || []).length > 0) {
        return {
          customTitle:
            metaTagsData.metaTagByProvinceIDByType[0].plCustomH1?.trim(),
          metaTitle: metaTagsData.metaTagByProvinceIDByType[0].plMetaTitle
            ? `${metaTagsData.metaTagByProvinceIDByType[0].plMetaTitle}`.trim()
            : null,
          metaDescription: metaTagsData.metaTagByProvinceIDByType[0]
            .plMetaDescription
            ? `${metaTagsData.metaTagByProvinceIDByType[0].plMetaDescription}`
                .replace('| Leafythings', '')
                .replace('Leafythings |', '')
                .replace(/\[/g, '<')
                .replace(/]/g, '>')
                .replace(/&nbsp;/g, '')
                .replace(/&nbsp/g, '')
                .replace(/<[^>]*>\s*<\/[^>]*>/g, '')
                .trim() || null
            : null,
          customDescription1: formatHTML(
            metaTagsData.metaTagByProvinceIDByType[0].plDescription1,
          ),
          customDescription2: formatHTML(
            metaTagsData.metaTagByProvinceIDByType[0].plDescription2,
          ),
        };
      }
    }
  }
  return null;
};

export const getMetaTagsForProductCategory = async (
  context: GetServerSidePropsContext,
  shouldProcess: boolean,
  productType?: string | null,
  lastProductType?: string | null,
) => {
  if (shouldProcess && productType) {
    const { data: metaTagsData } = await getApolloClient(context).query<
      MetaTagsProductCategoryQuery,
      MetaTagsProductCategoryQueryVariables
    >({
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
      query: MetaTagsProductCategoryDocument,
    });
    if (
      metaTagsData &&
      metaTagsData.metaTagProductTypes &&
      metaTagsData.metaTagProductTypes.length === 0
    ) {
      return null;
    }
    if ((metaTagsData?.metaTagProductTypes || []).length > 0) {
      const foundMetaTagData = (metaTagsData?.metaTagProductTypes || []).find(
        item =>
          lastProductType
            ? item?.product_type?.name === lastProductType
            : item?.product_type?.name === productType,
      );
      if (foundMetaTagData) {
        return {
          customTitle: null,
          metaTitle: foundMetaTagData.title
            ? `${foundMetaTagData.title}`
            : null,
          metaDescription: foundMetaTagData.description
            ? `${foundMetaTagData.description}`
                .replace('| Leafythings', '')
                .replace('Leafythings |', '')
                .replace(/\[/g, '<')
                .replace(/]/g, '>')
                .replace(/&nbsp;/g, '')
                .replace(/&nbsp/g, '')
                .replace(/<[^>]*>\s*<\/[^>]*>/g, '') || null
            : null,
          customDescription1: formatHTML(escapeHtml(foundMetaTagData.content)),
          customDescription2: null,
        };
      }
    }
  }
  return null;
};

export const getProductCanonicalLink = (product: Product) => {
  const productBusiness =
    (product?.business || []).length > 0 ? product?.business[0] : null;
  if (product && productBusiness) {
    if (
      productBusiness.plType === BusinessType.DeliveryType ||
      productBusiness.plType === BusinessType.DispensaryType
    ) {
      return `/${transformBusinessTypeToSlug(
        productBusiness.plType,
      )}/${productBusiness.contact?.provinceInitial?.toLowerCase()}/${
        productBusiness.contact?.regionSlug
      }/${productBusiness.bizSlug}/${product.prdSlug}`;
    }
    return `/${transformBusinessTypeToSlug(productBusiness.plType)}/${
      productBusiness.bizSlug
    }/${product.prdSlug}`;
  }
  return '';
};

const businessDayItems = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
export const getSEOBusiness = (business?: Business | null) => {
  if (!business) {
    return '';
  }
  const seoBusiness: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.bizName || '',
    description: business.bizDescription || '',
    image: business.mdaLocalFileName
      ? `${IMAGE_BASE_URL}storage/${business.mdaLocalFileName}`
      : IMAGE_PLACEHOLDER,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rvwScoreAvg || 0,
      // eslint-disable-next-line
      ratingCount: business.rvwCount || 0
    },
  };
  if (business.contact) {
    let addressText = '';
    if (
      business?.contact?.bizStreetAddress ||
      business?.contact?.bizIntersection
    ) {
      addressText += `${
        business?.contact?.bizStreetAddress ||
        business?.contact?.bizIntersection
      }`;
    }
    if (business?.contact?.regionName || business?.contact?.provinceName) {
      addressText += `${addressText ? ', ' : ''}${
        business?.contact?.regionName
      }, ${business?.contact?.provinceName}`;
    }
    if (business?.contact?.bizPostal) {
      addressText += `${addressText ? ', ' : ''}${
        business?.contact?.bizPostal
      }`;
    }
    if (addressText) {
      seoBusiness.address = addressText;
    }
    if (business?.contact?.bizLatitude && business?.contact?.bizLongitude) {
      seoBusiness.geo = {
        latitude: business?.contact?.bizLatitude,
        // eslint-disable-next-line
        longitude: business?.contact?.bizLongitude
      };
    }
    if (business?.contact?.bizWebsiteURL) {
      seoBusiness.url = business?.contact?.bizWebsiteURL;
      seoBusiness.menu = business?.contact?.bizWebsiteURL;
    }
    if (business?.dutchieAPI) {
      seoBusiness.menu = business?.dutchieAPI;
    }
    if (business?.contact?.bizPhone) {
      seoBusiness.telephone = business?.contact?.bizPhone;
    }
  }
  if ((business.workingHours || []).length > 0) {
    seoBusiness.openingHoursSpecification = businessDayItems.map(
      (dayItem, dayIndex) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: dayItem,
        opens:
          dayIndex < (business.workingHours || []).length
            ? // @ts-ignore
              business.workingHours[dayIndex].ophOpenTime
            : '',
        closes:
          dayIndex < (business.workingHours || []).length
            ? // @ts-ignore
              business.workingHours[dayIndex].ophCloseTime
            : // eslint-disable-next-line
              ''
      }),
    );
  }
  if ((business.reviews || []).length > 0) {
    const reviewItem = business.reviews[0];
    seoBusiness.review = {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        // eslint-disable-next-line
        name: reviewItem.username || ''
      },
      reviewRating: {
        '@type': 'Rating',
        // eslint-disable-next-line
        ratingValue: reviewItem.rvwScore || 1
      },
      // eslint-disable-next-line
      reviewBody: reviewItem.rvwComment || ''
      // eslint-disable-next-line
    }
  }
  if ((business.bizTags || []).length > 0) {
    seoBusiness.slogan = (business.bizTags || [])
      .filter(item => !!item)
      .join(', ');
  }
  return { __html: JSON.stringify(seoBusiness) };
};

export const getSEOProduct = (product?: Product | null) => {
  if (!product) {
    return '';
  }
  const seoProduct: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.prdName || '',
    description: product.prdDescription || '',
    image: product.mdaLocalFileName
      ? `${IMAGE_BASE_URL}storage/${product.mdaLocalFileName}`
      : IMAGE_PLACEHOLDER,
    brand: {
      '@type': 'Brand',
      name:
        // eslint-disable-next-line
        ((product?.business || []).length > 0 ? product?.business[0] : null)?.bizName || ''
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rvwScoreAvg || 0,
      // eslint-disable-next-line
      ratingCount: product.rvwCount || 0,
    },
    reviews: (product.reviews || []).map(reviewItem => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        // eslint-disable-next-line
        name: reviewItem.username || ''
      },
      reviewRating: {
        '@type': 'Rating',
        // eslint-disable-next-line
        ratingValue: reviewItem.rvwScore || 1
      },
      // eslint-disable-next-line
      reviewBody: reviewItem.rvwComment || ''
      // eslint-disable-next-line
    }))
  };

  if (getProductMinPrice(product).value > 0) {
    seoProduct.offers = {
      '@type': 'Offer',
      url: getProductCanonicalLink(product),
      priceCurrency: 'CAD',
      price: getProductMinPrice(product).value,
      seller: {
        '@type': 'Organization',
        name:
          // eslint-disable-next-line
          ((product?.business || []).length > 0 ? product?.business[0] : null)?.bizName || ''
        // eslint-disable-next-line
      }
    };
  }
  return { __html: JSON.stringify(seoProduct) };
};

export const getSEOBreadcrumb = (
  urlPrefix: string,
  breadcrumbs: BreadCrumbType[],
) => {
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return '';
  }
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map(item => ({
        '@type': 'ListItem',
        position: 1,
        name: item.breadcrumb,
        // eslint-disable-next-line
      item: `${urlPrefix}${item.href}`
        // eslint-disable-next-line
    }))
    }),
  };
};

export const useInterlinking = async (
  type: 'brands' | 'mail orders' | 'dispensaries' | 'deliveries',
  context: GetServerSidePropsContext,
) => {
  const { selectedLocation, currentLocation } = await useCurrentLocationStatic(
    context,
  );

  let linksData: any = null;

  if (
    type !== 'brands' &&
    type !== 'mail orders' &&
    (currentLocation || selectedLocation).plSlug
  ) {
    const { data } = await getApolloClient(context).query<
      BusinessInterlinkingQuery,
      BusinessInterlinkingQueryVariables
    >({
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
      query: BusinessInterlinkingDocument,
      variables: {
        type,
        countryId: (currentLocation || selectedLocation).province?.country
          ?.plCountryID,
        locationSlug: (currentLocation || selectedLocation).plSlug,
      },
    });
    linksData = data;
  } else if (
    (type === 'brands' || type === 'mail orders') &&
    (currentLocation || selectedLocation).province.plInitials
  ) {
    const { data } = await getApolloClient(context).query<
      BusinessInterlinkingQuery,
      BusinessInterlinkingQueryVariables
    >({
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
      query: BusinessInterlinkingDocument,
      variables: {
        type,
        countryId: (currentLocation || selectedLocation).province?.country
          ?.plCountryID,
        locationSlug: (currentLocation || selectedLocation).province.plInitials,
      },
    });
    linksData = data;
  }

  return type === 'brands' || type === 'mail orders'
    ? linksData?.locationListNearLocation?.provinces || []
    : linksData?.locationListNearLocation?.regions || [];
};

export const getBusinessAbout = (
  business: Business,
  selectedLocation: LocationItemFragment,
  linkLocation?: LocationItemFragment | null,
) => {
  if (business.plType === BusinessType.BrandType) {
    return `Looking for high-quality cannabis products from ${
      business.bizName
    }? Let ${
      business.bizName
    } be your go-to source for the best cannabis products, excellent service, and prices that make sense. Leafythings is happy to connect ${
      linkLocation?.province?.plName || selectedLocation.province.plName
    } with the best, discreet cannabis providers, including ${business.bizName} 

For customers looking for their go-to brand, or maybe something new, ${
      business.bizName
    } is happy to provide top-notch cannabis experiences. Please note this listing is not verified, and may differ from the offering ${
      business.bizName
    } provides.

Currently, this listing is not verified within Leafythings. Want to see our full product listings? Reach out to us and tell us to claim our listing on Leafythings.com`;
  }
  if (business.plType === BusinessType.MailOrderType) {
    return `Looking for cannabis mail-order delivery across ${
      linkLocation?.province?.plName || selectedLocation.province.plName
    }? ${business.bizName} is proud to offer dedicated Mail-order services to ${
      linkLocation?.province?.plName || selectedLocation.province.plName
    }. 

For customers looking for cannabis, ${
      business.bizName
    } is happy to provide quality, discreet mail-order cannabis delivery. Please note this listing is not verified, and may differ from the offering ${
      business.bizName
    } provides.
    
Currently, this listing is not verified within Leafythings. Want to see our full menu? Reach out to us and tell us to claim our listing on Leafythings.com`;
  }
  if (business.plType === BusinessType.DispensaryType) {
    return `Looking for cannabis dispensaries in select areas of ${
      linkLocation
        ? `${linkLocation.plName}, ${linkLocation.province.plName}`
        : `${selectedLocation.plName}, ${selectedLocation.province.plName}`
    }? Let ${
      business.bizName
    } be your go-to source for high-quality cannabis products, prompt service, and prices that make sense.

${
  linkLocation
    ? `${linkLocation.plName}, ${linkLocation.province.plName}`
    : `${selectedLocation.plName}, ${selectedLocation.province.plName}`
} cannabis stores that provide high-quality products are not always easy to find- rely on ${
      business.bizName
    } to find what you are looking for.

For customers in ${
      linkLocation
        ? `${linkLocation.plName}, ${linkLocation.province.plName}`
        : `${selectedLocation.plName}, ${selectedLocation.province.plName}`
    } in search of the right ${
      business.bizName
    } dispensary for them, look no further and contact us with any questions. Please note this listing is not verified, and may differ from the offering ${
      business.bizName
    } provides.

Currently, this listing is not verified within Leafythings. Want to see our full menu? Reach out to us and tell us to claim our listing on Leafythings.com`;
  }
  if (business.plType === BusinessType.DeliveryType) {
    return `Looking for cannabis delivery in select areas of ${
      linkLocation
        ? `${linkLocation.plName}, ${linkLocation.province.plName}`
        : `${selectedLocation.plName}, ${selectedLocation.province.plName}`
    }? Let ${business.bizName} be your go-to source for cannabis delivery in ${
      linkLocation
        ? `${linkLocation.plName}, ${linkLocation.province.plName}`
        : `${selectedLocation.plName}, ${selectedLocation.province.plName}`
    } and select surrounding areas.

For customers looking for their go-to service, delivered right to their door, ${
      business.bizName
    } is happy to provide top-notch cannabis experiences. Please note this listing is not verified, and may differ from the offering ${
      business.bizName
    } provides.

Currently, this listing is not verified within Leafythings. Want to see our full menu? Reach out to us and tell us to claim our listing on Leafythings.com`;
  }
  return '';
};
