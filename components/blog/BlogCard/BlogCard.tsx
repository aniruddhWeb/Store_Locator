import React, { useMemo } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { BlogItemFragment } from '../../../generated/graphql';
import s from './BlogCard.module.css';
import { formatTimeAgo } from '../../../utils/string';
import { Route } from '../../../config/Routes';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { IMAGE_PLACEHOLDER } from '../../../config/Constants';

interface Props {
  blog?: BlogItemFragment;
  gridMode?: boolean;
  newsMode?: boolean;
}

export const BlogCard = React.memo(({ blog, gridMode, newsMode }: Props) => {
  const blogHref = useMemo(
    () =>
      newsMode
        ? `${Route.News}/${blog?.blgSlug}`
        : `${Route.Blog}/${blog?.blgSlug}`,
    [blog?.blgSlug, newsMode],
  );

  const blogImage = useMemo(
    () => getImageLink(blog?.mdaLocalFileName, 400),
    [blog?.mdaLocalFileName],
  );
  const imageBlogClass = cn(s.blogImageContainer, {
    [s.blogImage]: blogImage === IMAGE_PLACEHOLDER,
    [s.blogImageContain]: blogImage !== IMAGE_PLACEHOLDER,
  });

  const blogTypes = useMemo(
    () => (blog?.types || []).filter(item => item !== 'News'),
    [blog?.types],
  );

  return (
    <Link prefetch={false} href={blogHref}>
      <a className={s.root} href={blogHref}>
        <div className={gridMode ? s.cardColumnGrid : s.cardColumn}>
          <img
            src={blogImage}
            onError={setDefaultImageOnError}
            className={imageBlogClass}
            alt={blog?.blgTitle}
          />
          <div className={s.titleBlog}>{blog?.blgTitle}</div>
          <div className={s.authorContainer}>
            <div className={s.nameAuthor}>
              {blog?.authorName?.username || blog?.authorName?.bizName}
            </div>
            <div className={s.publishedDate}>
              {formatTimeAgo(blog?.blgPublishedAt)}
            </div>
          </div>
          {blogTypes.length > 0 ? (
            <div className={s.typeBlog}>{blogTypes.join(', ')}</div>
          ) : null}
        </div>
      </a>
    </Link>
  );
});
