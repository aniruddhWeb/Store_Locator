import React, {useCallback} from 'react';
import { Carousel } from 'react-responsive-carousel';
import s from './TopCarousel.module.css';
import {hasWindow} from "../../../utils/window";

interface Props {
  carousel: any[];
}

export const TopCarousel = React.memo((props: Props) => {
  const onPressCarousel = useCallback((carouselItem?: any) => {
     if (hasWindow && (carouselItem?.title)) {
         (window as any)?.dataLayer?.push({
             event: 'promotion_clicks',
             store_name: carouselItem?.title,
         });
     }
  }, []);
  if (!props.carousel || props.carousel.length === 0) {
    return null;
  }
  return (
    <div className={s.root}>
      <Carousel
        axis="horizontal"
        autoFocus={false}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        swipeable={false}
        interval={5000}
        transitionTime={1000}
        autoPlay
        infiniteLoop
        stopOnHover>
        {(props.carousel || []).map(carouselItem => {
            if (!carouselItem.image) {
                return null;
            }
            return (
                <div key={carouselItem.title || carouselItem.image}>
                    {carouselItem.url ? (
                        <a onClick={() => onPressCarousel(carouselItem)}
                           href={carouselItem.url} className={s.carouselImageContainer}>
                            <img
                                src={carouselItem.image?.url as string}
                                className={s.carouselImage}
                                alt={carouselItem.title}
                            />
                            <img
                                src={carouselItem.imageMobile?.url as string}
                                className={s.carouselImageMobile}
                                alt={carouselItem.title}
                            />
                        </a>
                    ) : (
                        <div onClick={() => onPressCarousel(carouselItem)} className={s.carouselImageContainer}>
                            <img
                                src={carouselItem.image?.url as string}
                                className={s.carouselImage}
                                alt={carouselItem.title}
                            />
                            <img
                                src={carouselItem.imageMobile?.url as string}
                                className={s.carouselImageMobile}
                                alt={carouselItem.title}
                            />
                        </div>
                    )}
                </div>
            )
        }) as any}
      </Carousel>
    </div>
  );
});
