import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import s from './StaticDescription.module.css';

interface Props {
  body: any;
}

export const StaticDescription = React.memo(({ body }: Props) => {
  return <div className={s.description}>{documentToReactComponents(body)}</div>;
});
