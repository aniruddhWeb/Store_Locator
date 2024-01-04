import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMediaQueries } from '@react-hook/media-query';
import cn from 'classnames';
import { ProductStatusMarker } from 'components/common/ProductStatusMarker/ProductStatusMarker';
import { Business, Product } from '../../../generated/graphql';
import s from './ProductCard.module.css';
import {
  formatPrice,
  transformBusinessTypeToSlug,
  transformProductType,
} from '../../../utils/string';
import { getProductMinPrice, hasMultiplePrices } from '../../../utils/product';
import { ProductFooter } from '../ProductFooter/ProductFooter';
import { More } from '../../icons/More';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { ShareClose } from '../../icons/ShareClose';
import { getCleanUrl } from '../../../utils/link';
import { hasWindow } from '../../../utils/window';
import { Portal } from '../../common/Portal/Portal';

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

const ReactTooltip = dynamic<any>(
  // @ts-ignore
  () => import('react-tooltip'),
  {
    ssr: false,
  },
);

interface Props {
  product: Product;
  business?: Business;
  gridMode?: boolean;
  scroll?: boolean;
  fixedHeight?: boolean;
  showBusinessName?: boolean;
  shouldShowBrandDiscontinued?: boolean;
  shouldShowNearbyPlaces?: boolean;
  sendGTMAction?: string;
}

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const ProductCard = React.memo(
  ({
    business,
    product,
    gridMode,
    fixedHeight,
    shouldShowBrandDiscontinued,
    showBusinessName = false,
    scroll = false,
    shouldShowNearbyPlaces = false,
    sendGTMAction = '',
  }: Props) => {
    const router = useRouter();
    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
    });

    const productHref = useMemo(() => {
      if (business) {
        if (
          business.plType === BusinessType.DeliveryType ||
          business.plType === BusinessType.DispensaryType
        ) {
          return `/${transformBusinessTypeToSlug(
            business.plType,
          )}/${business.contact?.provinceInitial?.toLowerCase()}/${
            business.contact?.regionSlug
          }/${business.bizSlug}/${product.prdSlug}`;
        }
        return `/${transformBusinessTypeToSlug(business.plType)}/${
          business.bizSlug
        }/${product.prdSlug}`;
      }
      return `${getCleanUrl(router.asPath)}/${product.prdSlug}`;
    }, [business, product, router.asPath]);

    const [showMorePopup, setShowMorePopup] = useState<boolean>(false);

    const onPriceMoreOpen = useCallback(
      (e: any) => {
        if (matches.isMobile) {
          e.preventDefault();
          e.stopPropagation();
          document.body.style.overflow = 'hidden';
          setShowMorePopup(true);
        }
      },
      [matches.isMobile],
    );

    const onPriceMoreClose = useCallback(
      (e: any) => {
        if (matches.isMobile) {
          e.preventDefault();
          e.stopPropagation();
          document.body.style.overflow = 'scroll';
          setShowMorePopup(false);
        }
      },
      [matches.isMobile],
    );

    useEffect(() => {
      if (!matches.isMobile) {
        document.body.style.overflow = 'scroll';
        setShowMorePopup(false);
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

    const productPrice = useMemo(() => getProductMinPrice(product), [product]);

    const onHref = useCallback(() => {
      if (hasWindow && product && sendGTMAction) {
        (window as any)?.dataLayer?.push({
          event: sendGTMAction || '',
        });
      }
    }, [sendGTMAction, product]);

    const productImageClass = cn(
      gridMode
        ? s.productImageInnerContainerGrid
        : s.productImageInnerContainer,
      {
        [s.productImage]: true,
        [s.productImageGray]: !showProductPrice,
      },
    );

    const productImagePopUpClass = cn(s.productImageContainerPopup, {
      [s.productImage]: true,
    });

    const rootClass = cn(gridMode ? s.rootGrid : s.root, {
      [s.rootFixedHeight]: fixedHeight,
    });

    return (
      <>
        <Link prefetch={false} scroll={scroll} href={productHref}>
          <a
            className={rootClass}
            href={productHref}
            onClick={onHref}
            onAuxClick={onHref}
            onContextMenu={onHref}>
            <div
              className={cn(gridMode ? s.cardColumnGrid : s.cardColumn, {
                [s.cardColumnProductCount]:
                  shouldShowNearbyPlaces && !!product.businessCount,
              })}>
              <div
                className={
                  gridMode
                    ? s.productImageContainerGrid
                    : s.productImageContainer
                }>
                <img
                  src={getImageLink(product.mdaLocalFileName)}
                  onError={setDefaultImageOnError}
                  className={productImageClass}
                  alt={product.prdName}
                />
                {shouldShowNearbyPlaces &&
                business?.plType === BusinessType.BrandType &&
                business?.mdaLocalFileName ? (
                  <div className={s.productBrand}>
                    <img
                      alt={business?.bizName}
                      src={getImageLink(business?.mdaLocalFileName, 112)}
                      className={s.productBrandImage}
                    />
                  </div>
                ) : null}
                <div className={s.outOfStockContainer}>
                  <ProductStatusMarker
                    product={product}
                    business={business}
                    shouldShowBrandDiscontinued={shouldShowBrandDiscontinued}
                  />
                </div>
              </div>
              <div className={s.typeBusiness}>
                {transformProductType(product.prdProductTypes)}
              </div>
              <div className={s.nameBusiness}>{product.prdName}</div>
              <div className={s.priceBusinessContainer}>
                {business?.plType ===
                BusinessType.BrandType ? null : showProductPrice ? (
                  <>
                    <div className={s.priceBusiness}>
                      {formatPrice(productPrice.value, productPrice.key)}
                    </div>
                    <div
                      onClick={onPriceMoreOpen}
                      className={s.priceMoreContainer}>
                      {formatPrice(productPrice.value, productPrice.key) !==
                        '—' &&
                        hasMultiplePrices(product) && (
                          <More
                            data-tip
                            data-for={`price-tooltip-${product.prdProductID}`}
                            className={s.priceMoreImage}
                          />
                        )}
                    </div>
                  </>
                ) : (
                  <div className={s.priceBusinessOutStock}>Out of Stock</div>
                )}
              </div>
              {showBusinessName && business?.bizName ? (
                <div className={s.businessName}>{`${business?.bizName}`}</div>
              ) : null}
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
            </div>
            {shouldShowNearbyPlaces && product.businessCount ? (
              <div className={s.productBusinessCount}>
                <div className={s.productBusinessCountCircle}>
                  <span className={s.productBusinessCountCircleText}>
                    {product.businessCount}
                  </span>
                </div>
                <span className={s.productBusinessCountText}>
                  {product.businessCount > 1
                    ? 'Places Near You'
                    : 'Place Near You'}
                </span>
              </div>
            ) : null}
          </a>
        </Link>
        <ReactTooltip
          className={s.priceBusinessPopupToolTip}
          place="bottom"
          id={`price-tooltip-${product.prdProductID}`}>
          <div className={s.priceBusinessPopup}>
            <ProductFooter
              product={product}
              business={business}
              whiteBackground
            />
          </div>
        </ReactTooltip>
        {showMorePopup ? (
          <Portal>
            <div
              onClick={onPriceMoreClose}
              className={s.priceBusinessPopupMobileContainer}>
              <div
                className={s.priceBusinessPopupMobile}
                style={{
                  marginBottom:
                    hasWindow && !!(window as any)?.ReactNativeWebView
                      ? 72
                      : 16,
                }}>
                <div className={s.priceBusinessPopupMobileButtons}>
                  <ShareClose onClick={onPriceMoreClose} />
                </div>
                <img
                  src={getImageLink(product.mdaLocalFileName)}
                  onError={setDefaultImageOnError}
                  className={productImagePopUpClass}
                  alt={product.prdName}
                />
                <div className={s.nameBusinessPopup}>{product.prdName}</div>
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
                <ProductFooter
                  product={product}
                  business={business}
                  whiteBackground
                />
              </div>
            </div>
          </Portal>
        ) : null}
      </>
    );
  },
);
