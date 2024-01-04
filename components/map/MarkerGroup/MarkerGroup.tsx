import React, { useCallback } from 'react';
import s from './MarkerGroup.module.css';

interface Props {
  id: number;
  lat?: number | null;
  lng?: number | null;
  markerCount: number;
  onClick?: (clusterId: number, latitude: number, longitude: number) => void;
}

export const MarkerGroup = React.memo((props: Props) => {
  const onClick = useCallback(
    () =>
      props?.lat &&
      props?.lng &&
      props.onClick &&
      props.onClick(props.id, props?.lat, props?.lng),
    [props?.lat, props?.lng, props.id],
  );
  return (
    <div onClick={onClick} className={s.group}>
      <div className={s.groupText}>{props.markerCount}</div>
    </div>
  );
});
