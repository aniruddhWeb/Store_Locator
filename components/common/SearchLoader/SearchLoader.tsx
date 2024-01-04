import React, { useEffect, useMemo, useRef } from 'react';
import s from './SearchLoader.module.css';
import { useDebounce } from '../../../utils/debounce';

type Props = {
  isLoading?: boolean;
};

const searchTexts = [
  'Hold tight as we search for your favourite cannabis products!',
  'Standby as we search for your favourite cannabis products!',
];

export const SearchLoader = React.memo(
  ({ isLoading: isLoadingProp }: Props) => {
    const randomIndex = useRef<number>(Math.round(Math.random()));
    const [isLoading] = useDebounce(isLoadingProp, 1200);
    const searchText = useMemo(() => searchTexts[randomIndex.current], []);

    useEffect(() => {
      if (isLoading) {
        setTimeout(() => {
          document.body.style.overflow = 'hidden';
        }, 500);
      } else {
        setTimeout(() => {
          document.body.style.overflow = 'scroll';
        }, 500);
      }
      return () => {
        document.body.style.overflow = 'scroll';
      };
    }, [isLoading]);

    return (
      <div className={s.root}>
        <img
          src="/images/loading.gif"
          alt="Search Loading..."
          className={s.image}
        />
        <span className={s.text}>{searchText}</span>
      </div>
    );
  },
);
