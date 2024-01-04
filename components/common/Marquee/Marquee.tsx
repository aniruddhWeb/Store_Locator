import React, {
  ReactNode,
  useCallback,
  useRef,
  useState,
  Children,
  useEffect,
  MutableRefObject,
  useMemo,
} from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useMediaQueries } from '@react-hook/media-query';
import { Arrow } from '../../icons/Arrow';
import s from './Marquee.module.css';
import { chunkArray } from '../../../utils/array';
import { Loader } from '../Loader/Loader';

interface Props {
  id?: string;
  title?: string;
  noTitleMargin?: boolean;
  noTopMargin?: boolean;
  noBottomMargin?: boolean;
  titleColor?: string;
  children: ReactNode;
  variant?: 'main' | 'second' | 'third';
  titleVariant?: 'left' | 'center';
  scrollVariant?: 'main' | 'second' | 'third';
  seeAllText?: string;
  seeAllHref?: string;
  seeAllPrefetch?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  actions?: ReactNode;
  showOnEmpty?: boolean;
  showAllOnEmpty?: boolean;
  showListOnEmpty?: boolean;
  emptyView?: ReactNode;
  emptyText?: string;
  containerRef?: any;
  titleClass?: 'h2' | 'h3';
  scrollDependency?: any[];
  onScrollEnd?: () => void;
  onScrollStart?: () => void;
  showThirdOnMobile?: boolean;
  isPaginating?: boolean;
  isLargeTitle?: boolean;
  controlDisabled?: boolean;
  hideControls?: boolean;
  noAutoScrollOnPagination?: boolean;
  preventPrevFetching?: boolean;
  noRowBorder?: boolean;
}

const SCROLL_THRESHOLD = 24;
const SCROLL_SECOND_THRESHOLD = 56;
const HORIZONTAL_SCROLL_ROW_ITEM_WIDTH = 480;

export const Marquee = React.memo<Props>(
  ({
    id,
    title,
    noTitleMargin = false,
    noTopMargin = false,
    noBottomMargin = false,
    noRowBorder = false,
    children,
    variant = 'main',
    titleVariant = 'center',
    scrollVariant = 'main',
    actions,
    seeAllText,
    seeAllHref,
    seeAllPrefetch = false,
    header,
    footer,
    showOnEmpty,
    emptyView,
    emptyText,
    showAllOnEmpty,
    showListOnEmpty,
    titleColor,
    titleClass = 'h2',
    scrollDependency,
    onScrollEnd,
    onScrollStart,
    showThirdOnMobile,
    isPaginating,
    isLargeTitle = false,
    hideControls = false,
    noAutoScrollOnPagination = false,
    controlDisabled: controlDisabledProp = false,
    containerRef: propsContainerRef,
    preventPrevFetching = false,
  }) => {
    const containerRef = useRef<HTMLDivElement | null | undefined>();
    const sliderRef = useRef<HTMLDivElement | null | undefined>();
    const sliderOffsetRef = useRef<number>(0);
    const scrollHold = useRef<number>(
      scrollVariant === 'second' ? SCROLL_SECOND_THRESHOLD : SCROLL_THRESHOLD,
    );
    const isScrollingNow = useRef<boolean>(false);
    const sliderClientXRef = useRef<number>(0);

    const [controlDisabled, setControlDisabled] = useState<boolean>(true);
    const [leftDisabled, setLeftDisabled] = useState<boolean>(true);
    const [rightDisabled, setRightDisabled] = useState<boolean>(true);
    const prevRightDisabled = useRef<boolean>(rightDisabled);
    const prevIsPaginating = useRef<boolean>(!!isPaginating);

    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
    });

    const rootClassname = cn(s.root, {
      [s.rootNoShadow]: variant === 'second' || variant === 'third',
      [s.rootNoTitle]: !title && !hideControls,
      [s.rootNoTitleMargin]: !title && noTitleMargin,
      [s.rootNoTopMargin]: noTopMargin,
      [s.rootNoBottomMargin]: noBottomMargin,
    });
    const scrollContentClass = cn(s.scrollContent, {
      [s.scrollContentSecond]: scrollVariant === 'second',
      [s.scrollContentThird]: scrollVariant === 'third',
    });
    const thirdScrollContentClass = cn(s.thirdScrollContent, {
      [s.thirdScrollContentSecond]: scrollVariant === 'second',
      [s.thirdScrollContentSecondVisible]: !!showThirdOnMobile,
    });
    const thirdMobileScrollContentClass = cn(s.thirdMobileScrollContent, {
      [s.thirdMobileScrollContentSecond]: scrollVariant === 'second',
      [s.thirdMobileScrollContentHidden]: !!showThirdOnMobile,
    });
    const thirdScrollContentContainerClass = cn(s.thirdScrollContentContainer, {
      [s.thirdScrollContentContainerVisible]: !!showThirdOnMobile,
    });
    const controlClassname = cn(
      titleVariant === 'left' ? s.controlLeft : s.control,
      {
        [s.controlNoTitle]: !title && !hideControls,
        [s.controlLeftWithActions]: titleVariant === 'left' && !!actions,
        [s.controlHidden]: hideControls,
      },
    );
    const titleClassname = cn(titleVariant === 'left' ? s.titleLeft : s.title, {
      [s.titleLeftWithActions]: titleVariant === 'left' && !!actions,
      [s.titleLarge]: isLargeTitle,
    });
    const emptyContainerClass = cn(s.emptyContainer, {
      [s.emptyContainerNoTitle]: !title,
    });

    const next = useCallback(() => {
      if (onScrollStart) {
        if (
          sliderRef.current?.scrollWidth &&
          !isFetchingDisabled &&
          sliderOffsetRef.current + (containerRef.current?.offsetWidth || 0) >=
            sliderRef.current?.scrollWidth - scrollHold.current
        ) {
          onScrollStart();
        }
      }

      sliderRef.current?.scrollTo({
        left:
          (sliderRef.current?.scrollLeft || 0) +
          (titleVariant === 'left'
            ? HORIZONTAL_SCROLL_ROW_ITEM_WIDTH
            : containerRef.current?.offsetWidth || 0),
        top: 0,
        behavior: 'smooth',
      });
    }, [titleVariant, onScrollStart]);

    const isFetchingDisabled = useMemo(() => {
      if (Children.count(children) % 6 !== 0) {
        return true;
      }

      return false;
    }, [Children.count(children)]);

    const previous = useCallback(() => {
      sliderRef.current?.scrollTo({
        left:
          (sliderRef.current?.scrollLeft || 0) -
          (titleVariant === 'left'
            ? HORIZONTAL_SCROLL_ROW_ITEM_WIDTH
            : containerRef.current?.offsetWidth || 0),
        top: 0,
        behavior: 'smooth',
      });
    }, [titleVariant]);

    useEffect(() => {
      if (preventPrevFetching && !isPaginating) {
        sliderRef.current?.scrollTo({
          left:
            (sliderRef.current?.scrollLeft || 0) +
            (titleVariant === 'left'
              ? HORIZONTAL_SCROLL_ROW_ITEM_WIDTH
              : containerRef.current?.offsetWidth || 0),
          top: 0,
          behavior: 'smooth',
        });
      }
    }, [isPaginating]);

    useEffect(() => {
      if (containerRef.current?.offsetWidth) {
        const toggleControls = () => {
          if (preventPrevFetching) {
            setControlDisabled(false);

            return;
          }

          if (
            (containerRef.current?.offsetWidth || 0) <
            (sliderRef.current?.scrollWidth || 0)
          ) {
            setControlDisabled(false);
          } else {
            setControlDisabled(true);
          }
        };

        const scrollHandler = (event?: any) => {
          // @ts-ignore
          sliderOffsetRef.current =
            event?.target?.scrollLeft || 0 || sliderOffsetRef.current;
          if (sliderOffsetRef.current > scrollHold.current) {
            setLeftDisabled(false);
          }
          if (sliderOffsetRef.current <= scrollHold.current) {
            setLeftDisabled(true);
          }

          if (preventPrevFetching) {
            setRightDisabled(false);

            return;
          }

          if (
            sliderRef.current?.scrollWidth &&
            sliderOffsetRef.current + (containerRef.current?.offsetWidth || 0) <
              sliderRef.current?.scrollWidth - scrollHold.current
          ) {
            setRightDisabled(false);
          }
          if (
            sliderRef.current?.scrollWidth &&
            sliderOffsetRef.current +
              (containerRef.current?.offsetWidth || 0) >=
              sliderRef.current?.scrollWidth - scrollHold.current
          ) {
            setRightDisabled(true);
          }
        };

        toggleControls();
        scrollHandler();
        setTimeout(() => {
          toggleControls();
          scrollHandler();
        }, 1000);

        sliderRef.current?.addEventListener('scroll', scrollHandler);
        return () => {
          sliderRef.current?.removeEventListener('scroll', scrollHandler);
        };
      }
      if (Children.count(children) === 0) {
        setControlDisabled(true);
      }
    }, [Children.count(children)]);

    useEffect(() => {
      if (
        prevRightDisabled.current !== rightDisabled &&
        rightDisabled &&
        onScrollEnd
      ) {
        if (!preventPrevFetching) {
          onScrollEnd();
        }
      }
      prevRightDisabled.current = rightDisabled;
    }, [onScrollEnd, rightDisabled]);

    useEffect(() => {
      if (
        !noAutoScrollOnPagination &&
        !matches?.isMobile &&
        prevIsPaginating.current !== !!isPaginating &&
        !isPaginating
      ) {
        next();
      }
      prevIsPaginating.current = !!isPaginating;
    }, [isPaginating, next, matches?.isMobile, noAutoScrollOnPagination]);

    useEffect(() => {
      sliderRef.current?.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth',
      });
    }, scrollDependency || []);

    const setRef = useCallback(
      ref => {
        containerRef.current = ref;
        if (propsContainerRef) {
          propsContainerRef.current = ref;
        }
      },
      [propsContainerRef],
    );

    const onMouseDown = useCallback(e => {
      isScrollingNow.current = true;
      if (sliderRef.current) {
        sliderRef.current.style.cursor = 'grabbing';
        sliderRef.current.style.userSelect = 'none';
      }
      sliderClientXRef.current = e.clientX;
    }, []);

    const onMouseUp = useCallback(() => {
      if (sliderRef.current) {
        sliderRef.current.style.cursor = 'grab';
        sliderRef.current.style.userSelect = 'unset';
      }
      if (
        sliderRef.current &&
        sliderRef.current.className?.includes('disableLink')
      ) {
        sliderRef.current.className = `${sliderRef.current.className.replace(
          'disableLink',
          '',
        )}`;
      }
      isScrollingNow.current = false;
    }, []);

    const onMouseMove = useCallback(e => {
      if (isScrollingNow.current) {
        if (
          sliderRef.current &&
          !sliderRef.current.className?.includes('disableLink')
        ) {
          sliderRef.current.className = `${sliderRef.current.className} disableLink`;
        }
      }
      if (sliderRef.current && isScrollingNow.current) {
        sliderRef.current.scrollLeft =
          sliderOffsetRef.current - e.clientX + sliderClientXRef.current;
        sliderOffsetRef.current =
          sliderOffsetRef.current - e.clientX + sliderClientXRef.current;
        sliderClientXRef.current = e.clientX;
      }
    }, []);

    if (!showOnEmpty && Children.count(children) === 0) {
      return null;
    }
    return (
      <div id={id} ref={setRef} className={rootClassname}>
        <div className={controlClassname}>
          {title ? (
            titleClass === 'h3' ? (
              <h3
                id={title.toLowerCase()}
                className={titleClassname}
                style={titleColor ? { color: titleColor } : undefined}>
                {title}
              </h3>
            ) : (
              <h2
                id={title.toLowerCase()}
                className={titleClassname}
                style={titleColor ? { color: titleColor } : undefined}>
                {title}
              </h2>
            )
          ) : null}
          <div className={s.buttonContainer}>
            <div
              className={
                controlDisabled || controlDisabledProp
                  ? s.buttonLeftDisabled
                  : s.buttonLeft
              }
              onClick={previous}>
              <Arrow className={leftDisabled ? s.leftDisabled : s.left} />
            </div>
            <div
              className={
                controlDisabled || controlDisabledProp
                  ? s.buttonRightDisabled
                  : s.buttonRight
              }
              onClick={next}>
              {isPaginating ? (
                <Loader noMargin size={14} />
              ) : (
                <Arrow className={rightDisabled ? s.rightDisabled : s.right} />
              )}
            </div>
            <div className={s.actionsContainer}>
              {actions || null}
              {(showAllOnEmpty || Children.count(children) > 0) &&
              seeAllText &&
              seeAllHref ? (
                <Link prefetch={seeAllPrefetch} href={seeAllHref}>
                  <a className={s.seeAll} href={seeAllHref}>
                    {seeAllText || ''}
                  </a>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
        {header}
        {!showListOnEmpty && Children.count(children) === 0 ? (
          emptyView !== undefined ? (
            emptyView
          ) : (
            <div className={emptyContainerClass}>
              <div className={s.emptyText}>
                {emptyText || 'Nothing to display'}
              </div>
            </div>
          )
        ) : (
          <div className={s.horizontalScrollContainer}>
            {variant === 'third' && Children.count(children) >= 12 ? (
              <>
                <div
                  ref={sliderRef as MutableRefObject<HTMLDivElement>}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                  onMouseMove={onMouseMove}
                  className={thirdScrollContentContainerClass}>
                  {chunkArray(Children.toArray(children), 2).map(
                    (childrenArray, key) => (
                      <div
                        key={`children-third-${key}`}
                        className={thirdScrollContentClass}>
                        {childrenArray.map((child, childIndex) =>
                          childIndex === 0 ? (
                            <React.Fragment
                              key={`children-third-item-${childIndex}`}>
                              {child}
                              {!noRowBorder && childrenArray.length > 1 ? (
                                <div className={s.thirdScrollBorder} />
                              ) : null}
                            </React.Fragment>
                          ) : (
                            <React.Fragment
                              key={`children-third-item-${childIndex}`}>
                              {child}
                              {!noRowBorder && showThirdOnMobile ? (
                                <div className={s.thirdScrollBorderMobile} />
                              ) : null}
                            </React.Fragment>
                          ),
                        )}
                      </div>
                    ),
                  )}
                  {isPaginating ? (
                    <div className={s.paginatingContentMobile}>
                      <Loader size={40} noMargin />
                    </div>
                  ) : null}
                </div>
                <div className={thirdMobileScrollContentClass}>
                  {children}
                  {isPaginating ? (
                    <div className={s.paginatingContentMobile}>
                      <Loader size={40} noMargin />
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <div
                ref={sliderRef as MutableRefObject<HTMLDivElement>}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                className={scrollContentClass}>
                {showThirdOnMobile
                  ? Children.toArray(children).map((child, childIndex) => (
                      <div
                        key={`children-third-mobile-small-${childIndex}`}
                        className={thirdScrollContentClass}>
                        {child}
                        {!noRowBorder ? (
                          <div className={s.thirdScrollBorderMobile} />
                        ) : null}
                      </div>
                    ))
                  : children}
                {isPaginating ? (
                  <div className={s.paginatingContentMobile}>
                    <Loader size={40} noMargin />
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}
        {footer}
      </div>
    );
  },
);
