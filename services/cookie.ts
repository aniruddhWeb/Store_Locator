import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import { hasWindow } from '../utils/window';
import { PUBLIC_WEBSITE, SESSION_DOMAIN } from '../config/Constants';
import { Route } from '../config/Routes';

export const getCookie = (cookieName: string, cookieValue?: string) => {
  if (cookieValue) {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(cookieValue);
    const ca = decodedCookie.split(';');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  if (hasWindow) {
    return Cookies.get(cookieName);
  }
  return '';
};

export const setCookieStatic = (
  ctx: GetServerSidePropsContext,
  cookieName: string,
  cookieValue: string,
) => {
  if (ctx?.res && ctx?.req) {
    const cookieString = getCookie(cookieName, ctx.req.headers.cookie);
    if (cookieString !== cookieValue) {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      ctx.res.setHeader(
        'Set-Cookie',
        cookie.serialize(cookieName, cookieValue, {
          httpOnly: false,
          secure: false,
          expires,
          domain: SESSION_DOMAIN,
          path: Route.Root,
        }),
      );
    }
  }
};

export const setCookie = (cookieName: string, cookieValue: string) => {
  Cookies.set(cookieName, cookieValue, {
    expires: 365,
    domain: SESSION_DOMAIN,
    path: Route.Root,
  });
};

export const removeCookie = (cookieName: string) => {
  Cookies.remove(cookieName, {
    domain: SESSION_DOMAIN,
  });
  Cookies.remove(cookieName, {
    domain: PUBLIC_WEBSITE,
  });
  Cookies.remove(cookieName);
};
