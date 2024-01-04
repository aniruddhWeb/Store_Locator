import React, { FC, MutableRefObject, useCallback, useRef } from 'react';
import cn from 'classnames';
import styles from './TopNavigation.module.css';

interface TopNavigationProps {
  businesses: any[];
  getBusinessPercentage: (businessId: string) => number;
  selectedBusiness: any;
  selectBusiness: (id: string) => void;
}

export const TopNavigation: FC<TopNavigationProps> = ({
  businesses,
  getBusinessPercentage,
  selectedBusiness,
  selectBusiness,
}) => {
  const sliderRef = useRef<HTMLDivElement | null | undefined>();
  const isScrollingNow = useRef<boolean>(false);
  const sliderClientXRef = useRef<number>(0);
  const sliderOffsetRef = useRef<number>(0);

  const onMouseDown = useCallback(e => {
    isScrollingNow.current = true;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grabbing';
      sliderRef.current.style.userSelect = 'none';
    }
    sliderClientXRef.current = e.clientX;
  }, []);

  const onMouseUp = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
      sliderRef.current.style.userSelect = 'unset';
    }
    if (
      sliderRef.current &&
      sliderRef.current.className?.includes('disableLink')
    ) {
      sliderRef.current.className = `${sliderRef.current.className.replace(
        'disableLink',
        '',
      )}`;
    }
    isScrollingNow.current = false;
  }, []);

  const onMouseMove = useCallback(e => {
    if (isScrollingNow.current) {
      if (
        sliderRef.current &&
        !sliderRef.current.className?.includes('disableLink')
      ) {
        sliderRef.current.className = `${sliderRef.current.className} disableLink`;
      }
    }
    if (sliderRef.current && isScrollingNow.current) {
      sliderRef.current.scrollLeft =
        sliderOffsetRef.current - e.clientX + sliderClientXRef.current;
      sliderOffsetRef.current =
        sliderOffsetRef.current - e.clientX + sliderClientXRef.current;
      sliderClientXRef.current = e.clientX;
    }
  }, []);

  return (
    <div
      ref={sliderRef as MutableRefObject<HTMLDivElement>}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className={styles.topNavigation}>
      {businesses.map((item: any) => {
        if (item.productType.every((type: any) => !type.available)) {
          return null;
        }

        const businessPercentage = getBusinessPercentage(item.bizBusinessID);

        return (
          <div
            key={item.bizBusinessID}
            className={cn(styles.topNavigationItem, {
              [styles.active]:
                item.bizBusinessID === selectedBusiness?.bizBusinessID,
            })}
            onClick={() => selectBusiness(item.bizBusinessID)}>
            <div
              className={cn(styles.topNavigationItemTitle, {
                [styles.active]:
                  item.bizBusinessID === selectedBusiness?.bizBusinessID,
              })}>
              {item.bizName}
              {businessPercentage ? (
                <span
                  className={cn(styles.topNavigationItemPercentage, {
                    [styles.active]:
                      item.bizBusinessID === selectedBusiness?.bizBusinessID,
                  })}>
                  {`${businessPercentage}%`}
                </span>
              ) : null}
            </div>
            <div
              className={cn(styles.topNavigationItemRegion, {
                [styles.active]:
                  item.bizBusinessID === selectedBusiness?.bizBusinessID,
              })}>
              {item.contact?.regionName
                ? `${item.contact?.regionName}, ${item.contact?.provinceInitial}`
                : `${item.contact?.provinceInitial}`}
            </div>
          </div>
        );
      })}
    </div>
  );
};
