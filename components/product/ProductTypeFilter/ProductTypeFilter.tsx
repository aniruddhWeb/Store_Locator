import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { useMediaQueries } from '@react-hook/media-query';
import dynamic from 'next/dynamic';
import { UserLocationToggleForProductCategoryPage } from 'components/common/UserLocationToggleForProductCategoryPage/UserLocationToggleForProductCategoryPage';
import s from './ProductTypeFilter.module.css';
import { Search } from '../../icons/Search';
import { Close } from '../../icons/Close';
import { DropdownArrow } from '../../icons/DropdownArrow';
import { useOutsideDetect } from '../../../utils/window';
import { ProductTypeFilterMobileModal } from './ProductTypeFilterMobileModal';
import { ProductType } from '../../../generated/graphql';
import {
  filterProductSubType,
  filterProductType,
  getProductSubTypes,
} from '../../../hooks/product/useProductFilter';
import { ProductTypeFilterItem } from './ProductTypeFilterItem';
import { formatProductFilter } from '../../../utils/string';
import { Filter } from '../../icons/Filter';
import { ProductSorting } from '../ProductSorting/ProductSorting';

const ProductSubTypeFilterGroup = dynamic<any>(
  () =>
    import('./ProductSubTypeFilterGroup').then(
      mod => mod.ProductSubTypeFilterGroup,
    ),
  {
    ssr: false,
  },
);

interface Props {
  marginTop?: boolean;
  marginBottom?: boolean;
  marginRight?: boolean;
  selectedProductTypes?: string[];
  onSelectProductType?: (type: string | string[]) => void;
  productTypes: ProductType[];
  resetAll?: () => void;
  mobile?: boolean;
  desktop?: boolean;
  search?: string;
  searchVisible?: boolean;
  productCount?: number;
  showAllPricesPriceVisible?: boolean;
  setSearch?: (search: string) => void;
  showAllPrices?: boolean;
  sortingOptions?: { label: string; value: string[] | null }[];
  sorting?: { label: string; value: string[] | null } | null;
  setSorting?: (type: { label: string; value: string[] | null } | null) => void;
  sortVisible?: boolean;
  setShowAllPrices?: (showAllPricesValue: boolean) => void;
  dropdownDirection?: 'top' | 'bottom';
  layoutDirection?: 'vertical' | 'horizontal';
  flexDirection?: 'left' | 'right' | 'center';
  ignoreAvailable?: boolean;
  layoutAbsolute?: boolean;
  strainNames?: string[];
  brandNames?: string[];
  showLocationToggle?: boolean;
  disableLocationToggle?: boolean;
  isLocationToggleLoading?: boolean;
}

export const ProductTypeFilter = React.memo(
  ({
    productTypes,
    onSelectProductType,
    selectedProductTypes,
    marginTop,
    marginBottom,
    marginRight,
    mobile,
    desktop,
    setSearch,
    productCount,
    searchVisible,
    showAllPricesPriceVisible,
    resetAll,
    search,
    showAllPrices,
    setShowAllPrices,
    dropdownDirection = 'bottom',
    layoutDirection = 'vertical',
    flexDirection = 'left',
    sorting,
    sortingOptions,
    setSorting,
    sortVisible,
    ignoreAvailable,
    layoutAbsolute,
    strainNames,
    brandNames,
    showLocationToggle,
    disableLocationToggle,
    isLocationToggleLoading,
  }: Props) => {
    const [typeMenuOpened, setTypeMenuOpened] = useState<boolean>(false);
    const [subTypeMenuOpened, setSubTypeMenuOpened] = useState<boolean>(false);
    const [sortMenuOpened, setSortMenuOpened] = useState<boolean>(false);
    const [inputFocused, setInputFocused] = useState<boolean>(false);

    const onSearchChange = useCallback(
      e => {
        if (setSearch) {
          setSearch(e.target.value);
        }
      },
      [setSearch],
    );

    const onPreventDefault = useCallback(e => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleKeyPress = useCallback(
      async e => {
        if (e.key === 'Enter') {
          e.target.blur();
        }
      },
      [search],
    );

    const onDropdownType = useCallback(
      (e: any) => {
        if (
          (typeof e?.target?.className === 'string' ||
            e?.target?.className instanceof String) &&
          e?.target?.className?.toLowerCase()?.includes('dropdownitem')
        ) {
          return false;
        }
        e.preventDefault();
        e.stopPropagation();
        setTypeMenuOpened(!typeMenuOpened);
        setSortMenuOpened(false);
        setSubTypeMenuOpened(false);
      },
      [typeMenuOpened],
    );

    const closeType = useCallback(() => setTypeMenuOpened(false), []);
    const closeAll = useCallback(() => {
      setTypeMenuOpened(false);
      setSubTypeMenuOpened(false);
      setSortMenuOpened(false);
    }, []);

    const onSearchFocused = useCallback(() => setInputFocused(true), []);
    const onSearchBlur = useCallback(() => setInputFocused(false), []);
    const onSearchClose = useCallback(() => {
      if (setSearch) {
        setSearch('');
      }
    }, [setSearch]);

    const handleTypeSelect = useCallback(
      (e: any, type?: string | string[] | null) => {
        e.preventDefault();
        e.stopPropagation();
        setSubTypeMenuOpened(false);
        if (type && onSelectProductType) {
          onSelectProductType(type);
        }
      },
      [onSelectProductType],
    );

    const resetProductTypesFunc = useCallback(
      e => {
        onPreventDefault(e);
        closeAll();
        if (resetAll) {
          resetAll();
        }
      },
      [closeAll, onPreventDefault, resetAll],
    );

    const resetProductSubTypesFunc = useCallback(
      (e, subCategoryItem: ProductType) => {
        onPreventDefault(e);
        closeAll();
        if (onSelectProductType && subCategoryItem) {
          onSelectProductType(
            (selectedProductTypes || []).filter(
              item => !filterProductSubType(subCategoryItem, item),
            ),
          );
        }
      },
      [closeAll, onPreventDefault, onSelectProductType],
    );

    const toggleShowAllPrices = useCallback(
      () => setShowAllPrices && setShowAllPrices(!showAllPrices),
      [showAllPrices, setShowAllPrices],
    );

    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
    });

    const subProductTypes = useMemo(
      () =>
        getProductSubTypes(productTypes, selectedProductTypes, ignoreAvailable),
      [productTypes, selectedProductTypes, ignoreAvailable],
    );

    const typeFilterText = useMemo(
      () =>
        (selectedProductTypes || [])
          .filter(item =>
            matches.isMobile
              ? true
              : productTypes.some(typeItem =>
                  filterProductType(typeItem, item),
                ),
          )
          .map(item => {
            if (matches.isMobile) {
              const subProduct = subProductTypes.find(typeItem =>
                filterProductSubType(typeItem, item),
              );
              if (subProduct) {
                return item.replace(`${subProduct.name},`, '');
              }
            }
            return item;
          })
          .join(', ') || (matches.isMobile ? 'Filter' : 'Categories'),
      [selectedProductTypes, matches?.isMobile, productTypes, subProductTypes],
    );

    useEffect(() => {
      if (
        matches.isMobile &&
        (typeMenuOpened || subTypeMenuOpened || sortMenuOpened)
      ) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'scroll';
      }
      return () => {
        document.body.style.overflow = 'scroll';
      };
    }, [matches.isMobile, typeMenuOpened, subTypeMenuOpened, sortMenuOpened]);

    const typeDropdownRef = useOutsideDetect(closeType, matches.isMobile);

    const searchContainerClass = cn(s.searchContainer, {
      [s.searchContainerFocused]: inputFocused,
      [s.searchContainerInvisible]: !searchVisible,
    });

    const rootClass = cn(s.root, {
      [s.rootMarginTop]: marginTop,
      [s.rootMarginBottom]: marginBottom,
      [s.rootMarginRight]: marginRight,
      [s.rootRight]: flexDirection === 'right',
      [s.rootCenter]: flexDirection === 'center',
      [s.rootMobile]: mobile,
      [s.rootDesktop]: desktop,
      [s.rootAbsolute]: layoutAbsolute,
    });

    const rootFilterClass = cn(s.rootFilter, {
      [s.rootOverflowVisible]:
        typeMenuOpened ||
        sortMenuOpened ||
        (layoutDirection === 'horizontal' && subTypeMenuOpened),
      [s.rootFilterRight]: flexDirection === 'right',
      [s.rootFilterCenter]: flexDirection === 'center',
    });

    const subRootFilterClass = cn(s.subRootFilter, {
      [s.subRootFilterHorizontal]: layoutDirection === 'horizontal',
      [s.subRootOverflowVisible]: subTypeMenuOpened,
      [s.subRootFilterRight]: flexDirection === 'right',
      [s.subRootFilterCenter]: flexDirection === 'center',
    });

    const dropdownTypeContainerClass = cn(s.dropdownContainer, {
      [s.dropdownContainerSelected]: matches.isMobile
        ? !!selectedProductTypes?.some(item =>
            productTypes.some(typeItem => filterProductType(typeItem, item)),
          ) ||
          !!selectedProductTypes?.some(item =>
            subProductTypes.some(typeItem =>
              filterProductSubType(typeItem, item),
            ),
          )
        : !!selectedProductTypes?.some(item =>
            productTypes.some(typeItem => filterProductType(typeItem, item)),
          ),
      [s.dropdownContainerWithSearchFirst]: searchVisible,
      [s.dropdownContainerWithoutSearchFirst]: !searchVisible,
      [s.dropdownContainerHorizontal]: layoutDirection === 'horizontal',
      [s.dropdownContainerNoShrink]: flexDirection === 'center',
    });

    const dropdownTypeItemsClass = cn(s.dropdownItems, {
      [s.dropdownItemsHidden]: !typeMenuOpened,
      [s.dropdownItemsTop]: dropdownDirection === 'top',
    });

    const dropdownTypeArrowClass = cn(s.dropdownArrow, {
      [s.dropdownArrowOpen]: typeMenuOpened,
    });

    const showAllPricesContainerClass = cn(s.showPriceToggleContainer, {
      [s.showPriceToggleContainerActive]: !!showAllPrices,
    });

    const showAllPricesThumbClass = cn(s.showPriceToggleThumb, {
      [s.showPriceToggleThumbActive]: !!showAllPrices,
    });

    const showPriceWrapperClass = cn(s.showPriceWrapper, {
      [s.showPriceWrapperHidden]: !showAllPricesPriceVisible,
    });

    const showPriceWrapperMobileClass = cn(s.showPriceWrapperMobile, {
      [s.showPriceWrapperHiddenMobile]:
        !showAllPricesPriceVisible || inputFocused,
    });

    const searchPriceContainerClass = cn(s.searchPriceContainer, {
      [s.searchPriceContainerClassHidden]:
        (!showAllPricesPriceVisible || inputFocused) && !searchVisible,
      [s.searchPriceContainerLong]:
        (!productTypes || productTypes.length === 0) &&
        !sortVisible &&
        !showAllPricesPriceVisible,
      [s.searchPriceContainerNoMargin]: flexDirection === 'center',
    });

    const showMobilePopup = useMemo(
      () => typeMenuOpened || subTypeMenuOpened || sortMenuOpened,
      [typeMenuOpened, subTypeMenuOpened, sortMenuOpened],
    );

    const strainNameCategoryItem = useMemo(() => {
      if (!strainNames) return [];

      return {
        name: 'Strain Name',
        slug: 'strain-name',
        counter: strainNames.length,
        categoriesItems: strainNames.map((name: string) => ({
          name,
          available: true,
          categoriesItems: [],
          typeItems: [],
        })),
        available: true,
        id: null,
      };
    }, [strainNames]);

    const brandNameCategoryItem = useMemo(() => {
      if (!brandNames) return [];

      return {
        name: 'Brand',
        slug: 'brand',
        counter: brandNames.length,
        categoriesItems: brandNames.map((name: string) => ({
          name,
          available: true,
          categoriesItems: [],
          typeItems: [],
        })),
        available: true,
        id: null,
      };
    }, [brandNames]);

    return (
      <>
        <div className={rootClass}>
          <div className={rootFilterClass}>
            <UserLocationToggleForProductCategoryPage
              isLoadingExternal={isLocationToggleLoading}
              disableToggle={disableLocationToggle}
              isHidden={!showLocationToggle}
              shouldUnmountIfHidden
            />
            <div className={searchPriceContainerClass}>
              <div
                onClick={toggleShowAllPrices}
                className={showPriceWrapperMobileClass}>
                <div className={s.showPriceText}>Show prices</div>
                <div className={showAllPricesContainerClass}>
                  <div className={showAllPricesThumbClass} />
                </div>
              </div>
              <div className={searchContainerClass}>
                <input
                  className={s.searchInput}
                  placeholder="Search products..."
                  value={search}
                  autoFocus={false}
                  onChange={onSearchChange}
                  onKeyPress={handleKeyPress}
                  onClick={onPreventDefault}
                  onFocus={onSearchFocused}
                  onBlur={onSearchBlur}
                />
                {search ? (
                  <Close
                    fill="rgba(14,94,15,0.5)"
                    className={s.clearSearchIcon}
                    onClick={onSearchClose}
                  />
                ) : (
                  <Search className={s.searchIcon} fill="rgba(14,94,15,0.5)" />
                )}
              </div>
            </div>
            <div className={s.filterSortContainer}>
              <div className={s.mainFiltersContainer}>
                {(productTypes || []).length > 0 ? (
                  <div
                    ref={typeDropdownRef}
                    onClick={onDropdownType}
                    className={dropdownTypeContainerClass}>
                    <div className={s.filterItemContainer}>
                      <Filter className={s.filterIcon} />
                      <div className={s.filterItemText}>
                        {formatProductFilter(typeFilterText)}
                      </div>
                    </div>
                    <DropdownArrow className={dropdownTypeArrowClass} />
                    <div className={dropdownTypeItemsClass}>
                      <div className={s.dropdownScroll}>
                        <div className={s.dropdownScrollItems}>
                          {productTypes.map((productType: ProductType) => (
                            <ProductTypeFilterItem
                              key={productType.name}
                              productType={productType}
                              selectedProductTypes={selectedProductTypes}
                              handleTypeSelect={handleTypeSelect}
                            />
                          ))}
                        </div>
                      </div>
                      {productTypes.length > 0 ? (
                        <>
                          <div className={s.dropdownBorder} />
                          <div
                            onClick={resetProductTypesFunc}
                            className={s.resetButton}>
                            Reset
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                ) : null}
                {layoutDirection === 'horizontal' &&
                subProductTypes.length > 0 ? (
                  <div className={subRootFilterClass}>
                    {subProductTypes.map((subCategoryItem: ProductType) => {
                      if (subCategoryItem.slug === 'strain-name') {
                        return (
                          <ProductSubTypeFilterGroup
                            key={subCategoryItem.name}
                            subCategoryItem={strainNameCategoryItem}
                            subTypeMenuOpened={subTypeMenuOpened}
                            toggleSubTypeMenu={setSubTypeMenuOpened}
                            handleTypeSelect={handleTypeSelect}
                            selectedProductTypes={selectedProductTypes}
                            dropdownDirection={dropdownDirection}
                            resetProductSubTypes={resetProductSubTypesFunc}
                            layoutDirection={layoutDirection}
                          />
                        );
                      }
                      if (subCategoryItem.slug === 'brand') {
                        return (
                          <ProductSubTypeFilterGroup
                            key={subCategoryItem.name}
                            subCategoryItem={brandNameCategoryItem}
                            subTypeMenuOpened={subTypeMenuOpened}
                            toggleSubTypeMenu={setSubTypeMenuOpened}
                            handleTypeSelect={handleTypeSelect}
                            selectedProductTypes={selectedProductTypes}
                            dropdownDirection={dropdownDirection}
                            resetProductSubTypes={resetProductSubTypesFunc}
                            layoutDirection={layoutDirection}
                          />
                        );
                      }
                      return (
                        <ProductSubTypeFilterGroup
                          key={subCategoryItem.name}
                          subCategoryItem={subCategoryItem}
                          subTypeMenuOpened={subTypeMenuOpened}
                          toggleSubTypeMenu={setSubTypeMenuOpened}
                          handleTypeSelect={handleTypeSelect}
                          selectedProductTypes={selectedProductTypes}
                          dropdownDirection={dropdownDirection}
                          resetProductSubTypes={resetProductSubTypesFunc}
                          layoutDirection={layoutDirection}
                        />
                      );
                    })}
                  </div>
                ) : null}
              </div>
              {!sortVisible ? null : (
                <ProductSorting
                  sortingMenuOpened={sortMenuOpened}
                  setSortingMenuOpened={setSortMenuOpened}
                  sortingOptions={sortingOptions}
                  onSelectSorting={setSorting}
                  selectedSorting={sorting}
                  dropdownDirection={dropdownDirection}
                />
              )}
            </div>
            <div
              onClick={toggleShowAllPrices}
              className={showPriceWrapperClass}>
              <div className={s.showPriceText}>Show prices</div>
              <div className={showAllPricesContainerClass}>
                <div className={showAllPricesThumbClass} />
              </div>
            </div>
          </div>
          {layoutDirection === 'vertical' && subProductTypes.length > 0 ? (
            <div className={subRootFilterClass}>
              {subProductTypes.map((subCategoryItem: ProductType) => {
                if (subCategoryItem.slug === 'strain-name') {
                  return (
                    <ProductSubTypeFilterGroup
                      key={subCategoryItem.name}
                      subCategoryItem={strainNameCategoryItem}
                      subTypeMenuOpened={subTypeMenuOpened}
                      toggleSubTypeMenu={setSubTypeMenuOpened}
                      handleTypeSelect={handleTypeSelect}
                      selectedProductTypes={selectedProductTypes}
                      dropdownDirection={dropdownDirection}
                      flexDirection={flexDirection}
                      resetProductSubTypes={resetProductSubTypesFunc}
                    />
                  );
                }
                if (subCategoryItem.slug === 'brand') {
                  return (
                    <ProductSubTypeFilterGroup
                      key={subCategoryItem.name}
                      subCategoryItem={brandNameCategoryItem}
                      subTypeMenuOpened={subTypeMenuOpened}
                      toggleSubTypeMenu={setSubTypeMenuOpened}
                      handleTypeSelect={handleTypeSelect}
                      selectedProductTypes={selectedProductTypes}
                      dropdownDirection={dropdownDirection}
                      flexDirection={flexDirection}
                      resetProductSubTypes={resetProductSubTypesFunc}
                    />
                  );
                }
                return (
                  <ProductSubTypeFilterGroup
                    key={subCategoryItem.name}
                    subCategoryItem={subCategoryItem}
                    subTypeMenuOpened={subTypeMenuOpened}
                    toggleSubTypeMenu={setSubTypeMenuOpened}
                    handleTypeSelect={handleTypeSelect}
                    selectedProductTypes={selectedProductTypes}
                    dropdownDirection={dropdownDirection}
                    flexDirection={flexDirection}
                    resetProductSubTypes={resetProductSubTypesFunc}
                  />
                );
              })}
            </div>
          ) : null}
          {(search ||
            (selectedProductTypes && selectedProductTypes.length > 0)) &&
          productCount ? (
            <div className={s.productCount}>{`Showing ${productCount} product${
              productCount > 1 ? 's' : ''
            }`}</div>
          ) : null}
        </div>
        {matches.isMobile && showMobilePopup ? (
          <ProductTypeFilterMobileModal
            isVisible={showMobilePopup}
            closePopup={closeAll}
            productTypes={productTypes}
            selectedProductTypes={selectedProductTypes}
            onSelectProductType={onSelectProductType}
            resetAll={resetAll}
            sortingOptions={sortingOptions}
            onSelectSorting={setSorting}
            selectedSorting={sorting}
            ignoreAvailable={ignoreAvailable}
          />
        ) : null}
      </>
    );
  },
);
