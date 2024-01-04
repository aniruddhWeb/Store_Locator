import React from 'react';
import s from './PoweredBy.module.css';
import { PoweredByHorizontal } from '../../icons/PoweredByHorizontal';
import { Route } from '../../../config/Routes';
import { PoweredByVertical } from '../../icons/PoweredByVertical';

export const PoweredBy = React.memo(() => {
  return (
    <a target="_blank" href={`${Route.Root}`} className={s.root}>
      <PoweredByHorizontal className={s.horizontalIcon} />
      <PoweredByVertical className={s.icon} />
    </a>
  );
});
