import React from 'react';
import { PencilEdit } from '../../icons/PencilEdit';
import { transformCapitalWordsForSlug } from '../../../utils/string';

export const getColumns = (
  onSort: (direction: 'asc' | 'desc') => void,
  handler: (row: any) => void,
) => [
  {
    title: 'Category',
    accessor: 'category',
    sort: true,
    sortDirection: 'asc' as const,
    onSort,
    render: (row: any) => {
      if (!row.typeParentName?.length || row.typeParentName?.[0] === 'null') {
        return <b>{row.name}</b>;
      }

      const prefix = row.typeParentName
        .join('SEPARATOR>SEPARATOR')
        .split('SEPARATOR')
        .map((item: string, i: number) => {
          if (item === '>') {
            return (
              <span key={i} style={{ color: '#61AB62' }}>
                <b>&nbsp;&gt;&nbsp;</b>
              </span>
            );
          }

          return <b key={i}>{transformCapitalWordsForSlug(item)}</b>;
        });

      return (
        <>
          <b>{prefix}</b>
          <span style={{ color: '#61AB62' }}>
            <b>&nbsp;&gt;&nbsp;</b>
          </span>
          <b>{row.name}</b>
        </>
      );
    },
  },
  {
    title: 'Total Spent',
    accessor: 'amountSpent',
  },
  {
    title: 'Businesses',
    accessor: 'businessCounter',
  },
  {
    title: 'Engagements',
    accessor: 'engagements',
  },
  {
    title: 'Brand IC',
    accessor: 'typePriceBrand',
    render: (row: any) => `$ ${row.typePriceBrand || 0}`,
  },
  {
    title: 'Delivery IC',
    accessor: 'typePriceDelivery',
    render: (row: any) => `$ ${row.typePriceDelivery || 0}`,
  },
  {
    title: 'Dispensary IC',
    accessor: 'typePriceDispensary',
    render: (row: any) => `$ ${row.typePriceDispensary || 0}`,
  },
  {
    title: 'Mail Order IC',
    accessor: 'typePriceMail',
    render: (row: any) => `$ ${row.typePriceMail || 0}`,
  },
  {
    title: '',
    accessor: 'none',
    render: (row: any) => {
      return (
        <div
          style={{ width: 20, height: 20, cursor: 'pointer' }}
          onClick={() => handler(row)}>
          <PencilEdit style={{ width: 20, height: 20 }} />
        </div>
      );
    },
  },
];
