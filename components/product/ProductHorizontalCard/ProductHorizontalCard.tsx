import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMediaQueries } from '@react-hook/media-query';
import cn from 'classnames';
import { ProductStatusMarker } from 'components/common/ProductStatusMarker/ProductStatusMarker';
import { Business, Product } from '../../../generated/graphql';
import s from './ProductHorizontalCard.module.css';
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
import { Portal } from '../../common/Portal/Portal';
import { hasWindow } from '../../../utils/window';

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
  product?: Product;
  business?: Business;
  showAllPrices?: boolean;
  maxPriceCount?: number;
  scroll?: boolean;
  shouldShowBrandDiscontinued?: boolean;
}

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const ProductHorizontalCard = React.memo(
  ({
    business,
    product,
    showAllPrices,
    maxPriceCount,
    scroll = false,
    shouldShowBrandDiscontinued,
  }: Props) => {
    const router = useRouter();

    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
    });

    const productHref = useMemo(() => {
      if (!product) {
        return `${getCleanUrl(router.asPath)}`;
      }
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

    const rootHeightStyle = useMemo(() => {
      if (!showAllPrices) {
        return undefined;
      }
      if (maxPriceCount && maxPriceCount > 1) {
        return {
          height:
            (matches.isMobile ? 216 : 240) +
            (matches.isMobile ? 32 : 40) *
              Math.max(0, maxPriceCount - (matches.isMobile ? 2 : 1)),
        };
      }
      return {
        height: matches.isMobile ? 216 : 240,
      };
    }, [maxPriceCount, matches.isMobile, showAllPrices]);

    const productImageClass = cn(s.productImage, {
      [s.productImageGray]: !showProductPrice,
    });

    const priceBusinessContainerClass = cn(s.priceBusinessContainer, {
      [s.priceBusinessContainerNoMargin]: showAllPrices,
    });

    const productDetailsRowContainerClass = cn(s.productDetailsRowContainer, {
      [s.productDetailsRowContainerWrap]:
        showAllPrices && maxPriceCount && maxPriceCount > 1,
    });

    const productImagePopupClass = cn(
      s.productImageContainerPopup,
      s.productImage,
    );

    return (
      <>
        <Link prefetch={false} scroll={scroll} href={productHref}>
          <a className={s.root} style={rootHeightStyle} href={productHref}>
            <div className={s.cardRow}>
              {!business?.bizClaim && !business?.bizClaimUnblurred ? (
                <div className={s.productImageContainer}>
                  <img
                    src={getImageLink(product?.mdaLocalFileName)}
                    onError={setDefaultImageOnError}
                    className={productImageClass}
                    alt={product?.prdName}
                  />
                  <div className={s.outOfStockContainer}>
                    <ProductStatusMarker
                      product={product}
                      business={business}
                      shouldShowBrandDiscontinued={shouldShowBrandDiscontinued}
                    />
                  </div>
                </div>
              ) : (
                <div className={s.productImageClaim} />
              )}
              <div className={s.cardContent}>
                {!business?.bizClaim &&
                !business?.bizClaimUnblurred &&
                product ? (
                  <>
                    <div className={s.typeBusiness}>
                      {transformProductType(product?.prdProductTypes)}
                    </div>
                    <div className={s.nameBusiness}>{product?.prdName}</div>
                    <div className={priceBusinessContainerClass}>
                      {business?.plType ===
                      BusinessType.BrandType ? null : showProductPrice ? (
                        showAllPrices ? (
                          <ProductFooter
                            insideProductCard
                            removePriceText
                            whiteBackground
                            noMargin
                            noPadding
                            product={product}
                            business={business}
                          />
                        ) : (
                          <>
                            <div className={s.priceBusiness}>
                              {formatPrice(
                                productPrice.value,
                                productPrice.key,
                              )}
                            </div>
                            <div
                              onClick={onPriceMoreOpen}
                              className={s.priceMoreContainer}>
                              {formatPrice(
                                productPrice.value,
                                productPrice.key,
                              ) !== '—' &&
                                hasMultiplePrices(product) && (
                                  <More
                                    data-tip
                                    data-for={`price-tooltip-${product?.prdProductID}`}
                                    className={s.priceMoreImage}
                                  />
                                )}
                            </div>
                          </>
                        )
                      ) : (
                        <div className={s.priceBusinessOutStock}>
                          Out of Stock
                        </div>
                      )}
                    </div>
                    <div className={s.rateDetailsDesktop}>
                      <div className={s.rate}>
                        {product?.rvwCount ? (
                          <>
                            <DynamicStarRatings
                              numberOfStars={5}
                              starDimension="16px"
                              starSpacing="1px"
                              rating={product?.rvwScoreAvg || 0}
                              starRatedColor="#DFB300"
                              starEmptyColor="#E4E9E8"
                            />
                            <div className={s.reviewCount}>
                              {product?.rvwCount}
                            </div>
                          </>
                        ) : (
                          <div className={s.noReview}>NO REVIEWS</div>
                        )}
                      </div>
                      <div className={s.productDetailsRowContainer}>
                        {product?.prdTHCPercentage !== undefined &&
                        product?.prdTHCPercentage !== null ? (
                          <div className={s.productDetailsContainer}>
                            <div className={s.productDetailsTitle}>THC</div>
                            <div className={s.productDetailsValue}>
                              {product?.prdTHCPercentage}
                            </div>
                          </div>
                        ) : null}
                        {product?.prdCBDPercentage !== undefined &&
                        product?.prdCBDPercentage !== null ? (
                          <div className={s.productDetailsContainer}>
                            <div className={s.productDetailsTitle}>CBD</div>
                            <div className={s.productDetailsValue}>
                              {product?.prdCBDPercentage}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={s.productClaimContainer}>
                    <div className={s.productClaimBarLong} />
                    <div className={s.productClaimBar} />
                    <div className={s.productClaimBarShort} />
                    <div className={s.productClaimBar} />
                    <div className={s.productClaimBarShort} />
                  </div>
                )}
              </div>
            </div>
            {business?.bizClaim && business?.bizClaimUnblurred ? null : (
              <div className={s.rateDetailsMobile}>
                <div className={s.rate}>
                  {product?.rvwCount ? (
                    <>
                      <DynamicStarRatings
                        numberOfStars={5}
                        starDimension="16px"
                        starSpacing="1px"
                        rating={product?.rvwScoreAvg || 0}
                        starRatedColor="#DFB300"
                        starEmptyColor="#E4E9E8"
                      />
                      <div className={s.reviewCount}>{product?.rvwCount}</div>
                    </>
                  ) : (
                    <div className={s.noReview}>NO REVIEWS</div>
                  )}
                </div>
                <div className={productDetailsRowContainerClass}>
                  {product?.prdTHCPercentage !== undefined &&
                  product?.prdTHCPercentage !== null ? (
                    <div className={s.productDetailsContainer}>
                      <div className={s.productDetailsTitle}>THC</div>
                      <div className={s.productDetailsValue}>
                        {product?.prdTHCPercentage}
                      </div>
                    </div>
                  ) : null}
                  {product?.prdCBDPercentage !== undefined &&
                  product?.prdCBDPercentage !== null ? (
                    <div className={s.productDetailsContainer}>
                      <div className={s.productDetailsTitle}>CBD</div>
                      <div className={s.productDetailsValue}>
                        {product?.prdCBDPercentage}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </a>
        </Link>
        {business?.bizClaim ||
        business?.bizClaimUnblurred ||
        showAllPrices ||
        !product ? null : (
          <ReactTooltip
            className={s.priceBusinessPopupToolTip}
            place="bottom"
            id={`price-tooltip-${product?.prdProductID}`}>
            <div className={s.priceBusinessPopup}>
              <ProductFooter
                product={product}
                business={business}
                whiteBackground
              />
            </div>
          </ReactTooltip>
        )}
        {showMorePopup && product ? (
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
                  src={getImageLink(product?.mdaLocalFileName)}
                  onError={setDefaultImageOnError}
                  className={productImagePopupClass}
                  alt={product?.prdName}
                />
                <div className={s.nameBusinessPopup}>{product?.prdName}</div>
                <div className={s.rate}>
                  {product?.rvwCount ? (
                    <>
                      <DynamicStarRatings
                        numberOfStars={5}
                        starDimension="16px"
                        starSpacing="1px"
                        rating={product?.rvwScoreAvg || 0}
                        starRatedColor="#DFB300"
                        starEmptyColor="#E4E9E8"
                      />
                      <div className={s.reviewCount}>{product?.rvwCount}</div>
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
