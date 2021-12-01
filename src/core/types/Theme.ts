import defaultColors from "core/constants/defaultColors";
import defaultFonts from "core/constants/defaultFonts";

export type Colors = typeof defaultColors;

export type ColorNames = keyof Colors;

export type BorderStyle = 'solid' | 'dashed' | 'dotted';

export type Size = 'extra-small' | 'small' | 'medium' | 'large';

export type Radius = 'square' | 'pill' | number;

export type ColorProp = 'color' | 'colorHover' | 'backgroundColor' | 'backgroundColorHover' | 'borderColor' | 'borderColorHover';

export type Blacklist = 'all' | ColorProp;

export type NightModeBlacklist = Blacklist | ColorProp[];

export type FontFamilies = typeof defaultFonts;

export type FontFamilyNames = keyof FontFamilies;
