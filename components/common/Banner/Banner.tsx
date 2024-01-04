import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  MutableRefObject,
} from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useMediaQueries } from '@react-hook/media-query';
import s from './Banner.module.css';
import { Banner as BannerType } from '../../../generated/contentful';
import { BannerItem } from './BannerItem';
import { useWindowDimensions } from '../../../utils/window';

interface Props {
  banners: BannerType[];
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

export const Banner = React.memo(({ banners }: Props) => {
  const horizontalScrollRef = useRef<HTMLDivElement>();
  const prevSliderOffsetRef = useRef<number>(0);
  const sliderOffsetRef = useRef<number>(0);
  const sliderScrolling = useRef<boolean>(false);

  const [shouldPause, setShouldPause] = useState<boolean>(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);

  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 860px)',
  });
  const { width: windowWidth } = useWindowDimensions();
  const bannerOffset = useMemo(() => {
    return Math.min(windowWidth - (matches?.isMobile ? 0 : 40), 1400);
  }, [matches?.isMobile, windowWidth]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!shouldPause) {
        sliderScrolling.current = true;
        if (currentBannerIndex < (banners || []).length - 1) {
          setCurrentBannerIndex(currentBannerIndex + 1);
          horizontalScrollRef.current?.scrollTo({
            left: (currentBannerIndex + 1) * bannerOffset,
            top: 0,
            behavior: 'smooth',
          });
        } else {
          setCurrentBannerIndex(0);
          horizontalScrollRef.current?.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth',
          });
        }
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [shouldPause, bannerOffset, currentBannerIndex, banners]);

  const onPressDot = useCallback(
    (index: number) => {
      setCurrentBannerIndex(index);
      horizontalScrollRef.current?.scrollTo({
        left: index * bannerOffset - 0.5,
        top: 0,
        behavior: 'smooth',
      });
    },
    [bannerOffset],
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
            sliderOffsetRef.current / bannerOffset + sliderDirectionOffset,
          ),
          0,
        ),
        (banners || []).length - 1,
      );
      setCurrentBannerIndex(currentPage);

      if (shouldPause || sliderOffsetRef.current % bannerOffset !== 0) {
        sliderScrolling.current = true;
        horizontalScrollRef.current?.scrollTo({
          left: currentPage * bannerOffset,
          top: 0,
          behavior: 'smooth',
        });
      }
    } else {
      sliderScrolling.current = false;
    }
  }, [currentBannerIndex, shouldPause, bannerOffset, banners]);

  const onScroll = useCallback(() => {
    sliderOffsetRef.current = horizontalScrollRef.current?.scrollLeft || 0;
  }, []);

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

  useEffect(() => {
    onEndScroll();
  }, [bannerOffset]);

  if (!banners || banners.length === 0) {
    return null;
  }
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
          {(banners || []).map((banner, bannerIndex) => (
            <div key={`banner-item-${bannerIndex}`} className={s.scrollItem}>
              <BannerItem
                type={banner.type}
                title={banner.title}
                description={banner.shortDescription}
                businessName={banner.businessName}
                buttonText={banner.buttonText}
                link={banner.shortLink}
                image={banner.image}
                showImage={currentBannerIndex === bannerIndex}
              />
            </div>
          ))}
        </div>
      </ScrollContainer>
      <div className={s.pagination}>
        <PaginationDots
          onPress={onPressDot}
          activeIndex={currentBannerIndex}
          passiveColor="#FFFFFF"
          activeColor="#588E88"
          length={(banners || []).length}
          spacing={8}
          height={8}
          activeWidth={8}
          passiveWidth={8}
        />
      </div>
    </div>
  );
});
