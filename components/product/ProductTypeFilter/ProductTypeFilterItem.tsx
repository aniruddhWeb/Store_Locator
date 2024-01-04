import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';
import s from './ProductTypeFilter.module.css';
import { filterProductType } from '../../../hooks/product/useProductFilter';
import { ChevronLeft } from '../../icons/ChevronLeft';
import { ProductType } from '../../../generated/graphql';

interface Props {
  productTypePrefix?: string | null;
  productType: ProductType | null | undefined;
  handleTypeSelect: (
    e: any,
    productTypeString: string | string[] | null | undefined,
  ) => void;
  selectedProductTypes?: string[];
  depthLevel?: number;
  allowSubItemMultiSelect?: boolean;
  noPadding?: boolean;
}

export const ProductTypeFilterItem = ({
  productTypePrefix,
  productType,
  selectedProductTypes,
  handleTypeSelect,
  depthLevel = 0,
  noPadding = false,
  allowSubItemMultiSelect = false,
}: Props) => {
  const dropdownStyle = useMemo(() => {
    return {
      width: `calc(100% - ${
        noPadding
          ? depthLevel > 0
            ? 24 * depthLevel
            : 0
          : 48 + 24 * depthLevel
      }px)`,
      paddingLeft: `${
        noPadding
          ? depthLevel > 0
            ? depthLevel * 24
            : 0
          : 24 + depthLevel * 24
      }px`,
      paddingRight: `${noPadding ? 0 : 24}px`,
    };
  }, [depthLevel, noPadding]);

  const dropdownTextStyle = useMemo(() => {
    return {
      fontSize: depthLevel > 0 ? 14 : 16,
    };
  }, [depthLevel]);

  const childProductTypeSelected = useMemo(
    () =>
      (productType?.typeItems || []).some(typeItem =>
        selectedProductTypes?.some(
          item =>
            filterProductType(typeItem, item, true) &&
            (productTypePrefix
              ? item.includes(productTypePrefix)
              : productType?.name && item.includes(productType?.name)),
        ),
      ),
    [selectedProductTypes, productType],
  );

  const radioInputChecked = useMemo(
    () =>
      !allowSubItemMultiSelect ||
      depthLevel === 0 ||
      selectedProductTypes?.some(
        item =>
          filterProductType(productType, item, !!productTypePrefix) &&
          (productTypePrefix
            ? item.includes(productTypePrefix)
            : productType?.name && item.includes(productType?.name)),
      ),
    [
      allowSubItemMultiSelect,
      depthLevel,
      selectedProductTypes,
      productTypePrefix,
      productType,
    ],
  );

  const radioInputClass = cn(s.radioInput, {
    [s.radioInputVisible]: !!allowSubItemMultiSelect && depthLevel > 0,
    [s.radioInputFirst]: depthLevel === 0,
  });

  const nameClass = cn(
    selectedProductTypes?.some(
      item =>
        filterProductType(productType, item, !!productTypePrefix) &&
        (productTypePrefix
          ? item.includes(productTypePrefix)
          : productType?.name && item.includes(productType?.name)),
    )
      ? s.selectedDropdownItemText
      : s.dropdownItemText,
    {
      [s.childSelectedDropdownItemText]: childProductTypeSelected,
    },
  );

  const handleSelect = useCallback(
    (e: any) => {
      if (allowSubItemMultiSelect && depthLevel > 0) {
        if (
          (selectedProductTypes || []).length > 0 &&
          selectedProductTypes![0] ===
            `${productTypePrefix || ''}${productType?.name}`
        ) {
          handleTypeSelect(e, [
            `${(productTypePrefix || '').replace(',', '')}`,
          ]);
        } else if (
          selectedProductTypes?.some(item => `${item},` === productTypePrefix)
        ) {
          handleTypeSelect(e, [
            `${productTypePrefix || ''}${productType?.name}`,
          ]);
        } else {
          handleTypeSelect(e, `${productTypePrefix || ''}${productType?.name}`);
        }
      } else {
        handleTypeSelect(e, [`${productTypePrefix || ''}${productType?.name}`]);
      }
    },
    [
      handleTypeSelect,
      productTypePrefix,
      selectedProductTypes,
      depthLevel,
      allowSubItemMultiSelect,
      productType,
    ],
  );

  if (!productType || !productType?.name) {
    return null;
  }
  return (
    <>
      <div
        onClick={handleSelect}
        className={s.dropdownItem}
        style={dropdownStyle}>
        <div className={s.nameContainer}>
          {((allowSubItemMultiSelect && depthLevel > 0) ||
            selectedProductTypes?.some(
              item =>
                filterProductType(productType, item, !!productTypePrefix) &&
                (productTypePrefix
                  ? item.includes(productTypePrefix)
                  : productType?.name && item.includes(productType?.name)),
            )) &&
          !childProductTypeSelected ? (
            <div
              className={radioInputClass}
              style={{
                border: radioInputChecked ? '2px solid #61AB62' : undefined,
              }}>
              <div
                className={s.radioInputInner}
                style={{
                  opacity: radioInputChecked ? 1 : 0,
                }}
              />
            </div>
          ) : null}
          <div className={nameClass} style={dropdownTextStyle}>
            {productType.name || ''}
          </div>
        </div>
        <div className={s.dropdownItemCounterRow}>
          <div className={s.dropdownItemCounter} style={dropdownTextStyle}>
            {productType.counter || ''}
          </div>
          {(productType?.typeItems || []).length > 0 ? (
            <ChevronLeft
              className={s.dropdownSubArrow}
              fill="#8C9B99"
              style={{
                transform: selectedProductTypes?.some(
                  item =>
                    filterProductType(productType, item, !!productTypePrefix) &&
                    productType?.name &&
                    item.includes(productType?.name),
                )
                  ? 'rotate(270deg)'
                  : 'rotate(180deg)',
              }}
            />
          ) : null}
        </div>
      </div>
      <div
        className={s.collapseItems}
        style={{
          display: `${
            selectedProductTypes?.some(
              item =>
                filterProductType(productType, item, !!productTypePrefix) &&
                productType?.name &&
                item.includes(productType?.name),
            )
              ? 'flex'
              : 'none'
          }`,
        }}>
        {(productType?.typeItems || []).map(typeItem =>
          !typeItem ? null : (
            <ProductTypeFilterItem
              key={typeItem?.name}
              productTypePrefix={`${productType?.name},`}
              productType={typeItem}
              depthLevel={depthLevel + 1}
              allowSubItemMultiSelect={allowSubItemMultiSelect}
              selectedProductTypes={selectedProductTypes}
              handleTypeSelect={handleTypeSelect}
              noPadding={noPadding}
            />
          ),
        )}
      </div>
    </>
  );
};
