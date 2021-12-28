import { DOMElements } from 'core/types/DOMElements';
import { AllHTMLAttributes, createElement, FC, forwardRef } from 'react';

export interface ViewProps extends AllHTMLAttributes<HTMLElement> {
  tagName?: DOMElements;
  /** Thêm className container ( giống như bootstrap ) */
  container?: boolean;
  /** Thêm className row ( giống như bootstrap ) */
  row?: boolean;
  /** Thêm 1 mảng columns đc set theo thứ tự tương ứng trong themeOverrides.grid. Ví dụ `[xs, sm, md, lg]` */
  columns?: number[];
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
