import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Route } from '../config/Routes';

export const useLayoutLoadingState = () => {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const previousPath = useRef<string>('/');

  useEffect(() => {
    Router.beforePopState(({ as, url }) => {
      if (url?.includes(Route.Products) && url?.includes('filters=')) {
        window.location.href = as;
        window.location.reload();
        return false;
      }
      return true;
    });
    Router.events.on(
      'routeChangeStart',
      (pathProp: string, props?: { shallow?: boolean }) => {
        if (!props?.shallow) {
          const path = window.location.href || pathProp;
          if (path !== previousPath.current) {
            if (
              !path?.includes('?search=') &&
              !path?.includes('/where-to-buy-our-products/map') &&
              !previousPath.current?.includes('/where-to-buy-our-products/map')
            ) {
              setIsPageLoading(true);
              if (
                (path?.includes('/search') &&
                  previousPath.current?.includes('/search')) ||
                !(
                  path?.includes('/login') ||
                  path?.includes('/register') ||
                  path?.includes('/eventsignup') ||
                  path?.includes('/betafeedback') ||
                  path?.includes('/email') ||
                  path?.includes('/password') ||
                  previousPath.current?.includes('/login') ||
                  previousPath.current?.includes('/register') ||
                  previousPath.current?.includes('/eventsignup') ||
                  previousPath.current?.includes('/betafeedback') ||
                  previousPath.current?.includes('/email') ||
                  previousPath.current?.includes('/password')
                )
              ) {
                NProgress.start();
              }
            }
          }
        }
      },
    );
    Router.events.on('routeChangeComplete', (path: string) => {
      setIsPageLoading(false);
      NProgress.done();
      previousPath.current = path;
    });
    Router.events.on('routeChangeError', () => {
      setIsPageLoading(false);
      NProgress.done();
    });
  }, []);

  return {
    isPageLoading,
    setIsPageLoading,
  };
};

export const LayoutLoadingContext = createContext<{
  isPageLoading: boolean;
  setIsPageLoading: (isPageLoading: boolean) => void;
}>({
  isPageLoading: false,
  setIsPageLoading: () => {},
});

export const useLayoutPageLoading = () => {
  const { isPageLoading, setIsPageLoading } = useContext(LayoutLoadingContext);
  return { isPageLoading, setIsPageLoading };
};
