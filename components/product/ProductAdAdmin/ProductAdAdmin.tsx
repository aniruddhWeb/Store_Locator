import React, {
  FC,
  useState,
  ChangeEvent,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import cn from 'classnames';
import { ClickAwayListener } from '@mui/material';
import { CustomGrid } from 'components/common/CustomGrid/CustomGrid';
import { Search } from 'components/icons/Search';
import { useDebounce } from 'utils/debounce';
import {
  ProductType,
  useProductListTypesForAdminAdvertisementQuery,
} from 'generated/graphql';
import { getColumns } from './productAdAdminData';
import styles from './ProductAdAdmin.module.css';
import { ProductAdAdminModal } from './ProductAdAdminModal';

export const ProductAdAdmin: FC = () => {
  const searchInputRef = useRef(null);
  const [isSearchInputFocused, setSearchInputFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [debouncedSearchValue] = useDebounce(searchValue, 300);
  const [valuesPopupVisible, setValuesPopupVisible] = useState<boolean>(false);
  const [selectedAdRow, setSelectedAdRow] = useState<ProductType | null>(null);

  const { data, refetch: refresh } =
    useProductListTypesForAdminAdvertisementQuery({
      fetchPolicy: 'no-cache',
      variables: {
        name: debouncedSearchValue,
        sort: ['name', sortDirection],
      },
    });

  const editPrice = useCallback((row: any) => {
    setSelectedAdRow(row);
    setValuesPopupVisible(true);
  }, []);

  const columns = useMemo(() => {
    return getColumns(setSortDirection, editPrice);
  }, [setSortDirection, editPrice]);

  useEffect(() => {
    if (isSearchInputFocused && searchInputRef.current) {
      (searchInputRef.current as any).focus();
    }
  }, [isSearchInputFocused, searchInputRef.current]);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.title}>Product Ads</div>
          <div className={styles.search}>
            <ClickAwayListener onClickAway={() => setSearchInputFocused(false)}>
              <div
                onClick={() => setSearchInputFocused(true)}
                className={cn(styles.searchInnerWrapper, {
                  [styles.focused]: isSearchInputFocused,
                })}>
                <input
                  type="text"
                  value={searchValue}
                  ref={searchInputRef}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setSearchValue(e.target.value);
                  }}
                />
                <Search fill="#DADADA" />
              </div>
            </ClickAwayListener>
          </div>
        </div>
        <CustomGrid
          columns={columns}
          data={data?.productListTypesForAdminAdvertisement.map(
            (item: any) => ({
              ...item,
              amountSpent: item.amountSpent || 0,
              businessCounter: item.businessCounter || 0,
              engagements: item.engagements || 0,
            }),
          )}
        />
      </div>
      <ProductAdAdminModal
        isOpen={valuesPopupVisible}
        setIsOpen={setValuesPopupVisible}
        productAdItem={selectedAdRow}
        refresh={refresh}
      />
    </>
  );
};
