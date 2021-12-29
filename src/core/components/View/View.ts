import { createElement, FC, forwardRef } from 'react';
import { ViewProps } from './types';

export const View: FC<ViewProps> = forwardRef<HTMLElement, ViewProps>(({ tagName = 'div', children, ...rest }, ref) => {
  return createElement(
    tagName,
    {
      ...rest,
      ref,
    },
    children,
  );
});
