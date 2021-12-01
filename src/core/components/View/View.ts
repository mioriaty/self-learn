import { DOMElements } from 'core/types/DOMElements';
import { createElement, FC, forwardRef } from 'react';

export interface ViewProps {
  tagName?: DOMElements;
}

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
