import React, { useCallback, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { BlogItemFragment } from '../../../generated/graphql';
import s from './BlogListHeader.module.css';
import { formatTimeAgo } from '../../../utils/string';
import { Route } from '../../../config/Routes';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { Search } from '../../icons/Search';
import { Close } from '../../icons/Close';

interface Props {
  blog?: BlogItemFragment | null;
  search?: string;
  setSearch?: (s: string) => void;
  getSearchBlogs?: () => void;
}

export const BlogListHeader = React.memo(
  ({ blog, search, setSearch, getSearchBlogs }: Props) => {
    const initialSearch = useRef<string>(search || '');

    const [inputFocused, setInputFocused] = useState<boolean>(false);

    const blogHref = useMemo(
      () => `${Route.Blog}/${blog?.blgSlug}`,
      [blog?.blgSlug],
    );

    const blogImage = useMemo(
      () => getImageLink(blog?.mdaLocalFileName, 640),
      [blog?.mdaLocalFileName],
    );

    const onSearchChange = useCallback(
      e => {
        if (setSearch) {
          setSearch(e.target.value);
        }
      },
      [setSearch],
    );

    const onPreventDefault = useCallback(e => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleKeyPress = useCallback(
      async e => {
        if (e.key === 'Enter') {
          e.target.blur();
        }
        if (e.key === 'Enter' && search && getSearchBlogs) {
          getSearchBlogs();
        }
      },
      [search, getSearchBlogs],
    );

    const searchContainerClass = cn(s.searchContainer, {
      [s.searchContainerFocused]: inputFocused,
    });
    const imageBlog = cn(s.blogImageContainer, { [s.blogImage]: true });
    return (
      <>
        {!blog ? (
          <div className={s.padding} />
        ) : (
          <a href={blogHref} className={s.root}>
            <img
              src={blogImage}
              className={imageBlog}
              onError={setDefaultImageOnError}
              alt={blog?.blgTitle}
            />
            <div className={s.columnContainer}>
              <div className={s.titleBlog}>{blog?.blgTitle}</div>
              <div className={s.descriptionBlog}>{blog?.blgDescription}</div>
              <div className={s.authorContainer}>
                <div className={s.publishContainer}>
                  <div className={s.nameAuthor}>
                    {blog?.authorName?.username || blog?.authorName?.bizName}
                  </div>
                  <div className={s.publishedDate}>
                    {formatTimeAgo(blog?.blgPublishedAt)}
                  </div>
                </div>
              </div>
              <div className={s.typeBlogContainer}>
                {(blog?.types || [])
                  .filter(item => item !== 'News')
                  .map(item => (
                    <div key={item} className={s.blogTypeItemContainer}>
                      <div className={s.blogTypeItemText}>{item}</div>
                    </div>
                  ))}
              </div>
            </div>
          </a>
        )}
        <div className={searchContainerClass}>
          <input
            className={s.searchInput}
            placeholder="Search blogs..."
            value={search}
            autoFocus={!!search || !!initialSearch.current}
            onChange={onSearchChange}
            onClick={onPreventDefault}
            onKeyPress={handleKeyPress}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
          {search ? (
            <Close
              fill="rgba(14,94,15,0.5)"
              className={s.clearSearchIcon}
              onClick={() => setSearch && setSearch('')}
            />
          ) : (
            <Search fill="rgba(14,94,15,0.5)" />
          )}
        </div>
      </>
    );
  },
);
