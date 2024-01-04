import React, { useMemo } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import s from './BreadCrumb.module.css';

import {
  BreadCrumbType,
  useBreadCrumbDynamic,
} from '../../../services/breadCrumb';
import { capitalizeWords } from '../../../utils/string';

interface Props {
  mobile?: boolean;
  desktop?: boolean;
  small?: boolean;
  smallAlways?: boolean;
  breadCrumbs: BreadCrumbType[];
  currentPath: string;
  currentSub: string;
  currentTitle: string;
  footer?: any;
  clickableLast?: boolean;
  hideSub?: boolean;
  hidePath?: boolean;
  noIndex?: boolean;
  marginTop?: boolean;
}

export const BreadCrumb = React.memo(
  ({
    smallAlways = false,
    small = false,
    footer = null,
    mobile = false,
    desktop = false,
    clickableLast = false,
    hideSub = false,
    hidePath = false,
    noIndex: noIndexProp = false,
    marginTop = false,
    ...props
  }: Props) => {
    const {
      noIndex,
      canonicalLink,
      seoBreadcrumb,
      seoBusiness,
      seoProduct,
      breadCrumbs,
      currentTitle,
      currentSub,
      currentPath,
      metaTags,
    } = useBreadCrumbDynamic(props);

    const breadcrumbContainerClass = cn(s.breadcrumbContainer, {
      [s.breadcrumbContainerSmall]: small,
      [s.breadcrumbContainerSmallAlways]: smallAlways,
      [s.breadcrumbContainerMobile]: mobile,
      [s.breadcrumbContainerDesktop]: desktop,
      [s.breadcrumbContainerMarginTop]: marginTop,
    });

    const breadcrumbNavigationClass = cn(s.breadcrumbNavigation, {
      [s.breadcrumbNavigationSmall]: small || smallAlways,
      [s.breadcrumbNavigationFooter]: !!footer,
    });

    const breadcrumbCurrentItemClass = cn(s.breadcrumbCurrentItem, {
      [s.breadcrumbCurrentItemSmall]: small || smallAlways,
    });

    const breadcrumbCurrentSlugClass = cn(s.breadcrumbCurrentSlug, {
      [s.breadcrumbCurrentSlugSmall]: small || smallAlways,
    });

    const seoTitle = useMemo(() => `${currentTitle}`, [currentTitle]);

    const seoTwitterCardType = useMemo(
      () =>
        (metaTags?.customImages || []).length > 0
          ? {
              cardType: 'summary_large_image',
            }
          : undefined,
      [metaTags?.customImages],
    );

    if (!breadCrumbs || breadCrumbs.length === 0) {
      return null;
    }
    return (
      <>
        <NextSeo
          title={capitalizeWords(seoTitle)}
          description={capitalizeWords(metaTags?.metaDescription)}
          noindex={noIndexProp || noIndex}
          canonical={canonicalLink}
          twitter={seoTwitterCardType}
          openGraph={{
            images: metaTags?.customImages,
            defaultImageHeight: 175,
            defaultImageWidth: 175,
            title: metaTags?.metaTitle,
            description: metaTags?.metaDescription,
          }}
        />
        {seoBreadcrumb ? (
          <Head>
            <script
              type="application/ld+json"
              key="seoBreadcrumb"
              dangerouslySetInnerHTML={seoBreadcrumb}
            />
          </Head>
        ) : null}
        {seoBusiness ? (
          <Head>
            <script
              type="application/ld+json"
              key="seoBusiness"
              dangerouslySetInnerHTML={seoBusiness}
            />
          </Head>
        ) : null}
        {seoProduct ? (
          <Head>
            <script
              type="application/ld+json"
              key="seoProduct"
              dangerouslySetInnerHTML={seoProduct}
            />
          </Head>
        ) : null}
        <div
          onClick={e => e.stopPropagation()}
          className={breadcrumbContainerClass}>
          <nav className={breadcrumbNavigationClass} aria-label="breadCrumbs">
            <div className={s.breadcrumbTopContainer}>
              {breadCrumbs.map((breadcrumb, i) => {
                if (
                  breadcrumb.clickable ||
                  (i === breadCrumbs.length - 1 && clickableLast)
                ) {
                  return (
                    <div
                      key={breadcrumb.breadcrumb}
                      className={s.breadcrumbListItemContainer}>
                      {i === 0 ? null : (
                        <div className={s.breadcrumbListItemSeparator}>/</div>
                      )}
                      <Link
                        key={breadcrumb.breadcrumb}
                        href={breadcrumb.href}
                        prefetch={false}>
                        <a
                          href={breadcrumb.href}
                          onClick={e => e.stopPropagation()}
                          className={
                            clickableLast || i !== breadCrumbs.length - 1
                              ? s.breadcrumbListInActiveItem
                              : s.breadcrumbListActiveItem
                          }>
                          {breadcrumb.breadcrumb}
                        </a>
                      </Link>
                    </div>
                  );
                }
                return (
                  <div
                    key={breadcrumb.breadcrumb}
                    className={s.breadcrumbListItemContainer}>
                    <div className={s.breadcrumbListItemSeparator}>/</div>
                    <div className={s.breadcrumbListActiveItemWithoutAnimation}>
                      {breadcrumb.breadcrumb}
                    </div>
                  </div>
                );
              })}
            </div>
            {small || smallAlways || hidePath ? null : (
              <h1 className={breadcrumbCurrentItemClass}>{currentPath}</h1>
            )}
            {hideSub || small || smallAlways || !currentSub ? null : (
              <div className={breadcrumbCurrentSlugClass}>{currentSub}</div>
            )}
          </nav>
          {footer}
        </div>
      </>
    );
  },
);
