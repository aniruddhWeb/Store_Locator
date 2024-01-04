import React from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import s from './Loader.module.css';

const PuffLoader = dynamic<any>(
  // @ts-ignore
  () => import('react-spinners/PuffLoader'),
  {
    ssr: false,
  },
);

interface Props {
  isLoading?: boolean;
  size?: number;
  noMargin?: boolean;
  smallMargin?: boolean;
  overlay?: boolean;
  overlayProducts?: boolean;
  overlayProductsInProduct?: boolean;
  overlayMap?: boolean;
}

export const Loader = (props: Props) => {
  const loadingClass = cn(s.loading, {
    [s.loadingNoMargin]: !!props.noMargin,
    [s.loadingSmallMargin]: !!props.smallMargin,
    [s.loadingOverlay]: !!props.overlay,
    [s.loadingOverlayProducts]: !!props.overlayProducts,
    [s.loadingOverlayProductsInProduct]: !!props.overlayProductsInProduct,
    [s.loadingOverlayMap]: !!props.overlayMap,
    [s.loadingInvisible]:
      props.isLoading !== undefined ? !props.isLoading : false,
  });
  return (
    <div className={loadingClass}>
      {props.size && props.size < 40 ? (
        <PuffLoader color="#61AB62" size={props.size || 16} />
      ) : (
        <img
          src="/images/loading.gif"
          alt="Loading..."
          className={s.image}
          style={
            props.size
              ? {
                  width: props.size || 40,
                  height: props.size || 40,
                  borderRadius: (props.size || 40) * 0.5,
                }
              : undefined
          }
        />
      )}
    </div>
  );
};
