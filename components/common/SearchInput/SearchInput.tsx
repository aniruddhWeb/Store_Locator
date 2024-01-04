import React, {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import Link from 'next/link';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useMediaQueries } from '@react-hook/media-query';
import s from './SearchInput.module.css';
import { Search } from '../../icons/Search';
import { Cross } from '../../icons/Cross';
import { useSearchBrandSuggestion } from '../../../hooks/search/useSearchBrandSuggestion';
import { transformBusinessTypeToSlug } from '../../../utils/string';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { useDebounce } from '../../../utils/debounce';
import { SearchLoader } from '../SearchLoader/SearchLoader';
import { SearchType } from '../../../services/searchHeavy';
import { useCurrentLocationDynamic } from '../../../services/location';

const UserLocationToggleForSearchPage = dynamic<any>(
  // @ts-ignore
  () =>
    import(
      '../UserLocationToggleForSearchPage/UserLocationToggleForSearchPage'
    ).then(mod => mod.UserLocationToggleForSearchPage),
  {
    ssr: false,
  },
);

interface Props {
  fullWidth?: boolean;
  mobile?: boolean;
  desktop?: boolean;
  value: string;
  onChange: (e: any) => void;
  onKeyPress: (e: any) => void;
  autoFocus?: boolean;
  handleFocus?: (e: any) => void;
  tabs?: { label: string; count: number; type: SearchType }[];
  selectedTab?: SearchType;
  onTabChange?: (type: SearchType) => void;
  noMargin?: boolean;
  placeholder?: string;
  isSearching?: boolean;
  showLocationFilter?: boolean;
}

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const SearchInput: FC<Props> = props => {
  const backRef = useRef<HTMLDivElement>();
  const contentRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLDivElement>();

  const [isSearching, setIsSearching] = useDebounce(props.isSearching, 2000);
  const { selectedLocation } = useCurrentLocationDynamic();

  useEffect(() => {
    if (props.isSearching) {
      setTimeout(() => {
        setIsSearching(true);
      }, 50);
    }
  }, [props.isSearching]);

  const onPreventDefault = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleClose = useCallback(() => {
    props.onChange({ target: { value: '' } });
  }, [props.onChange]);

  useEffect(() => {
    const onResize = () => {
      if (backRef.current) {
        // @ts-ignore
        backRef.current.style.height = `${
          contentRef.current?.offsetHeight || 0
        }px`;
      }
    };
    onResize();
    window.addEventListener('load', onResize);
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('load', onResize);
      window.removeEventListener('resize', onResize);
    };
  }, [JSON.stringify(props.tabs), props.isSearching, isSearching]);

  const searchQueryClass = cn(s.searchQueryInputWrapper, {
    [s.searchQueryInputWrapperMobile]: props.mobile,
    [s.searchQueryInputWrapperDesktop]: props.desktop,
    [s.searchQueryInputWrapperFullWidth]: props.fullWidth,
    [s.searchQueryInputWrapperNoMargin]: props.noMargin,
  });

  const searchQueryInputContainerClass = cn(s.searchQueryInputContainer, {
    [s.searchQueryInputContainerBottom]: (props.tabs || []).length > 0,
  });

  useEffect(() => {
    if (props?.autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 600);
    }
  }, [props?.autoFocus]);

  const { brands } = useSearchBrandSuggestion(props.value, selectedLocation?.province?.country?.plCountryID);

  const getBusinessHref = useCallback((businessItem: any) => {
    if (
      businessItem.plType === BusinessType.DeliveryType ||
      businessItem.plType === BusinessType.DispensaryType
    ) {
      return `/${transformBusinessTypeToSlug(
        businessItem.plType,
      )}/${businessItem.contact?.provinceInitial?.toLowerCase()}/${
        businessItem.contact?.regionSlug
      }/${businessItem.bizSlug}`;
    }
    return `/${transformBusinessTypeToSlug(businessItem.plType)}/${
      businessItem.bizSlug
    }`;
  }, []);

  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 860px)',
  });

  return (
    <>
      <div
        ref={backRef as MutableRefObject<HTMLDivElement>}
        className={s.searchBackContainer}
      />
      <div
        ref={contentRef as MutableRefObject<HTMLDivElement>}
        className={searchQueryClass}>
        <div className={searchQueryInputContainerClass}>
          <input
            ref={inputRef as any}
            className={s.searchQueryInput}
            placeholder={props.placeholder || "I'm searching for..."}
            onClick={onPreventDefault}
            onFocus={props.handleFocus}
            {...props}
          />
        </div>
        {isSearching ? (
          <>
            <div className={s.searchTabEmpty}>
              <div className={s.searchTabTextEmpty}>{'_'}</div>
            </div>
            <SearchLoader isLoading />
          </>
        ) : (props.tabs || []).length > 0 ||
          props.showLocationFilter ||
          (matches.isMobile && brands.length > 0) ? (
          <div className={s.filterContainer}>
            <div className={s.searchTabsContainer}>
              {(props.tabs || []).length === 0 ? (
                <div className={s.searchTabEmpty}>
                  <div className={s.searchTabTextEmpty}>{'_'}</div>
                </div>
              ) : (
                (props.tabs || []).map((tab, tabIndex) => (
                  <div
                    onClick={() => {
                      if (props.onTabChange) {
                        props.onTabChange(tab.type);
                      }
                    }}
                    key={tab.label}
                    className={s.searchTab}>
                    <div
                      className={
                        props.selectedTab === tab.type
                          ? s.searchTabTextSelected
                          : s.searchTabText
                      }>
                      {tab.label}
                      {tab.count ? (
                        <span className={s.tabCountMobile}>
                          {tab.count >= 999 ? `999+` : tab.count}
                        </span>
                      ) : null}
                    </div>
                    {tab.count ? (
                      <span className={s.tabCount}>
                        {tab.count >= 999 ? `999+` : tab.count}
                      </span>
                    ) : null}
                  </div>
                ))
              )}
            </div>
            {isSearching ? null : brands.length > 0 ? (
              <div
                className={s.brandSuggestionsMobile}
                style={{
                  marginTop:
                    !props.showLocationFilter || (props.tabs || []).length === 0
                      ? 16
                      : 0,
                }}>
                <div className={s.brandSuggestionLabel}>Did you mean:</div>
                <div className={s.brandSuggestionsList}>
                  {brands.map(brandItem => (
                    <Link
                      key={brandItem.bizBusinessID}
                      href={getBusinessHref(brandItem)}>
                      <a
                        href={getBusinessHref(brandItem)}
                        className={s.brandItemContainer}>
                        <img
                          onError={setDefaultImageOnError}
                          className={s.brandItemImage}
                          alt={brandItem.bizBusinessID}
                          src={getImageLink(brandItem.mdaLocalFileName, 60)}
                        />
                        <div className={s.brandTextContainer}>
                          <div className={s.brandItemName}>
                            {brandItem.bizName}
                          </div>
                          <div className={s.brandItemType}>
                            {(brandItem.plType || '').toUpperCase()}
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
            {props.showLocationFilter ? (
              <UserLocationToggleForSearchPage disableToggle={isSearching} />
            ) : null}
          </div>
        ) : null}
        {isSearching ? null : brands.length > 0 ? (
          <div className={s.brandSuggestions}>
            <div className={s.brandSuggestionLabel}>Did you mean:</div>
            <div className={s.brandSuggestionsList}>
              {brands.map(brandItem => (
                <Link
                  key={brandItem.bizBusinessID}
                  href={getBusinessHref(brandItem)}>
                  <a
                    href={getBusinessHref(brandItem)}
                    className={s.brandItemContainer}>
                    <img
                      onError={setDefaultImageOnError}
                      className={s.brandItemImage}
                      alt={brandItem.bizBusinessID}
                      src={getImageLink(brandItem.mdaLocalFileName, 60)}
                    />
                    <div className={s.brandTextContainer}>
                      <div className={s.brandItemName}>{brandItem.bizName}</div>
                      <div className={s.brandItemType}>
                        {(brandItem.plType || '').toUpperCase()}
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        <div
          className={s.searchIcon}
          onClick={props.value ? handleClose : undefined}>
          {props.value ? (
            <Cross className={s.searchIconSvg} fill="#DADADA" />
          ) : (
            <Search className={s.searchIconSvg} fill="#DADADA" />
          )}
        </div>
      </div>
    </>
  );
};
