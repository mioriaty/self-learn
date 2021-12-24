import { RgbColors } from 'core/types/RgbColors';
import { Colors } from 'core/types/Theme';

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type Direction = 'ltr' | 'rtl';

export interface ThemeColors extends Colors, RgbColors {}
