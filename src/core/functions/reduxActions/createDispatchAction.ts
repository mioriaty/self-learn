import { Dispatcher } from './dispatcher';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createDispatchAction<TPayload, TAction>(action: () => TAction): () => () => TAction;

export function createDispatchAction<TPayload extends Record<string, unknown>, TAction>(
  action: (payload: TPayload) => TAction,
): () => (payload: TPayload) => TAction;

export function createDispatchAction<TPayload extends any, TAction>(action: (payload: TPayload) => TAction): () => (payload: TPayload) => TAction;

export function createDispatchAction<TPayload extends any[], TAction>(
  action: (...payload: TPayload) => TAction,
): () => (...payload: TPayload) => TAction;

export function createDispatchAction<TPayload extends any[], TAction>(action: (...payload: TPayload) => TAction) {
  return () => Dispatcher(action);
}
