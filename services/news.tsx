import { GetServerSidePropsContext } from 'next';
// @ts-ignore
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { getApolloClient } from '../api/client';
import {
  BlogListByTypeQuery,
  BlogListByTypeQueryVariables,
  BlogListByTypeDocument,
  BlogItemFragment,
  useBlogListByTypeLazyQuery,
  BlogBySlugQuery,
  BlogBySlugQueryVariables,
  BlogBySlugDocument,
  useBlogBySlugLazyQuery,
} from '../generated/graphql';

export const useNewsesStatic = async (context: GetServerSidePropsContext) => {
  const { data: newsData } = await getApolloClient(context).query<
    BlogListByTypeQuery,
    BlogListByTypeQueryVariables
  >({
    errorPolicy: 'all',
    query: BlogListByTypeDocument,
    variables: {
      offset: 0,
      limit: 12,
      type: 'news',
    },
  });

  return {
    newses: newsData?.blogListByType || [],
  };
};

export const useNewsesDynamic = (props: any) => {
  const router = useRouter();

  const [noMorePagination, setNoMorePagination] = useState<boolean>(false);
  const isPaginating = useRef<boolean>(false);
  const [newses, setNewses] = useState<BlogItemFragment[]>(props.newses || []);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [getNewses] = useBlogListByTypeLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setIsLoading(false);
      if (
        isPaginating.current &&
        (data?.blogListByType || []).length === (newses || []).length
      ) {
        setNoMorePagination(true);
      }
      setNewses(data?.blogListByType || []);
      isPaginating.current = false;
    },
  });

  useEffect(() => {
    setNoMorePagination(false);
    getNewses({
      variables: {
        type: 'news',
        offset: 0,
        limit: 12,
      },
    }).finally(() => setIsLoading(false));
  }, []);

  const getNextBlogs = useCallback(() => {
    if (!noMorePagination) {
      isPaginating.current = true;
      setIsLoading(true);
      getNewses({
        variables: {
          type: 'news',
          offset: 0,
          limit: (newses || []).length + 12,
        },
      }).finally(() => setIsLoading(false));
    }
  }, [newses, noMorePagination]);

  return {
    newses,
    getNextBlogs,
    noMorePagination,
    isLoading,
  };
};

export const useNewsStatic = async (context: GetServerSidePropsContext) => {
  const newsQuery = context.query.newsType as string;
  if (newsQuery) {
    const { data: blogData } = await getApolloClient(context).query<
      BlogBySlugQuery,
      BlogBySlugQueryVariables
    >({
      errorPolicy: 'all',
      query: BlogBySlugDocument,
      variables: {
        blogSlug: newsQuery,
      },
    });

    if (blogData?.blogBySlug) {
      return {
        news: blogData?.blogBySlug || null,
      };
    }
  }

  return {
    news: null,
  };
};

export const useNewsDynamic = (props: any) => {
  const router = useRouter();

  const [news, setNews] = useState<BlogItemFragment | null>(props.news || null);

  useEffect(() => {
    if (props.news) {
      setNews(props.news);
    }
  }, [props.news]);

  const [getNews] = useBlogBySlugLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setNews(data?.blogBySlug || null);
    },
  });

  useEffect(() => {
    if (props.news) {
      const newsQuery = router.query.newsType as string;
      if (newsQuery) {
        getNews({
          variables: {
            blogSlug: newsQuery,
          },
        });
      }
    }
  }, [router.query, props.news]);

  return {
    news,
  };
};
