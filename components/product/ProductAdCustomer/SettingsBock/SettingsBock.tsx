import React, { Fragment, FC, useCallback, useMemo } from 'react';
import { IType } from '../ProductAdCustomer';
import { SettingsItem } from '../SettingsItem/SettingsItem';
import styles from './SettingsBock.module.css';

interface SettingsBockProps {
  selectedType?: any;
  selectedBusiness: any;
  adPercentageValues: IType[];
  productTypes: any[];
  updateValue: (val: number, subType: any) => void;
  userBudget: any;
}

export const SettingsBock: FC<SettingsBockProps> = ({
  selectedType,
  selectedBusiness,
  adPercentageValues,
  productTypes,
  updateValue,
  userBudget,
}) => {
  const isSettingsBockShown = useMemo(() => {
    return (
      selectedBusiness &&
      selectedType &&
      productTypes &&
      productTypes.length > 0
    );
  }, [selectedBusiness, selectedType, productTypes]);

  const getLocalValue = useCallback(
    (type: any) => {
      return adPercentageValues.find(
        item =>
          item.id === type.id &&
          item.businessId === selectedBusiness?.bizBusinessID,
      )?.percentage;
    },
    [adPercentageValues, selectedBusiness],
  );

  const type = useMemo(() => {
    const localValue = getLocalValue(selectedType);
    const value =
      typeof localValue === 'number' ? localValue : selectedType?.price;

    return selectedType?.available ? (
      <SettingsItem
        key={`${selectedType.name}_${selectedType.id}`}
        title={selectedType.name || ''}
        value={value || 0}
        totalImpressions={selectedType.totalImpressions}
        disabled={userBudget <= 0}
        updateValue={val => updateValue(val, selectedType)}
      />
    ) : null;
  }, [selectedType, updateValue, getLocalValue, userBudget]);

  const subCategories = useMemo(() => {
    if (!selectedType?.typeItems?.length) return null;

    return (
      <>
        <span key="subcategories" className={styles.categoryTitle}>
          Subcategories
        </span>
        {selectedType?.typeItems.map((subType: any) => {
          const localValue = getLocalValue(subType);
          const value =
            typeof localValue === 'number' ? localValue : subType.price;

          return subType.available ? (
            <SettingsItem
              key={`${subType.name}_${subType.id}`}
              title={subType.name}
              value={value || 0}
              totalImpressions={subType.totalImpressions}
              disabled={userBudget <= 0}
              updateValue={val => updateValue(val, subType)}
            />
          ) : null;
        })}
      </>
    );
  }, [selectedType, updateValue, getLocalValue, userBudget]);

  const categories = useMemo(() => {
    if (!selectedType?.categoriesItems?.length) return null;

    return selectedType?.categoriesItems.map((categoryItem: any) =>
      categoryItem ? (
        <Fragment key={`${categoryItem.name}_${categoryItem.id}`}>
          <span className={styles.categoryTitle}>{categoryItem.name}</span>
          {categoryItem.categoriesItems?.map((subCategory: any) => {
            const localValue = getLocalValue(subCategory);
            const value =
              typeof localValue === 'number' ? localValue : subCategory.price;

            return subCategory.available ? (
              <SettingsItem
                key={`${subCategory.name}_${subCategory.id}`}
                title={subCategory.name}
                value={value || 0}
                totalImpressions={subCategory.totalImpressions}
                disabled={userBudget <= 0}
                updateValue={val => updateValue(val, subCategory)}
              />
            ) : null;
          })}
        </Fragment>
      ) : null,
    );
  }, [selectedType, updateValue, getLocalValue, userBudget]);

  return isSettingsBockShown ? (
    <div className={styles.settings}>
      <div className={styles.header}>
        <div className={styles.category}>Category</div>
        <div className={styles.rightContainer}>
          <div className={styles.attribution}>Attribution</div>
          <div className={styles.totalImpressions}>
            Total Sponsored Impressions
          </div>
        </div>
      </div>
      <div className={styles.typeWrapper}>{type}</div>
      <div className={styles.subCategoriesWrapper}>{subCategories}</div>
      <div className={styles.categoriesWrapper}>{categories}</div>
    </div>
  ) : null;
};
