import React, { useMemo } from 'react';
import s from './TopSection.module.css';
import { HomeTopSection } from '../../../generated/contentful';
import { Leafythings } from '../../icons/Leafythings';

interface Props {
  topSection?: HomeTopSection | null;
}

export const TopSection = React.memo(({ topSection }: Props) => {
  const highlights = useMemo(
    () =>
      (topSection?.highlights || '').split(',').map(item => item.toLowerCase()),
    [topSection?.highlights],
  );
  const textTokens = useMemo(
    () => (topSection?.text || '').split(' '),
    [topSection?.text],
  );
  if (!topSection || !topSection.text || !topSection.image?.url) {
    return null;
  }
  return (
    <div className={s.root}>
      <div className={s.contentContainer}>
        <h1 className={s.contentDescription}>
          {(textTokens || []).map(item => {
            if (highlights.includes(item.toLowerCase())) {
              return (
                <span key={item} className={s.contentDescriptionHighLight}>
                  {`${item} `}
                  {item.toLowerCase() === 'weed' ? (
                    <Leafythings className={s.leafyIcon} />
                  ) : null}
                </span>
              );
            }
            return `${item} `;
          })}
        </h1>
      </div>
    </div>
  );
});
