const transformBusinessTypeToSlug = (title?: string | null) => {
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

export const getCleanUrl = (url: string) => {
  return url.replace(/#([a-z0-9]+)/gi, '').split('?')[0];
};

export const getParentUrl = (url: string) => {
  if (url.split('/').length > 1) {
    return url.slice(0, url.lastIndexOf('/'));
  }
  return url;
};

export const isSubPageWord = (str: string) => {
  if (str) {
    const matches = str
      .toLowerCase()
      .match(
        /where-to-buy-our-products|certified-reseller|products|deals|reviews|also-available-at/g,
      );
    return !!matches && matches.length > 0 && str.toLowerCase() === matches[0];
  }
  return false;
};

export const isServiceWord = (str: string) => {
  if (str) {
    const matches = str
      .toLowerCase()
      .match(
        /thc|storewide|concentrates|weed|edibles|accessories|featured|verified|all/g,
      );
    return !!matches && matches.length > 0 && str.toLowerCase() === matches[0];
  }
  return false;
};

export const isCategoryWord = (str: string) => {
  if (str) {
    const transformedStr = transformBusinessTypeToSlug(str.toLowerCase());
    const matches = transformedStr?.match(
      /services|news|blogs|deals|products|businesses|business|search|brands|mail-order-marijuana|weed-delivery|medical-marijuana-prescription|marijuana-dispensary|marijuana-dispensaries/g,
    );
    return !!matches && matches.length > 0 && transformedStr === matches[0];
  }
  return false;
};

export const isServiceOrCategoryWord = (str: string) => {
  return !!str && (isServiceWord(str) || isCategoryWord(str));
};
