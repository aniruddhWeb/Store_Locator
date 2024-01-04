import React, { HTMLAttributes, ComponentType, CSSProperties } from 'react';
import s from './Spinner.module.css';

const defaultSharedProps = {
  color: '#38ad48' as CSSProperties['color'],
  enabled: true,
  size: 50 as CSSProperties['width'],
  style: {} as CSSProperties,
};

const normalizeSize = (size: CSSProperties['width']) =>
  parseFloat((size || 0).toString()).toString() === (size || 0).toString()
    ? `${size}px`
    : (size || 0).toString();

export type SpinnersProps = Partial<typeof defaultSharedProps>;

export const withSharedProps = <P extends SpinnersProps>(
  Component: ComponentType<P>,
) => {
  const Wrapper = (props: P) => {
    const { color, enabled, size, style, ...otherProps } = props;
    const componentProps = {
      ...otherProps,
      style: {
        color,
        overflow: 'visible',
        width: normalizeSize(size),
        ...style,
      },
    };

    if (!enabled) return null;

    return <Component {...(componentProps as P)} />;
  };

  Wrapper.defaultProps = defaultSharedProps;

  return Wrapper;
};

const defaultCircularProps = {
  speed: 100,
  still: false,
  thickness: 100,
};

const secondaryColorDefaultProps = {
  ...defaultCircularProps,
  secondaryColor: 'rgba(0,0,0,0.44)' as CSSProperties['color'],
};

type SpinnerProps = HTMLAttributes<SVGElement> &
  Partial<typeof defaultCircularProps>;

type SecondaryColorSpinnerProps = SpinnerProps &
  Partial<typeof secondaryColorDefaultProps>;

type SpinnerCircularProps = SpinnersProps & SecondaryColorSpinnerProps;

const Component = ({
  secondaryColor,
  speed,
  still,
  thickness,
  ...svgProps
}: SpinnerCircularProps) => {
  const strokeWidth = 4 * ((thickness || 0) / 100);
  const circleStyle: CSSProperties = !still
    ? {
        animation: `spinners-react-circular ${
          speed ? 140 / speed : 0
        }s linear infinite`,
      }
    : {};

  return (
    <div className={s.spinner}>
      <svg fill="none" {...svgProps} viewBox="0 0 66 66">
        <circle
          cx="33"
          cy="33"
          fill="none"
          r="28"
          stroke={secondaryColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx="33"
          cy="33"
          fill="none"
          r="28"
          stroke="currentColor"
          strokeDasharray="1, 174"
          strokeDashoffset="306"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          style={circleStyle}
        />
      </svg>
    </div>
  );
};

Component.defaultProps = secondaryColorDefaultProps;

export const Spinner = withSharedProps(Component);
