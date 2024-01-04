import React, { useState } from 'react';
import cn from 'classnames';
import s from './Age.module.css';
import { Button } from '../Button/Button';
import { Leafythings } from '../../icons/Leafythings';
import { Cookie } from '../Cookie/Cookie';
import { hasWindow } from '../../../utils/window';
import { serverStorage } from '../../../utils/storage';

const cookieButtonStyle = {
  backgroundColor: '#000000',
  width: 'calc(min(240px, calc(100% - 32px)))',
};

interface Props {
  closeAge: () => void;
  userCountry?: any | null;
}

export const Age = React.memo((props: Props) => {
  const [ageNot, setAgeNot] = useState<boolean | undefined>(undefined);
  const [cookieShown] = useState<string | null>(
    (hasWindow ? localStorage : serverStorage).getItem('cookie-shown'),
  );

  const rootClass = cn(s.root, {
    [s.rootBorder]: !!cookieShown,
    [s.rootNoCookieBorder]: (window as any).ReactNativeWebView,
  });

  return (
    <div className={s.wrapper}>
      <div className={rootClass}>
        <Leafythings className={s.icon} fill={ageNot ? '#DEDEDE' : undefined} />
        <div className={s.title}>
          {ageNot
            ? 'We’re Sorry!'
            : `Are you ${props?.userCountry === 'CA' ? 19 : 21} or Older?`}
        </div>
        <div className={s.text}>
          {ageNot
            ? 'You are not old enough to visit Leafythings.\nPlease come back when you are of age.'
            : props?.userCountry === 'CA'
            ? 'If you live in Alberta, you must be 18 or older.\nIf you live in Quebec, you must be 21 or older.'
            : ''}
        </div>
        {ageNot ? null : (
          <>
            <div className={s.border} />
            <div className={s.caption}>
              By accessing our site, you accept our terms and privacy policy.
            </div>
            <Button
              buttonStyle={cookieButtonStyle}
              buttonText="Yes, I am"
              onPress={props.closeAge}
            />
            <div className={s.ageNotConfirm} onClick={() => setAgeNot(true)}>
              No, I am not
            </div>
          </>
        )}
      </div>
      {hasWindow &&
      !!(window as any)?.ReactNativeWebView ? null : cookieShown ? null : (
        <Cookie />
      )}
    </div>
  );
});
