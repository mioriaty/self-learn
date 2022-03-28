import { CSSProperties } from 'react';

export interface ViewProps {
  /** Set width */
  width?: number | string;
  /** Set height */
  height?: number | string;
  backgroundColor?: string;
  color?: string;
  /** Màu border được lấy màu từ ThemeProvider */
  borderColor?: string;
  /** Kiểu của border */
  borderStyle?: BorderStyle;
  /** Border width css */
  borderWidth?: number;
  radius?: number;
  style?: CSSProperties;
  className?: string;
}
