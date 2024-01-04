import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import isEqual from 'lodash/isEqual';
import s from './ProductTypeFilter.module.css';
import { Button } from '../../common/Button/Button';
import { ProductType } from '../../../generated/graphql';
import {
  filterProductType,
  getProductSubTypes,
} from '../../../hooks/product/useProductFilter';
import { ProductTypeFilterItem } from './ProductTypeFilterItem';
import { Cross } from '../../icons/Cross';
import { ProductSubTypeFilterItem } from './ProductSubTypeFilterItem';
import { Portal } from '../../common/Portal/Portal';

interface Props {
  isVisible: boolean;
  closePopup: () => void;
  selectedProductTypes?: string[];
  onSelectProductType?: (type: string | string[]) => void;
  productTypes: ProductType[];
  resetAll?: () => void;
  sortingOptions?: { label: string; value: string[] | null }[];
  selectedSorting?: { label: string; value: string[] | null } | null;
  onSelectSorting?: (
    type: { label: string; value: string[] | null } | null,
  ) => void;
  ignoreAvailable?: boolean;
  allowSubItemMultiSelect?: boolean;
}

export const ProductTypeFilterMobileModal = React.memo(
  ({
    isVisible,
    closePopup,
    productTypes,
    onSelectProductType,
    selectedProductTypes,
    resetAll,
    selectedSorting,
    onSelectSorting,
    sortingOptions,
    ignoreAvailable,
    allowSubItemMultiSelect,
  }: Props) => {
    const [sorting, setSorting] = useState<{
      label: string;
      value: string[] | null;
    } | null>(selectedSorting || null);
    const [selectedFilters, setSelectedFilters] = useState<string[]>(
      selectedProductTypes || [],
    );

    const subProductTypes = useMemo(
      () => getProductSubTypes(productTypes, selectedFilters, ignoreAvailable),
      [productTypes, selectedFilters, ignoreAvailable],
    );

    useEffect(() => {
      if (!isEqual(selectedProductTypes, selectedFilters)) {
        setSelectedFilters(selectedProductTypes || []);
      }
    }, [selectedProductTypes]);

    useEffect(() => {
      if (!isEqual(sorting, selectedSorting) && selectedSorting !== undefined) {
        setSorting(selectedSorting);
      }
    }, [selectedSorting]);

    const onPreventDefault = useCallback(e => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const closePopupWithPrevent = useCallback(
      (e?: any) => {
        e?.preventDefault();
        e?.stopPropagation();
        closePopup();
      },
      [closePopup],
    );

    const onApplyFilters = useCallback(
      e => {
        e?.preventDefault();
        e?.stopPropagation();
        if (onSelectProductType) {
          onSelectProductType(selectedFilters);
        }
        if (onSelectSorting) {
          onSelectSorting(sorting);
        }
        closePopup();
      },
      [onSelectProductType, sorting, selectedFilters, closePopup],
    );

    const onReset = useCallback(
      (e: any) => {
        onPreventDefault(e);
        closePopup();
        if (resetAll) {
          resetAll();
        }
      },
      [resetAll, onPreventDefault],
    );

    const editFilterState = useCallback(
      (filter: string | string[]) => {
        if (allowSubItemMultiSelect) {
          if (filter && Array.isArray(filter)) {
            setSelectedFilters(filter);
          } else if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter(item => item !== filter));
          } else {
            setSelectedFilters([...selectedFilters, filter]);
          }
        } else if (filter && Array.isArray(filter)) {
          setSelectedFilters(filter);
        } else if (productTypes.some(item => filterProductType(item, filter))) {
          if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter(item => item !== filter));
          } else {
            setSelectedFilters([
              ...selectedFilters.filter(
                item =>
                  !productTypes.some(subItem =>
                    filterProductType(subItem, item),
                  ),
              ),
              filter,
            ]);
          }
        } else if (selectedFilters.includes(filter)) {
          setSelectedFilters(selectedFilters.filter(item => item !== filter));
        } else {
          setSelectedFilters([...selectedFilters, filter]);
        }
      },
      [selectedFilters, productTypes, allowSubItemMultiSelect],
    );

    const handleTypeSelect = useCallback(
      (e: any, type?: string | string[] | null) => {
        e.preventDefault();
        e.stopPropagation();
        if (type) {
          editFilterState(type);
        }
      },
      [editFilterState],
    );

    const handleSortingSelect = useCallback(
      (e: any, option?: { label: string; value: string[] | null }) => {
        e.preventDefault();
        e.stopPropagation();
        if (option !== undefined) {
          setSorting(option);
        }
      },
      [sorting],
    );

    const onScrollModal = useCallback(() => {
      const popup = document.getElementById('filter-popup-modal');
      const close = document.getElementById('filter-mobile-close');
      if (popup && close) {
        if (popup?.scrollTop > 0) {
          close.className = s.filterPopupMobileButtons;
        } else {
          close.className = s.filterPopupMobileButtonsAbsolute;
        }
      }
    }, []);

    const rootClass = cn(s.filterPopupContainerMobile, {
      [s.filterPopupContainerMobileInvisible]: !isVisible,
    });

    return (
      <Portal>
        <div onClick={closePopupWithPrevent} className={rootClass}>
          <div
            id="filter-popup-modal"
            className={s.filterPopupMobile}
            onScroll={onScrollModal}>
            <div
              id="filter-mobile-close"
              className={s.filterPopupMobileButtonsAbsolute}>
              <Cross fill="rgba(0,0,0,0.3)" onClick={closePopupWithPrevent} />
            </div>
            <div className={s.filterBlockContainer}>
              {productTypes.length > 0 ? (
                <div className={s.filterScrollBlock}>
                  <div className={s.filterTitle}>Product categories</div>
                  <div className={s.filterScroll}>
                    {productTypes.map((productType: ProductType) => (
                      <ProductTypeFilterItem
                        key={productType.name}
                        productType={productType}
                        selectedProductTypes={selectedFilters}
                        handleTypeSelect={handleTypeSelect}
                        allowSubItemMultiSelect={allowSubItemMultiSelect}
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
                          selectedProductTypes={selectedFilters}
                          handleTypeSelect={handleTypeSelect}
                          allowSubItemMultiSelect={allowSubItemMultiSelect}
                        />
                      ))}
                    </div>
                  </React.Fragment>
                ),
              )}
              {(sortingOptions || []).length > 0 ? (
                <>
                  <div className={s.filterBlockBorderSort} />
                  <div className={s.filterScrollBlock}>
                    <div className={s.filterTitle}>Sort options</div>
                    <div className={s.filterScroll}>
                      {(sortingOptions || []).map(item => (
                        <div
                          key={item.value?.join('-')}
                          className={s.filterPlainItemContainer}
                          onClick={e => handleSortingSelect(e, item)}>
                          <div className={s.radioInputOrange}>
                            {isEqual(item, sorting) ? (
                              <div className={s.radioCircle} />
                            ) : null}
                          </div>
                          <div
                            className={
                              isEqual(item, sorting)
                                ? s.filterPlainItemSelected
                                : s.filterPlainItem
                            }>
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            <div className={s.buttonContainer}>
              <Button
                onPress={onApplyFilters}
                buttonText="Apply"
                buttonStyle={buttonStyle}
              />
              <div onClick={onReset} className={s.resetButton}>
                Reset
              </div>
            </div>
          </div>
        </div>
      </Portal>
    );
  },
);

const buttonStyle = {
  minHeight: 44,
  padding: 0,
  alignSelf: 'center',
  width: 'calc(100% - 32px)',
};
