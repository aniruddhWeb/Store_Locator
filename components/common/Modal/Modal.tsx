import React, { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { ReactModalWithDefaults } from './ReactModalWithDefaults';
import s from './Modal.module.css';
import { Cross } from '../../icons/Cross';
import { Close } from '../../icons/Close';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  style?: any;
  wrapperStyle?: any;
  windowStyle?: any;
}

export const Modal: FC<Props> = React.memo<Props>(
  ({ isOpen, setIsOpen, children, wrapperStyle, windowStyle, style }) => {
    const close = useCallback(() => {
      setIsOpen(false);
    }, [setIsOpen]);
    return (
      <ReactModalWithDefaults isOpen={isOpen} style={style}>
        <div className={s.wrapper} style={wrapperStyle}>
          <div
            className={s.window}
            style={windowStyle}
            onClick={e => e.stopPropagation()}>
            <Cross className={s.closeIcon} onClick={close} />
            <Close className={s.closeIconMobile} onClick={close} />
            {children}
          </div>
        </div>
      </ReactModalWithDefaults>
    );
  },
);
