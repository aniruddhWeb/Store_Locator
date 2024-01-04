import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useMediaQueries } from '@react-hook/media-query';
import cn from 'classnames';
import s from './ProductTypeFilter.module.css';
import { ProductType } from '../../../generated/graphql';
import {
  filterProductSubType,
  filterProductType,
  getProductSubTypes,
} from '../../../hooks/product/useProductFilter';
import { ProductTypeFilterItem } from './ProductTypeFilterItem';
import { ProductSubTypeFilterItem } from './ProductSubTypeFilterItem';
import { ProductSorting } from '../ProductSorting/ProductSorting';
import { Loader } from '../../common/Loader/Loader';
import { ProductTypeFilterMobileModal } from './ProductTypeFilterMobileModal';
import { Filter } from '../../icons/Filter';
import { formatProductFilter } from '../../../utils/string';
import { DropdownArrow } from '../../icons/DropdownArrow';

interface Props {
  selectedProductTypes?: string[];
  onSelectProductType?: (type: string | string[]) => void;
  productTypes: ProductType[];
  resetAll?: () => void;
  sortingOptions?: { label: string; value: any[] | null }[];
  selectedSorting?: { label: string; value: any[] | null } | null;
  onSelectSorting?: (
    type: { label: string; value: any[] | null } | null,
  ) => void;
  ignoreAvailable?: boolean;
  isLoading?: boolean;
}

export const ProductTypeFilterSide = React.memo(
  ({
    productTypes,
    onSelectProductType,
    selectedProductTypes,
    resetAll,
    selectedSorting,
    onSelectSorting,
    sortingOptions,
    ignoreAvailable,
    isLoading,
  }: Props) => {
    const rootContentRef = useRef<HTMLDivElement | null | undefined>();
    const rootContentOffsetRef = useRef<number>(0);

    const [typeMenuOpened, setTypeMenuOpened] = useState<boolean>(false);
    const [sortMenuOpened, setSortMenuOpened] = useState<boolean>(false);

    const { matches } = useMediaQueries({
      isSmallHeight: 'only screen and (max-height: 860px)',
      isMobile: 'only screen and (max-width: 860px)',
    });

    useEffect(() => {
      if (!matches.isMobile) {
        const mainLayout = document.getElementById('main-content');
        if (mainLayout) {
          mainLayout.style.minHeight = `${Math.max(
            860,
            (rootContentRef.current?.clientHeight || 0) + 340,
          )}px`;
        }
      }
    }, [matches.isMobile, selectedProductTypes]);

    useEffect(() => {
      if (!matches.isMobile) {
        const mainLayout = document.getElementById('main-content');
        if (mainLayout) {
          mainLayout.style.minHeight = `${Math.max(
            860,
            (rootContentRef.current?.clientHeight || 0) + 340,
          )}px`;
        }
      }
      const onScroll = () => {
        if (window.pageYOffset && !rootContentOffsetRef.current) {
          rootContentOffsetRef.current =
            rootContentRef.current?.clientHeight || 0;
        }
        const footerHeight =
          document.getElementById('footer')?.offsetHeight || 0;
        if (
          (window.pageYOffset || document.documentElement.scrollTop) +
            (464 - (matches.isSmallHeight ? 87 : 0)) +
            rootContentOffsetRef.current >=
          document.documentElement.scrollHeight - footerHeight
        ) {
          if (rootContentRef.current) {
            rootContentRef.current.style.top = `${
              document.documentElement.scrollHeight -
              rootContentOffsetRef.current -
              footerHeight -
              (window.pageYOffset || document.documentElement.scrollTop) -
              60 -
              (matches.isSmallHeight ? 87 : 0)
            }px`;
          }
        } else if (rootContentRef.current) {
          rootContentRef.current.style.top = matches.isSmallHeight
            ? '317px'
            : '402px';
        }
      };

      const onResize = () => {
        if (window.pageYOffset) {
          rootContentOffsetRef.current =
            rootContentRef.current?.clientHeight || 0;
        }
        const footerHeight =
          document.getElementById('footer')?.offsetHeight || 0;
        if (
          (window.pageYOffset || document.documentElement.scrollTop) +
            (464 - (matches.isSmallHeight ? 87 : 0)) +
            rootContentOffsetRef.current >=
          document.documentElement.scrollHeight - footerHeight
        ) {
          if (rootContentRef.current) {
            rootContentRef.current.style.top = `${
              document.documentElement.scrollHeight -
              rootContentOffsetRef.current -
              footerHeight -
              (window.pageYOffset || document.documentElement.scrollTop) -
              60 -
              (matches.isSmallHeight ? 87 : 0)
            }px`;
          }
        } else if (rootContentRef.current) {
          rootContentRef.current.style.top = matches.isSmallHeight
            ? '317px'
            : '402px';
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });

      return () => {
        rootContentOffsetRef.current = 0;
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      };
    }, [matches.isSmallHeight, matches.isMobile]);

    const subProductTypes = useMemo(
      () =>
        getProductSubTypes(productTypes, selectedProductTypes, ignoreAvailable),
      [productTypes, selectedProductTypes, ignoreAvailable],
    );

    const handleTypeSelect = useCallback(
      (e: any, type?: string | string[] | null) => {
        e.preventDefault();
        e.stopPropagation();
        if (onSelectProductType && type) {
          onSelectProductType(type);
        }
      },
      [onSelectProductType],
    );

    const showMobilePopup = useMemo(
      () => typeMenuOpened || sortMenuOpened,
      [typeMenuOpened, sortMenuOpened],
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
      },
      [typeMenuOpened],
    );

    const closeAll = useCallback(() => {
      setTypeMenuOpened(false);
      setSortMenuOpened(false);
    }, []);

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
      [s.dropdownContainerWithoutSearchFirst]: toString(),
    });

    const dropdownTypeArrowClass = cn(s.dropdownArrow, {
      [s.dropdownArrowOpen]: typeMenuOpened,
    });

    return (
      <>
        <div
          ref={rootContentRef as MutableRefObject<HTMLDivElement>}
          className={s.sideFilterContainer}>
          {isLoading ? (
            <Loader size={40} />
          ) : (
            <>
              <div className={s.desktopFilterContainer}>
                {(sortingOptions || []).length > 0 ? (
                  <div className={s.sideFilterSortContainer}>
                    <ProductSorting
                      fullWidth
                      sortingMenuOpened={sortMenuOpened}
                      setSortingMenuOpened={setSortMenuOpened}
                      sortingOptions={sortingOptions}
                      onSelectSorting={onSelectSorting}
                      selectedSorting={selectedSorting}
                      dropdownDirection="bottom"
                    />
                  </div>
                ) : null}
                <div className={s.sideFilterBlockContainer}>
                  {productTypes.length > 0 ? (
                    <div className={s.filterScrollBlock}>
                      <div className={s.filterTitle}>Product categories</div>
                      <div className={s.filterScroll}>
                        {productTypes.map((productType: ProductType) => (
                          <ProductTypeFilterItem
                            key={productType.name}
                            productType={productType}
                            selectedProductTypes={selectedProductTypes}
                            handleTypeSelect={handleTypeSelect}
                            allowSubItemMultiSelect
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {subProductTypes.map((subProduct: ProductType) =>
                    ((subProduct?.categoriesItems || []) as ProductType[])
                      .length === 0 ? null : (
                      <React.Fragment key={`filter-group-${subProduct.name}`}>
                        <div className={s.filterBlockBorder} />
                        <div className={s.filterBlock}>
                          <div className={s.filterTitle}>{subProduct.name}</div>
                          {(
                            (subProduct?.categoriesItems || []) as ProductType[]
                          ).map((typeItem: ProductType) => (
                            <ProductSubTypeFilterItem
                              key={typeItem.name}
                              productType={typeItem}
                              productTypePrefix={`${subProduct?.name},`}
                              selectedProductTypes={selectedProductTypes}
                              handleTypeSelect={handleTypeSelect}
                              allowSubItemMultiSelect
                            />
                          ))}
                        </div>
                      </React.Fragment>
                    ),
                  )}
                </div>
                <div className={s.sideButtonContainer}>
                  <div onClick={resetAll} className={s.resetButton}>
                    Reset
                  </div>
                </div>
              </div>
              <div className={s.mobileFilterContainer}>
                <div className={s.mainFiltersContainer}>
                  {(productTypes || []).length > 0 ? (
                    <div
                      onClick={onDropdownType}
                      className={dropdownTypeContainerClass}>
                      <div className={s.filterItemContainer}>
                        <Filter className={s.filterIcon} />
                        <div className={s.filterItemText}>
                          {formatProductFilter(typeFilterText)}
                        </div>
                      </div>
                      <DropdownArrow className={dropdownTypeArrowClass} />
                    </div>
                  ) : null}
                </div>
                {(sortingOptions || []).length > 0 ? (
                  <ProductSorting
                    sortingMenuOpened={sortMenuOpened}
                    setSortingMenuOpened={setSortMenuOpened}
                    sortingOptions={sortingOptions}
                    onSelectSorting={onSelectSorting}
                    selectedSorting={selectedSorting}
                    dropdownDirection="bottom"
                  />
                ) : null}
              </div>
            </>
          )}
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
            onSelectSorting={onSelectSorting}
            selectedSorting={selectedSorting}
            ignoreAvailable={ignoreAvailable}
            allowSubItemMultiSelect
          />
        ) : null}
      </>
    );
  },
);
