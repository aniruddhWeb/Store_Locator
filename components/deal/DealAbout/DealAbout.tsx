import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { BusinessDeals } from '../../../generated/graphql';
import s from './DealAbout.module.css';

interface Props {
  businessDeal: BusinessDeals;
}

export const DealAbout = React.memo(({ businessDeal }: Props) => {
  if (!businessDeal?.dlsDescription) {
    return null;
  }
  return (
    <div className={s.root}>
      <h2 id="description" className={s.title}>
        Description
      </h2>
      <div className={s.description}>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(businessDeal?.dlsDescription || ''),
          }}
        />
      </div>
    </div>
  );
});
