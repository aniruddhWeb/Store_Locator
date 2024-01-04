import React from 'react';
import cn from 'classnames';
import DOMPurify from 'isomorphic-dompurify';
import s from './CategoryDescription.module.css';

interface Props {
  body: any;
  marginBottom?: boolean;
  noBorder?: boolean;
}

export const CategoryDescription = React.memo(
  ({ marginBottom, body, noBorder }: Props) => {
    const rootClass = cn(s.root, {
      [s.rootMargin]: marginBottom,
      [s.rootNoBorder]: noBorder,
    });
    if (!body) {
      return null;
    }
    return (
      <div className={rootClass}>
        <div className={s.description}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(body || ''),
            }}
          />
        </div>
      </div>
    );
  },
);
