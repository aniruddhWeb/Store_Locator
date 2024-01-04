import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Router, useRouter } from 'next/router';
import debounce from 'lodash/debounce';

export const hasWindow = typeof window !== 'undefined';

function getWindowDimensions() {
  if (hasWindow) {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return {
    width: 0,
    height: 0,
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    if (hasWindow) {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowDimensions;
};

export const useWindowFragmentScroll = () => {
  const router = useRouter();
  const initialScrolled = useRef<boolean>(false);

  const [urlFragment, setUrlFragment] = useState<string>('');

  useEffect(() => {
    const fragment = router.asPath.match(/#([a-z0-9]+)/gi);
    if (fragment && fragment.length > 0) {
      setUrlFragment(fragment[0].replace('#', ''));
    } else if (initialScrolled.current) {
      setUrlFragment('');
    }
  }, [router.asPath]);

  const fragmentDocument = useMemo(() => {
    if (urlFragment) {
      return document.getElementById(urlFragment);
    }
    return null;
  }, [urlFragment]);

  useEffect(() => {
    const onLoad = () => {
      if (hasWindow && !initialScrolled.current && fragmentDocument) {
        window.scrollTo({
          left: 0,
          top: 0,
        });
        initialScrolled.current = true;
        setTimeout(() => {
          setUrlFragment('');
          const rect = fragmentDocument.getBoundingClientRect();
          window.scrollTo({
            left: 0,
            top: (rect?.top || 0) + (window.scrollY || 0) - 180,
            behavior: 'smooth',
          });
        }, 3000);
      }
    };
    setTimeout(() => {
      onLoad();
    }, 1000);
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('load', onLoad);
    };
  }, [fragmentDocument]);
};

export const useFragmentScroll = () => {
  return useCallback((item: string) => {
    if (hasWindow && item) {
      const itemFragment = document.getElementById(item);
      if (itemFragment) {
        const rect = itemFragment.getBoundingClientRect();
        window.scrollTo({
          left: 0,
          top: (rect?.top || 0) + (window.scrollY || 0) - 180,
          behavior: 'smooth',
        });
      }
    }
  }, []);
};

export const useOutsideDetect = (
  setterFunction?: (argument: Event) => void,
  disabled?: boolean,
) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        !disabled &&
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        setterFunction
      ) {
        setterFunction(event);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [setterFunction, disabled]);

  return ref;
};

export const userHeaderScrollDetect = (defaultValue?: boolean) => {
  const [isDown, setIsDown] = useState<boolean>(defaultValue || false);
  const lastScrollTop = useRef<number>(0);
  useEffect(() => {
    if (hasWindow) {
      const onScroll = () => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        if (
          window.innerHeight + window.scrollY + 240 >=
          document.body.scrollHeight
        ) {
          setIsDown(true);
          return;
        }
        if (scrollTop > lastScrollTop.current + 8 && scrollTop >= 211) {
          setIsDown(true);
        }
        if (scrollTop <= 0 || scrollTop < lastScrollTop.current - 8) {
          setIsDown(false);
        }
        lastScrollTop.current = scrollTop === 0 ? 0 : scrollTop;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, []);
  return {
    isDown,
    setIsDown,
  };
};

export const useLeavingPage = () => {
  const [leavingPage, setLeavingPage] = useState<boolean>(false);

  useEffect(() => {
    const handler = (_: string, props?: { shallow?: boolean }) => {
      if (!props?.shallow) {
        setLeavingPage(true);
      }
      Router.events.off('routeChangeStart', handler);
    };
    Router.events.on('routeChangeStart', handler);
    return () => {
      Router.events.off('routeChangeStart', handler);
    };
  }, []);

  return leavingPage;
};

export const useDetectScrollEnd = (
  endReachedCallback: (direction?: 'top' | 'bottom') => void | Promise<void>,
  isGlobal?: boolean,
) => {
  const ref = useRef<HTMLDivElement | any>(null);

  const callbackRef = useRef<() => void>(
    debounce(endReachedCallback, 1000, { leading: true }),
  );
  useEffect(() => {
    callbackRef.current = debounce(endReachedCallback, 1000, { leading: true });
  }, [endReachedCallback]);

  useEffect(() => {
    if (ref.current) {
      const onScroll = () => {
        if (!ref.current.scrollTop) {
          endReachedCallback('top');
        }
        if (
          ref.current.scrollHeight - ref.current.offsetHeight <=
          ref.current.scrollTop
        ) {
          endReachedCallback('bottom');
        }
      };
      ref.current.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        ref.current.removeEventListener('scroll', onScroll);
      };
    }
  }, [ref.current]);

  useEffect(() => {
    if (hasWindow && isGlobal) {
      const footer = document.getElementById('footer');
      if (footer) {
        const onScroll = () => {
          if (footer) {
            if (
              window.innerHeight +
                window.scrollY +
                footer.getBoundingClientRect().height >=
              document.body.scrollHeight
            ) {
              if (callbackRef.current) {
                callbackRef.current();
              }
            }
          }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
          window.removeEventListener('scroll', onScroll);
        };
      }
    }
  }, []);

  return ref;
};

export const useWindowFocus = (onFocusFunction: () => void) => {
  useEffect(() => {
    if (hasWindow) {
      const onFocus = () => {
        onFocusFunction();
      };
      window.addEventListener('focus', onFocus);
      onFocus();
      return () => {
        window.removeEventListener('focus', onFocus);
      };
    }
  }, [onFocusFunction]);
};

export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let temp: any;
  let match =
    ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) ||
    [];
  if (/trident/i.test(match[1])) {
    temp = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return {
      browser: 'IE',
      version: temp[1] || '',
    };
  }
  if (match[1] === 'Chrome') {
    temp = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (temp != null)
      return {
        browser: 'Opera',
        version: '',
      };
  }
  match = match[2]
    ? [match[1], match[2]]
    : [navigator.appName, navigator.appVersion, '-?'];
  temp = ua.match(/version\/(\d+)/i);
  if (temp != null) {
    match.splice(1, 1, temp[1]);
  }
  return {
    browser: match[0] || '',
    version: match[1] || '',
  };
};
