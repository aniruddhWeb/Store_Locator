import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMediaQueries } from '@react-hook/media-query';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { ProductStatusMarker } from 'components/common/ProductStatusMarker/ProductStatusMarker';
import { Business, Product } from '../../../generated/graphql';
import s from './ProductInfo.module.css';
import {
  getProductTypesArray,
  getProductGeneticsArray,
  getProductEffectTypesArray,
} from '../../../utils/product';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { Loop } from '../../icons/Loop';
import { getProductPropertyIcon } from '../../../services/icons';

const ReactViewer = dynamic<any>(() => import('react-viewer'), { ssr: false });

type SliderType = {
  numberOfStars: number;
  starDimension: string;
  starSpacing: string;
  rating: number;
  starRatedColor: string;
  starEmptyColor: string;
};

const DynamicStarRatings = dynamic<SliderType>(
  // @ts-ignore
  () => import('react-star-ratings'),
  {
    ssr: false,
  },
);

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

interface Props {
  product: Product;
  business?: Business;
}

export const ProductInfo = React.memo(({ product, business }: Props) => {
  const router = useRouter();

  const [showImageViewer, setShowImageViewer] = useState<boolean>(false);

  const onShowImageViewer = useCallback(() => {
    document.body.style.overflow = 'hidden';
    setShowImageViewer(true);
  }, []);

  const onHideImageViewer = useCallback(() => {
    document.body.style.overflow = 'scroll';
    setShowImageViewer(false);
  }, []);

  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 860px)',
  });

  useEffect(() => {
    if (matches.isMobile) {
      document.body.style.overflow = 'scroll';
      setShowImageViewer(false);
    }
  }, [matches.isMobile]);

  const showProductPrice = useMemo(() => {
    if (business?.plType === BusinessType.BrandType) {
      return true;
    }
    if (product?.prdStatus?.toLowerCase() === 'discontinued') {
      return true;
    }
    return product?.prdInStock;
  }, [product, business]);

  const productImageClass = cn(s.productImage, {
    [s.productImageGray]: !showProductPrice,
  });

  return (
    <>
      <div className={s.root}>
        <div className={s.productRowContainer}>
          <div onClick={onShowImageViewer} className={s.productImageContainer}>
            <img
              className={productImageClass}
              src={getImageLink(product.mdaLocalFileName, 320)}
              onError={setDefaultImageOnError}
              alt={product.prdName}
            />
            <div className={s.outOfStockContainer}>
              <ProductStatusMarker product={product} business={business} />
            </div>
            <Loop className={s.imageLoop} />
          </div>
          <div className={s.productNameContainer}>
            <h1 className={s.nameProduct}>{product.prdName}</h1>
            <div className={s.reviewContainer}>
              {product?.rvwCount ? (
                <DynamicStarRatings
                  numberOfStars={5}
                  starDimension="24px"
                  starSpacing="2px"
                  rating={product?.rvwScoreAvg || 0}
                  starRatedColor="#DFB300"
                  starEmptyColor="#E4E9E8"
                />
              ) : (
                <div className={s.noReview}>NO REVIEWS</div>
              )}
              {getProductTypesArray(product.prdProductTypes).map(
                (productType: string, index: number) => (
                  <div
                    key={productType}
                    className={
                      index === 0
                        ? s.firstProductFilterContainer
                        : s.productFilterContainer
                    }>
                    <div className={s.productFilterText}>{productType}</div>
                  </div>
                ),
              )}
            </div>
            <div className={s.productDetailsRowContainer}>
              {product.prdTHCPercentage !== undefined &&
              product.prdTHCPercentage !== null ? (
                <div className={s.productDetailsContainer}>
                  <div className={s.productDetailsTitle}>THC</div>
                  <div className={s.productDetailsValue}>
                    {product.prdTHCPercentage}
                  </div>
                </div>
              ) : null}
              {product.prdCBDPercentage !== undefined &&
              product.prdCBDPercentage !== null ? (
                <div className={s.productDetailsContainer}>
                  <div className={s.productDetailsTitle}>CBD</div>
                  <div className={s.productDetailsValue}>
                    {product.prdCBDPercentage}
                  </div>
                </div>
              ) : null}
              {getProductGeneticsArray(product.prdProductCategories).map(
                category => (
                  <div
                    key={category.label}
                    className={s.productDetailsContainer}>
                    <div className={s.productDetailsTitle}>
                      {category.label}
                    </div>
                    <div className={s.productDetailsValue}>
                      {category.value}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <div className={s.productPropertyRowContainer}>
          {getProductEffectTypesArray(product.prdProductEffects).length > 0 ? (
            <div className={s.productEffectContainer}>
              <div className={s.productEffectsTitle}>Effects</div>
              <div className={s.productEffectRowContainer}>
                {getProductEffectTypesArray(product.prdProductEffects).map(
                  (effect: string) => (
                    <div key={effect} className={s.productEffectItemContainer}>
                      {getProductPropertyIcon(effect)}
                      <div className={s.productPropertyValue}>{effect}</div>
                    </div>
                  ),
                )}
              </div>
            </div>
          ) : null}
          {getProductEffectTypesArray(product.prdProductUses).length > 0 ? (
            <div className={s.productUsesContainer}>
              <div className={s.productUsesTitle}>Uses</div>
              <div className={s.productUsesRowContainer}>
                {getProductEffectTypesArray(product.prdProductUses).map(
                  (use: string) => (
                    <div key={use} className={s.productUsesItemContainer}>
                      {getProductPropertyIcon(use)}
                      <div className={s.productPropertyValue}>{use}</div>
                    </div>
                  ),
                )}
              </div>
            </div>
          ) : null}
          {getProductEffectTypesArray(product.prdProductTimes).length > 0 ? (
            <div className={s.productTimeContainer}>
              <div className={s.productTimeTitle}>Time of Use</div>
              <div className={s.productTimeRowContainer}>
                {getProductEffectTypesArray(product.prdProductTimes).map(
                  (time: string) => (
                    <div key={time} className={s.productTimeItemContainer}>
                      {getProductPropertyIcon(time)}
                      <div className={s.productPropertyValue}>{time}</div>
                    </div>
                  ),
                )}
              </div>
            </div>
          ) : null}
        </div>
        <div className={s.border} />
      </div>
      {showImageViewer ? (
        <ReactViewer
          className={s.imageViewer}
          visible
          onClose={onHideImageViewer}
          noImgDetails
          noNavbar
          zoomable={false}
          showTotal={false}
          changeable={false}
          scalable={false}
          images={[
            {
              src: getImageLink(
                product.mdaLocalFileName,
                undefined,
                undefined,
                true,
              ),
            },
          ]}
        />
      ) : null}
    </>
  );
});
