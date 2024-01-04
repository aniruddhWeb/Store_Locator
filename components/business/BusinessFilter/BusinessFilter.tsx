import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';
import s from './BusinessFilter.module.css';
import { Delivery } from '../../icons/Delivery';
import { MailOrder } from '../../icons/MailOrder';
import { Brand } from '../../icons/Brand';
import { Dispensary } from '../../icons/Dispensary';
import { MapSelect } from '../../icons/MapSelect';

interface Props {
  businessTypes: string[];
  selectedBusinessTypes?: string[];
  onSelectBusinessType?: (type: string) => void;
  mobile?: boolean;
  desktop?: boolean;
  hideTitle?: boolean;
  hideMargin?: boolean;
  marginTop?: boolean;
  withIcon?: boolean;
  hidePaddingRight?: boolean;
  white?: boolean;
}

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const BusinessFilter = React.memo(
  ({
    businessTypes,
    selectedBusinessTypes,
    onSelectBusinessType,
    mobile,
    desktop,
    hideTitle = false,
    hideMargin = false,
    hidePaddingRight = false,
    marginTop = false,
    withIcon = false,
    white = false,
  }: Props) => {
    const rootClass = cn(s.root, {
      [s.rootMobile]: mobile,
      [s.rootDesktop]: desktop,
      [s.rootNoMargin]: hideMargin,
      [s.rootMarginTop]: marginTop,
    });
    const filterContainerClass = cn(s.filterContainer, {
      [s.filterContainerNoMargin]: hideMargin,
    });
    const filterItemsClass = cn(s.filterItemsContainer, {
      [s.filterItemsContainerNoMargin]: hideMargin,
    });
    const filterItemContainerClass = cn(s.filterItemContainer, {
      [s.filterItemContainerWhite]: white,
    });
    const filterItemSelectedContainerClass = cn(s.filterSelectedContainer, {
      [s.filterSelectedContainerWhite]: white,
    });
    const filterItemTextClass = cn(s.filterItemText, {
      [s.filterItemTextWhite]: white,
    });
    const filterItemSelectedTextClass = cn(s.filterSelectedText, {
      [s.filterSelectedTextWhite]: white,
    });
    const horizontalScrollContainerClass = cn(s.horizontalScrollContainer, {
      [s.horizontalScrollContainerNoPaddingRight]: hidePaddingRight,
    });

    const getIconComponent = useCallback(
      (type: BusinessType, fillColor?: string, selected?: boolean) => {
        if (
          type ===
          `${BusinessType.DeliveryType} & ${BusinessType.DispensaryType}`
        ) {
          return (
            <div className={s.typeImage}>
              <MapSelect
                fill={fillColor || (white && !selected ? '#000000' : '#FFFFFF')}
              />
            </div>
          );
        }
        if (type === BusinessType.DeliveryType) {
          return (
            <div className={s.typeImage}>
              <Delivery
                fill={fillColor || (white && !selected ? '#000000' : '#FFFFFF')}
              />
            </div>
          );
        }
        if (type === BusinessType.MailOrderType) {
          return (
            <div className={s.typeImage}>
              <MailOrder
                fill={fillColor || (white && !selected ? '#000000' : '#FFFFFF')}
              />
            </div>
          );
        }
        if (type === BusinessType.BrandType) {
          return (
            <div className={s.typeImage}>
              <Brand
                fill={fillColor || (white && !selected ? '#000000' : '#FFFFFF')}
              />
            </div>
          );
        }
        if (type === BusinessType.DispensaryType) {
          return (
            <div className={s.typeImage}>
              <Dispensary
                fill={fillColor || (white && !selected ? '#000000' : '#FFFFFF')}
              />
            </div>
          );
        }
        return null;
      },
      [white],
    );

    const isFilterNecessarry = useMemo(() => {
      return businessTypes.length > 1;
    }, [businessTypes]);

    return (
      <div className={rootClass}>
        <div className={horizontalScrollContainerClass}>
          <div className={filterContainerClass}>
            {hideTitle ? null : (
              <div className={s.filterTitle}>Business type</div>
            )}
            <div className={filterItemsClass}>
              {isFilterNecessarry
                ? businessTypes.map(businessType => (
                    <div
                      key={businessType}
                      className={
                        selectedBusinessTypes?.includes(businessType)
                          ? filterItemSelectedContainerClass
                          : filterItemContainerClass
                      }
                      onClick={() =>
                        onSelectBusinessType &&
                        onSelectBusinessType(businessType)
                      }>
                      {withIcon
                        ? getIconComponent(
                            businessType as BusinessType,
                            undefined,
                            selectedBusinessTypes?.includes(businessType),
                          )
                        : null}
                      <div
                        className={
                          selectedBusinessTypes?.includes(businessType)
                            ? filterItemSelectedTextClass
                            : filterItemTextClass
                        }>
                        {businessType}
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
