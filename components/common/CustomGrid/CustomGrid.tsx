import React, { FC, ReactNode, useCallback, useState } from 'react';
import { SortArrowIcon } from 'components/icons/SortArrowIcon';
import styles from './CustomGrid.module.css';

export interface IColumn {
  title: string;
  accessor: string;
  width?: number;
  sort?: boolean;
  sortDirection?: 'asc' | 'desc';
  render?: (row: any) => ReactNode;
  onSort?: (direction: 'asc' | 'desc') => void;
}

interface CustomGridProps {
  columns: IColumn[];
  data?: any[] | null;
  rowIdKey?: string;
}

export const CustomGrid: FC<CustomGridProps> = ({
  columns,
  data,
  rowIdKey = 'id',
}) => {
  const [sorting, setSorting] = useState<Record<string, 'asc' | 'desc'>>(
    columns.reduce((acc: any, curr: any) => {
      if (!curr.sortDirection) return acc;

      return {
        ...acc,
        [curr.accessor]: curr.sortDirection,
      };
    }, {}),
  );

  const sortHandler = useCallback(
    (accessor: string, onSort?: (direction: 'asc' | 'desc') => void) => {
      const newVal = sorting[accessor] === 'asc' ? 'desc' : 'asc';

      setSorting((prevVal: Record<string, 'asc' | 'desc'>) => ({
        ...prevVal,
        [accessor]: newVal,
      }));

      onSort?.(newVal);
    },
    [sorting],
  );

  return (
    <div className={styles.root}>
      <table>
        <thead>
          <tr>
            {columns.map((column: IColumn) => (
              <td key={column.accessor} width={column.width}>
                <div className={styles.columnTitle}>
                  {column.title}
                  {column.sort ? (
                    <div
                      onClick={() =>
                        sortHandler(column.accessor, column.onSort)
                      }
                      className={styles.sortBtn}>
                      <SortArrowIcon
                        color={
                          sorting[column.accessor] === 'desc'
                            ? '#C5C5C5'
                            : '#6D6D6D'
                        }
                      />
                      <SortArrowIcon
                        color={
                          sorting[column.accessor] === 'asc'
                            ? '#C5C5C5'
                            : '#6D6D6D'
                        }
                      />
                    </div>
                  ) : null}
                </div>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {(data || []).map((row: Record<string, any>) => (
            <tr key={row[rowIdKey]}>
              {columns.map((column: IColumn) => (
                <td key={column.accessor} width={column.width}>
                  {column.render ? column.render(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
