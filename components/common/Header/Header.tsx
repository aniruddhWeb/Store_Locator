import React, {
  useState,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  MutableRefObject,
} from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useMediaQueries } from '@react-hook/media-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import s from './Header.module.css';
import { Route } from '../../../config/Routes';
import { HeaderSearch } from '../HeaderSerch/HeaderSearch';
import { HeaderSearchButton } from '../HeaderSerch/HeaderSearchButton';
import { useLayoutPageLoading } from '../../../services/app';
import { useCurrentLocationDynamic } from '../../../services/location';
import { useCurrentUserDynamic } from '../../../services/user';
import {
  getCategoryItems,
  getNavItems,
  TCategoryBarItems,
  TNavBarItems,
} from './headerData';
import { useDebounce } from '../../../utils/debounce';
import { getCleanUrl } from '../../../utils/link';
import { MapSelect } from '../../icons/MapSelect';
import { MapLocation } from '../../icons/MapLocation';
import { Hamburger } from '../../icons/Hamburger';
import { LogoTitle } from '../../icons/LogoTitle';
import { Chevron } from '../../icons/Chevron';
import { hasWindow } from '../../../utils/window';

const UserMenu = dynamic<any>(
  () => import('../../user/UserMenu/UserMenu').then(mod => mod.UserMenu),
  {
    ssr: false,
  },
);

const HeaderMenu = dynamic<any>(
  () => import('./HeaderMenu').then(mod => mod.HeaderMenu),
  {
    ssr: false,
  },
);

const HeaderProductMenu = dynamic<any>(
  () => import('./HeaderProductMenu').then(mod => mod.HeaderProductMenu),
  {
    ssr: false,
  },
);

interface Props {
  toggleLocationSelect: () => void;
  toggleSearch: () => void;
  closePopups: () => void;
  isSearchVisible: boolean;
  isPageLoadingExternal?: boolean;
  categories: any[];
  categoryBanners: any[];
  isHeaderNav: boolean;
  isScrollingDown?: boolean;
  shouldRemoveByAppleGuidelines: boolean;
}

export const Header: FC<Props> = props => {
  const router = useRouter();

  const { selectedLocation: location } = useCurrentLocationDynamic();
  const userProps = useCurrentUserDynamic(true);
  const { isPageLoading: isPageLoadingState } = useLayoutPageLoading();
  const isPageLoading = useMemo(
    () => props.isPageLoadingExternal || isPageLoadingState,
    [props.isPageLoadingExternal, isPageLoadingState],
  );

  const [isSearchInputActive, setIsSearchInputActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProductTypeValue, setSelectedProductType] =
    useState<TCategoryBarItems | null>(null);
  const [selectedProductType, setSelectedProductTypeDirect] = useDebounce(
    selectedProductTypeValue,
    150,
  );

  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 860px)',
  });

  useEffect(() => {
    if (!matches.isMobile) {
      setMenuOpen(false);
    } else {
      setIsSearchInputActive(false);
    }
    if (!matches.isMobile && props.isSearchVisible) {
      props.toggleSearch();
    }
  }, [matches.isMobile, props.toggleSearch]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const toggleLocationSelect = useCallback(() => {
    setMenuOpen(false);
    props.toggleLocationSelect();
  }, [props.toggleLocationSelect]);

  const toggleSearch = useCallback(() => {
    setMenuOpen(false);
    if (matches.isMobile) {
      props.toggleSearch();
    }
  }, [props.toggleLocationSelect, matches.isMobile]);

  const categoryItems = useMemo(() => {
    const items = getCategoryItems(
      props.categories,
      props.categoryBanners,
      props.shouldRemoveByAppleGuidelines ||
        (hasWindow && !!(window as any)?.ReactNativeWebView),
    );
    return (items || []).map(item => ({
      ...item,
      selected: router.asPath.includes(getCleanUrl(item.href)),
    }));
  }, [
    props.categories,
    props.categoryBanners,
    props.shouldRemoveByAppleGuidelines,
  ]);
  const navItems = useMemo(() => getNavItems(location), [location]);

  const onPressLogo = useCallback(() => {
    if (props.isSearchVisible) {
      props.toggleSearch();
    }
  }, [props.isSearchVisible, props.toggleSearch]);

  const closePopups = useCallback(() => {
    props.closePopups();
  }, [props.closePopups]);

  const closeProductMenu = useCallback(() => {
    setSelectedProductTypeDirect(null);
    setSelectedProductType(null);
  }, []);

  const backProductMenu = useCallback(() => {
    setSelectedProductTypeDirect(null);
    setSelectedProductType(null);
    setMenuOpen(true);
  }, []);

  const setSelectedCategoryItem = useCallback(
    (categoryItem: TCategoryBarItems | null) => {
      setSelectedProductTypeDirect(categoryItem);
      setSelectedProductType(categoryItem);
    },
    [],
  );

  const productCategoryScrollRef = useRef<HTMLDivElement>();
  const categoryScrollRef = useRef<HTMLDivElement>();
  const productCategoryScrollOffsetRef = useRef<number>(0);
  const categoryScrollOffsetRef = useRef<number>(0);
  const [productCategoryArrowDisabled, setProductCategoryArrowDisabled] =
    useState<boolean>(false);
  const [categoryArrowDisabled, setCategoryArrowDisabled] =
    useState<boolean>(false);

  const onProductCategoryScroll = useCallback((event: any) => {
    productCategoryScrollOffsetRef.current =
      event?.target?.scrollLeft || productCategoryScrollOffsetRef.current || 0;
    if (
      productCategoryScrollRef.current?.scrollWidth &&
      productCategoryScrollOffsetRef.current + (window.innerWidth || 0) <
        productCategoryScrollRef.current?.scrollWidth - 24
    ) {
      setProductCategoryArrowDisabled(false);
    }
    if (
      productCategoryScrollRef.current?.scrollWidth &&
      productCategoryScrollOffsetRef.current + (window.innerWidth || 0) >=
        productCategoryScrollRef.current?.scrollWidth - 24
    ) {
      setProductCategoryArrowDisabled(true);
    }
  }, []);

  const onCategoryScroll = useCallback((event: any) => {
    categoryScrollOffsetRef.current =
      event?.target?.scrollLeft || categoryScrollOffsetRef.current || 0;
    if (
      categoryScrollRef.current?.scrollWidth &&
      categoryScrollOffsetRef.current + (window.innerWidth || 0) <
        categoryScrollRef.current?.scrollWidth - 24
    ) {
      setCategoryArrowDisabled(false);
    }
    if (
      categoryScrollRef.current?.scrollWidth &&
      categoryScrollOffsetRef.current + (window.innerWidth || 0) >=
        categoryScrollRef.current?.scrollWidth - 24
    ) {
      setCategoryArrowDisabled(true);
    }
  }, []);

  const onScrollProductCategoryRight = useCallback(() => {
    productCategoryScrollRef.current?.scrollTo({
      left: productCategoryScrollRef?.current?.scrollWidth || 0,
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const onScrollCategoryRight = useCallback(() => {
    categoryScrollRef.current?.scrollTo({
      left: categoryScrollRef?.current?.scrollWidth || 0,
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (matches.isMobile) {
      setProductCategoryArrowDisabled(false);
    }
  }, [matches]);

  const hideSearchBarForMobile = useMemo(
    () =>
      router.pathname === Route.Search || router.pathname === Route.HeavySearch,
    [router.pathname],
  );

  const itemsBottomClass = cn(s.itemsBottom, {
    [s.itemsBottomNoBorder]: isPageLoading,
    [s.activeSearchBox]: isSearchInputActive,
  });

  const itemsBottomCategoriesClass = cn(s.itemsBottom, {
    [s.itemsBottomCategories]: true,
    [s.activeSearchBox]: isSearchInputActive,
    [s.itemsBottomCategoriesNoMargin]: hideSearchBarForMobile,
  });

  const itemsTopClass = cn(s.itemsTopContainer, {
    [s.activeSearchBoxBorder]: isSearchInputActive,
  });

  const mobileLocationHeaderClass = cn(s.mobileLocationHeader, {
    [s.mobileLocationHeaderNoBorder]: isPageLoading,
  });

  const rootClass = cn(s.root, {
    [s.rootScrolled]: props.isScrollingDown || isPageLoading,
    [s.rootNoSearch]: hideSearchBarForMobile,
  });

  const titleClass = cn(s.title, {
    [s.activeSearchBox]: isSearchInputActive,
  });

  const productCategoryScrollArrowClass = cn(s.categoryScrollArrow, {
    [s.categoryScrollArrowHidden]: productCategoryArrowDisabled,
  });

  const categoryScrollArrowClass = cn(s.categoryScrollArrow, {
    [s.categoryScrollArrowWhite]: true,
    [s.categoryScrollArrowHidden]: categoryArrowDisabled,
  });

  return (
    <>
      <div id="header" className={s.rootContainer}>
        <div className={rootClass}>
          <div className={itemsTopClass}>
            <div className={s.itemsTop}>
              <div className={s.itemContainer}>
                <div className={s.leftColumn}>
                  <Link prefetch={false} href={Route.Map}>
                    <a href={Route.Map} className={s.showMap}>
                      <MapSelect fill="#EF845C" className={s.search} />
                      <div className={s.textIcon}>Show Map</div>
                    </a>
                  </Link>
                  <div
                    onClick={toggleLocationSelect}
                    className={s.locationContainer}>
                    <MapLocation className={s.mapLocationIcon} />
                    <div className={s.textIconLeft}>{`${location?.plName}${
                      location?.province?.plInitials
                        ? `, ${location?.province?.plInitials}`
                        : ''
                    }`}</div>
                  </div>
                  <Hamburger
                    className={s.hamburgerButton}
                    onClick={toggleMenu}
                  />
                </div>
              </div>
              <Link prefetch={false} href={Route.Root}>
                <a
                  aria-label="logo-title"
                  onClick={onPressLogo}
                  href={Route.Root}
                  className={titleClass}>
                  <LogoTitle />
                </a>
              </Link>
              <div className={s.itemContainer}>
                <div className={s.rightColumn}>
                  <UserMenu
                    isVisible={!menuOpen}
                    closePopups={closePopups}
                    {...userProps}
                  />
                  <HeaderSearch
                    isSearchInputActive={isSearchInputActive}
                    setIsSearchInputActive={setIsSearchInputActive}
                  />
                  {!userProps?.currentUser ? (
                    <a href={Route.RegisterUser} className={s.registerButton}>
                      Sign Up
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className={s.headerItems}>
            <HeaderSearchButton onClickSearch={toggleSearch} />
            <div className={itemsBottomCategoriesClass}>
              <nav
                onScroll={onProductCategoryScroll}
                ref={
                  productCategoryScrollRef as MutableRefObject<HTMLDivElement>
                }
                className={s.productNavigationItems}>
                {categoryItems.map(
                  (current: TCategoryBarItems & { selected: boolean }) => {
                    return (
                      <div
                        key={current.title}
                        className={
                          (!selectedProductType && current?.selected) ||
                          selectedProductType?.title === current?.title
                            ? s.categoryLinkSelected
                            : s.categoryLink
                        }
                        onClick={() => router.push(current.href)}
                        onMouseEnter={
                          matches?.isMobile
                            ? undefined
                            : () => setSelectedProductType(current)
                        }
                        onMouseLeave={
                          selectedProductType || matches?.isMobile
                            ? undefined
                            : () => setSelectedProductType(null)
                        }>
                        {current.title}
                      </div>
                    );
                  },
                )}
              </nav>
              <div
                onClick={onScrollProductCategoryRight}
                className={productCategoryScrollArrowClass}>
                <Chevron fill="#FFFFFF" className={s.chevronRight} />
              </div>
            </div>
            <div className={itemsBottomClass}>
              <nav
                onScroll={onCategoryScroll}
                ref={categoryScrollRef as MutableRefObject<HTMLDivElement>}
                className={s.navigationItems}>
                {navItems.map((current: TNavBarItems) => {
                  return (
                    <Link
                      key={current.title}
                      prefetch={false}
                      href={current.href}>
                      <a className={s.link}>{current.title}</a>
                    </Link>
                  );
                })}
              </nav>
              <div
                onClick={onScrollCategoryRight}
                className={categoryScrollArrowClass}>
                <Chevron fill="#000000" className={s.chevronRight} />
              </div>
            </div>
            <div
              className={mobileLocationHeaderClass}
              onClick={toggleLocationSelect}>
              <MapLocation className={s.locationIconHeader} />
              <div className={s.textIconLeftHeader}>{`${location?.plName}${
                location?.province?.plInitials
                  ? `, ${location?.province?.plInitials}`
                  : ''
              }`}</div>
            </div>
          </div>
        </div>
      </div>
      {menuOpen ? (
        <HeaderMenu
          toggleMenu={toggleMenu}
          toggleLocationSelect={props.toggleLocationSelect}
          toggleSearch={props.toggleSearch}
          categoryItems={categoryItems}
          setSelectedCategoryItem={setSelectedCategoryItem}
        />
      ) : null}
      {selectedProductType ? (
        <HeaderProductMenu
          isVisible={!!selectedProductType}
          closeProductMenu={closeProductMenu}
          backProductMenu={backProductMenu}
          categoryItems={selectedProductType}
        />
      ) : null}
    </>
  );
};
