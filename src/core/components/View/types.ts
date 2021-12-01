export type ColGapProperties = 'colXs' | 'colSm' | 'colMd' | 'colLg' | 'gapXs' | 'gapSm' | 'gapMd' | 'gapLg';

export type Columns = number[];

export type ViewColGapProps = {
  [K in ColGapProperties]?: number;
};
