import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';
import s from './ProductTypeFilter.module.css';
import { filterProductSubType } from '../../../hooks/product/useProductFilter';
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
  style?: any;
}

export const ProductSubTypeFilterItem = ({
  productTypePrefix,
  productType,
  selectedProductTypes,
  handleTypeSelect,
  depthLevel = 0,
  noPadding = false,
  allowSubItemMultiSelect,
  style,
}: Props) => {
  const dropdownStyle = useMemo(() => {
    return {
      ...(style || {}),
      width: `calc(100% - ${
        noPadding
          ? depthLevel > 0
            ? 24 * depthLevel
            : 0
          : 48 + 24 * depthLevel
      }px)`,
      height: style?.height ? style.height - 20 : undefined,
      paddingLeft: `${
        noPadding
          ? depthLevel > 0
            ? depthLevel * 24
            : 0
          : 24 + depthLevel * 24
      }px`,
      paddingRight: `${noPadding ? 0 : 24}px`,
    };
  }, [depthLevel, noPadding, style]);

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
            filterProductSubType(typeItem, item) &&
            (productTypePrefix
              ? item.includes(productTypePrefix)
              : productType?.name && item.includes(productType?.name)),
        ),
      ),
    [selectedProductTypes, productType],
  );

  const nameClass = cn(
    selectedProductTypes?.some(
      item =>
        filterProductSubType(productType, item) &&
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
      if (
        (selectedProductTypes || []).includes(
          `${productTypePrefix || ''}${productType?.name}`,
        )
      ) {
        handleTypeSelect(
          e,
          (selectedProductTypes || []).filter(
            item => item !== `${productTypePrefix || ''}${productType?.name}`,
          ),
        );
      } else {
        handleTypeSelect(
          e,
          (selectedProductTypes || [])
            .filter(
              item =>
                allowSubItemMultiSelect ||
                (productTypePrefix && !item?.includes(productTypePrefix)),
            )
            .concat([`${productTypePrefix || ''}${productType?.name}`]),
        );
      }
    },
    [
      allowSubItemMultiSelect,
      handleTypeSelect,
      productTypePrefix,
      productType,
      selectedProductTypes,
    ],
  );

  const radioInputChecked = useMemo(
    () =>
      !allowSubItemMultiSelect ||
      selectedProductTypes?.some(
        item =>
          filterProductSubType(productType, item) &&
          (productTypePrefix
            ? item.includes(productTypePrefix)
            : productType?.name && item.includes(productType?.name)),
      ),
    [
      selectedProductTypes,
      allowSubItemMultiSelect,
      productType,
      productTypePrefix,
    ],
  );

  const radioInputClass = cn(s.radioInput, {
    [s.radioInputVisible]: !!allowSubItemMultiSelect,
    [s.radioInputFirst]: depthLevel === 0,
  });

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
          {allowSubItemMultiSelect ? (
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
                    filterProductSubType(productType, item) &&
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
                filterProductSubType(productType, item) &&
                productType?.name &&
                item.includes(productType?.name),
            )
              ? 'flex'
              : 'none'
          }`,
        }}>
        {(productType?.categoriesItems || []).map(typeItem =>
          !typeItem ? null : (
            <ProductSubTypeFilterItem
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
