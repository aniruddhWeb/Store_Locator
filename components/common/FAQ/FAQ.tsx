import React, { FC } from 'react';
import s from './FAQ.module.css';

interface Props {
  faq: ({
    title?: string | null;
    description?: string | null;
  } | null)[];
}

export const FAQ: FC<Props> = React.memo(({ faq }) => {
  return (
    <div className={s.root}>
      <div className={s.column}>
        {faq
          .filter((_, index) => index % 2 === 0)
          .map(item =>
            !item ? null : (
              <div key={item.title} className={s.itemRoot}>
                <div className={s.title}>{item.title || ''}</div>
                <div className={s.description}>{item.description || ''}</div>
              </div>
            ),
          )}
      </div>
      <div className={s.column}>
        {faq
          .filter((_, index) => index % 2 === 1)
          .map(item =>
            !item ? null : (
              <div key={item.title} className={s.itemRoot}>
                <div className={s.title}>{item.title || ''}</div>
                <div className={s.description}>{item.description || ''}</div>
              </div>
            ),
          )}{' '}
      </div>
    </div>
  );
});
