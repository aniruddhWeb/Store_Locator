import React from 'react';
import cn from 'classnames';
import s from './Button.module.css';

interface Props {
  buttonStyle?: any;
  buttonText: string;
  buttonTextStyle?: any;
  onPress?: (e?: any) => void;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  href?: string;
  hrefProps?: any;
  desktop?: boolean;
  mobile?: boolean;
}

export const Button = React.memo(
  ({
    onPress,
    buttonStyle,
    buttonTextStyle,
    error,
    fullWidth,
    href,
    hrefProps,
    buttonText,
    disabled,
    success,
    desktop,
    mobile,
  }: Props) => {
    const buttonClass = success
      ? cn(s.root, {
          [s.rootSuccessDisabled]: disabled,
          [s.rootFullWidth]: fullWidth,
          [s.rootSuccess]: success,
          [s.rootMobile]: !!mobile,
          [s.rootDesktop]: !!desktop,
        })
      : error
      ? cn(s.root, {
          [s.rootErrorDisabled]: disabled,
          [s.rootError]: error,
          [s.rootFullWidth]: fullWidth,
          [s.rootMobile]: !!mobile,
          [s.rootDesktop]: !!desktop,
        })
      : cn(s.root, {
          [s.rootDisabled]: disabled,
          [s.rootFullWidth]: fullWidth,
          [s.rootMobile]: !!mobile,
          [s.rootDesktop]: !!desktop,
        });
    if (href) {
      return (
        <a
          href={href}
          className={buttonClass}
          style={buttonStyle}
          {...hrefProps}>
          <div className={s.buttonText} style={buttonTextStyle}>
            {buttonText.toUpperCase()}
          </div>
        </a>
      );
    }
    return (
      <div
        className={buttonClass}
        onClick={disabled ? undefined : onPress}
        style={buttonStyle}>
        <div className={s.buttonText} style={buttonTextStyle}>
          {buttonText.toUpperCase()}
        </div>
      </div>
    );
  },
);
