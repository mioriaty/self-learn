import { Action, HandleActionCallback } from './types';
/**
 * @description Redux handle action
 * @param type action type
 * @param callback
 * @example
 * ```typescript
 * const reducer = createReducer<ExampleState, ExampleAction>(initialState, [
 *  handleAction('type', ({ state, action }) => ({
 *    ...state,
 *    ...
 *  })),
 *  ...
 * ])
 * ```
 * ```
 */

export declare function handleAction<TState, TAction extends Action, TKey extends TAction['type']>(type: TKey, callback: HandleActionCallback<TState, TAction, TKey>): {
    [x: string]: HandleActionCallback<TState, TAction, TKey>;
};
