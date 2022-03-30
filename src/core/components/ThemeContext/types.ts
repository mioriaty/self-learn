import { RgbColors } from 'core/types/RgbColors';
import { Colors, FontFamilies } from 'core/types/Theme';
import { GridSettings } from 'core/utils/createGridStatic';
import { ReactNode } from 'react';

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type Direction = 'ltr' | 'rtl';

export interface ThemeColors extends Colors, RgbColors {}

export interface Theme {
  colors: ThemeColors;
  fonts: FontFamilies;
  direction: Direction;
  debug: boolean;
}

export interface ThemeOverrides extends DeepPartial<Theme> {
  nightModeColors?: Partial<Colors>;
  // cssInJs?: CssInJs;
  grid?: GridSettings;
}
export interface ThemeProviderProps {
  themeOverrides?: ThemeOverrides;
  children: ReactNode;
}
