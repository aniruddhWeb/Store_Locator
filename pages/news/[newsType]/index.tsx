import React, { useEffect } from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { BreadCrumb } from '../../../components/common/BreadCrumb/BreadCrumb';
import { useBreadCrumbStatic } from '../../../services/breadCrumb';
import { BlogPageHeader } from '../../../components/blog/BlogPageHeader/BlogPageHeader';
import { BlogText } from '../../../components/blog/BlogText/BlogText';
import { Route } from '../../../config/Routes';
import { useNewsDynamic, useNewsStatic } from '../../../services/news';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const news = await useNewsStatic(context);
  return {
    redirect: !news?.news && {
      destination: Route.Root,
      permanent: false,
    },
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      news,
    },
  };
}

const Blogs = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { news } = useNewsDynamic(props.news);

  useEffect(() => {
    if (news) {
      window.scrollTo(0, 0);
    }
  }, [news]);

  return (
    <>
      {news ? (
        <>
          <BreadCrumb
            {...props.breadCrumb}
            key={`blog-page-${news.blgBlogID}`}
            smallAlways
            footer={<BlogPageHeader blog={news} disableTags />}
          />
          <BlogText blog={news} />
        </>
      ) : null}
    </>
  );
};

export default Blogs;
