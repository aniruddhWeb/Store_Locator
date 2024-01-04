import React from 'react';
import s from './BrowserSupport.module.css';
import { Dino } from '../../icons/Dino';
import { ShareClose } from '../../icons/ShareClose';

interface Props {
  closeBrowserSupport: () => void;
}

export const BrowserSupport = React.memo((props: Props) => {
  return (
    <div className={s.root}>
      <Dino className={s.icon} />
      <div className={s.textContainer}>
        <div className={s.text}>
          You are using an old Safari browser
          <div className={s.textWithOpacity}>
            Some of the features on the site may be unavailable.
          </div>
        </div>
      </div>
      <a
        className={s.upgrade}
        href="https://support.apple.com/en-us/HT204416"
        target="_blank">
        Upgrade
      </a>
      <div onClick={props.closeBrowserSupport} className={s.close}>
        <ShareClose fill="rgba(255,255,255,0.5)" />
      </div>
    </div>
  );
});
