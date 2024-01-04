import Link from 'next/link';
import React, { useMemo } from 'react';
import cn from 'classnames';
import s from './StaticTitle.module.css';

interface Props {
  title: string;
  subTitle?: string;
  link?: { link: string; destination: string };
}

export const StaticTitle = React.memo(({ title, subTitle, link }: Props) => {
  const checkLinkAvailable = useMemo(() => {
    if (link && subTitle) {
      return subTitle?.split(link.link);
    }
  }, [link, subTitle]);

  const currentClass = cn(s.subTitle, {
    [s.linkedSubtitle]: checkLinkAvailable,
  });

  return (
    <div className={s.root}>
      <h1 className={s.title}>{title}</h1>
      {checkLinkAvailable && subTitle && link ? (
        <>
          <div className={currentClass}>
            {checkLinkAvailable[0]}
            <Link prefetch={false} href={link.destination}>
              <a className={s.link} href={link.destination}>
                {link.link}
              </a>
            </Link>
            {checkLinkAvailable[1]}
          </div>
        </>
      ) : subTitle ? (
        <div className={currentClass}>{subTitle}</div>
      ) : null}
    </div>
  );
});
