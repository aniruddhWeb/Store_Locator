import React from 'react';
import s from './LocationPermission.module.css';

export const LocationPermission = React.memo(() => {
  return (
    <div className={s.root}>
      <div className={s.iconContainer}>
        <img
          src="/images/location.png"
          className={s.icon}
          alt="locationPermission"
        />
      </div>
      <div className={s.locationText}>
        {'Change your default location settings'}
      </div>
      <div className={s.locationSubText}>
        {'1. On your device, open internet browser (Chrome recommended).'}
      </div>
      <div className={s.locationSubText}>
        {'2. At the top right, click '}
        <span className={s.locationSubTextActive}>{'More > Settings'}</span>
      </div>
      <div className={s.locationSubText}>
        {'3. Click '}
        <span className={s.locationSubTextActive}>
          {'Privacy and security > Site Settings'}
        </span>
      </div>
      <div className={s.locationSubText}>
        {'4. Click '}
        <span className={s.locationSubTextActive}>Location</span>
      </div>
      <div className={s.locationSubText}>
        {'5. Choose the option you want as your default setting'}
      </div>
    </div>
  );
});
