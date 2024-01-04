import React from 'react';
import cn from 'classnames';
import s from './DealFilter.module.css';

interface Props {
  dealTypes: string[];
  selectedDealTypes?: string[];
  onSelectDealType?: (type: string) => void;
  deliveryTypes: string[];
  selectedDeliveryTypes?: string[];
  onSelectDeliveryType?: (type: string) => void;
  storeTypes: string[];
  selectedStoreTypes?: string[];
  onSelectStoreType?: (type: string) => void;
  mobile?: boolean;
  desktop?: boolean;
}

export const DealFilter = React.memo(
  ({
    dealTypes,
    selectedDealTypes,
    onSelectDealType,
    deliveryTypes,
    onSelectDeliveryType,
    selectedDeliveryTypes,
    storeTypes,
    selectedStoreTypes,
    onSelectStoreType,
    mobile,
    desktop,
  }: Props) => {
    const rootClass = cn(s.root, {
      [s.rootMobile]: mobile,
      [s.rootDesktop]: desktop,
    });
    return (
      <div className={rootClass}>
        <div className={s.horizontalScrollContainer}>
          <div className={s.filterContainer}>
            <div className={s.filterTitle}>Deal type</div>
            <div className={s.filterItemsContainer}>
              {dealTypes.map(dealType => (
                <div
                  key={dealType}
                  className={
                    selectedDealTypes?.includes(dealType)
                      ? s.filterSelectedContainer
                      : s.filterItemContainer
                  }
                  onClick={() =>
                    onSelectDealType && onSelectDealType(dealType)
                  }>
                  <div
                    className={
                      selectedDealTypes?.includes(dealType)
                        ? s.filterSelectedText
                        : s.filterItemText
                    }>
                    {dealType}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={s.filterContainer}>
            <div className={s.filterTitle}>Delivery Option</div>
            <div className={s.filterItemsContainer}>
              {deliveryTypes.map(deliveryType => (
                <div
                  key={deliveryType}
                  className={
                    selectedDeliveryTypes?.includes(deliveryType)
                      ? s.filterSelectedContainer
                      : s.filterItemContainer
                  }
                  onClick={() =>
                    onSelectDeliveryType && onSelectDeliveryType(deliveryType)
                  }>
                  <div
                    className={
                      selectedDeliveryTypes?.includes(deliveryType)
                        ? s.filterSelectedText
                        : s.filterItemText
                    }>
                    {deliveryType}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={s.filterContainer}>
            <div className={s.filterTitle}>Instore Pickup</div>
            <div className={s.filterItemsContainer}>
              {storeTypes.map(storeType => (
                <div
                  key={storeType}
                  className={
                    selectedStoreTypes?.includes(storeType)
                      ? s.filterSelectedContainer
                      : s.filterItemContainer
                  }
                  onClick={() =>
                    onSelectStoreType && onSelectStoreType(storeType)
                  }>
                  <div
                    className={
                      selectedStoreTypes?.includes(storeType)
                        ? s.filterSelectedText
                        : s.filterItemText
                    }>
                    {storeType}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
