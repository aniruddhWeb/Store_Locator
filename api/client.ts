import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GetServerSidePropsContext } from 'next';
import Cookies from 'js-cookie';
import { onError } from '@apollo/client/link/error';
import {
  API_BASE_URL,
  APPLE_GUIDELINE_WORDS,
  CONTENTFUL_BASE_URL,
  CONTENTFUL_CACHE_TTL,
  CONTENTFUL_TOKEN,
  isDEV,
} from '../config/Constants';
import { getCookie } from '../services/cookie';
import { hasWindow } from '../utils/window';

const filterSpecificItems: (
  data: any,
  items: string[],
  searchParam?: string,
) => any = (data: any, filterNames: string[], searchParam?: string) => {
  if (filterNames.length === 0) {
    return data;
  }
  if (data === null) {
    return null;
  }
  if (typeof data === 'string') {
    if (
      filterNames.some(filterItem =>
        data?.toLowerCase()?.includes(filterItem?.toLowerCase()),
      )
    ) {
      return null;
    }
    return data;
  }
  if (Array.isArray(data)) {
    return data
      .map(dataItem => filterSpecificItems(dataItem, filterNames, searchParam))
      .filter(dataItem => dataItem !== null);
  }
  if (typeof data === 'object') {
    let returnObject: any = Object.keys(data).reduce(
      (object: any, key: string) => {
        object[key] = filterSpecificItems(data[key], filterNames, searchParam);
        return object;
      },
      {},
    );
    const keys = Object.keys(returnObject);
    if (
      searchParam &&
      filterNames.some(filterItem =>
        searchParam?.toLowerCase()?.includes(filterItem?.toLowerCase()),
      )
    ) {
      const countKeys = keys.filter(key =>
        key?.toLowerCase()?.includes('count'),
      );
      countKeys.forEach(key => {
        returnObject = {
          ...returnObject,
          [key]: 0,
        };
      });
    }
    if (
      keys.some(
        key =>
          !key?.includes('FileName') &&
          !key?.includes('username') &&
          !key?.includes('usrFirstName') &&
          !key?.includes('usrLastName') &&
          key?.toLowerCase()?.includes('name') &&
          returnObject[key] === null,
      )
    ) {
      return null;
    }
    return returnObject;
  }
  return data;
};

const filterFetch =
  (
    context?: GetServerSidePropsContext & {
      fetch?: WindowOrWorkerGlobalScope['fetch'];
    },
  ) =>
  async (input: RequestInfo, init?: RequestInit) => {
    if (context?.fetch) {
      return context?.fetch(input, init);
    }
    const shouldRemoveByAppleGuidelines =
      (hasWindow && !!(window as any)?.ReactNativeWebView) ||
      !!getCookie('shouldHideAppDownload', context?.req?.headers?.cookie) ||
      !!getCookie(
        'shouldRemoveByAppleGuidelines',
        context?.req?.headers?.cookie,
      ) ||
      context?.req?.headers?.platform === 'ios' ||
      context?.req?.headers?.platform === 'android';

    if (shouldRemoveByAppleGuidelines) {
      const response = await fetch(input, init);
      let searchParam: string | undefined;
      try {
        if (init?.body) {
          searchParam = JSON.parse(init?.body as any)?.variables?.search;
        }
      } catch (e) {
        searchParam = undefined;
      }
      const json = await response.json();
      return {
        ...response,
        text: async () =>
          JSON.stringify(
            filterSpecificItems(json, APPLE_GUIDELINE_WORDS, searchParam),
          ),
        json: async () =>
          filterSpecificItems(json, APPLE_GUIDELINE_WORDS, searchParam),
      };
    }
    return fetch(input, init);
  };

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && isDEV) {
    graphQLErrors.forEach(
      ({ message, locations, path, name, extensions, ...rest }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Stack: ${JSON.stringify(
            extensions,
          )}`,
        ),
    );
  }
  if (networkError && isDEV) {
    console.log(`[Network error]: ${networkError.message}`);
  }
  if (graphQLErrors || networkError) {
    if (hasWindow) {
      // window.location.href = `${window.location.origin}${Route.Error}`;
    }
  }
});

const serverApolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        businessBySlug: {
          merge: true,
        },
      },
    },
  },
});
let serverApolloClient: ApolloClient<any>;

export const getApolloClient = (
  context?: GetServerSidePropsContext & {
    fetch?: WindowOrWorkerGlobalScope['fetch'];
  },
) => {
  const apolloLink = ApolloLink.from([
    errorLink,
    setContext(async (_, prev) => {
      const sessionidencrypted = context
        ? getCookie('leafythings_session', context?.req?.headers?.cookie) ||
          context?.req?.cookies?.leafythings_session
        : Cookies.get('leafythings_session');
      const sessionidprovided = context
        ? getCookie('leafythings_session_id', context?.req?.headers?.cookie) ||
          context?.req?.cookies?.leafythings_session_id
        : Cookies.get('leafythings_session_id');

      if (sessionidencrypted || sessionidprovided) {
        return {
          ...prev,
          headers: {
            ...prev.headers,
            sessionidencrypted: sessionidencrypted || '',
            sessionidprovided: sessionidprovided || '',
          },
        };
      }

      return prev;
    }),
    createHttpLink({
      uri: API_BASE_URL,
      fetch: filterFetch(context),
    }),
  ]);
  if (!hasWindow) {
    if (!serverApolloClient) {
      serverApolloClient = new ApolloClient({
        ssrMode: true,
        link: apolloLink,
        cache: serverApolloCache,
      });
    }
    serverApolloClient.setLink(apolloLink);
    return serverApolloClient;
  }
  return new ApolloClient({
    ssrMode: false,
    link: apolloLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            businessBySlug: {
              merge: true,
            },
          },
        },
      },
    }),
  });
};

export const apolloClient = getApolloClient();

const contentfulLink = createHttpLink({
  uri: CONTENTFUL_BASE_URL,
  headers: {
    Authorization: `Bearer ${CONTENTFUL_TOKEN}`,
  },
});

let contentfulCreatedAt: number | undefined;
let contentfulClient: ApolloClient<any> = new ApolloClient({
  link: contentfulLink,
  cache: new InMemoryCache(),
  ssrMode: true,
});

export const getContentfulClient = () => {
  if (
    !contentfulClient ||
    !contentfulCreatedAt ||
    Date.now() - contentfulCreatedAt > CONTENTFUL_CACHE_TTL
  ) {
    contentfulCreatedAt = Date.now();
    contentfulClient.cache.reset();
    contentfulClient = new ApolloClient({
      link: contentfulLink,
      cache: new InMemoryCache(),
      ssrMode: true,
    });
  }
  return contentfulClient;
};
