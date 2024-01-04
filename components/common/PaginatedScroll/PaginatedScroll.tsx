import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  MutableRefObject,
  ReactElement,
} from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useMediaQueries } from '@react-hook/media-query';
import s from './PaginatedScroll.module.css';
import { useWindowDimensions } from '../../../utils/window';

interface Props {
  items: ReactElement[];
}

const PaginationDots = ({
  length = 5,
  activeIndex = 0,
  activeWidth = 12,
  passiveWidth = 12,
  height = 12,
  spacing = 12,
  activeColor = '#000000',
  passiveColor = '#000000',
  onPress = (index: number) => {},
}) => {
  // @ts-ignore
  const array = useMemo(() => [...Array(length).keys()], [length]);
  return (
    <>
      {array.map((_, i) => (
        <div
          key={i}
          onClick={() => onPress(i)}
          style={{
            cursor: 'pointer',
            background: i === activeIndex ? activeColor : passiveColor,
            width: i === activeIndex ? activeWidth : passiveWidth,
            height,
            borderRadius: (passiveWidth + 2) / 2,
            marginRight: i === array.length - 1 ? 0 : spacing,
            border: `1px solid ${activeColor}`,
          }}
        />
      ))}
    </>
  );
};

export const PaginatedScroll = React.memo(({ items }: Props) => {
  const horizontalScrollRef = useRef<HTMLDivElement>();
  const prevSliderOffsetRef = useRef<number>(0);
  const sliderOffsetRef = useRef<number>(0);
  const sliderScrolling = useRef<boolean>(false);

  const [shouldPause, setShouldPause] = useState<boolean>(false);
  const [currentScrollIndex, setCurrentScrollIndex] = useState<number>(0);

  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 860px)',
  });
  const { width: windowWidth } = useWindowDimensions();
  const scrollOffset = useMemo(() => {
    return Math.min(windowWidth - (matches?.isMobile ? 0 : 40), 1400);
  }, [matches?.isMobile, windowWidth]);

  const onPressDot = useCallback(
    (index: number) => {
      horizontalScrollRef.current?.scrollTo({
        left: index * scrollOffset,
        top: 0,
        behavior: 'smooth',
      });
    },
    [scrollOffset],
  );

  const onStartScroll = useCallback(() => {
    prevSliderOffsetRef.current = sliderOffsetRef.current || 0;
  }, []);

  const onEndScroll = useCallback(() => {
    if (!sliderScrolling.current) {
      let sliderDirectionOffset: number = 0;
      if (Math.abs(prevSliderOffsetRef.current - sliderOffsetRef.current) > 8) {
        if (sliderOffsetRef.current - prevSliderOffsetRef.current > 0) {
          sliderDirectionOffset = 0.5;
        } else {
          sliderDirectionOffset = -0.5;
        }
      }

      const currentPage = Math.min(
        Math.max(
          Math.round(
            sliderOffsetRef.current / scrollOffset + sliderDirectionOffset,
          ),
          0,
        ),
        (items || []).length - 1,
      );
      setCurrentScrollIndex(currentPage);

      if (shouldPause || sliderOffsetRef.current % scrollOffset !== 0) {
        sliderScrolling.current = true;
        horizontalScrollRef.current?.scrollTo({
          left: currentPage * scrollOffset,
          top: 0,
          behavior: 'smooth',
        });
      }
    } else {
      sliderScrolling.current = false;
    }
  }, [currentScrollIndex, shouldPause, scrollOffset, items]);

  useEffect(() => {
    const mouseOver = () => {
      setShouldPause(true);
    };
    const mouseOut = () => {
      setShouldPause(false);
    };
    const mouseup = () => {
      setShouldPause(true);
      sliderScrolling.current = false;
    };
    const mousedown = (e: any) => {
      if (e?.target?.className?.includes('Button')) {
        return false;
      }
      setShouldPause(false);
      prevSliderOffsetRef.current = sliderOffsetRef.current || 0;
    };
    const touchdown = () => {
      setShouldPause(false);
    };

    if (matches.isMobile) {
      horizontalScrollRef.current?.addEventListener('touchstart', mouseup, {
        passive: true,
      });
      horizontalScrollRef.current?.addEventListener('touchend', touchdown, {
        passive: true,
      });
    } else {
      horizontalScrollRef.current?.addEventListener('mouseup', mouseup);
      horizontalScrollRef.current?.addEventListener('mousedown', mousedown);
    }

    horizontalScrollRef.current?.addEventListener('mouseover', mouseOver);
    horizontalScrollRef.current?.addEventListener('mouseout', mouseOut);
    return () => {
      horizontalScrollRef.current?.removeEventListener('mouseover', mouseOver);
      horizontalScrollRef.current?.removeEventListener('mouseout', mouseOut);

      if (matches.isMobile) {
        horizontalScrollRef.current?.removeEventListener('touchstart', mouseup);
        horizontalScrollRef.current?.removeEventListener('touchend', touchdown);
      } else {
        horizontalScrollRef.current?.removeEventListener('mouseup', mouseup);
        horizontalScrollRef.current?.removeEventListener(
          'mousedown',
          mousedown,
        );
      }
    };
  }, [matches.isMobile]);

  const onScroll = useCallback(() => {
    sliderOffsetRef.current = horizontalScrollRef.current?.scrollLeft || 0;
  }, []);

  useEffect(() => {
    onEndScroll();
  }, [scrollOffset]);

  return (
    <div className={s.root}>
      <ScrollContainer
        innerRef={horizontalScrollRef as MutableRefObject<HTMLDivElement>}
        horizontal
        vertical={false}
        onScroll={onScroll}
        onEndScroll={onEndScroll}
        onStartScroll={onStartScroll}
        activationDistance={0}
        stopPropagation
        nativeMobileScroll
        className={s.scrollContainer}>
        <div className={s.horizontalScrollContainer}>
          {(items || []).map((item, itemIndex) => (
            <div key={`scroll-item-${itemIndex}`} className={s.scrollItem}>
              {item}
            </div>
          ))}
        </div>
      </ScrollContainer>
      <div className={s.pagination}>
        <PaginationDots
          onPress={onPressDot}
          activeIndex={currentScrollIndex}
          passiveColor="#FFFFFF"
          activeColor="#588E88"
          length={(items || []).length}
          spacing={8}
          height={8}
          activeWidth={8}
          passiveWidth={8}
        />
      </div>
    </div>
  );
});
