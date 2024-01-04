import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import cn from 'classnames';
import { useMediaQueries } from '@react-hook/media-query';
import { useRouter } from 'next/router';
import { Business, Product } from '../../../generated/graphql';
import s from './ProductHeader.module.css';
import {
  getProductTypesArray,
  getProductGeneticsArray,
  getProductEffectTypesArray,
} from '../../../utils/product';
import { transformBusinessTypeToSlug } from '../../../utils/string';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { Share } from '../../common/Share/Share';
import { BusinessContact } from '../../business/BusinessContact/BusinessContact';
import { Loop } from '../../icons/Loop';
import { Button } from '../../common/Button/Button';
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

interface Props {
  product: Product;
  business: Business;
  scrollText?: string;
}

const buttonGreenStyle = {
  padding: '0 16px',
  height: 38,
  background: '#61AB62',
};

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const ProductHeader = React.memo(
  ({ business, product, scrollText }: Props) => {
    const router = useRouter();

    const [showProduct, setShowProduct] = useState<boolean>(false);

    const onWhereToBuy = useCallback(() => {
      if (scrollText) {
        const foundElement = document.getElementById(scrollText.toLowerCase());
        if (foundElement) {
          const rect = foundElement.getBoundingClientRect();
          window.scrollTo({
            left: 0,
            top: (rect?.top || 0) + (window.scrollY || 0) - 180,
            behavior: 'smooth',
          });
        }
      }
    }, [scrollText]);

    const businessHref = useMemo(() => {
      if (
        business.plType === BusinessType.DeliveryType ||
        business.plType === BusinessType.DispensaryType
      ) {
        return `/${transformBusinessTypeToSlug(
          business.plType,
        )}/${business.contact?.provinceInitial?.toLowerCase()}/${
          business.contact?.regionSlug
        }/${business.bizSlug}`;
      }
      return `/${transformBusinessTypeToSlug(business.plType)}/${
        business.bizSlug
      }`;
    }, [business]);

    const productInfoClass = cn(s.productInfoContainer, {
      [s.productInfoContainerVisible]: showProduct,
    });

    const nameProductClass = cn(s.nameProduct, {
      [s.nameProductVisible]: showProduct,
    });

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
      if (!matches.isMobile) {
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
      [s.productImageVisible]: showProduct,
    });

    const businessImageClass = cn(s.businessImageContainer, {
      [s.businessImage]: true,
    });

    return (
      <>
        <div className={s.root}>
          <div className={productInfoClass}>
            <div
              onClick={onShowImageViewer}
              className={s.productImageContainer}>
              <img
                className={productImageClass}
                src={getImageLink(product.mdaLocalFileName, 240)}
                onError={setDefaultImageOnError}
                alt={product.prdName}
              />
              <Loop className={s.imageLoop} />
              {!showProductPrice ? (
                <div className={s.outOfStockContainer}>
                  <div className={s.outOfStockText}>Out of Stock</div>
                </div>
              ) : null}
            </div>
            <div className={s.productNameContainer}>
              <div className={nameProductClass}>{product.prdName}</div>
              <div className={s.rate}>
                {product.rvwCount ? (
                  <>
                    <DynamicStarRatings
                      numberOfStars={5}
                      starDimension="16px"
                      starSpacing="1px"
                      rating={product.rvwScoreAvg || 0}
                      starRatedColor="#DFB300"
                      starEmptyColor="#E4E9E8"
                    />
                    <div className={s.reviewCount}>{product.rvwCount}</div>
                  </>
                ) : (
                  <div className={s.noReview}>NO REVIEWS</div>
                )}
              </div>
              {scrollText ? (
                <div className={s.buttonsContainer}>
                  {scrollText ? (
                    <Button
                      fullWidth
                      mobile
                      buttonText={scrollText}
                      onPress={onWhereToBuy}
                      buttonStyle={buttonGreenStyle}
                    />
                  ) : null}
                </div>
              ) : null}
              {business ? (
                <BusinessContact
                  disableAnalytics
                  mobile
                  mobileVisible
                  showBorder
                  marginTop
                  showBorderRadius
                  business={business}
                />
              ) : null}
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
                {product.prdProductTypes
                  ? getProductTypesArray(product.prdProductTypes).map(
                      (productType: string) => (
                        <div
                          key={productType}
                          className={s.productDetailsTypeContainer}>
                          <div className={s.productDetailsTypeValue}>
                            {productType}
                          </div>
                        </div>
                      ),
                    )
                  : null}
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
            {getProductEffectTypesArray(product.prdProductEffects).length > 0 ||
            getProductEffectTypesArray(product.prdProductUses).length > 0 ||
            getProductEffectTypesArray(product.prdProductTimes).length > 0 ? (
              <div className={s.productPropertyRowContainer}>
                {getProductEffectTypesArray(product.prdProductEffects).length >
                0 ? (
                  <div className={s.productEffectContainer}>
                    <div className={s.productEffectsTitle}>Effects</div>
                    <div className={s.productEffectRowContainer}>
                      {getProductEffectTypesArray(
                        product.prdProductEffects,
                      ).map((effect: string) => (
                        <div
                          key={effect}
                          className={s.productEffectItemContainer}>
                          {getProductPropertyIcon(effect, true)}
                          <div className={s.productPropertyValue}>{effect}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {getProductEffectTypesArray(product.prdProductUses).length >
                0 ? (
                  <div className={s.productUsesContainer}>
                    <div className={s.productUsesTitle}>Uses</div>
                    <div className={s.productUsesRowContainer}>
                      {getProductEffectTypesArray(product.prdProductUses).map(
                        (use: string) => (
                          <div key={use} className={s.productUsesItemContainer}>
                            {getProductPropertyIcon(use, true)}
                            <div className={s.productPropertyValue}>{use}</div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ) : null}
                {getProductEffectTypesArray(product.prdProductTimes).length >
                0 ? (
                  <div className={s.productTimeContainer}>
                    <div className={s.productTimeTitle}>Time of Use</div>
                    <div className={s.productTimeRowContainer}>
                      {getProductEffectTypesArray(product.prdProductTimes).map(
                        (time: string) => (
                          <div
                            key={time}
                            className={s.productTimeItemContainer}>
                            {getProductPropertyIcon(time, true)}
                            <div className={s.productPropertyValue}>{time}</div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className={s.cardRow}>
            <img
              className={businessImageClass}
              src={getImageLink(business.mdaLocalFileName, 100)}
              onError={setDefaultImageOnError}
              alt={business.bizName}
            />
            <div className={s.cardColumn}>
              <Link prefetch={false} href={businessHref}>
                <a
                  href={businessHref}
                  className={s.nameBusiness}>{`By ${business.bizName}`}</a>
              </Link>
              <div className={s.rateContainer}>
                <div className={s.rate}>
                  {business.rvwCount ? (
                    <>
                      <DynamicStarRatings
                        numberOfStars={5}
                        starDimension="16px"
                        starSpacing="1px"
                        rating={business.rvwScoreAvg || 0}
                        starRatedColor="#DFB300"
                        starEmptyColor="#E4E9E8"
                      />
                      <div className={s.reviewCount}>{business.rvwCount}</div>
                    </>
                  ) : (
                    <div className={s.noReview}>NO REVIEWS</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={s.shareContainer}>
            <Share businessID={business.bizBusinessID} />
          </div>
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
                  500,
                  undefined,
                  false,
                ),
              },
            ]}
          />
        ) : null}
      </>
    );
  },
);
