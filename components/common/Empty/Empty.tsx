import React from 'react';
import s from './Empty.module.css';

interface Props {
  text: string;
}

export const Empty = React.memo(({ text }: Props) => {
  return <div className={s.empty}>{text}</div>;
});
