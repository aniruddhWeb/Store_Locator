import React from 'react';
import s from './BlogTypeFilter.module.css';

interface Props {
  selectedBlogType?: string | null;
  onSelectBlogType?: (type: string) => void;
  blogTypes?: (string | null | undefined)[] | null;
}

export const BlogTypeFilter = React.memo(
  ({ blogTypes, onSelectBlogType, selectedBlogType }: Props) => {
    return (
      <div className={s.root}>
        <div className={s.horizontalScrollContainer}>
          {(blogTypes || []).map(blogType => (
            <div
              key={blogType}
              className={
                selectedBlogType && selectedBlogType === blogType
                  ? s.filterSelectedContainer
                  : s.filterItemContainer
              }
              onClick={() =>
                onSelectBlogType && blogType && onSelectBlogType(blogType)
              }>
              <div
                className={
                  selectedBlogType && selectedBlogType === blogType
                    ? s.filterSelectedText
                    : s.filterItemText
                }>
                {blogType}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
