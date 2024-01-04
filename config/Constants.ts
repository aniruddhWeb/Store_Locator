import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const DISABLE_IMAGES =
  serverRuntimeConfig?.DISABLE_IMAGES || publicRuntimeConfig?.DISABLE_IMAGES;
export const API_BASE_URL = publicRuntimeConfig?.SERVER_URL;
export const CONTENTFUL_BASE_URL = `https://graphql.contentful.com/content/v1/spaces/${serverRuntimeConfig?.CONTENTFUL_SPACE}`;
export const CONTENTFUL_TOKEN = serverRuntimeConfig?.CONTENTFUL_TOKEN;
export const IMAGE_BASE_URL = publicRuntimeConfig?.IMAGE_URL;
export const IMAGE_PLACEHOLDER = '/image-placeholder.webp';
export const IMAGE_PLACEHOLDER_PNG = '/image-placeholder.png';
export const IMAGE_PLACEHOLDER_PRODUCT = '/image-product.webp';
export const GOOGLE_MAPS_API_KEY = publicRuntimeConfig?.GOOGLE_MAPS_KEY;
export const PUBLIC_WEBSITE =
  serverRuntimeConfig?.PUBLIC_WEBSITE || publicRuntimeConfig?.PUBLIC_WEBSITE;
export const LARAVEL_WEBSITE = publicRuntimeConfig?.LARAVEL_WEBSITE;
export const SESSION_DOMAIN =
  serverRuntimeConfig?.SESSION_DOMAIN || publicRuntimeConfig?.SESSION_DOMAIN;
export const CAPTCHA_SITE_KEY = publicRuntimeConfig?.CAPTCHA_SITE_KEY;
export const SITEMAP_URL =
  serverRuntimeConfig?.SITEMAP_URL || publicRuntimeConfig?.SITEMAP_URL;
export const CONTENTFUL_CACHE_TTL = 3600000;

export const APPLE_GUIDELINE_WORDS = ['vape', 'cigar'];

export const isDEV = API_BASE_URL && API_BASE_URL.includes('dev');

if (isDEV) {
  console.log(publicRuntimeConfig, serverRuntimeConfig);
}
