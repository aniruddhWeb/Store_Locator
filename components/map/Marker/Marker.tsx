import React, { useCallback } from 'react';
import cn from 'classnames';
import s from './Marker.module.css';
import { MarkerPin } from '../../icons/MarkerPin';
import { Delivery } from '../../icons/Delivery';
import { MailOrder } from '../../icons/MailOrder';
import { Brand } from '../../icons/Brand';
import { Dispensary } from '../../icons/Dispensary';
import { MarkerPinBig } from '../../icons/MarkerPinBig';
import { MapQuestion } from '../../icons/MapQuestion';

interface Props {
  id: string | number;
  lat?: number | null;
  lng?: number | null;
  image?: string | null;
  color?: string | null;
  markerText?: any;
  fillColor?: string | null;
  type?: string | null;
  showImage?: boolean;
  onClick?: (id: string | number, lat: number, lng: number) => void;
  selected?: boolean;
  bigger?: boolean;
}

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

export const Marker = React.memo((props: Props) => {
  const { lng, lat, id, markerText, onClick } = props;

  const onClickFunc = useCallback(
    () => lat && lng && onClick && onClick(id, lat, lng),
    [lat, lng, id, onClick],
  );

  const pinClass = cn(props.bigger ? s.pinBigger : s.pin, {
    [props.bigger ? s.pinHighlightBigger : s.pinHighlight]: props.selected,
    [s.pinNoHover]: props.type === 'question',
  });

  const imageContainerClass = cn(s.imageContainer, {
    [s.imageContainerBigger]: props.bigger,
  });

  const imageClass = cn(s.image, {
    [s.imageBigger]: props.bigger,
  });

  const typeClass = cn(s.typeImage, {
    [s.typeImageBigger]: props.bigger,
  });

  const svgClass = cn(s.svgImage, {
    [s.svgImageBigger]: props.bigger,
  });

  const dispensaryClass = cn(s.dispensary, {
    [s.dispensaryBigger]: props.bigger,
  });

  if (!lat && !lng) {
    return null;
  }
  return (
    <div onClick={onClickFunc} className={pinClass}>
      {props.type === 'question' ? <div className={s.questionCircle} /> : null}
      {props.bigger ? (
        <MarkerPinBig className={s.marker} fill={props.color} />
      ) : (
        <MarkerPin className={s.marker} fill={props.color} />
      )}
      <div className={imageContainerClass}>
        {props.showImage && props.image ? (
          <img
            draggable={false}
            src={props.image}
            className={imageClass}
            alt={props.image}
          />
        ) : (
          <>
            {props.type === BusinessType.DeliveryType ? (
              <div className={typeClass}>
                <Delivery className={svgClass} fill={props.fillColor} />
              </div>
            ) : null}
            {props.type === BusinessType.MailOrderType ? (
              <div className={typeClass}>
                <MailOrder className={svgClass} fill={props.fillColor} />
              </div>
            ) : null}
            {props.type === BusinessType.BrandType ? (
              <div className={typeClass}>
                <Brand className={svgClass} fill={props.fillColor} />
              </div>
            ) : null}
            {props.type === BusinessType.DispensaryType ? (
              <div className={typeClass}>
                <Dispensary
                  className={dispensaryClass}
                  fill={props.fillColor}
                />
              </div>
            ) : null}
            {props.type === 'question' ? (
              <div className={typeClass}>
                <MapQuestion className={svgClass} fill={props.fillColor} />
              </div>
            ) : null}
          </>
        )}
      </div>
      {markerText ? <div className={s.markerText}>{markerText}</div> : null}
    </div>
  );
});
