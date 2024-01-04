import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { Product } from '../../../generated/graphql';
import s from './ProductAbout.module.css';

interface Props {
  product: Product;
}

export const ProductAbout = React.memo(({ product }: Props) => {
  if (!product?.prdDescription) {
    return null;
  }
  return (
    <div className={s.root}>
      <h2 id="description" className={s.title}>
        Description
      </h2>
      <div className={s.description}>
        {product?.prdDescription ? (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product?.prdDescription || ''),
            }}
          />
        ) : null}
      </div>
    </div>
  );
});
