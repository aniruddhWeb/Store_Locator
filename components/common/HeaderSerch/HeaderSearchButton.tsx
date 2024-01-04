import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import s from './HeaderSearch.module.css';
import { Route } from '../../../config/Routes';

const MapSelect = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/MapSelect').then(mod => mod.MapSelect),
  {
    ssr: false,
  },
);
const Search = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/Search').then(mod => mod.Search),
  {
    ssr: false,
  },
);

interface IProps {
  onClickSearch?: () => void;
}

export const HeaderSearchButton: React.FC<IProps> = React.memo(
  ({ onClickSearch }) => {
    const router = useRouter();

    const hideSearchBarForMobile = useMemo(
      () =>
        router.pathname === Route.Search ||
        router.pathname === Route.HeavySearch,
      [router.pathname],
    );

    const onPreventDefault = useCallback(
      e => {
        e.preventDefault();
        e.stopPropagation();
        if (onClickSearch) {
          onClickSearch();
        }
      },
      [onClickSearch],
    );

    if (hideSearchBarForMobile) {
      return null;
    }
    return (
      <div className={s.searchWrapperMobile}>
        <div className={s.searchContainer}>
          <div className={s.searchInputDiv} onClick={onPreventDefault}>
            {'Find marijuana products...'}
          </div>
          <Search className={s.searchIcon} fill="rgba(14,94,15,0.5)" />
        </div>
        <Link prefetch={false} href={Route.Map}>
          <a href={Route.Map} className={s.showMap}>
            <div className={s.textIcon}>Show Map</div>
            <MapSelect fill="#EF845C" className={s.search} />
          </a>
        </Link>
      </div>
    );
  },
);
