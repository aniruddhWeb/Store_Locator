import React, { FC, useMemo, useState } from 'react';
import cn from 'classnames';
import { Business } from 'generated/graphql';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from 'recharts';
import { Button } from '../../../common/Button/Button';
import { DropdownArrow } from '../../../icons/DropdownArrow';
import { IType } from '../ProductAdCustomer';
import styles from './PreviewBlock.module.css';
import { Arrow } from '../../../icons/Arrow';

interface PreviewBlockProps {
  userBudget: any;
  sumAdPercentageState: any;
  adPercentageValues: IType[];
  businesses: any[];
  selectedBusiness: any;
  onSave: () => void;
  saved: boolean;
  isSaving: boolean;
  setSelectedBusiness: (biz: Business) => void;
  getBusinessPercentage: (businessId: string) => void;
  chartData: { date: string; value: number; name: string }[];
  chartLegendData: { date: string; value: number; name: string }[];
  setNextMonth: () => void;
  setPrevMonth: () => void;
  currentMonth: string;
}

const greenButtonStyle = {
  marginTop: '16px',
  background: '#61AB62',
  width: '128px',
  padding: 0,
  height: '40px',
};

const buttonStyle = {
  marginTop: '16px',
  width: '128px',
  padding: 0,
  height: '40px',
};

export const PreviewBlock: FC<PreviewBlockProps> = ({
  userBudget,
  sumAdPercentageState,
  adPercentageValues,
  businesses,
  selectedBusiness,
  onSave,
  saved,
  isSaving,
  setSelectedBusiness,
  getBusinessPercentage,
  chartData,
  currentMonth,
  setNextMonth,
  setPrevMonth,
  chartLegendData,
}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const adPercentageValuesObject = useMemo(() => {
    const values: Record<string, any> = {};

    businesses.forEach((biz: any) => {
      biz?.productType?.forEach((type: any) => {
        const localTypeValue = adPercentageValues.find(item => {
          return item.id === type.id && item.businessId === biz.bizBusinessID;
        });

        const isZeroType =
          !(localTypeValue ? localTypeValue.percentage : type.price) ||
          !type.available;

        if (!isZeroType) {
          if (!values[biz.bizBusinessID]) {
            values[biz.bizBusinessID] = [];
          }

          values[biz.bizBusinessID].push(
            localTypeValue || {
              businessId: biz.bizBusinessID,
              id: type.id,
              name: type.name,
              percentage: type.price,
            },
          );
        }

        type.typeItems?.forEach((subCat: any) => {
          const localSubCatValue = adPercentageValues.find(item => {
            return (
              item.id === subCat?.id && item.businessId === biz.bizBusinessID
            );
          });

          const isZeroSubCat =
            !(localSubCatValue ? localSubCatValue.percentage : subCat.price) ||
            !subCat.available;

          if (isZeroSubCat) return;

          if (!values[biz.bizBusinessID]) {
            values[biz.bizBusinessID] = [];
          }

          values[biz.bizBusinessID].push(
            localSubCatValue
              ? { ...localSubCatValue, path: type.name }
              : {
                  businessId: biz.bizBusinessID,
                  id: subCat.id,
                  name: subCat.name,
                  percentage: subCat.price,
                  path: type.name,
                },
          );
        });

        type.categoriesItems?.forEach((catTitle: any) => {
          catTitle.categoriesItems?.forEach((cat: any) => {
            const localCatValue = adPercentageValues.find(item => {
              return (
                item.id === cat?.id && item.businessId === biz.bizBusinessID
              );
            });

            const isZeroCat =
              !(localCatValue ? localCatValue.percentage : cat.price) ||
              !cat.available;

            if (isZeroCat) return;

            if (!values[biz.bizBusinessID]) {
              values[biz.bizBusinessID] = [];
            }

            values[biz.bizBusinessID].push(
              localCatValue
                ? { ...localCatValue, path: type.name + ' > ' + catTitle.name }
                : {
                    businessId: biz.bizBusinessID,
                    id: cat.id,
                    name: cat.name,
                    percentage: cat.price,
                    path: type.name + ' > ' + catTitle.name,
                  },
            );
          });
        });
      });
    });

    return values;
  }, [businesses, adPercentageValues]);

  const previewValuesBlock = useMemo(() => {
    return Object.keys(adPercentageValuesObject).map(businessId => {
      const adPercentages = adPercentageValuesObject[businessId];
      const adBusiness = businesses?.find(
        item => item.bizBusinessID === businessId,
      );

      return (
        <div
          key={businessId}
          onClick={() =>
            setSelectedBusiness(
              businesses?.find(item => item.bizBusinessID === businessId),
            )
          }
          className={cn(styles.previewValueContainer, {
            [styles.active]: businessId === selectedBusiness?.bizBusinessID,
          })}>
          <div className={styles.previewValueHeader}>
            <span className={styles.previewValueHeaderTitle}>
              {adBusiness?.bizName || ''}
            </span>
            <div className={styles.previewValueDropdown}>
              <span
                className={
                  styles.previewValueDropdownValue
                }>{`${getBusinessPercentage(businessId)}%`}</span>
              <DropdownArrow
                className={cn(styles.previewValueDropdownArrow, {
                  [styles.active]:
                    businessId === selectedBusiness?.bizBusinessID,
                })}
                fill="#61AB62"
              />
            </div>
          </div>
          {businessId === selectedBusiness?.bizBusinessID ? (
            <div className={styles.previewValueContentContainer}>
              {(adPercentages || []).map((percentageValue: any) => {
                return (
                  <div
                    key={`business-percentage-${percentageValue.name}`}
                    className={styles.previewValueContent}>
                    <div className={styles.previewValueContentRow}>
                      <span className={styles.previewValueContentTitle}>
                        {percentageValue.name}
                      </span>
                      <span className={styles.previewValueContentValue}>
                        {`${percentageValue.percentage}%`}
                      </span>
                    </div>
                    {percentageValue.path ? (
                      <span className={styles.previewValueContentPath}>
                        {`${percentageValue.path}`}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      );
    });
  }, [
    selectedBusiness,
    businesses,
    adPercentageValues,
    adPercentageValuesObject,
  ]);

  const isChartEmpty = useMemo(
    () => chartData.every(item => item.value === 0),
    [chartData],
  );

  return (
    <div className={styles.previewBlock}>
      <div className={styles.previewBlockMain}>
        <div className={styles.previewTitleHeaderContainer}>
          <div className={styles.previewTitleContainer}>
            <div className={styles.previewTitle}>Attributed</div>
            <div className={styles.currentValues}>
              <span className={styles.currentAttribution}>{`$${(
                userBudget *
                (sumAdPercentageState / 100.0)
              ).toFixed(2)}`}</span>
            </div>
          </div>
          <div className={styles.previewTitleContainer}>
            <div className={styles.previewTitle}>Balance</div>
            <div className={styles.currentValues}>
              <span className={styles.currentBalance}>{`$${userBudget.toFixed(
                2,
              )}`}</span>
            </div>
          </div>
        </div>
        <div className={styles.tabContainer}>
          <div
            onClick={() => setSelectedTabIndex(0)}
            className={
              selectedTabIndex === 0 ? styles.tabSelected : styles.tab
            }>
            {`Funds Attribution`}
            <span
              className={cn(styles.tabPercentage, {
                [styles.active]: selectedTabIndex === 0,
              })}>
              {`${sumAdPercentageState}%`}
            </span>
          </div>
          <div
            onClick={() => setSelectedTabIndex(1)}
            className={
              selectedTabIndex === 1 ? styles.tabSelected : styles.tab
            }>
            {'Budget Analytics'}
          </div>
        </div>
        {selectedTabIndex === 0 ? (
          <div className={styles.previewValuesBlock}>{previewValuesBlock}</div>
        ) : (
          <div className={styles.chartWrapper}>
            <div className={styles.chartContainer}>
              <div className={styles.chatHeaderContainer}>
                <div className={styles.chartHeaderTitle}>{currentMonth}</div>
                <div className={styles.chatHeaderButtons}>
                  <div
                    className={styles.arrowLeftButton}
                    onClick={setPrevMonth}>
                    <Arrow className={styles.arrowLeft} />
                  </div>
                  <div
                    className={styles.arrowRightButton}
                    onClick={setNextMonth}>
                    <Arrow className={styles.arrowRight} />
                  </div>
                </div>
              </div>
              {!isChartEmpty ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={chartData}
                    margin={{ left: 10, right: 10, top: 8, bottom: 8 }}>
                    <Line
                      type="linear"
                      dot={false}
                      dataKey="value"
                      stroke="#61AB62"
                    />
                    <YAxis
                      hide
                      dataKey="value"
                      type="number"
                      domain={[0, 'dataMax']}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{
                        fontSize: 10,
                        fontFamily: 'SuisseIntl',
                        color: '#000000',
                      }}
                      axisLine={{ stroke: '#00000040' }}
                      tickLine={false}
                    />
                    <Tooltip
                      wrapperStyle={{ outline: 'none' }}
                      content={<CustomTooltip />}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className={styles.emptyText}>Nothing to display</div>
              )}
            </div>
            {!isChartEmpty ? (
              <div className={styles.chartValuesContainer}>
                {chartLegendData.map(chartItem =>
                  !chartItem.value ? null : (
                    <div
                      key={chartItem.date}
                      className={styles.chartValueContainer}>
                      <div className={styles.chartValueTitle}>
                        {chartItem.date}
                      </div>
                      <div
                        className={cn(styles.chartValue, {
                          [styles.chartValueRed]: chartItem.value < 0,
                        })}>
                        {chartItem.value >= 0
                          ? `+$${chartItem.value}`
                          : `-$${`${chartItem.value}`.replace('-', '')}`}
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>
      <div className={styles.buttonsContainer}>
        <Button
          onPress={onSave}
          buttonText={saved ? 'Saved' : isSaving ? 'Saving...' : 'Save'}
          buttonStyle={saved ? greenButtonStyle : buttonStyle}
          disabled={!adPercentageValues.length}
        />
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipTitle}>{payload[0].payload.date}</div>
        <div className={styles.tooltipValueContainer}>
          <div className={styles.tooltipValueTitle}>{`Spent`}</div>
          <div
            className={
              styles.tooltipValue
            }>{`$${payload[0].payload.spent}`}</div>
        </div>
        <div className={styles.tooltipValueContainer}>
          <div className={styles.tooltipValueTitle}>{`Top Ups`}</div>
          <div
            className={styles.tooltipValue}>{`$${payload[0].payload.top}`}</div>
        </div>
        <div className={styles.tooltipValueContainer}>
          <div className={styles.tooltipValueTitle}>{`Balance`}</div>
          <div
            className={
              styles.tooltipValue
            }>{`$${payload[0].payload.value}`}</div>
        </div>
        <div className={styles.tooltipValueContainer}>
          <div className={styles.tooltipValueTitle}>{`Impressions`}</div>
          <div
            className={
              styles.tooltipValue
            }>{`${payload[0].payload.count}`}</div>
        </div>
      </div>
    );
  }
  return null;
};
