import { Reducers } from 'store/configureStore';
declare global {
  declare type Status = 'idle' | 'loading' | 'success' | 'failure';
  declare type AppState = Reducers;

  declare interface Window {}
}
