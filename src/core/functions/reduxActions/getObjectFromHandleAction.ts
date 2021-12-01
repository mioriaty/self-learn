import { Action, HandleAction, HandleActionCallback } from '.';

const COMMA = ',';

export function joinKeyName<TAction extends Action>(key: TAction['type'], name: string) {
  return `${!!name ? `${name}/` : ''}${key}`;
}

export function getObjectFromHandleActions<TState, TAction extends Action>(
  handleActions: HandleAction<TState, TAction>[],
  name = '',
): HandleAction<TState, TAction> {
  return handleActions.reduce((acc, handleAction) => {
    const [key]: TAction['type'][] = Object.keys(handleAction);
    const [callback]: HandleActionCallback<TState, TAction, TAction['type']>[] = Object.values(handleAction);
    // check not multiple type handleAction
    if (!key.includes(COMMA)) {
      return {
        ...acc,
        [joinKeyName(key, name)]: callback,
      };
    }
    return {
      ...acc,
      ...key.split(COMMA).reduce(
        (acc, key) => ({
          ...acc,
          [joinKeyName(key, name)]: callback,
        }),
        {},
      ),
    };
  }, {});
}
