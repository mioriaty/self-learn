export declare type Type = string;

export interface Action {
  type: Type;
  payload?: any;
}

export declare type CreateActionCallback = undefined | (() => void);

export declare type HandleActionCallback<
  TState,
  TAction extends Action,
  TKey extends TAction["type"]
> = ({
  state,
  action,
}: {
  state: TState;
  action: Extract<TAction, { type: TKey }>;
}) => TState | void;

export declare type HandleAction<TState, TAction extends Action> = {
  [TKey in TAction["type"]]: HandleActionCallback<TState, TAction, TKey>;
};

export declare type ActionCreator = (...args: any[]) => Action;

export declare type ActionTypes<TypeOfActions extends any> =
  TypeOfActions extends ActionCreator
    ? ReturnType<TypeOfActions>
    : TypeOfActions extends Record<any, any>
    ? {
        [K in keyof TypeOfActions]: ActionTypes<TypeOfActions[K]>;
      }[keyof TypeOfActions]
    : TypeOfActions extends any
    ? never
    : never;
