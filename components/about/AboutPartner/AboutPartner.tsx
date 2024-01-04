import React, { MutableRefObject, useEffect, useRef } from 'react';
import s from './AboutPartner.module.css';
import { Button } from '../../common/Button/Button';
import { useCurrentLocationDynamic } from '../../../services/location';
import { hasWindow, useWindowDimensions } from '../../../utils/window';
import { Leafythings } from '../../icons/Leafythings';
import { Route } from '../../../config/Routes';
import { useCurrentUserDynamic } from '../../../services/user';

interface Props {
  title?: string | null;
  description?: string | null;
  video?: string | null;
}

export const AboutPartner = React.memo(
  ({ title, description, video }: Props) => {
    const greenContainerRef = useRef<HTMLDivElement | null | undefined>();

    const { currentUser } = useCurrentUserDynamic();
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
        }, 1000);
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

    if (!title || !description || !video) {
      return null;
    }
    return (
      <div
        ref={greenContainerRef as MutableRefObject<HTMLDivElement>}
        className={s.root}>
        <div className={s.background}>
          <Leafythings className={s.backgroundLogo} />
        </div>
        <h3 className={s.title}>{title}</h3>
        <div className={s.aboutVideoContainer}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video controls className={s.aboutVideo}>
            <source src={video} type="video/mp4" />
            {`Sorry, your browser doesn't support embedded videos.`}
          </video>
        </div>
        <div className={s.description}>{description}</div>
        <div className={s.buttonsContainer}>
          <a
            href={
              currentUser
                ? Route.RegisterBusiness
                : `${Route.RegisterUser}?next=business`
            }>
            <Button
              buttonStyle={businessStyle}
              buttonText="Register as business"
              onPress={() => {}}
            />
          </a>
          <a href={Route.RegisterUser}>
            <Button
              buttonStyle={userStyle}
              buttonText="Register as user"
              onPress={() => {}}
            />
          </a>
        </div>
      </div>
    );
  },
);

const businessStyle = {
  width: '240px',
  marginLeft: '8px',
  marginRight: '8px',
  marginTop: '24px',
};

const userStyle = {
  marginLeft: '8px',
  marginRight: '8px',
  marginTop: '24px',
};
