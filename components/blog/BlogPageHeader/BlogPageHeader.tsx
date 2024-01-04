import React, { useMemo } from 'react';
import cn from 'classnames';
import { BlogItemFragment } from '../../../generated/graphql';
import s from './BlogPageHeader.module.css';
import { formatTimeAgo } from '../../../utils/string';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { IMAGE_PLACEHOLDER } from '../../../config/Constants';

interface Props {
  disableTags?: boolean;
  blog?: BlogItemFragment;
  onSelectBlogType?: (type: string, fromBlogPage?: boolean) => void;
}

export const BlogPageHeader = React.memo(
  ({ blog, onSelectBlogType, disableTags }: Props) => {
    const blogImage = useMemo(
      () => getImageLink(blog?.mdaLocalFileName, 720),
      [blog?.mdaLocalFileName],
    );

    const imageBlog = cn(s.blogImageContainer, {
      [s.blogImage]: blogImage !== IMAGE_PLACEHOLDER,
      [s.blogImageContain]: blogImage === IMAGE_PLACEHOLDER,
    });

    return (
      <div className={s.root}>
        <div className={s.columnContainer}>
          <h1 className={s.titleBlog}>{blog?.blgTitle}</h1>
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
          {disableTags ? null : (
            <div className={s.typeBlogContainer}>
              {(blog?.types || [])
                .filter(item => item !== 'News')
                .map(item =>
                  !item ? null : (
                    <div
                      key={item}
                      onClick={() =>
                        onSelectBlogType && onSelectBlogType(item, true)
                      }
                      className={s.blogTypeItemContainer}>
                      <div className={s.blogTypeItemText}>{item}</div>
                    </div>
                  ),
                )}
            </div>
          )}
        </div>
        <img
          src={blogImage}
          className={imageBlog}
          onError={setDefaultImageOnError}
          alt={blog?.blgTitle}
        />
      </div>
    );
  },
);
