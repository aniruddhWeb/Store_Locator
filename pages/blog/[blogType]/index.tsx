import React, { useEffect } from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';
import {
  useBlogDynamic,
  useBlogsDynamic,
  useBlogsStatic,
  useBlogStatic,
} from '../../../services/blogs';
import { BlogListHeader } from '../../../components/blog/BlogListHeader/BlogListHeader';
import { BlogGrid } from '../../../components/blog/BlogGrid/BlogGrid';
import { BlogItemFragment } from '../../../generated/graphql';
import { BlogCard } from '../../../components/blog/BlogCard/BlogCard';
import { BlogTypeFilter } from '../../../components/blog/BlogTypeFilter/BlogTypeFilter';
import { BlogPageHeader } from '../../../components/blog/BlogPageHeader/BlogPageHeader';
import { RelatedBlogs } from '../../../components/blog/RelatedBlogs/RelatedBlogs';
import { BlogText } from '../../../components/blog/BlogText/BlogText';
import { Route } from '../../../config/Routes';
import { Marquee } from '../../../components/common/Marquee/Marquee';
import { Loader } from '../../../components/common/Loader/Loader';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const blogs = await useBlogsStatic(context);
  let blog: any = { blog: null, relatedBlogs: [] };
  if (!blogs.isBlogType) {
    blog = await useBlogStatic(context, blogs.blogTypes);
  }
  return {
    redirect: !blogs.isBlogType &&
      !blog && {
        destination: Route.Root,
        permanent: false,
      },
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      blogs,
      blog,
    },
  };
}

const Blogs = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const {
    headerBlog,
    blogs,
    noMorePagination,
    getNextBlogs,
    blogType,
    blogTypes,
    setBlogType,
    searchQuery,
    setSearchQuery,
    getSearchBlogs,
    searchBlogs,
    isSearching,
    showOnEmpty,
  } = useBlogsDynamic(props.blogs);
  const { blog, relatedBlogs } = useBlogDynamic(props.blog);

  useEffect(() => {
    if (!props.blogs.isBlogType && blog) {
      window.scrollTo(0, 0);
    }
  }, [blog]);

  if (!props.blogs.isBlogType && blog) {
    return (
      <>
        <BreadCrumb
          {...props.breadCrumb}
          key={`blog-page-${blog.blgBlogID}`}
          smallAlways
          footer={
            blog ? (
              <BlogPageHeader blog={blog} onSelectBlogType={setBlogType} />
            ) : null
          }
        />
        <BlogText blog={blog} />
        <RelatedBlogs blogs={relatedBlogs} />
      </>
    );
  }
  return (
    <>
      <BreadCrumb
        {...props.breadCrumb}
        key={`blogs-${blogType}`}
        clickableLast
        footer={
          <BlogListHeader
            blog={headerBlog}
            search={searchQuery}
            setSearch={setSearchQuery}
            getSearchBlogs={getSearchBlogs}
          />
        }
      />
      {searchQuery ? (
        isSearching ? (
          <Loader />
        ) : (searchBlogs || []).length > 0 ? (
          <>
            <BlogTypeFilter
              selectedBlogType={blogType}
              onSelectBlogType={setBlogType}
              blogTypes={blogTypes}
            />
            <BlogGrid
              noMorePagination={noMorePagination}
              loadMore={getNextBlogs}>
              {((searchBlogs[0].blogs || []) as BlogItemFragment[]).map(
                (blogItem: BlogItemFragment) =>
                  !blogItem ? null : (
                    <BlogCard
                      key={`search-blog-item-${blogItem.blgBlogID}`}
                      blog={blogItem}
                      gridMode
                    />
                  ),
              )}
            </BlogGrid>
          </>
        ) : (
          <Marquee
            title={''}
            variant="second"
            titleVariant="left"
            showOnEmpty={!isSearching && showOnEmpty}
            scrollVariant="second">
            {[]}
          </Marquee>
        )
      ) : (
        <>
          <BlogTypeFilter
            selectedBlogType={blogType}
            onSelectBlogType={setBlogType}
            blogTypes={blogTypes}
          />
          <BlogGrid noMorePagination={noMorePagination} loadMore={getNextBlogs}>
            {(blogs || []).map((blogItem: BlogItemFragment) =>
              !blogItem ? null : (
                <BlogCard
                  key={`blog-item-${blogItem.blgBlogID}`}
                  blog={blogItem}
                  gridMode
                />
              ),
            )}
          </BlogGrid>
        </>
      )}
    </>
  );
};

export default Blogs;
