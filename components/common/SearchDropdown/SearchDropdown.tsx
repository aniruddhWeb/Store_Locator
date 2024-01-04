import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import s from './SearchDropdown.module.css';
import { Route } from '../../../config/Routes';
import { SearchInput } from '../SearchInput/SearchInput';
import { Close } from '../../icons/Close';
import { useLeavingPage } from '../../../utils/window';
import { LogoTitle } from '../../icons/LogoTitle';

enum SearchModeValue {
  CanadaWide = 'Canada Wide',
  NearBy = 'Near Me',
}

enum SearchModeSlug {
  CanadaWide = 'canada-wide',
  NearBy = 'current-location',
}

const searchModeValueSlugMap = {
  [SearchModeValue.CanadaWide]: SearchModeSlug.CanadaWide,
  [SearchModeValue.NearBy]: SearchModeSlug.NearBy,
};

interface Props {
  toggleSearch: () => void;
}

export const SearchDropdown: FC<Props> = props => {
  const router = useRouter();

  const [query, setQuery] = useState<string>('');

  const toggleSearch = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      props.toggleSearch();
    },
    [props.toggleSearch],
  );

  const onQueryChange = useCallback(e => {
    setQuery(e.target.value);
  }, []);

  const onMainClick = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleKeyPress = useCallback(
    async e => {
      if (e.key === 'Enter') {
        e.target.blur();
      }
      if (e.key === 'Enter' && query) {
        await router.push(
          {
            pathname: Route.Search,
            query: {
              q: query || '',
            },
          },
          undefined,
          {
            shallow: false,
          },
        );
        props.toggleSearch();
        setQuery('');
      }
    },
    [query, props.toggleSearch],
  );

  const leavingPage = useLeavingPage();
  const closedOnceAlready = useRef<boolean>(false);
  useEffect(() => {
    if (leavingPage && !closedOnceAlready.current) {
      closedOnceAlready.current = true;
      props.toggleSearch();
    }
  }, [leavingPage, props.toggleSearch]);

  return (
    <div className={s.backContainer} onClick={toggleSearch}>
      <div className={s.mainContainer} onClick={onMainClick}>
        <div className={s.headerContainer}>
          <Link prefetch={false} href={Route.Root}>
            <a href={Route.Root} className={s.logoTitle} aria-label="LogoTitle">
              <LogoTitle />
            </a>
          </Link>
          <Close onClick={toggleSearch} className={s.closeIcon} />
        </div>
        <div className={s.mainSearchContainer}>
          <div className={s.searchContainer}>
            <SearchInput
              autoFocus
              noMargin
              value={query}
              onChange={onQueryChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
