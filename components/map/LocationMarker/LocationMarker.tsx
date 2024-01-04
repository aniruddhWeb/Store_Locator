import React from 'react';
import s from './LocationMarker.module.css';

interface Props {
  lat?: number | null;
  lng?: number | null;
  useWithoutLatLng?: boolean;
}

export const LocationMarker = React.memo((props: Props) => {
  const { lng, lat, useWithoutLatLng } = props;
  if (!lat && !lng && !useWithoutLatLng) {
    return null;
  }
  return <div className={useWithoutLatLng ? s.markerStandalone : s.marker} />;
});
