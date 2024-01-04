import React from 'react';
import s from './Cookie.module.css';
import { Cookie as CookieIcon } from '../../icons/Cookie';

export const Cookie = React.memo(() => {
  return (
    <div className={s.root}>
      <CookieIcon className={s.icon} />
      <div className={s.textContainer}>
        <div className={s.text}>
          This website uses cookies.
          <div className={s.textWithOpacity}>
            We use cookies to ensure that we give you the best experience on our
            website to personalize content. By continuing to use our site, you
            agree to these terms.
          </div>
        </div>
      </div>
    </div>
  );
});
