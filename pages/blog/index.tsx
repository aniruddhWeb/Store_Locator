import React from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { useRouter } from 'next/router';
import { BreadCrumb } from '../../components/common/BreadCrumb/BreadCrumb';
import { useBreadCrumbStatic } from '../../services/breadCrumb';
import { useBlogsDynamic, useBlogsStatic } from '../../services/blogs';
import { BlogListHeader } from '../../components/blog/BlogListHeader/BlogListHeader';
import { BlogGrid } from '../../components/blog/BlogGrid/BlogGrid';
import { BlogItemFragment, BlogType } from '../../generated/graphql';
import { BlogCard } from '../../components/blog/BlogCard/BlogCard';
import { BlogTypeFilter } from '../../components/blog/BlogTypeFilter/BlogTypeFilter';
import { Marquee } from '../../components/common/Marquee/Marquee';
import { Loader } from '../../components/common/Loader/Loader';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      blogs: await useBlogsStatic(context),
    },
  };
}

const Blogs = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const router = useRouter();

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

  return (
    <>
      <BreadCrumb
        {...props.breadCrumb}
        clickableLast={!!router.query?.search}
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
          searchBlogs.map((searchBlogType: BlogType) => (
            <Marquee
              key={searchBlogType.plSlug}
              title={searchBlogType.plType}
              variant="second"
              titleVariant="left"
              scrollVariant="second">
              {(searchBlogType.blogs || []).map(blogItem =>
                !blogItem ? null : (
                  <BlogCard
                    key={`search-blog-${blogItem.blgBlogID}`}
                    blog={blogItem}
                  />
                ),
              )}
            </Marquee>
          ))
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
            {(blogs || []).map((blogItem: BlogItemFragment) => (
              <BlogCard
                key={`blog-item-${blogItem.blgBlogID}`}
                blog={blogItem}
                gridMode
              />
            ))}
          </BlogGrid>
        </>
      )}
    </>
  );
};

export default Blogs;
