import React, { MutableRefObject, useEffect, useRef } from 'react';
import { BlogItemFragment } from '../../../generated/graphql';
import { Marquee } from '../../common/Marquee/Marquee';
import { BlogCard } from '../../blog/BlogCard/BlogCard';
import s from './EducationalResources.module.css';
import { hasWindow, useWindowDimensions } from '../../../utils/window';
import { Leafythings } from '../../icons/Leafythings';
import { Route } from '../../../config/Routes';
import { useCurrentLocationDynamic } from '../../../services/location';

interface Props {
  blogs?: BlogItemFragment[] | null;
}

export const EducationalResources = React.memo(({ blogs }: Props) => {
  const greenContainerRef = useRef<HTMLDivElement | null | undefined>();

  const { selectedLocation } = useCurrentLocationDynamic();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  useEffect(() => {
    if (hasWindow) {
      const handleLoad = () => {
        const mainContent = document.getElementById('main-background-portal');
        if (mainContent) {
          const existingBackgroundContent = document.getElementById(
            'marquee-background-green',
          );
          const backgroundContent = document.createElement('div');
          backgroundContent.id = 'marquee-background-green';
          backgroundContent.className = s.greenBackground;
          backgroundContent.style.top = `${
            greenContainerRef.current?.offsetTop || 0
          }px`;
          backgroundContent.style.height = `${
            greenContainerRef.current?.offsetHeight
              ? greenContainerRef.current.offsetHeight + 48
              : 0
          }px`;

          if (
            existingBackgroundContent &&
            typeof existingBackgroundContent.replaceWith === 'function'
          ) {
            existingBackgroundContent.replaceWith(backgroundContent);
          } else {
            mainContent.appendChild(backgroundContent);
          }
        }
      };
      setTimeout(() => {
        handleLoad();
      }, 3000);
      window.addEventListener('load', handleLoad);
      return () => {
        window.removeEventListener('load', handleLoad);
        const mainContent = document.getElementById('main-background-portal');
        if (mainContent) {
          while (mainContent.firstChild) {
            if (mainContent.lastChild) {
              mainContent.removeChild(mainContent.lastChild);
            }
          }
        }
      };
    }
  }, [windowWidth, windowHeight, selectedLocation]);

  if (!blogs || blogs.length === 0) {
    return null;
  }
  return (
    <div
      ref={greenContainerRef as MutableRefObject<HTMLDivElement>}
      className={s.root}>
      <div className={s.background}>
        <Leafythings className={s.backgroundLogo} />
      </div>
      <Marquee
        title={'Highly Educational Resources & News'}
        titleClass={'h3'}
        variant="second"
        seeAllText="Show all"
        seeAllHref={Route.Blog}
        scrollVariant="third"
        titleColor="#61AB62">
        {blogs.map((blog: BlogItemFragment) => (
          <BlogCard
            key={`educational-resource-blog-${blog.blgBlogID}`}
            blog={blog}
          />
        ))}
      </Marquee>
    </div>
  );
});
