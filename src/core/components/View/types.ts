import { DOMElements } from 'core/types/DOMElements';
import { AllHTMLAttributes } from 'react';

export type ColGapProperties = 'colXs' | 'colSm' | 'colMd' | 'colLg' | 'gapXs' | 'gapSm' | 'gapMd' | 'gapLg';

export type Columns = number[];

export type ViewColGapProps = {
  [K in ColGapProperties]?: number;
};

export interface ViewProps extends AllHTMLAttributes<HTMLElement> {
  tagName?: DOMElements;
  /** Thêm className container ( giống như bootstrap ) */
  container?: boolean;
  /** Thêm className row ( giống như bootstrap ) */
  row?: boolean;
  /** Thêm 1 mảng columns đc set theo thứ tự tương ứng trong themeOverrides.grid. Ví dụ `[xs, sm, md, lg]` */
  columns?: number[];
}
