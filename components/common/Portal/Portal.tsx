import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { hasWindow } from '../../../utils/window';

export const Portal = ({ children }: PropsWithChildren<any>) => {
  if (hasWindow) {
    return createPortal(children, document.body);
  }
  return null;
};
