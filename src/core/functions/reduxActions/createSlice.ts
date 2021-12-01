import { HandleAction, Action } from './types';
import { reducerFn } from './createReducer';
import { getObjectFromHandleActions, joinKeyName } from './getObjectFromHandleAction';

export type CreateSliceName = string;

export interface CreateSliceParams<TState, TAction extends Action, TOuterAction extends Action = { type: '' }> {
  name: CreateSliceName;
  initialState: TState;
  reducers: HandleAction<TState, TAction>[];
  extraReducers?: HandleAction<TState, TOuterAction>[];
}

export type CreateSliceActions<TAction extends Action> = {
  [K in TAction['type']]: (payload: Extract<TAction, { type: K }>['payload']) => Extract<TAction, { type: K }>;
};

export function getActionsFromReducers<TState, TAction extends Action>(reducers: HandleAction<TState, TAction>[], name: CreateSliceName) {
  const objectActions = getObjectFromHandleActions(reducers);
  return Object.keys(objectActions).reduce<CreateSliceActions<TAction>>((obj, key: TAction['type']) => {
    return {
      ...obj,
      [key]: (payload: Extract<TAction, { type: TAction['type'] }>['payload']) => ({
        type: joinKeyName(key, name),
        payload,
      }),
    };
  }, {} as any);
}

export function getExtraActions<TState, TOuterAction extends Action>(extraReducers?: HandleAction<TState, TOuterAction>[]) {
  return extraReducers ? getObjectFromHandleActions(extraReducers) : extraReducers;
}

export function createSlice<TState, TAction extends Action, TOuterAction extends Action = { type: '' }>(
  slice: CreateSliceParams<TState, TAction, TOuterAction>,
) {
  const objectActions = getObjectFromHandleActions(slice.reducers, slice.name);
  const objectExtraActions = getExtraActions(slice.extraReducers);
  const reducer = reducerFn(slice.initialState, { ...objectActions, ...(objectExtraActions || {}) });
  const actions = getActionsFromReducers(slice.reducers, slice.name);
  return {
    name: slice.name,
    reducer,
    actions,
  };
}
