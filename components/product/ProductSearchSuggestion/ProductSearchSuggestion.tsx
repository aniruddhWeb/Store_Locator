import React, { useMemo } from 'react';
import Link from 'next/link';
import { ProductType } from '../../../generated/graphql';

import s from './ProductSearchSuggestion.module.css';
import { formatProductFilter } from '../../../utils/string';

import { Route } from '../../../config/Routes';

interface Props {
  productTypes: ProductType[];
  query: string;
}

export const ProductSearchSuggestion = React.memo(
  ({ productTypes, query }: Props) => {
    const suggestedFilter = useMemo(() => {
      if (query.length < 3) {
        return [];
      }
      const foundNameItems: { name: string; href: string }[] = [];
      (productTypes || []).forEach(productTypeItem => {
        if (
          productTypeItem?.name?.toLowerCase()?.includes(query?.toLowerCase())
        ) {
          foundNameItems.push({
            name: productTypeItem?.name,
            href: `${Route.Products}/${productTypeItem?.slug || ''}?filters=${
              productTypeItem?.name || ''
            }`,
          });
        }
        (productTypeItem?.typeItems || []).forEach(productTypeSubItem => {
          if (
            productTypeSubItem?.name
              ?.toLowerCase()
              ?.includes(query?.toLowerCase())
          ) {
            foundNameItems.push({
              name: `${productTypeItem.name},${productTypeSubItem?.name}`,
              href: `${Route.Products}/${productTypeItem?.slug || ''}?filters=${
                productTypeItem?.name || ''
              },${productTypeSubItem?.name || ''}`,
            });
          }
        });
      });
      return foundNameItems;
    }, [query, productTypes]);

    if (suggestedFilter.length > 0) {
      return (
        <div className={s.container}>
          {suggestedFilter.map(suggestedFilterItem => {
            return (
              <Link
                key={suggestedFilterItem.name}
                shallow={false}
                href={suggestedFilterItem.href}>
                <a className={s.root} href={suggestedFilterItem.href}>
                  <span className={s.text}>
                    Are you looking for
                    <span className={s.highlightText}>
                      {` ${formatProductFilter(suggestedFilterItem.name)} `}
                    </span>
                    ?
                  </span>
                </a>
              </Link>
            );
          })}
        </div>
      );
    }
    return null;
  },
);
