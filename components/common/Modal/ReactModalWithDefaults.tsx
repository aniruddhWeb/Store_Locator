import React, { FC, useEffect } from 'react';
import ReactModal from 'react-modal';

export const ReactModalWithDefaults: FC<ReactModal.Props> =
  React.memo<ReactModal.Props>(props => {
    useEffect(() => {
      if (props.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'scroll';
      }
      return () => {
        document.body.style.overflow = 'scroll';
      };
    }, [props.isOpen]);

    return (
      <ReactModal
        ariaHideApp={false}
        {...props}
        style={{
          content: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            maxWidth: 1440,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 0,
            flex: 1,
            background: 'rgba(0, 0, 0, 0)',
            inset: 'unset',
            border: 'unset',
            borderRadius: 'unset',
            overflow: 'hidden',
            ...props.style?.content,
          },
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingRight: 0,
            overflow: 'hidden',
            background: 'rgba(0, 0, 0, 0.4)',
            ...props.style?.overlay,
          },
        }}
      />
    );
  });
