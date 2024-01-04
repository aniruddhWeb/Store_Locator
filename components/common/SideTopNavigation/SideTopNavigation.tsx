import React, {
  ReactNode,
  FC,
  useRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import s from './SideTopNavigation.module.css';
import { ArrowCircle } from '../../icons/ArrowCircle';
import { useFragmentScroll } from '../../../utils/window';
import { Chevron } from '../../icons/Chevron';

type NavItems = {
  name: string;
};

interface Props {
  header?: ReactNode;
  footer?: ReactNode;
  top?: ReactNode;
  bottom?: ReactNode;
  items: NavItems[];
}

export const SideTopNavigation: FC<Props> = React.memo(
  ({ header, footer, items, top, bottom }) => {
    const rootContentRef = useRef<HTMLDivElement | null | undefined>();
    const rootContentOffsetRef = useRef<number>(0);
    const fadeRef = useRef<HTMLDivElement | null | undefined>();

    const scrollToItem = useFragmentScroll();
    const [scrollEndReached, setScrollEndReached] = useState<boolean>(true);

    useEffect(() => {
      const onScroll = () => {
        if (window.pageYOffset && !rootContentOffsetRef.current) {
          rootContentOffsetRef.current =
            rootContentRef.current?.clientHeight || 0;
          const mainLayout = document.getElementById('main-content');
          if (mainLayout) {
            mainLayout.style.minHeight = `${
              rootContentOffsetRef.current + 151
            }px`;
          }
        }
        const footerHeight =
          (document.getElementById('footer')?.offsetHeight || 560) + 100;
        if (
          (window.pageYOffset || document.documentElement.scrollTop) +
            rootContentOffsetRef.current >=
          document.documentElement.scrollHeight - (footerHeight + 136)
        ) {
          if (rootContentRef.current) {
            rootContentRef.current.style.top = `${
              document.documentElement.scrollHeight -
              rootContentOffsetRef.current -
              footerHeight - // footer
              (window.pageYOffset || document.documentElement.scrollTop)
            }px`;
          }
          if (fadeRef.current) {
            fadeRef.current.style.position = 'absolute';
            fadeRef.current.style.bottom = '68px';
          }
        } else {
          if (rootContentRef.current) {
            rootContentRef.current.style.top = 'unset';
          }
          if (fadeRef.current) {
            fadeRef.current.style.position = 'fixed';
            fadeRef.current.style.bottom = '36px';
          }
        }
      };

      const onResize = () => {
        if (window.pageYOffset) {
          rootContentOffsetRef.current =
            rootContentRef.current?.clientHeight || 0;
          const mainLayout = document.getElementById('main-content');
          if (mainLayout) {
            mainLayout.style.minHeight = `${
              rootContentOffsetRef.current + 151
            }px`;
          }
        }
        const footerHeight =
          (document.getElementById('footer')?.offsetHeight || 560) + 100;
        if (
          (window.pageYOffset || document.documentElement.scrollTop) +
            rootContentOffsetRef.current >=
          document.documentElement.scrollHeight - (footerHeight + 136)
        ) {
          setScrollEndReached(true);
          if (rootContentRef.current) {
            rootContentRef.current.style.top = `${
              document.documentElement.scrollHeight -
              rootContentOffsetRef.current -
              footerHeight - // footer
              (window.pageYOffset || document.documentElement.scrollTop)
            }px`;
          }
        } else if (rootContentRef.current) {
          setScrollEndReached(false);
          rootContentRef.current.style.top = 'unset';
        }
        if (
          Math.round(
            (rootContentRef.current?.scrollTop || 0) +
              (rootContentRef.current?.clientHeight || 0),
          ) >=
          (rootContentRef.current?.scrollHeight || 0) - 24
        ) {
          setScrollEndReached(true);
        } else {
          setScrollEndReached(false);
        }
      };

      const mainLayout = document.getElementById('main-content');
      if (mainLayout) {
        mainLayout.style.minHeight = `${
          (rootContentRef.current?.offsetHeight || 0) + 151
        }px`;
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });

      return () => {
        rootContentOffsetRef.current = 0;
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      };
    }, []);

    useEffect(() => {
      if (rootContentRef.current) {
        const onScroll = () => {
          if (
            Math.round(
              (rootContentRef.current?.scrollTop || 0) +
                (rootContentRef.current?.clientHeight || 0),
            ) >=
            (rootContentRef.current?.scrollHeight || 0) - 24
          ) {
            setScrollEndReached(true);
          } else {
            setScrollEndReached(false);
          }
        };

        onScroll();
        setTimeout(() => {
          onScroll();
        }, 1000);

        rootContentRef.current?.addEventListener('scroll', onScroll, {
          passive: true,
        });
        return () => {
          rootContentRef.current?.removeEventListener('scroll', onScroll);
        };
      }
    }, []);

    const onNavItemPress = useCallback(
      (item: NavItems) => {
        scrollToItem(item.name.toLowerCase());
      },
      [scrollToItem],
    );

    const onPressScrollDown = useCallback(() => {
      if (rootContentRef.current) {
        rootContentRef.current?.scrollTo({
          top: rootContentRef.current?.scrollHeight || 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    }, []);

    const fadeContainerClass = cn(s.fadeContainer, {
      [s.fadeContainerInvisible]: scrollEndReached,
    });

    return (
      <div className={s.root}>
        <div
          ref={rootContentRef as MutableRefObject<HTMLDivElement>}
          id="side-top-navigation-root-content"
          className={s.rootContent}>
          {top}
          <div className={s.rootMainContent}>
            {header}
            {items && items.length > 0 ? (
              <div className={s.navItems}>
                {items.map(item => (
                  <div
                    key={item.name}
                    className={s.navItem}
                    onClick={() => onNavItemPress(item)}>
                    <div className={s.navItemText}>{item.name}</div>
                    <a aria-label="ArrowCircle">
                      <ArrowCircle />
                    </a>
                  </div>
                ))}
              </div>
            ) : null}
            {footer}
          </div>
          {bottom}
        </div>
        <div
          ref={fadeRef as MutableRefObject<HTMLDivElement>}
          id="side-top-navigation-fade"
          onClick={onPressScrollDown}
          className={fadeContainerClass}>
          <Chevron className={s.chevronDown} />
        </div>
      </div>
    );
  },
);
