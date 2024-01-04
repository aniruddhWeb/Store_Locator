import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { useMediaQueries } from '@react-hook/media-query';
import { List } from 'react-virtualized';
import s from './ProductTypeFilter.module.css';
import { filterProductSubType } from '../../../hooks/product/useProductFilter';
import { ProductType } from '../../../generated/graphql';
import { formatProductFilter } from '../../../utils/string';
import { DropdownArrow } from '../../icons/DropdownArrow';
import { ProductSubTypeFilterItem } from './ProductSubTypeFilterItem';
import { useOutsideDetect } from '../../../utils/window';
import { useDebounce } from '../../../utils/debounce';

interface Props {
  selectedProductTypes?: string[];
  dropdownDirection?: 'top' | 'bottom';
  subCategoryItem: ProductType;
  handleTypeSelect: (
    e: any,
    productTypeString: string | string[] | null | undefined,
  ) => void;
  resetProductSubTypes: (e: any, category: ProductType) => void;
  toggleSubTypeMenu: (open: boolean) => void;
  subTypeMenuOpened: boolean;
  layoutDirection?: 'vertical' | 'horizontal';
  flexDirection?: 'left' | 'right' | 'center';
}

export const ProductSubTypeFilterGroup = ({
  subCategoryItem,
  selectedProductTypes,
  dropdownDirection,
  handleTypeSelect,
  resetProductSubTypes,
  subTypeMenuOpened: subTypeMenuOpenedProp,
  toggleSubTypeMenu,
  layoutDirection = 'vertical',
  flexDirection,
}: Props) => {
  const [subTypeMenuOpened, setSubTypeMenuOpened] = useState<boolean>(false);

  useEffect(() => {
    if (!subTypeMenuOpenedProp) {
      setSubTypeMenuOpened(false);
    }
  }, [subTypeMenuOpenedProp]);

  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 860px)',
  });

  const closeSubType = useCallback(() => setSubTypeMenuOpened(false), []);

  const subTypeDropdownRef = useOutsideDetect(closeSubType, matches.isMobile);

  const stopParentClick = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDropdownSubType = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setSubTypeMenuOpened(!subTypeMenuOpened);
      toggleSubTypeMenu(!subTypeMenuOpened);
    },
    [toggleSubTypeMenu, subTypeMenuOpened],
  );

  const subTypeFilterText = useCallback(
    (typeItem: ProductType) =>
      (selectedProductTypes || [])
        .filter(
          item =>
            filterProductSubType(typeItem, item) &&
            subCategoryItem?.name &&
            item.includes(subCategoryItem?.name),
        )
        .map(item => item.replace(`${typeItem.name},`, ''))
        .join(', '),
    [selectedProductTypes, matches?.isMobile],
  );

  const [search, setSearch] = useState<string>('');
  const [searchDebounce, setSearchDebounce] = useDebounce(search, 400);

  const onSearchChange = useCallback(e => {
    if (setSearch) {
      setSearch(e.target.value);
    }
  }, []);

  const handleKeyPress = useCallback(
    async e => {
      if (e.key === 'Enter') {
        e.target.blur();
      }
    },
    [search],
  );

  const filteredItems = useMemo(() => {
    const filteredArray = (
      (subCategoryItem?.categoriesItems || []) as ProductType[]
    ).filter(item =>
      searchDebounce
        ? item.name?.toLowerCase()?.includes(searchDebounce.toLowerCase())
        : true,
    );
    return filteredArray.filter((element, index) => {
      return (
        filteredArray.findIndex(item => element?.name === item?.name) === index
      );
    });
  }, [subCategoryItem?.categoriesItems, searchDebounce]);

  const dropdownSubTypeContainerClass = cn(s.dropdownContainer, {
    [s.subDropdownContainer]: true,
    [s.subDropdownContainerSelected]: !!selectedProductTypes?.some(
      item =>
        filterProductSubType(subCategoryItem, item) &&
        subCategoryItem?.name &&
        item.includes(subCategoryItem?.name),
    ),
    [s.subDropdownContainerHorizontal]: layoutDirection === 'horizontal',
    [s.subDropdownNoMargin]: flexDirection === 'center',
  });

  const dropdownSubTypeArrowClass = cn(s.dropdownArrow, {
    [s.dropdownArrowOpen]: subTypeMenuOpened,
  });

  const dropdownSubTypeItemsClass = cn(s.dropdownItems, {
    [s.dropdownItemsHidden]: !subTypeMenuOpened,
    [s.dropdownItemsTop]: dropdownDirection === 'top',
  });

  if (
    !subCategoryItem ||
    (subCategoryItem?.categoriesItems || []).length === 0
  ) {
    return null;
  }
  return (
    <div
      key={subCategoryItem.name}
      ref={subTypeDropdownRef}
      onClick={onDropdownSubType}
      className={dropdownSubTypeContainerClass}>
      <div className={s.filterItemContainer}>
        <div className={s.filterItemText}>
          {formatProductFilter(subTypeFilterText(subCategoryItem)) ||
            subCategoryItem.name}
        </div>
      </div>
      <DropdownArrow
        fill={
          selectedProductTypes?.some(
            item =>
              filterProductSubType(subCategoryItem, item) &&
              subCategoryItem?.name &&
              item.includes(subCategoryItem?.name),
          )
            ? '#FFFFFF'
            : '#000000'
        }
        className={dropdownSubTypeArrowClass}
      />
      <div className={dropdownSubTypeItemsClass}>
        <div className={s.subFilterInputContainer}>
          <input
            className={s.subFilterInput}
            autoFocus={false}
            onClick={stopParentClick}
            onFocus={stopParentClick}
            onKeyPress={handleKeyPress}
            onChange={onSearchChange}
            value={search}
            placeholder={`Search ${subCategoryItem.name}`}
          />
        </div>
        <div className={s.dropdownBorder} />
        <div className={s.dropdownScroll}>
          <div className={s.dropdownScrollItems}>
            <List
              rowCount={filteredItems.length}
              rowHeight={41}
              height={248}
              width={320}
              rowRenderer={({ index: itemIndex, key, style }) => {
                const subProductType = filteredItems[itemIndex];
                return (
                  <ProductSubTypeFilterItem
                    key={subProductType.name}
                    productType={subProductType}
                    productTypePrefix={`${subCategoryItem?.name},`}
                    selectedProductTypes={selectedProductTypes}
                    handleTypeSelect={handleTypeSelect}
                    style={style}
                  />
                );
              }}
            />
          </div>
        </div>
        <>
          <div className={s.dropdownBorder} />
          <div
            onClick={e => {
              setSearch('');
              setSearchDebounce('');
              resetProductSubTypes(e, subCategoryItem);
            }}
            className={s.resetButton}>
            Reset
          </div>
        </>
      </div>
    </div>
  );
};
