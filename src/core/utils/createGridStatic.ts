export interface Container {
  width: number;
  gap: number;
}
export interface Columns {
  max: number;
  gap: number;
}
export interface Breakpoints {
  [breakpoint: string]: number | 'default';
}
export interface GridSettings {
  container: Container;
  columns: Columns;
  breakpoints: Breakpoints;
}
declare const createGridStatic: (settings?: GridSettings) => string;
export default createGridStatic;
