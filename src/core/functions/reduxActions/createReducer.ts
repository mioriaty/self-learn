import { Action, HandleAction } from '.';
import { getObjectFromHandleActions } from './getObjectFromHandleAction';
import { immutableState } from './immueState';

export function reducerFn<TState, TAction extends Action>(initialState: TState, objectActions: HandleAction<TState, TAction>) {
  return (state = initialState, action: Extract<TAction, { type: TAction['type'] }>): TState => {
    const { type } = action;
    const callback = objectActions[type];
    return typeof callback === 'function' ? callback({ state: immutableState(state), action }) : state;
  };
}

export function createReducer<TState, TAction extends Action>(
  initialState: TState,
  handleActions: HandleAction<TState, TAction>[],
): (state: TState | undefined, action: Extract<TAction, { type: TAction['type'] }>) => TState;

export function createReducer<TState, TAction extends Action>(
  initialState: TState,
  objectAction: HandleAction<TState, TAction>,
): (state: TState | undefined, action: Extract<TAction, { type: TAction['type'] }>) => TState;

export function createReducer<TState, TAction extends Action>(
  initialState: TState,
  handleActions: HandleAction<TState, TAction> | HandleAction<TState, TAction>[],
) {
  const objectActions = Array.isArray(handleActions) ? getObjectFromHandleActions(handleActions) : handleActions;
  return reducerFn(initialState, objectActions);
}
