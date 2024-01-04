import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import s from './HeaderSearch.module.css';
import { Route } from '../../../config/Routes';
import { KEY_PRES_ENTER } from '../LocationDropdown/constants';
import { useOutsideDetect } from '../../../utils/window';
import { useCurrentUserDynamic } from '../../../services/user';

const Close = dynamic<any>(
  // @ts-ignore
  () => import('../../icons/Close').then(mod => mod.Close),
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
  setIsSearchInputActive?: (current: boolean) => void;
  isSearchInputActive?: boolean;
}

export const HeaderSearch: React.FC<IProps> = React.memo(
  ({ setIsSearchInputActive, isSearchInputActive }) => {
    const router = useRouter();

    const inputRef = useRef<any>();

    const userProps = useCurrentUserDynamic();

    const [query, setQuery] = useState<string>('');

    const handleClose = useCallback(() => {
      if (setIsSearchInputActive) {
        setIsSearchInputActive(false);
      }
    }, [setIsSearchInputActive]);

    const handleFocus = useCallback(() => {
      if (setIsSearchInputActive) {
        setIsSearchInputActive(true);
      }
    }, [setIsSearchInputActive]);

    const searchInputRef = useOutsideDetect(handleClose);

    useEffect(() => {
      if (isSearchInputActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'scroll';
      }
    }, [isSearchInputActive]);

    const handleKeyPress = useCallback(
      async event => {
        if (event.key && event.key === KEY_PRES_ENTER) {
          if (setIsSearchInputActive) {
            setIsSearchInputActive(false);
          }
          inputRef.current?.blur();
        }
        if (event.key && event.key === KEY_PRES_ENTER && query) {
          router.push(
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
          setQuery('');
        }
      },
      [query, setIsSearchInputActive],
    );

    const onSearchChange = useCallback(e => {
      if (setQuery) {
        setQuery(e.target.value);
      }
    }, []);

    const onPreventDefault = useCallback(e => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const searchContainerClass = cn(s.searchContainer, {
      [s.searchContainerFocused]: isSearchInputActive,
    });

    const searchWrapperClass = cn(s.searchWrapper, {
      [s.searchWrapperFocused]: isSearchInputActive,
      [s.searchWrapperFocusedWithSignUp]:
        isSearchInputActive && !userProps?.currentUser,
    });

    return (
      <div className={s.searchConstContainer}>
        <div ref={searchInputRef} className={searchWrapperClass}>
          <div className={searchContainerClass}>
            <input
              ref={inputRef}
              className={s.searchInput}
              value={query}
              autoFocus={false}
              onChange={onSearchChange}
              placeholder="Find marijuana products..."
              onClick={onPreventDefault}
              onKeyPress={handleKeyPress}
              onFocus={handleFocus}
            />
            {query ? (
              <Close
                fill="rgba(14,94,15,0.5)"
                className={s.clearSearchIcon}
                onClick={handleClose}
              />
            ) : (
              <Search className={s.searchIcon} fill="rgba(14,94,15,0.5)" />
            )}
          </div>
        </div>
      </div>
    );
  },
);
