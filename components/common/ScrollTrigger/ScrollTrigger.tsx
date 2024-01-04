import { gsap } from 'gsap';
import ScrollTriggerComponent from 'gsap/dist/ScrollTrigger';
import { useMediaQueries } from '@react-hook/media-query';
import React, { useEffect } from 'react';
import { hasWindow } from '../../../utils/window';

if (hasWindow) {
  gsap.registerPlugin(ScrollTriggerComponent);
}

export const ScrollTrigger = React.memo(() => {
  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 860px)',
  });

  useEffect(() => {
    if (hasWindow) {
      const mm = gsap.matchMedia();

      mm.add('(max-width: 860px)', () => {
        const tl = gsap.timeline({
          paused: true,
          duration: 0.2,
          ease: 'none',
        });

        tl.to('#header-nav', { yPercent: -100 }).to(
          '#main-content-wrapper',
          { paddingTop: 100 },
          0,
        );

        ScrollTriggerComponent.create({
          trigger: '#main-content-wrapper',
          start: 'top top',
          end: 'bottom-=200 top',
          onUpdate: self => {
            return self.direction === -1 ? tl.reverse() : tl.play();
          },
        });

        return () => tl.kill();
      });
    }
  }, [matches]);

  return null;
});
