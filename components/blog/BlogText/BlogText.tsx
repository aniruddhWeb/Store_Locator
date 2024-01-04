import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { Blog } from '../../../generated/graphql';
import s from './BlogText.module.css';

interface Props {
  blog: Blog;
}

export const BlogText = React.memo(({ blog }: Props) => {
  if (!blog?.blgBody) {
    return null;
  }
  return (
    <div className={s.root}>
      <div className={s.description}>
        {blog?.blgBody ? (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog?.blgBody || ''),
            }}
          />
        ) : null}
      </div>
    </div>
  );
});
