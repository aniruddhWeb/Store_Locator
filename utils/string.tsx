import React from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
// @ts-ignore
import titleCase from 'ap-style-title-case';
import { uppercaseIfRegion } from './region';

let timeAgo: TimeAgo | undefined;
if (!timeAgo) {
  TimeAgo.addDefaultLocale(en);
  timeAgo = new TimeAgo('en-US');
}

export const formatTimeAgo = (time: any) => {
  if (!time) return '';
  return timeAgo?.format(new Date(time));
};

export const transformCapitalWords = (
  strToTransform: string,
  symbol?: string,
): string => {
  if (strToTransform) {
    return strToTransform
      .split(symbol || ' ')
      .filter(item => !!item)
      .map(item =>
        uppercaseIfRegion(
          item.includes('-')
            ? transformCapitalWords(
                `${item[0].toUpperCase()}${item
                  .slice(1, item.length)
                  .toLowerCase()}`,
                '-',
              )
            : `${item[0].toUpperCase()}${item
                .slice(1, item.length)
                .toLowerCase()}`,
        ),
      )
      .join(symbol || ' ');
  }
  return '';
};

export const transformCapitalWordsForSlug = (
  strToTransform: string,
): string => {
  if (strToTransform) {
    return strToTransform
      .split('-')
      .filter(item => !!item)
      .map(item =>
        uppercaseIfRegion(
          item.includes('-')
            ? transformCapitalWords(
                `${item[0].toUpperCase()}${item
                  .slice(1, item.length)
                  .toLowerCase()}`,
                '-',
              )
            : `${item[0].toUpperCase()}${item
                .slice(1, item.length)
                .toLowerCase()}`,
        ),
      )
      .join(' ');
  }
  return '';
};

export const transformTitle = (title?: string, withoutLocation?: boolean) => {
  switch (title?.toLowerCase()) {
    case 'mail-order-marijuana':
      return 'mail order marijuana';
    case 'weed-delivery':
      return 'weed delivery';
    case 'medical-marijuana-prescription':
      return 'medical prescription';
    case 'marijuana-dispensary':
    case 'marijuana-dispensaries':
      return 'marijuana dispensaries';
    case 'deals':
      return withoutLocation ? 'deals' : 'deals near you';
    case 'blog':
    case 'blogs':
      return 'blogs';
    case 'between-2km-10km':
      return 'between 2km and 10km products';
    case 'less-than-2km':
      return 'less than 2km products';
    case 'mail-orders':
      return 'mail order products';
    default:
      return title || '';
  }
};

export const transformBusinessTypeToSlug = (title?: string | null) => {
  switch (title?.toLowerCase()) {
    case 'brand':
    case 'brands':
      return 'brands';
    case 'mail order':
    case 'direct mail':
    case 'mail-order-marijuana':
    case 'mail order marijuana':
      return 'mail-order-marijuana';
    case 'delivery':
    case 'delivery services':
    case 'weed-delivery':
    case 'weed delivery':
      return 'weed-delivery';
    case 'doctor':
    case 'medical-marijuana-prescription':
    case 'medical prescription':
      return 'medical-marijuana-prescription';
    case 'dispensary':
    case 'marijuana dispensary':
    case 'marijuana dispensaries':
    case 'marijuana-dispensary':
    case 'marijuana-dispensaries':
      return 'marijuana-dispensary';
    case 'deals near you':
    case 'deals':
      return 'deals';
    case 'blog':
    case 'blogs':
      return 'blogs';
    default:
      return title?.toLowerCase();
  }
};

export const transformProductType = (types?: string | null) => {
  if (types) {
    try {
      let productType: string = '';
      const productTypeJson: any[] = JSON.parse(types);
      productTypeJson.forEach(item => {
        Object.keys(item).forEach(subItem => {
          productType += `${subItem} ➤ `;
          const subTypes: any[] = item[subItem] || [];
          subTypes.forEach(subSubItem => {
            productType += `${subSubItem}, `;
          });
        });
        if (productType.endsWith(', ')) {
          productType = productType.slice(0, -2);
        }
        if (productType.endsWith(' ➤ ')) {
          productType = productType.slice(0, -3);
        }
      });
      return productType;
    } catch (e) {
      return '';
    }
  }
  return '';
};

export const toFixedIfDecimal = (v: null | undefined | number) => {
  return v?.toFixed(2);
};

const productPriceMap = {
  prdPriceEighthOunce: (
    <>
      {` ⅛ `}
      {<span className="priceUnitTextSmall">oz</span>}
    </>
  ),
  prdPriceHalfGram: (
    <>
      {` ½ `}
      {<span className="priceUnitTextSmall">g</span>}
    </>
  ),
  prdPriceHalfOunce: (
    <>
      {` ½ `}
      {<span className="priceUnitTextSmall">oz</span>}
    </>
  ),
  prdPriceOneGram: <span className="priceUnitTextSmall">{` g`}</span>,
  prdPriceOneOunce: <span className="priceUnitTextSmall">{` oz`}</span>,
  prdPricePerUnit: <span className="priceUnitTextSmall">{` unit`}</span>,
  prdPriceQuarterOunce: (
    <>
      {` ¼ `}
      {<span className="priceUnitTextSmall">oz</span>}
    </>
  ),
  prdPriceTwoGrams: <span className="priceUnitTextSmall">{` 2 g`}</span>,
};

export const formatPrice = (price?: number | null, unit?: string) => {
  if (!price) return '—';
  if (unit) {
    const unitStr = (unit ? (productPriceMap as any)[unit] : '') || '';
    return (
      <span className="priceText">
        {`$${toFixedIfDecimal(price)}`}
        <span className="priceUnitText">{unitStr}</span>
      </span>
    );
  }
  return `$${toFixedIfDecimal(price)}`;
};

export const formatPhone = (phone?: string) => {
  if (phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
  }
  return '';
};

export const formatLink = (link?: string) => {
  if (link) {
    const cleaned = ('' + link)
      .replace(/www\./g, '')
      .replace(/http:\/\//g, '')
      .replace(/https:\/\//g, '');
    if (cleaned) {
      if (cleaned[cleaned.length - 1] === '/') {
        return cleaned.substring(0, cleaned.length - 1);
      }
      return cleaned;
    }
  }
  return '';
};

export const formatProductFilter = (productFilter?: string) => {
  if (productFilter) {
    return productFilter
      .replace(/, /g, '&')
      .replace(/,/g, ' ➤ ')
      .replace(/&/g, ', ');
  }
  return '';
};

export const capitalizeWords = (str?: string) => {
  return titleCase((str || '').toLowerCase())?.replace(/Usa/g, 'USA');
};

export const formatHTML = (htmlString?: string | null) => {
  if (htmlString?.includes('<img')) {
    return htmlString?.replace(/<p>&nbsp;<\/p>/g, '') || null;
  }
  return (
    htmlString
      ?.replace(/\[/g, '<')
      .replace(/]/g, '>')
      .replace(/&nbsp;/g, '')
      .replace(/&nbsp/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&amp/g, '&')
      .replace(/&lsquo;/g, `'`)
      .replace(/&lsquo/g, `'`)
      .replace(/&rsquo;/g, `'`)
      .replace(/&rsquo/g, `'`)
      .replace(/&ldquo;/g, `"`)
      .replace(/&ldquo/g, `"`)
      .replace(/&rdquo;/g, `"`)
      .replace(/&rdquo/g, `"`)
      .replace(/&dagger/g, `*`)
      .replace(/&dagger;/g, `*`)
      .replace(/&Dagger/g, `**`)
      .replace(/&Dagger;/g, `**`)
      .replace(/&bull/g, `*`)
      .replace(/&bull;/g, `*`)
      .replace(/<[^>]*>\s*<\/[^>]*>/g, '')
      .trim() || null
  );
};

export function escapeHtml(string: string | null | undefined) {
  if (!string || string === '') {
    return '';
  }
  return string
    .replace(/(<([^>]+)>)/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export const formatMapPrice = (price?: number | null, unit?: string) => {
  if (!price) return '—';
  if (unit) {
    const unitStr = (unit ? (productPriceMap as any)[unit] : '') || '';
    return (
      <span className="priceText">
        {`$${toFixedIfDecimal(price)}`}
        <span className="priceUnitText">{unitStr}</span>
      </span>
    );
  }
  return `$${toFixedIfDecimal(price)}`;
};
