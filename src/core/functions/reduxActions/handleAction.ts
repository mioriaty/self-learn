import { Action, HandleActionCallback } from './types';

export function handleAction<TState, TAction extends Action, TKey extends TAction['type']>(
  type: TKey,
  callback: HandleActionCallback<TState, TAction, TKey>,
) {
  return {
    [type]: callback,
  };
}
