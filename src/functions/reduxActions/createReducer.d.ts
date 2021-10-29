import { Action, HandleAction } from "./types";

export declare function reducerFn<TState, TAction extends Action>(
  initialState: TState,
  objectActions: HandleAction<TState, TAction>
): (
  state: TState | undefined,
  action: Extract<
    TAction,
    {
      type: TAction["type"];
    }
  >
) => TState;

export declare function createReducer<TState, TAction extends Action = Action>(
  initialState: TState,
  handleActions: HandleAction<TState, TAction>[]
): (
  state: TState | undefined,
  action: Extract<
    TAction,
    {
      type: TAction["type"];
    }
  >
) => TState;

export declare function createReducer<TState, TAction extends Action>(
  initialState: TState,
  objectAction: HandleAction<TState, TAction>
): (
  state: TState | undefined,
  action: Extract<
    TAction,
    {
      type: TAction["type"];
    }
  >
) => TState;
