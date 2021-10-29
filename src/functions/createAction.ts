import { Type, CreateActionCallback, ActionTypes } from "types/types";

export declare function createAction<ActionType extends Type>(
  type: ActionType,
  callback?: CreateActionCallback
): () => {
  type: ActionType;
};

export declare function createAction<
  TActionType extends Type,
  TCallbackParams extends object,
  TCallbackReturn
>(
  type: TActionType,
  callback: (arg: TCallbackParams) => TCallbackReturn
): (arg: TCallbackParams) => {
  type: TActionType;
  payload: TCallbackReturn;
};

export declare function createAction<
  ActionType extends Type,
  TCallbackParams extends any[],
  TCallbackReturn
>(
  type: ActionType,
  callback: (...payload: TCallbackParams) => TCallbackReturn
): (...payload: TCallbackParams) => {
  type: ActionType;
  payload: TCallbackReturn;
};
