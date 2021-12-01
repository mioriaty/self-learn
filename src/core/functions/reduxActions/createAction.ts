import { Type, CreateActionCallBack } from './types';

export function createAction<TActionType extends Type>(type: TActionType, callback?: CreateActionCallBack): () => { type: TActionType };

export function createAction<TActionType extends Type, TCallbackParams extends object, TCallbackReturn>(
  type: TActionType,
  callback: (arg: TCallbackParams) => TCallbackReturn,
): (arg: TCallbackParams) => { type: TActionType; payload: TCallbackReturn };

export function createAction<TActionType extends Type, TCallbackParams extends any[], TCallbackReturn>(
  type: TActionType,
  callback: (...payload: TCallbackParams) => TCallbackReturn,
): (...payload: TCallbackParams) => { type: TActionType; payload: TCallbackReturn };

export function createAction<TActionType extends Type, TCallbackParams extends any[], TCallbackReturn>(
  type: TActionType,
  callback: ((...payload: TCallbackParams) => TCallbackReturn) | undefined,
) {
  return (...payload: TCallbackParams) => {
    if (typeof callback !== 'function' || payload.length === 0) {
      return {
        type,
      };
    }
    return {
      type,
      payload: callback(...payload),
    };
  };
}
