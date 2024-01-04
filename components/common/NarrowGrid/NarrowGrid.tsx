import React, { ReactNode, FC, Children } from 'react';
import cn from 'classnames';
import s from './NarrowGrid.module.css';
import { Loader } from '../Loader/Loader';

interface Props {
  children: ReactNode;
  showOnEmpty?: boolean;
  title?: string;
  emptyView?: ReactNode;
  actions?: ReactNode;
  mobile?: boolean;
  desktop?: boolean;
  isLoading?: boolean;
  header?: any;
  centerTitle?: boolean;
}

export const NarrowGrid: FC<Props> = React.memo(
  ({
    children,
    showOnEmpty,
    title,
    centerTitle,
    emptyView,
    actions,
    mobile,
    desktop,
    isLoading,
    header,
  }) => {
    const rootClassname = s.root;
    const gridClass = s.gridContainer;

    const rootClass = cn(rootClassname, {
      [s.rootMobile]: mobile,
      [s.rootDesktop]: desktop,
    });

    const titleContainerClass = cn(s.titleContainer, {
      [s.titleContainerHidden]: !actions,
      [s.titleContainerCenter]: centerTitle,
    });

    const titleClass = cn(s.title, {
      [s.titleCenter]: centerTitle,
    });

    if (!showOnEmpty && Children.count(children) === 0) {
      return null;
    }
    return (
      <div className={rootClass}>
        <div className={titleContainerClass}>
          {title ? (
            <div id={title.toLowerCase()} className={titleClass}>
              {title}
            </div>
          ) : null}
          {actions ? <div className={s.actionsContainer}>{actions}</div> : null}
        </div>
        {header}
        {Children.count(children) === 0 ? (
          emptyView !== undefined ? (
            emptyView
          ) : (
            <div className={s.emptyGridContainer}>
              <div className={s.emptyGridText}>Nothing to display</div>
            </div>
          )
        ) : (
          <>
            <div className={gridClass}>{children}</div>
            {isLoading ? <Loader size={40} /> : null}
          </>
        )}
      </div>
    );
  },
);
