import { Product } from '../generated/app';

export const getProductEffectTypesArray = (types?: string | null) => {
  if (types) {
    try {
      return JSON.parse(types).filter((item: any) => !!item);
    } catch (e) {
      return [];
    }
  }
  return [];
};

export const getProductTypesArray = (types?: string | null) => {
  if (types) {
    try {
      const productTypes: string[] = [];
      const productTypeJson: any[] = JSON.parse(types);
      productTypeJson.forEach(item => {
        Object.keys(item).forEach(subItem => {
          if (subItem) {
            productTypes.push(subItem);
          }
          const subTypes: any[] = item[subItem] || [];
          subTypes.forEach(subSubItem => {
            if (subSubItem) {
              productTypes.push(subSubItem);
            }
          });
        });
      });
      return productTypes;
    } catch (e) {
      return [];
    }
  }
  return [];
};

export const getProductGeneticsArray = (categories?: string | null) => {
  if (categories) {
    try {
      const productCategories = JSON.parse(
        categories
          .replace(/'/g, '"')
          .replace(/\[,/g, '[')
          .replace(/null,/g, ''),
      );
      if (productCategories && Array.isArray(productCategories)) {
        const resultArray: any[] = [];
        productCategories.forEach(item => {
          const keys = Object.keys(item);
          if (keys) {
            keys.forEach(key => {
              if (item[key]) {
                resultArray.push({
                  label: key,
                  value: item[key],
                });
              }
            });
          }
        });
        return resultArray;
      }
    } catch (e) {
      return [];
    }
  }
  return [];
};

export const getProductMinPrice = (product?: Product) => {
  if (!product) {
    return {
      key: '0',
      value: 0,
    };
  }
  const keys = Object.keys(product).filter(key => key.includes('prdPrice'));
  const values: number[] = keys
    // @ts-ignore
    .map((key: string) => product[key] as number | null | undefined)
    .filter(item => item !== undefined && item !== null)
    .map(item => Number(item));
  if (values && values.length > 0) {
    const minValue = Math.min(...values);
    const minKey = keys[
      // @ts-ignore
      keys.findIndex(key => product[key] === minValue)
    ] as string;
    return {
      key: minKey,
      value: minValue,
    };
  }
  return {
    key: '0',
    value: 0,
  };
};

export const hasAtLeastOnePrice = (product: Product) => {
  const keys = Object.keys(product).filter(key => key.includes('prdPrice'));
  const values: number[] = keys
    // @ts-ignore
    .map((key: string) => product[key] as number | null | undefined)
    .filter(item => item !== undefined && item !== null)
    .map(item => Number(item));
  return !!keys && keys.length > 0 && !!values && values.length > 0;
};

export const hasMultiplePrices = (product?: Product) => {
  if (!product) return false;
  const keys = Object.keys(product).filter(key => key.includes('prdPrice'));
  const values: number[] = keys
    // @ts-ignore
    .map((key: string) => product[key] as number | null | undefined)
    .filter(item => item !== undefined && item !== null)
    .map(item => Number(item));
  return !!keys && keys.length > 1 && !!values && values.length > 1;
};

export const getValidPricesCount = (product: Product) => {
  const keys = Object.keys(product).filter(key => key.includes('prdPrice'));
  const values: number[] = keys
    // @ts-ignore
    .map((key: string) => product[key] as number | null | undefined)
    .filter(item => item !== undefined && item !== null)
    .map(item => Number(item));
  return (values || []).length;
};

export const getValidPricesCountForProducts = (products: Product[]) => {
  return Math.max(...products.map(getValidPricesCount));
};
