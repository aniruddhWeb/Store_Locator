import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { DateTime, Duration } from 'luxon';
import sortBy from 'lodash/sortBy';
import dynamic from 'next/dynamic';
import {
  Budget,
  Transaction,
  TransactionNegative,
  useSaveBusinessAdPriceInMutation,
} from '../../../generated/graphql';
import { LogoTitle } from '../../icons/LogoTitle';
import { useBusinessAdBudget } from '../../../hooks/business/useBusinessAdBudget';
import { SettingsBock } from './SettingsBock/SettingsBock';
import { TopNavigation } from './TopNavigation/TopNavigation';
import styles from './ProductAdCustomer.module.css';
import { useBusinessAdAnalytics } from '../../../hooks/business/useBusinessAdAnalytics';

const PreviewBlock = dynamic<any>(
  // @ts-ignore
  () => import('./PreviewBlock/PreviewBlock').then(mod => mod.PreviewBlock),
  {
    ssr: false,
  },
);

export interface IType {
  businessId: string;
  id: number;
  name: string;
  percentage: number;
}

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

interface ProductAddCustomerProps {
  businesses: Array<any>;
}

export const ProductAdCustomer: FC<ProductAddCustomerProps> = ({
  businesses,
}) => {
  const filteredBusinesses = useMemo(
    () =>
      businesses.filter(item =>
        item.productType.some((type: any) => type.available),
      ),
    [businesses],
  );
  const [selectedBusiness, setSelectedBusiness] = useState(
    filteredBusinesses.length > 0 ? filteredBusinesses[0] : undefined,
  );
  const productTypes = useMemo(() => {
    return selectedBusiness?.productType || [];
  }, [selectedBusiness]);

  const [selectedType, setSelectedType] = useState<any>();
  const [adPercentageValues, setAdPercentageValues] = useState<IType[]>([]);

  const [selectedMonthDateTime, setSelectedMonthDateTime] = useState<DateTime>(
    DateTime.now(),
  );

  const userBudget = useBusinessAdBudget();
  const userBudgetAnalytics = useBusinessAdAnalytics(
    selectedMonthDateTime.startOf('month').toFormat('yyyy-MM-dd'),
    selectedMonthDateTime.endOf('month').toFormat('yyyy-MM-dd'),
  );

  useEffect(() => {
    if (selectedBusiness) {
      setSelectedType(
        selectedBusiness.productType?.find((type: any) => type.available),
      );
    }
  }, [selectedBusiness]);

  const sumAdPercentageState = useMemo(() => {
    let sumPercentage = 0;

    businesses?.forEach(business => {
      business?.productType?.forEach((type: any) => {
        const localTypeValue = adPercentageValues.find(item => {
          return (
            item.id === type?.id && item.businessId === business.bizBusinessID
          );
        })?.percentage;

        sumPercentage +=
          typeof localTypeValue === 'number'
            ? localTypeValue
            : type?.price || 0;

        type?.typeItems?.forEach((subCat: any) => {
          const localSubCatValue = adPercentageValues.find(item => {
            return (
              item.id === subCat?.id &&
              item.businessId === business.bizBusinessID
            );
          })?.percentage;

          sumPercentage +=
            typeof localSubCatValue === 'number'
              ? localSubCatValue
              : subCat?.price || 0;
        });

        type?.categoriesItems?.forEach((catTitle: any) => {
          catTitle?.categoriesItems?.forEach((cat: any) => {
            const localCatValue = adPercentageValues.find(item => {
              return (
                item.id === cat?.id &&
                item.businessId === business.bizBusinessID
              );
            })?.percentage;

            sumPercentage +=
              typeof localCatValue === 'number'
                ? localCatValue
                : cat?.price || 0;
          });
        });
      });
    });

    return sumPercentage;
  }, [adPercentageValues]);

  const updateValue = useCallback(
    (val: number, type: IType) => {
      let result = 0;
      let values: IType[] = [];

      if (!selectedBusiness) return;

      const typeIndex = adPercentageValues.findIndex(item => {
        return (
          item.id === type.id &&
          selectedBusiness.bizBusinessID === item.businessId
        );
      });

      const prevValue = adPercentageValues[typeIndex]?.percentage || 0;

      if (sumAdPercentageState - prevValue + val > 100) {
        result = 100 - sumAdPercentageState + prevValue;
      } else {
        result = val;
      }

      if (typeIndex === -1) {
        values = [
          ...adPercentageValues,
          {
            id: +type.id,
            name: type.name,
            businessId: selectedBusiness.bizBusinessID,
            percentage: result,
          },
        ];
      } else {
        values = [
          ...adPercentageValues.slice(0, typeIndex),
          {
            id: +type.id,
            name: type.name,
            businessId: selectedBusiness.bizBusinessID,
            percentage: result,
          },
          ...adPercentageValues.slice(typeIndex + 1),
        ];
      }

      setAdPercentageValues(values);
    },
    [sumAdPercentageState, selectedBusiness, adPercentageValues],
  );

  const selectBusiness = useCallback(
    (id: string) => {
      setSelectedBusiness(businesses?.find(item => item?.bizBusinessID === id));
    },
    [businesses],
  );

  const getBusinessPercentage = useCallback(
    (businessId: string) => {
      let percentage = 0;

      businesses
        ?.find(business => business?.bizBusinessID === businessId)
        ?.productType?.filter((type: any) => type?.available)
        .forEach((type: any) => {
          const localTypeValue = adPercentageValues.find(item => {
            return item.id === type?.id && item.businessId === businessId;
          })?.percentage;

          percentage +=
            typeof localTypeValue === 'number'
              ? localTypeValue
              : type?.price || 0;

          type?.typeItems
            ?.filter((subCat: any) => subCat?.available)
            .forEach((subCat: any) => {
              const localSubCatValue = adPercentageValues.find(item => {
                return item.id === subCat?.id && item.businessId === businessId;
              })?.percentage;

              percentage +=
                typeof localSubCatValue === 'number'
                  ? localSubCatValue
                  : subCat?.price || 0;
            });

          type?.categoriesItems
            ?.filter((catTitle: any) => catTitle?.available)
            .forEach((catTitle: any) => {
              catTitle?.categoriesItems?.forEach((cat: any) => {
                const localCatValue = adPercentageValues.find(item => {
                  return item.id === cat?.id && item.businessId === businessId;
                })?.percentage;

                percentage +=
                  typeof localCatValue === 'number'
                    ? localCatValue
                    : cat?.price || 0;
              });
            });
        });

      return percentage;
    },
    [businesses, adPercentageValues],
  );

  const typeNavigationBlock = useMemo(() => {
    return productTypes.map((type: any) => {
      return type.available ? (
        <span
          className={cn(styles.typeNavigationItem, {
            [styles.active]: selectedType?.name === type.name,
          })}
          key={type.name}
          onClick={() => setSelectedType(type)}>
          {type.name}
        </span>
      ) : null;
    });
  }, [productTypes, selectedType]);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [saveBusinessAdPrice] = useSaveBusinessAdPriceInMutation();

  const onSave = useCallback(async () => {
    setIsSaving(true);

    const adPercentageValuesObject = adPercentageValues.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.businessId]: [
          ...(acc[curr.businessId] || []),
          { id: curr.id, price: curr.percentage },
        ],
      }),
      {} as Record<string, any[]>,
    );

    const businessFinanceInput = Object.entries(adPercentageValuesObject).map(
      ([key, val]) => ({ bizBusinessID: key, productTypes: val }),
    );

    await saveBusinessAdPrice({
      variables: { input: businessFinanceInput },
    });

    setIsSaving(false);
    setSaved(true);
  }, [adPercentageValues, userBudget]);

  const chartData = useMemo(() => {
    const userBudgetPositiveData = (
      (userBudgetAnalytics.positive || []) as Transaction[]
    ).map((item: Transaction) => ({
      name: `${DateTime.fromISO(item.hisCreationDate).day}`,
      value: item.hisAmount || 0,
      date: DateTime.fromISO(item.hisCreationDate).toFormat('LLLL dd, yyyy'),
    }));
    const userBudgetNegativeData = (
      (userBudgetAnalytics.negative || []) as TransactionNegative[]
    ).map((item: TransactionNegative) => ({
      name: `${DateTime.fromISO(item.creationDate).day}`,
      value: item.amount || 0,
      count: item.count || 0,
      date: DateTime.fromISO(item.creationDate).toFormat('LLLL dd, yyyy'),
    }));
    const userBudgetData = ((userBudgetAnalytics.budget || []) as Budget[]).map(
      (item: Budget) => ({
        name: `${DateTime.fromISO(item.date).day}`,
        budget: item.budget || 0,
        date: DateTime.fromISO(item.date).toFormat('LLLL dd, yyyy'),
      }),
    );
    const startOfMonth = selectedMonthDateTime.startOf('month');
    let lastFoundBudgetInfoIndex: number = -1;
    return Array(selectedMonthDateTime.daysInMonth)
      .fill(0)
      .map((_, dayIndex) => {
        const iterationDate = startOfMonth.plus(
          Duration.fromObject({ days: dayIndex }),
        );
        if (iterationDate > DateTime.now()) {
          return null;
        }
        const date = iterationDate.toFormat('LLLL dd, yyyy');
        let budgetAmount: number = 0;
        const budgetDataIndex = (userBudgetData || []).findIndex(
          budgetItem => budgetItem.date === date,
        );
        if (budgetDataIndex > -1) {
          budgetAmount = (userBudgetData || [])[budgetDataIndex].budget;
          lastFoundBudgetInfoIndex = budgetDataIndex;
        } else if (lastFoundBudgetInfoIndex > -1) {
          budgetAmount = (userBudgetData || [])[lastFoundBudgetInfoIndex]
            .budget;
        }
        const countSum = (userBudgetNegativeData || []).reduce(
          (accumulator, object) => {
            if (object.date === date) {
              return accumulator + object.count;
            }
            return accumulator;
          },
          0,
        );
        const spentSum = (userBudgetNegativeData || []).reduce(
          (accumulator, object) => {
            if (object.date === date) {
              return accumulator + object.value;
            }
            return accumulator;
          },
          0,
        );
        const topUpSum = (userBudgetPositiveData || []).reduce(
          (accumulator, object) => {
            if (object.date === date) {
              return accumulator + object.value;
            }
            return accumulator;
          },
          0,
        );
        return {
          date,
          name: `${dayIndex + 1}`,
          value: budgetAmount || 0,
          count: countSum || 0,
          spent: spentSum || 0,
          top: topUpSum || 0,
        };
      })
      .filter(item => item !== null) as {
      date: string;
      value: number;
      count: number;
      spent: number;
      top: number;
      name: string;
    }[];
  }, [userBudgetAnalytics, selectedMonthDateTime]);

  const chartLegendData = useMemo(() => {
    return sortBy(
      ((userBudgetAnalytics.positive || []) as Transaction[])
        .map((item: Transaction) => ({
          name: `${DateTime.fromISO(item.hisCreationDate).day}`,
          value: item.hisAmount || 0,
          date: DateTime.fromISO(item.hisCreationDate).toFormat(
            'LLLL dd, yyyy',
          ),
        }))
        .concat(
          ((userBudgetAnalytics.negative || []) as TransactionNegative[]).map(
            (item: TransactionNegative) => ({
              name: `${DateTime.fromISO(item.creationDate).day}`,
              value: -item.amount || 0,
              date: DateTime.fromISO(item.creationDate).toFormat(
                'LLLL dd, yyyy',
              ),
            }),
          ),
        ),
      ['date'],
    );
  }, [userBudgetAnalytics]);

  const currentMonth = useMemo(
    () => selectedMonthDateTime.toFormat('LLLL, yyyy'),
    [selectedMonthDateTime],
  );

  const setPrevMonth = useCallback(() => {
    setSelectedMonthDateTime(
      selectedMonthDateTime.minus(Duration.fromObject({ months: 1 })),
    );
  }, [selectedMonthDateTime]);

  const setNextMonth = useCallback(() => {
    setSelectedMonthDateTime(
      selectedMonthDateTime.plus(Duration.fromObject({ months: 1 })),
    );
  }, [selectedMonthDateTime]);

  const hasBrandBusinesses = useMemo(
    () =>
      (filteredBusinesses || []).some(
        item => item?.plType === BusinessType.BrandType,
      ),
    [filteredBusinesses],
  );

  const hasDeliveryBusinesses = useMemo(
    () =>
      (filteredBusinesses || []).some(
        item =>
          item?.plType === BusinessType.DeliveryType ||
          item?.plType === BusinessType.DispensaryType ||
          item?.plType === BusinessType.MailOrderType,
      ),
    [filteredBusinesses],
  );

  return (
    <div className={styles.root}>
      <div className={styles.settingsBlock}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <LogoTitle className={styles.logo} fill="#000000" />
          </div>
          <TopNavigation
            businesses={businesses}
            getBusinessPercentage={getBusinessPercentage}
            selectedBusiness={selectedBusiness}
            selectBusiness={selectBusiness}
          />
        </div>
        <div className={styles.typeNavigationContainer}>
          <div className={styles.typeNavigation}>{typeNavigationBlock}</div>
          <SettingsBock
            userBudget={userBudget}
            selectedType={selectedType}
            selectedBusiness={selectedBusiness}
            adPercentageValues={adPercentageValues}
            productTypes={productTypes}
            updateValue={updateValue}
          />
        </div>
      </div>
      <PreviewBlock
        userBudget={userBudget}
        chartData={chartData}
        chartLegendData={chartLegendData}
        setNextMonth={setNextMonth}
        setPrevMonth={setPrevMonth}
        currentMonth={currentMonth}
        sumAdPercentageState={sumAdPercentageState}
        adPercentageValues={adPercentageValues}
        businesses={businesses}
        selectedBusiness={selectedBusiness}
        onSave={onSave}
        saved={saved}
        isSaving={isSaving}
        setSelectedBusiness={setSelectedBusiness}
        getBusinessPercentage={getBusinessPercentage}
      />
    </div>
  );
};
