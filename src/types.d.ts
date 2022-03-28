declare global {
  declare type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
  declare type Size = 'extra-small' | 'small' | 'medium' | 'large';
  declare type Status = 'idle' | 'loading' | 'success' | 'failure' | 'cancel';
  declare type BorderStyle = 'dashed' | 'dotted' | 'solid';
}

export default global;
