import React, { FC } from 'react';
import s from './AdaptiveTitle.module.css';

export const AdaptiveTitle: FC<any> = ({ children }) => (
  <div className={s.root}>{children}</div>
);
