import React, { useMemo } from 'react';
import Link from 'next/link';
import { useMediaQueries } from '@react-hook/media-query';
import s from './OutStory.module.css';
import { Arrow } from '../../icons/Arrow';
import { OurStoryContent } from '../../../generated/contentful';
import { getContentfulImageLink } from '../../../utils/image';

interface Props {
  ourStory?: OurStoryContent | null;
}

export const OurStory = React.memo(({ ourStory }: Props) => {
  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 560px)',
  });
  const descriptionArray = useMemo(
    () => ourStory?.description?.split(' ') || [],
    [ourStory?.description],
  );
  if (
    !ourStory ||
    !ourStory.title ||
    !ourStory.description ||
    !ourStory.button ||
    !ourStory.url ||
    !ourStory.image?.url
  ) {
    return null;
  }

  return (
    <div className={s.root}>
      <div className={s.mainRootContainer} />
      <div className={s.mainContainer}>
        <div className={s.imageWrapper}>
          <img
            className={s.imageContainer}
            src={getContentfulImageLink(
              ourStory.image.url,
              matches.isMobile ? 320 : 800,
            )}
            alt={'ourStory'}
          />
        </div>
        <div className={s.contentContainer}>
          <div className={s.contentTitle}>{ourStory.title}</div>
          <div className={s.contentDescription}>
            {matches?.isMobile
              ? descriptionArray.slice(0, 4).join(' ')
              : ourStory.description}
          </div>
          <div className={s.contentDescriptionRest}>
            {descriptionArray.slice(4, descriptionArray.length).join(' ')}
          </div>
          <Link href={ourStory.url} prefetch={false}>
            <a
              href={ourStory.url}
              aria-label="about"
              className={s.navigationContainer}>
              <div className={s.navigationText}>{ourStory.button}</div>
              <Arrow className={s.navigationIcon} fill="#ffffff" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
});
