import { GetServerSidePropsContext } from 'next';
// @ts-ignore
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useMediaQueries } from '@react-hook/media-query';
import { getApolloClient } from '../api/client';
import {
  BlogListByTypeQuery,
  BlogListByTypeQueryVariables,
  BlogListByTypeDocument,
  BlogItemFragment,
  useBlogListByTypeLazyQuery,
  BlogTypesQuery,
  BlogTypesQueryVariables,
  BlogTypesDocument,
  BlogType,
  BlogBySlugQuery,
  BlogBySlugQueryVariables,
  BlogBySlugDocument,
  useBlogBySlugLazyQuery,
  useBlogSearchLazyQuery,
  BlogSearchQuery,
  BlogSearchQueryVariables,
  BlogSearchDocument,
} from '../generated/graphql';
import { Route } from '../config/Routes';
import { useDebounce } from '../utils/debounce';
import { getCleanUrl } from '../utils/link';

export const useBlogsStatic = async (context: GetServerSidePropsContext) => {
  const blogTypeQuery = context.query?.blogType as string;

  const { data: blogTypesData } = await getApolloClient(context).query<
    BlogTypesQuery,
    BlogTypesQueryVariables
  >({
    errorPolicy: 'all',
    query: BlogTypesDocument,
  });

  const blogType = (blogTypesData?.blogTypeAll || []).find(
    item => item.plSlug === blogTypeQuery,
  )?.plType;

  const { data: blogData } = await getApolloClient(context).query<
    BlogListByTypeQuery,
    BlogListByTypeQueryVariables
  >({
    errorPolicy: 'all',
    query: BlogListByTypeDocument,
    variables: {
      offset: 0,
      limit: 12,
      type: blogType || null,
    },
  });

  const searchQuery = context.query?.search as string;
  let searchBlogs: BlogType[] = [];
  if (searchQuery) {
    const { data: blogSearchData } = await getApolloClient(context).query<
      BlogSearchQuery,
      BlogSearchQueryVariables
    >({
      errorPolicy: 'all',
      query: BlogSearchDocument,
      variables: {
        search: searchQuery,
      },
    });
    searchBlogs = blogSearchData?.blogSearch;
  }

  return {
    isBlogType: !!blogType,
    blogType: blogType || null,
    blogTypes: blogTypesData?.blogTypeAll || [],
    blogs: blogData?.blogListByType || [],
    searchBlogs: searchBlogs || [],
    searchQuery: searchQuery || null,
  };
};

export const useBlogsDynamic = (props: any) => {
  const router = useRouter();

  const [noMorePagination, setNoMorePagination] = useState<boolean>(false);
  const isPaginating = useRef<boolean>(false);
  const [blogType, setBlogType] = useState<string | null>(
    props.blogType || null,
  );
  const [blogs, setBlogs] = useState<BlogItemFragment[]>(props.blogs || []);
  const [searchQuery, setSearchQuery] = useState<string>(
    props.searchQuery || '',
  );
  const [searchBlogs, setSearchBlogs] = useState<BlogType[]>(
    props.searchBlogs || [],
  );
  const [blogTypes] = useState<BlogType[]>(props.blogTypes || []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const lastSearchWord = useRef<string>('');

  const [searchDebounceQuery] = useDebounce(searchQuery, 1500);

  useEffect(() => {
    if (!router.query?.search) {
      setSearchQuery('');
      setIsSearching(false);
      setSearchBlogs([]);
      lastSearchWord.current = '';
    }
  }, [router.query]);

  const [getBlogs] = useBlogListByTypeLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setIsLoading(false);
      if (
        isPaginating.current &&
        (data?.blogListByType || []).length === (blogs || []).length
      ) {
        setNoMorePagination(true);
      }
      setBlogs(data?.blogListByType || []);
      isPaginating.current = false;
    },
  });

  const [getSearchBlogs] = useBlogSearchLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setSearchBlogs(data?.blogSearch || []);
      setIsSearching(false);
      if ((data?.blogSearch || []).length > 0 && searchQuery) {
        router
          .push(
            `${getCleanUrl(router.asPath)}?search=${searchQuery}`,
            undefined,
            {
              shallow: false,
            },
          )
          .finally(() => setIsSearching(false));
      }
    },
  });

  useEffect(() => {
    setNoMorePagination(false);
    getBlogs({
      variables: {
        type: blogType || null,
        offset: 0,
        limit: 13,
      },
    }).finally(() => setIsLoading(false));
  }, [blogType]);

  const setBlogTypeFunc = useCallback(
    (typeParam: string, fromBlogPag?: boolean) => {
      if (fromBlogPag) {
        const foundBlogItem = (blogTypes || []).find(
          blog => blog.plType === typeParam,
        );
        if (foundBlogItem) {
          router.push(`${Route.Blog}/${foundBlogItem.plSlug}`, undefined, {
            shallow: false,
            scroll: false,
          });
          setBlogType(typeParam);
        }
      } else if (blogType === typeParam) {
        setBlogType(null);
        router.push(`${Route.Blog}`, undefined, {
          shallow: false,
          scroll: false,
        });
      } else {
        const foundBlogItem = (blogTypes || []).find(
          blog => blog.plType === typeParam,
        );
        if (foundBlogItem) {
          router.push(`${Route.Blog}/${foundBlogItem.plSlug}`, undefined, {
            shallow: false,
            scroll: false,
          });
          setBlogType(typeParam);
        }
      }
    },
    [blogTypes, blogType],
  );

  const getNextBlogs = useCallback(() => {
    if (!noMorePagination) {
      isPaginating.current = true;
      setIsLoading(true);
      getBlogs({
        variables: {
          type: blogType || null,
          offset: 0,
          limit: (blogs || []).length + 12,
        },
      }).finally(() => setIsLoading(false));
    }
  }, [blogType, blogs, noMorePagination]);

  const searchBlogsFunc = useCallback(
    (searchQueryParam?: string) => {
      const searchQueryArgument = searchQueryParam || searchQuery;
      if (searchQueryArgument) {
        if (blogType) {
          router
            .push(`${Route.Blog}?search=${searchQueryArgument}`, undefined, {
              shallow: false,
            })
            .finally(() => setIsSearching(false));
        } else if (searchQueryArgument !== lastSearchWord.current) {
          setIsSearching(true);
          getSearchBlogs({
            variables: {
              search: searchQueryArgument,
            },
          }).finally(() => setIsSearching(false));
          lastSearchWord.current = searchQueryArgument;
        }
      } else {
        setIsSearching(false);
        setSearchBlogs([]);
        lastSearchWord.current = '';
      }
    },
    [blogType, searchQuery],
  );

  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 860px)',
  });

  const headerBlog = useMemo(
    () =>
      searchQuery
        ? null
        : (blogs || []).length > 0
        ? !matches?.isMobile
          ? blogs[0]
          : null
        : null,
    [blogs, searchQuery, matches?.isMobile],
  );

  const blogItems = useMemo(
    () =>
      searchQuery
        ? blogs
        : (blogs || []).length > 0
        ? !matches?.isMobile
          ? blogs.slice(1, blogs.length)
          : blogs
        : [],
    [blogs, searchQuery, matches?.isMobile],
  );

  const blogTypeNames = useMemo(
    () => (blogTypes || []).map(item => item.plType),
    [blogTypes],
  );

  const setSearchQueryFunc = useCallback((v: string) => {
    setSearchQuery(v);
    setSearchBlogs([]);
    if (!v) {
      setIsSearching(false);
      lastSearchWord.current = '';
      router.push(getCleanUrl(router.asPath), undefined, {
        shallow: false,
      });
    } else if (v !== lastSearchWord.current) {
      setIsSearching(true);
    }
  }, []);

  useEffect(() => {
    if (searchDebounceQuery !== '') {
      searchBlogsFunc(searchDebounceQuery);
    }
  }, [searchDebounceQuery]);

  return {
    headerBlog,
    blogs: blogItems,
    blogType,
    blogTypes: blogTypeNames,
    setBlogType: setBlogTypeFunc,
    getNextBlogs,
    noMorePagination,
    getSearchBlogs: searchBlogsFunc,
    searchBlogs,
    searchQuery,
    setSearchQuery: setSearchQueryFunc,
    isLoading,
    isSearching,
    showOnEmpty: lastSearchWord.current === searchQuery,
  };
};

export const useBlogStatic = async (
  context: GetServerSidePropsContext,
  blogTypes?: BlogType[] | null,
) => {
  const blogSlugQuery = context.query.blogType as string;

  const isBlogType = (blogTypes || []).some(
    item => item.plSlug === blogSlugQuery,
  );

  if (!isBlogType && blogSlugQuery) {
    const { data: blogData } = await getApolloClient(context).query<
      BlogBySlugQuery,
      BlogBySlugQueryVariables
    >({
      errorPolicy: 'all',
      query: BlogBySlugDocument,
      variables: {
        blogSlug: blogSlugQuery,
      },
    });

    if (blogData?.blogBySlug) {
      const { data: blogsData } = await getApolloClient(context).query<
        BlogListByTypeQuery,
        BlogListByTypeQueryVariables
      >({
        errorPolicy: 'all',
        query: BlogListByTypeDocument,
        variables: {
          offset: 0,
          limit: 12,
          type: blogData?.blogBySlug?.plType || null,
        },
      });

      return {
        relatedBlogs: blogsData?.blogListByType || [],
        blog: blogData?.blogBySlug || null,
      };
    }
  }

  if (isBlogType && blogSlugQuery) {
    const { data: blogsData } = await getApolloClient(context).query<
      BlogListByTypeQuery,
      BlogListByTypeQueryVariables
    >({
      errorPolicy: 'all',
      query: BlogListByTypeDocument,
      variables: {
        offset: 0,
        limit: 12,
        type: blogSlugQuery,
      },
    });

    return {
      relatedBlogs: blogsData?.blogListByType || [],
      blog: null,
    };
  }

  return {
    relatedBlogs: [],
    blog: null,
  };
};

export const useBlogDynamic = (props: any) => {
  const router = useRouter();

  const [blog, setBlog] = useState<BlogItemFragment | null>(props.blog || null);
  const relatedBlogs = useMemo(
    () =>
      (props.relatedBlogs || ([] as BlogItemFragment[])).filter(
        (blogItem: BlogItemFragment) => blogItem.blgBlogID !== blog?.blgBlogID,
      ),
    [blog, props.relatedBlogs],
  );

  useEffect(() => {
    if (props.blog) {
      setBlog(props.blog);
    }
  }, [props.blog]);

  const [getBlog] = useBlogBySlugLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setBlog(data?.blogBySlug || null);
    },
  });

  useEffect(() => {
    if (props.blog) {
      const blogSlugQuery = router.query.blogType as string;
      if (blogSlugQuery) {
        getBlog({
          variables: {
            blogSlug: blogSlugQuery,
          },
        });
      }
    }
  }, [router.query, props.blog]);

  return {
    relatedBlogs,
    blog,
  };
};
