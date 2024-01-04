import React, { ReactNode, FC, Children } from 'react';
import s from './BlogGrid.module.css';
import { Button } from '../../common/Button/Button';

interface Props {
  children: ReactNode;
  title?: string;
  showOnEmpty?: boolean;
  noMorePagination?: boolean;
  loadMore?: () => void;
}

const buttonStyle = { marginTop: '24px', alignSelf: 'center' };

export const BlogGrid: FC<Props> = React.memo(
  ({ children, showOnEmpty, title, loadMore, noMorePagination }) => {
    if (!showOnEmpty && Children.count(children) === 0) {
      return null;
    }
    return (
      <div className={s.root}>
        {title ? (
          <div id={title.toLowerCase()} className={s.title}>
            {title}
          </div>
        ) : null}
        {Children.count(children) === 0 ? (
          <div className={s.emptyGridContainer}>
            <div className={s.emptyGridText}>Nothing to display</div>
          </div>
        ) : (
          <>
            <div className={s.gridContainer}>{children}</div>
            {loadMore && !noMorePagination ? (
              <Button
                buttonText="Load More"
                onPress={loadMore}
                buttonStyle={buttonStyle}
              />
            ) : null}
          </>
        )}
      </div>
    );
  },
);
