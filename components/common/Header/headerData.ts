import { Route } from '../../../config/Routes';

export type TNavBarItems = {
  href: string;
  title: string;
};

export type TCategoryBarItems = {
  title: string;
  href: string;
  banner?: null | any;
  categories: {
    title: string;
    href: string;
  }[];
  filters: {
    title: string;
    data: any[];
    items: {
      title: string;
      href: string;
    }[];
  }[];
  hasChildren: boolean;
};

export const getCategoryItems = (
  categories: any[],
  banners: any[],
  shouldRemoveByAppleGuidelines?: boolean,
) => {
  return categories
    .filter(item =>
      shouldRemoveByAppleGuidelines ? !item?.name?.includes('Vape') : true,
    )
    .map(
      item =>
        ({
          title: item.name,
          hasChildren: !!item.typeItems?.length,
          href: `${Route.Products}/${item?.slug || ''}?filters=${
            item?.name || ''
          }`,
          banner:
            (banners || []).find(
              bannerItem =>
                bannerItem.type?.toLowerCase() === item.name?.toLowerCase() ||
                bannerItem.type?.toLowerCase() === item.slug?.toLowerCase(),
            ) || null,
          categories: (item.typeItems || []).map((typeItem: any) => ({
            title: typeItem?.name || '',
            href: `${Route.Products}/${item?.slug || ''}?filters=${
              item?.name || ''
            }${','}${typeItem?.name || ''}`,
          })),
          filters: (item.categoriesItems || []).map((categoryItem: any) => ({
            title: categoryItem?.name || '',
            data: categoryItem?.categoriesItems || [],
            items: (categoryItem?.categoriesItems || [])
              .slice(0, 5)
              .map((subCategoryItem: any) => ({
                title: subCategoryItem?.name || '',
                href: `${Route.Products}/${item?.slug || ''}?filters=${
                  item?.name || ''
                }&filters=${categoryItem?.name || ''}${','}${
                  subCategoryItem?.name || ''
                }`,
              })),
          })),
        } as TCategoryBarItems),
    );
};

export const getNavItems = (location: any | null) => {
  return [
    {
      href: `${Route.Brands}/${location?.province.plInitials.toLowerCase()}`,
      title: 'brands',
    },
    {
      href: `${Route.MailOrder}/${location?.province.plInitials.toLowerCase()}`,
      title: 'mail order',
    },
    {
      href: `${
        Route.Delivery
      }/${location?.province.plInitials.toLowerCase()}/${location?.plSlug.toLowerCase()}`,
      title: 'deliveries',
    },
    {
      href: `${
        Route.Dispensary
      }/${location?.province.plInitials.toLowerCase()}/${location?.plSlug.toLowerCase()}`,
      title: 'dispensaries',
    },
    {
      href: `${
        Route.Deals
      }/${location?.province.plInitials.toLowerCase()}/${location?.plSlug.toLowerCase()}`,
      title: 'deals',
    },
    {
      href: Route.Services,
      title: 'services',
    },
  ];
};
