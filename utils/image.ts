import {
  IMAGE_BASE_URL,
  IMAGE_PLACEHOLDER,
  IMAGE_PLACEHOLDER_PNG,
  PUBLIC_WEBSITE,
} from '../config/Constants';

export const getImageLink = (
  image?: string | null,
  size?: number,
  background?: string,
  original?: boolean,
  png?: boolean,
) => {
  if (image && original) {
    return `${IMAGE_BASE_URL}filters:background_color(${
      background || 'white'
    })/fit-in/${Math.round(1024)}x${Math.round(1024)}/storage/${image}`;
  }
  if (image) {
    return `${IMAGE_BASE_URL}filters:background_color(${
      background || 'white'
    })/fit-in/${Math.round(size || 175)}x${Math.round(
      size || 175,
    )}/storage/${image}`;
  }
  if (png) {
    return `${PUBLIC_WEBSITE}${IMAGE_PLACEHOLDER_PNG}`;
  }
  return `${PUBLIC_WEBSITE}${IMAGE_PLACEHOLDER}`;
};

export const getContentfulImageLink = (
  image?: string | null,
  size: number = 1024,
  aspectRatio: number = 1,
) => {
  if (image) {
    return `${image}?w=${Math.round(size)}&h=${Math.round(size / aspectRatio)}`;
  }
  return `${PUBLIC_WEBSITE}${IMAGE_PLACEHOLDER}`;
};

export const setDefaultImageOnError = (event: any) => {
  // @ts-ignore
  event.target.src = `${PUBLIC_WEBSITE}${IMAGE_PLACEHOLDER}`;
  // @ts-ignore
  event.onerror = null;
};
