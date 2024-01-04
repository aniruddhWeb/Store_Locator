import React, { ReactNode, FC, ComponentType, HTMLAttributes } from 'react';

interface Props {
  children: ReactNode | ReactNode[];
  el?: ComponentType<HTMLAttributes<HTMLElement>>;
  horizontal?: boolean;
}

export const FlexContainer: FC<Props> = React.memo(
  ({ children, el: Component = 'div', horizontal = false }) => {
    return (
      <Component
        className={
          horizontal ? 'flexHorizontalContainer' : 'flexVerticalContainer'
        }>
        {children}
      </Component>
    );
  },
);
