import React, { useMemo } from 'react';
import cn from 'classnames';
import { useMediaQueries } from '@react-hook/media-query';
import { Business, Product } from '../../../generated/graphql';
import s from './ProductFooter.module.css';
import { formatPrice } from '../../../utils/string';
import { hasAtLeastOnePrice } from '../../../utils/product';

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

interface Props {
  product: Product;
  business?: Business;
  whiteBackground?: boolean;
  noMargin?: boolean;
  noPadding?: boolean;
  mobile?: boolean;
  desktop?: boolean;
  removePriceText?: boolean;
  insideProductCard?: boolean;
}

export const ProductFooter = React.memo(
  ({
    product,
    business,
    whiteBackground,
    mobile,
    desktop,
    noMargin,
    noPadding,
    removePriceText,
    insideProductCard,
  }: Props) => {
    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
    });

    const rootClassname = cn(s.root, {
      [s.rootMobile]: mobile,
      [s.rootDesktop]: desktop,
      [s.rootWhite]: whiteBackground,
      [s.rootNoMargin]: noMargin,
      [s.rootNoPadding]: noPadding,
    });
    const rowClassname = cn(s.productRow, {
      [s.productRowWhite]: whiteBackground,
      [s.productRowInsideProductCard]: insideProductCard,
    });

    const showProductPrice = useMemo(() => {
      if (business?.plType === BusinessType.BrandType) {
        return true;
      }
      if (product?.prdStatus?.toLowerCase() === 'discontinued') {
        return true;
      }
      return product?.prdInStock;
    }, [product, business]);

    if (!hasAtLeastOnePrice(product)) {
      return null;
    }
    if (business?.plType === BusinessType.BrandType) {
      return null;
    }
    return (
      <div className={rootClassname}>
        {!showProductPrice || product.prdPricePerUnit ? (
          <div className={rowClassname}>
            <div className={s.productAmount}>
              {showProductPrice
                ? matches.isMobile && removePriceText
                  ? 'Unit'
                  : 'Price Per Unit'
                : ' '}
            </div>
            <div className={s.productPrice}>
              {showProductPrice
                ? formatPrice(product.prdPricePerUnit)
                : 'Out of Stock'}
            </div>
          </div>
        ) : null}
        {showProductPrice && product.prdPriceHalfGram ? (
          <>
            {product.prdPricePerUnit ? (
              <div className={s.productBorder} />
            ) : null}
            <div className={rowClassname}>
              <div className={s.productAmount}>1/2 gram</div>
              <div className={s.productPrice}>
                {showProductPrice
                  ? formatPrice(product.prdPriceHalfGram)
                  : 'Out of Stock'}
              </div>
            </div>
          </>
        ) : null}
        {showProductPrice && product.prdPriceOneGram ? (
          <>
            {product.prdPricePerUnit || product.prdPriceHalfGram ? (
              <div className={s.productBorder} />
            ) : null}
            <div className={rowClassname}>
              <div className={s.productAmount}>1 gram</div>
              <div className={s.productPrice}>
                {showProductPrice
                  ? formatPrice(product.prdPriceOneGram)
                  : 'Out of Stock'}
              </div>
            </div>
          </>
        ) : null}
        {showProductPrice && product.prdPriceTwoGrams ? (
          <>
            {product.prdPricePerUnit ||
            product.prdPriceOneGram ||
            product.prdPriceHalfGram ? (
              <div className={s.productBorder} />
            ) : null}
            <div className={rowClassname}>
              <div className={s.productAmount}>2 grams</div>
              <div className={s.productPrice}>
                {showProductPrice
                  ? formatPrice(product.prdPriceTwoGrams)
                  : 'Out of Stock'}
              </div>
            </div>
          </>
        ) : null}
        {showProductPrice && product.prdPriceEighthOunce ? (
          <>
            {product.prdPricePerUnit ||
            product.prdPriceOneGram ||
            product.prdPriceTwoGrams ||
            product.prdPriceHalfGram ? (
              <div className={s.productBorder} />
            ) : null}
            <div className={rowClassname}>
              <div className={s.productAmount}>1/8</div>
              <div className={s.productPrice}>
                {showProductPrice
                  ? formatPrice(product.prdPriceEighthOunce)
                  : 'Out of Stock'}
              </div>
            </div>
          </>
        ) : null}
        {showProductPrice && product.prdPriceQuarterOunce ? (
          <>
            {product.prdPricePerUnit ||
            product.prdPriceOneGram ||
            product.prdPriceTwoGrams ||
            product.prdPriceHalfGram ||
            product.prdPriceEighthOunce ? (
              <div className={s.productBorder} />
            ) : null}
            <div className={rowClassname}>
              <div className={s.productAmount}>1/4</div>
              <div className={s.productPrice}>
                {showProductPrice
                  ? formatPrice(product.prdPriceQuarterOunce)
                  : 'Out of Stock'}
              </div>
            </div>
          </>
        ) : null}
        {showProductPrice && product.prdPriceHalfOunce ? (
          <>
            {product.prdPricePerUnit ||
            product.prdPriceOneGram ||
            product.prdPriceTwoGrams ||
            product.prdPriceHalfGram ||
            product.prdPriceEighthOunce ||
            product.prdPriceQuarterOunce ? (
              <div className={s.productBorder} />
            ) : null}
            <div className={rowClassname}>
              <div className={s.productAmount}>1/2</div>
              <div className={s.productPrice}>
                {showProductPrice
                  ? formatPrice(product.prdPriceHalfOunce)
                  : 'Out of Stock'}
              </div>
            </div>
          </>
        ) : null}
        {showProductPrice && product.prdPriceOneOunce ? (
          <>
            {product.prdPricePerUnit ||
            product.prdPriceOneGram ||
            product.prdPriceTwoGrams ||
            product.prdPriceHalfGram ||
            product.prdPriceEighthOunce ||
            product.prdPriceQuarterOunce ||
            product.prdPriceHalfOunce ? (
              <div className={s.productBorder} />
            ) : null}
            <div className={rowClassname}>
              <div className={s.productAmount}>OZ</div>
              <div className={s.productPrice}>
                {showProductPrice
                  ? formatPrice(product.prdPriceOneOunce)
                  : 'Out of Stock'}
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  },
);
