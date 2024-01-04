import React, { FC, useMemo } from 'react';
import cn from 'classnames';
import { Seasonal } from 'components/icons/Seasonal';
import { Exclusive } from 'components/icons/Exclusive';
import { Discontinued } from 'components/icons/Discontinued';
import styles from './ProductStatusMarker.module.css';

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export enum Status {
  OUT_OF_STOCK = 'Out of Stock',
  DISCONTINUED = 'Discontinued',
  SEASONAL = 'Seasonal',
  EXCLUSIVE = 'Exclusive',
}

const productStatusIcons = {
  [Status.DISCONTINUED]: <Discontinued />,
  [Status.SEASONAL]: <Seasonal />,
  [Status.EXCLUSIVE]: <Exclusive />,
  [Status.OUT_OF_STOCK]: null,
};

export const ProductStatusMarker: FC<{
  product: any;
  business: any;
  shouldShowBrandDiscontinued?: boolean;
}> = ({ product, business, shouldShowBrandDiscontinued }) => {
  const status = useMemo(() => {
    if (
      product.prdStatus?.toLowerCase() === 'discontinued' &&
      (product.plSlugType === 'brand' ||
      business?.plType === BusinessType.BrandType
        ? shouldShowBrandDiscontinued
        : true)
    ) {
      return Status.DISCONTINUED;
    }

    if (product.prdStatus?.toLowerCase() === 'seasonal') {
      return Status.SEASONAL;
    }

    if (product.prdStatus?.toLowerCase() === 'exclusive') {
      return Status.EXCLUSIVE;
    }

    if (!product.prdInStock) {
      if (product.prdPublishDate) {
        if (
          product.plSlugType !== 'brand' &&
          business?.plType !== BusinessType.BrandType
        ) {
          return Status.OUT_OF_STOCK;
        }
      }
    }

    return null;
  }, [product, business, shouldShowBrandDiscontinued]);

  const styleClass = useMemo(() => {
    switch (status) {
      case Status.OUT_OF_STOCK:
        return styles.outOfStock;
      case Status.DISCONTINUED:
        return styles.discontinued;
      case Status.SEASONAL:
        return styles.seasonal;
      case Status.EXCLUSIVE:
        return styles.exclusive;
      default:
        return '';
    }
  }, [status]);

  return status ? (
    <div className={cn(styles.root, styleClass)}>
      {productStatusIcons[status]}
      <span className={cn(styles.text, styleClass)}>{status}</span>
    </div>
  ) : null;
};
