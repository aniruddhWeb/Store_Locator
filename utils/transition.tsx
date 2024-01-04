import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { useDeviceDetect } from './device';

const ReactModalWithDefaults = dynamic<any>(
  // @ts-ignore
  () =>
    import('../components/common/Modal/ReactModalWithDefaults').then(
      mod => mod.ReactModalWithDefaults,
    ),
  {
    ssr: false,
  },
);

const TIMEOUT: number = 300;

export const withModal = (
  isVisible: boolean,
  onEnter: () => void,
  onExit: () => void,
  onRequestClose?: () => void,
  overlayStyle?: React.CSSProperties,
  contentStyle?: React.CSSProperties,
  children?: ReactNode,
) => {
  const { isLightHouse } = useDeviceDetect();
  if (isLightHouse) {
    return null;
  }
  return (
    <ReactModalWithDefaults
      ariaHideApp={false}
      isOpen={isVisible}
      closeTimeoutMS={TIMEOUT}
      onAfterOpen={onEnter}
      onAfterClose={onExit}
      onRequestClose={onRequestClose}
      style={{ overlay: overlayStyle, content: contentStyle }}
      contentLabel="Modal">
      {children}
    </ReactModalWithDefaults>
  );
};
