import React from 'react';
import s from './AboutHeader.module.css';
import { Leafythings } from '../../icons/Leafythings';

interface Props {
  title?: string | null;
  description?: string | null;
  image?: string | null;
}

export const AboutHeader = React.memo(
  ({ title, description, image }: Props) => {
    if (!title || !description || !image) {
      return null;
    }
    return (
      <div className={s.root}>
        <div className={s.aboutImageContainer}>
          <img src={image} className={s.aboutImage} alt={title} />
          <h2 className={s.title}>{title}</h2>
        </div>
        <div className={s.descriptionContainer}>
          <div className={s.description}>{description}</div>
          <Leafythings className={s.backgroundLogo} />
        </div>
      </div>
    );
  },
);
