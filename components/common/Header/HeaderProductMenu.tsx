import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useMediaQueries } from '@react-hook/media-query';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { List } from 'react-virtualized';
import { Route } from 'config/Routes';
import s from './HeaderProductMenu.module.css';
import { TCategoryBarItems } from './headerData';
import { Close } from '../../icons/Close';
import { Button } from '../Button/Button';
import { useOutsideDetect } from '../../../utils/window';
import { Arrow } from '../../icons/Arrow';
import {
  getUserClientIpDynamic,
  useCurrentLocationDynamic,
} from '../../../services/location';
import { useProductTypeAnalyticsMutation } from '../../../generated/graphql';
import { KEY_PRES_ENTER } from '../LocationDropdown/constants';
import { useDebounce } from '../../../utils/debounce';
import { Loader } from '../Loader/Loader';
import { useStrainNameSearch } from '../../../hooks/product/useStrainNameSearch';

interface Props {
  isVisible: boolean;
  closeProductMenu: () => void;
  backProductMenu: () => void;
  categoryItems: TCategoryBarItems;
  isLoadingCategories?: boolean;
}

const buttonGreenMobileStyle = {
  padding: '0 12px',
  height: 48,
  marginBottom: '40px',
  background: '#61AB62',
  maxWidth: 'calc(100vw - 32px)',
  width: 'unset',
  minWidth: '240px',
};

const buttonStyle = {
  padding: '0 40px',
  height: 48,
  marginBottom: '32px',
  background: '#000000',
  maxWidth: 'unset',
  width: 'unset',
};

const strainButtonStyle = {
  padding: '0 40px',
  height: 48,
  background: '#000000',
  maxWidth: 'unset',
  width: 'unset',
};

export const HeaderProductMenu: FC<Props> = props => {
  const router = useRouter();
  const { selectedLocation } = useCurrentLocationDynamic();

  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 860px)',
  });

  useEffect(() => {
    if (props.isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [props.isVisible]);

  const headerProductMenuRef = useOutsideDetect(
    props.closeProductMenu,
    matches.isMobile,
  );

  const onMouseLeave = useCallback(
    e => {
      if (props.isVisible && props.closeProductMenu) {
        props.closeProductMenu();
      }
    },
    [props.isVisible, props.closeProductMenu],
  );

  const [searchInputFocus, setSearchInputFocus] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [queryDebounce, setQueryDebounce] = useDebounce(query, 400);

  const { strainNames, isLoading } = useStrainNameSearch(queryDebounce);

  const strainNameList = useMemo(() => {
    return strainNames.filter((element, index) => {
      return (
        strainNames.findIndex(item => element?.name === item?.name) === index
      );
    });
  }, [props.categoryItems?.filters, strainNames, queryDebounce]);

  const onSearchChange = useCallback(e => {
    if (setQuery) {
      setQuery(e.target.value);
    }
  }, []);

  const handleClose = useCallback(() => {
    setTimeout(() => {
      setSearchInputFocus(false);
    }, 600);
  }, []);

  const searchInputRef = useOutsideDetect(handleClose);

  const onFocusInput = useCallback(() => {
    setSearchInputFocus(true);
  }, []);

  useEffect(() => {
    if (!query) {
      setQueryDebounce('');
    }
  }, [query]);

  const onPreventDefault = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleKeyPress = useCallback(
    async event => {
      if (event.key && event.key === KEY_PRES_ENTER && query) {
        router.push(
          `${props.categoryItems.href}&filters=${encodeURIComponent(
            'Strain Name',
          )}${encodeURIComponent(',')}${encodeURIComponent(query || '')}`,
          undefined,
          {
            shallow: false,
          },
        );
        setQuery('');
      }
    },
    [query],
  );

  const [saveProductTypeAnalytics] = useProductTypeAnalyticsMutation();

  const onCategoryClick = useCallback(
    (e: any, categoryItem?: any) => {
      props.closeProductMenu();
      if (props.categoryItems.title) {
        getUserClientIpDynamic().then(userIP => {
          saveProductTypeAnalytics({
            variables: {
              input: {
                category: [props.categoryItems.title || ''],
                subcategory: categoryItem ? [categoryItem.title || ''] : null,
                anaUserIP: userIP || '',
                usrRegionID: selectedLocation?.plRegionID || null,
              },
            },
          });
        });
      }
    },
    [props.closeProductMenu, selectedLocation, props.categoryItems],
  );

  const onStrainNameClick = useCallback(
    (e: any, strainNameItem: any) => {
      e.preventDefault();
      e.stopPropagation();

      router.push(
        `${props.categoryItems.href}&filters=${encodeURIComponent(
          'Strain Name',
        )}${encodeURIComponent(',')}${encodeURIComponent(
          strainNameItem?.name || '',
        )}`,
        undefined,
        {
          shallow: false,
        },
      );
      setQuery('');
    },
    [props.categoryItems],
  );

  const onFilterClick = useCallback(
    (e: any, filterItem: any, filterSubItem: any) => {
      // props.closeProductMenu();
      if (props.categoryItems.title) {
        getUserClientIpDynamic().then(userIP => {
          saveProductTypeAnalytics({
            variables: {
              input: {
                category: [props.categoryItems.title || ''],
                subcategory: null,
                tier3:
                  filterItem && filterSubItem
                    ? [filterItem.title || '', filterSubItem.title || '']
                    : null,
                anaUserIP: userIP || '',
                usrRegionID: selectedLocation?.plRegionID || null,
              },
            },
          });
        });
      }
    },
    [props.closeProductMenu, selectedLocation, props.categoryItems],
  );

  const onBannerClick = useCallback(
    e => {
      props.closeProductMenu();
      if (props.categoryItems.title) {
        getUserClientIpDynamic().then(userIP => {
          saveProductTypeAnalytics({
            variables: {
              input: {
                category: [props.categoryItems.title || ''],
                subcategory: ['Ad'],
                tier3: null,
                anaUserIP: userIP || '',
                usrRegionID: selectedLocation?.plRegionID || null,
              },
            },
          });
        });
      }
    },
    [props.closeProductMenu, selectedLocation, props.categoryItems],
  );

  const categoryItemsClass = cn(s.categoryItems, {
    [s.categoryItemsNoPadding]: !props.categoryItems.banner?.url,
  });

  const bannerContainerClass = cn(s.bannerContainer, {
    [s.bannerContainerAlone]: !props.categoryItems.hasChildren,
  });

  const mobileButtonClass = cn(s.buttonMobileContainer, {
    [s.buttonMobileContainerNoMargin]: !props.categoryItems.banner?.url,
    [s.buttonMobileContainerNoMarginCompletely]:
      !props.categoryItems.hasChildren,
  });

  const searchInputClass = cn(s.searchInput, {
    [s.searchInputNotEmpty]:
      !!query || (!query && searchInputFocus && strainNameList.length > 0),
    [s.searchInputWithDropdown]: !!query && strainNameList.length > 0,
  });

  return (
    <div
      ref={headerProductMenuRef}
      onMouseLeave={matches?.isMobile ? undefined : onMouseLeave}
      className={s.root}>
      {props.isLoadingCategories ? (
        <Loader size={40} overlay={false} />
      ) : (
        <>
          <div className={s.container}>
            <div className={s.mobileTitle}>{props.categoryItems.title}</div>
            {props.categoryItems.categories.length > 0 ? (
              <div className={categoryItemsClass}>
                {props.categoryItems.categories.map(categoryItem => (
                  <Link
                    prefetch={false}
                    href={categoryItem.href}
                    key={categoryItem.title}>
                    <a
                      key={categoryItem.title}
                      onClick={e => onCategoryClick(e, categoryItem)}
                      href={categoryItem.href}
                      className={s.categoryItem}>
                      {categoryItem.title}
                    </a>
                  </Link>
                ))}
              </div>
            ) : null}
            <div className={mobileButtonClass}>
              <Button
                onPress={(e: any) => {
                  onCategoryClick(e);
                  router.push(props.categoryItems.href);
                }}
                buttonText={`Shop All ${props.categoryItems.title}`}
                buttonStyle={buttonGreenMobileStyle}
              />
            </div>
            {props.categoryItems.banner?.url ? (
              <div className={s.bottomBorder} />
            ) : null}
            {props.categoryItems.filters.filter(
              item => item?.title !== 'Strain Name' && item?.title !== 'Brand',
            ).length > 0 ? (
              <div className={s.filterWrapper}>
                <div className={s.filterContainer}>
                  {props.categoryItems.filters
                    .filter(
                      item =>
                        item?.title !== 'Strain Name' &&
                        item?.title !== 'Brand',
                    )
                    .map(filterItem => (
                      <div
                        key={filterItem.title}
                        className={s.filterItemsContainer}>
                        <div className={s.filterTitle}>{filterItem.title}</div>
                        <div className={s.filterItems}>
                          {filterItem.items.map(filterSubItem => (
                            <Link
                              prefetch={false}
                              href={filterSubItem.href}
                              key={filterSubItem.title}>
                              <a
                                onClick={e =>
                                  onFilterClick(e, filterItem, filterSubItem)
                                }
                                href={filterSubItem.href}
                                className={s.filterItem}>
                                {filterSubItem.title}
                              </a>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
                {props.categoryItems.title !== 'Accessories' &&
                props.categoryItems.title !== 'Pets' ? (
                  <div className={s.buttonStrainContainer}>
                    <div className={s.buttonContainer}>
                      <Button
                        onPress={(e: any) => {
                          onCategoryClick(e);
                          router.push(props.categoryItems.href);
                        }}
                        buttonText={`Shop All ${props.categoryItems.title}`}
                        buttonStyle={strainButtonStyle}
                      />
                    </div>
                    <div className={s.searchContainer}>
                      <input
                        ref={searchInputRef}
                        className={searchInputClass}
                        value={query}
                        autoFocus={false}
                        onChange={onSearchChange}
                        onFocus={onFocusInput}
                        placeholder="Looking for specific Strain Name?"
                        onClick={onPreventDefault}
                        onKeyPress={handleKeyPress}
                      />
                      {searchInputFocus && isLoading ? (
                        <div className={s.searchDropdownLoading}>
                          <Loader size={24} noMargin />
                        </div>
                      ) : !!query ||
                        (searchInputFocus && strainNameList.length > 0) ? (
                        <div className={s.searchDropdown}>
                          <List
                            rowCount={strainNameList.length}
                            rowHeight={42}
                            height={164}
                            width={320}
                            rowRenderer={({ index: itemIndex, key, style }) => {
                              const strainNameItem = strainNameList[itemIndex];
                              return (
                                <div
                                  key={key}
                                  onClick={e =>
                                    onStrainNameClick(e, strainNameItem)
                                  }
                                  className={s.searchDropdownItem}
                                  style={style}>
                                  {strainNameItem?.name || ''}
                                </div>
                              );
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
            {props.categoryItems.banner?.url ? (
              <Link prefetch={false} href={props.categoryItems.banner.url}>
                <a
                  target="_blank"
                  className={bannerContainerClass}
                  onClick={onBannerClick}>
                  {props.categoryItems.banner.image?.url ? (
                    <img
                      src={props.categoryItems.banner.image?.url}
                      className={s.bannerImage}
                      alt={
                        props.categoryItems.banner.title ||
                        props.categoryItems.banner.type ||
                        props.categoryItems.title
                      }
                    />
                  ) : null}
                  <div className={s.bannerText}>
                    {props.categoryItems.banner.text}
                  </div>
                </a>
              </Link>
            ) : null}
            <div className={s.mobilePadding} />
          </div>
          {props.categoryItems.title !== 'Accessories' &&
          props.categoryItems.title !== 'Pets' ? null : (
            <div className={s.buttonContainer}>
              <Button
                onPress={(e: any) => {
                  onCategoryClick(e);
                  router.push(props.categoryItems.href);
                }}
                buttonText={`Shop All ${props.categoryItems.title}`}
                buttonStyle={buttonStyle}
              />
            </div>
          )}
          <Arrow
            fill="#FFFFFF"
            className={s.backIcon}
            onClick={props.backProductMenu}
          />
          <Close
            fill="#FFFFFF"
            className={s.closeIcon}
            onClick={props.closeProductMenu}
          />
        </>
      )}
    </div>
  );
};
