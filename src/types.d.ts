import { Reducers } from 'rootStore/configureStore';

declare global {
  declare type AppState = Reducers;
  declare type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
  declare type Size = 'extra-small' | 'small' | 'medium' | 'large';
  declare type Status = 'idle' | 'loading' | 'success' | 'failure';
}

export default global;
