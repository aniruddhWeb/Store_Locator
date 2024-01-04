import React, { useMemo } from 'react';
import cn from 'classnames';
import s from './AboutMission.module.css';
import { Mission1 } from '../../icons/Mission1';
import { Mission2 } from '../../icons/Mission2';
import { Mission3 } from '../../icons/Mission3';
import { Mission4 } from '../../icons/Mission4';

const images = [Mission3, Mission1, Mission2, Mission4];

interface Props {
  title?: string | null;
  description?: string | null;
  image?: string | null;
}

export const AboutMission = React.memo(
  ({ title, description, image }: Props) => {
    const descriptionItems = useMemo(
      () => (description || '').split('.\n\n'),
      [description],
    );
    if (
      !title ||
      !descriptionItems ||
      descriptionItems.length === 0 ||
      !image
    ) {
      return null;
    }
    const imageContainer = cn(s.aboutImageContainer, { [s.aboutImage]: true });
    return (
      <div className={s.root}>
        <h2 className={s.title}>{title}</h2>
        <div className={s.rowContainer}>
          <img src={image} className={imageContainer} alt={title} />
          <div className={s.descriptionContainer}>
            {descriptionItems.map((item, index) => {
              const ImageComponent = images[index % images.length];
              return (
                <div key={item} className={s.descriptionItemContainer}>
                  <ImageComponent className={s.descriptionImage} />
                  <div className={s.description}>{item}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);
