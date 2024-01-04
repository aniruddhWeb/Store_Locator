import { Route } from 'config/Routes';
import dynamic from 'next/dynamic';
import { LocationItemFragment } from '../../../generated/graphql';

const Instagram = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/Instagram').then(mod => mod.Instagram),
  {
    ssr: false,
  },
);
const Email = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/Email').then(mod => mod.Email),
  {
    ssr: false,
  },
);
const Facebook = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/Facebook').then(mod => mod.Facebook),
  {
    ssr: false,
  },
);
const Youtube = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/Youtube').then(mod => mod.Youtube),
  {
    ssr: false,
  },
);

export type TNavBarItems = {
  href: string;
  title: string;
};

export type TServiceItem = {
  href: string;
  title: string;
};

export type TSocialIcons = {
  href: string;
  ariaLabel: string;
  component: any;
};

export const getNavItems = (location: LocationItemFragment | null) => {
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
      href: `${Route.Blog}`,
      title: 'blogs',
    },
    {
      href: `${Route.News}`,
      title: 'news',
    },
    {
      href: `${Route.Services}`,
      title: 'services',
    },
  ];
};

export const getSocialIcons = (
  instagram: string,
  email: string,
  facebook: string,
  youtube: string,
) => {
  return [
    {
      href: facebook,
      ariaLabel: 'Facebook',
      component: Facebook,
    },
    {
      href: email,
      ariaLabel: 'Email',
      component: Email,
    },
    {
      href: instagram,
      ariaLabel: 'Instagram',
      component: Instagram,
    },
    {
      href: youtube,
      ariaLabel: 'Youtube',
      component: Youtube,
    },
  ];
};

export const serviceItems = [
  {
    title: 'Contact Us',
    href: `${Route.ContactUs}`,
  },
  {
    title: '  Frequently Asked Questions',
    href: `${Route.FAQ}`,
  },
  {
    title: 'Terms of Service',
    href: `${Route.Terms}`,
  },
  {
    title: ' Privacy Policy',
    href: `${Route.PrivacyPolicy}`,
  },
  {
    title: 'Sitemap',
    href: `${Route.SiteMap}`,
  },
];
