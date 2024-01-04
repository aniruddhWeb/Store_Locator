import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { BreadCrumb } from '../../components/common/BreadCrumb/BreadCrumb';
import { useBreadCrumbStatic } from '../../services/breadCrumb';
import { BlogGrid } from '../../components/blog/BlogGrid/BlogGrid';
import { BlogItemFragment } from '../../generated/graphql';
import { BlogCard } from '../../components/blog/BlogCard/BlogCard';
import { useNewsesDynamic, useNewsesStatic } from '../../services/news';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      blogs: await useNewsesStatic(context),
    },
  };
}

const Blogs = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { newses, noMorePagination, getNextBlogs, isLoading } =
    useNewsesDynamic(props.blogs);

  return (
    <>
      <BreadCrumb {...props.breadCrumb} />
      <BlogGrid noMorePagination={noMorePagination} loadMore={getNextBlogs}>
        {(newses || []).map((newsItem: BlogItemFragment) => (
          <BlogCard
            key={`news-item-${newsItem.blgBlogID}`}
            blog={newsItem}
            gridMode
            newsMode
          />
        ))}
      </BlogGrid>
    </>
  );
};

export default Blogs;
