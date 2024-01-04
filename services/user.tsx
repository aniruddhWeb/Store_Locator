import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GetServerSidePropsContext } from 'next';
import Cookies from 'js-cookie';
import isEqual from 'lodash/isEqual';
import {
  CurrentUser,
  CurrentUserDocument,
  CurrentUserQuery,
  CurrentUserQueryVariables,
} from '../generated/app';
import { hasWindow, useWindowFocus } from '../utils/window';
import { apolloClient, getApolloClient } from '../api/client';
import { getCookie, removeCookie, setCookie } from './cookie';
import { Route } from '../config/Routes';

export const UserContext = createContext<{
  originalUser: {
    username: string;
    userID: string;
  } | null;
  user: CurrentUser | null;
  setUser: (user: CurrentUser | null) => void;
}>({
  originalUser: null,
  user: null,
  setUser: () => {},
});

export const useUserState = (user: CurrentUser | null) => {
  const [currentUserState, setCurrentUserValue] = useState<CurrentUser | null>(
    user,
  );
  const [originalUser, setOriginalUser] = useState<{
    username: string;
    userID: string;
  } | null>(null);
  const currentUser = useRef<CurrentUser | null | undefined>(currentUserState);

  const getUser = useCallback(() => {
    apolloClient
      .query<CurrentUserQuery, CurrentUserQueryVariables>({
        query: CurrentUserDocument,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      })
      .then(({ data }) => {
        currentUser.current = data?.currentUser || null;
        setCurrentUserValue(data?.currentUser || null);
      });
  }, []);

  useEffect(() => {
    if (!isEqual(currentUser.current, user) && user) {
      setCurrentUserValue(user);
    }
  }, [user]);

  useEffect(() => {
    if (hasWindow) {
      setTimeout(() => {
        const lastUserID = getCookie('lastUserID');
        const lastUserName = getCookie('lastUserName');
        if (lastUserName && lastUserID) {
          setOriginalUser({
            username: lastUserName,
            userID: lastUserID,
          });
        }
        const ltSession = Cookies.get('leafythings_session');
        const ltSessionUser = Cookies.get('leafythings_session_user');
        if (ltSessionUser && !ltSession) {
          removeCookie('leafythings_session');
          removeCookie('leafythings_session_user');
          setCookie('leafythings_session_logout', 'true');
        }
        if (ltSession && !ltSessionUser && currentUser.current) {
          setCookie('leafythings_session_user', currentUser.current?.usrUserID);
        }
      }, 600);
    }
    if (!currentUser.current) {
      getUser();
    }
  }, []);

  const checkUserOnFocus = useCallback(() => {
    if (!currentUser.current && Cookies.get('leafythings_session')) {
      getUser();
    }
  }, []);
  useWindowFocus(checkUserOnFocus);

  return {
    originalUser,
    user: currentUserState,
    setUser: setCurrentUserValue,
  };
};

export const useCurrentUserStatic = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const { data: userData } = await getApolloClient(context).query<
      CurrentUserQuery,
      CurrentUserQueryVariables
    >({
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
      query: CurrentUserDocument,
      variables: {},
    });
    return userData?.currentUser || null;
  } catch (e) {
    return null;
  }
};

export const useCurrentUserDynamic = (enableRedirectAssign?: boolean) => {
  const { user, setUser, originalUser } = useContext(UserContext);

  const account = useMemo(
    () => (user ? `${Route.Profile}/${user.usrUserID}/edit` : ''),
    [user],
  );

  const logout = useCallback(() => {
    removeCookie('leafythings_session');
    removeCookie('leafythings_session_user');
    removeCookie('leafythings_session_id');
    removeCookie('lastUserToken');
    removeCookie('lastUserID');
    removeCookie('lastUserName');
    removeCookie('redirectTo');
    setCookie('leafythings_session_logout', 'true');
    window.location.reload();
    setUser(null);
  }, []);

  useEffect(() => {
    if (enableRedirectAssign) {
      const redirectTo = window.location.href;
      setCookie('redirectTo', redirectTo);
    }
  }, [enableRedirectAssign]);

  return {
    originalUser,
    currentUser: user,
    login: Route.Login,
    account,
    logout,
  };
};
