import { Dispatcher } from './dispatcher';

export function createDispatchAction<TPayload, TAction>(action: () => TAction): () => () => TAction;

export function createDispatchAction<TPayload extends object, TAction>(action: (payload: TPayload) => TAction): () => (payload: TPayload) => TAction;

export function createDispatchAction<TPayload extends any, TAction>(action: (payload: TPayload) => TAction): () => (payload: TPayload) => TAction;

export function createDispatchAction<TPayload extends any[], TAction>(
  action: (...payload: TPayload) => TAction,
): () => (...payload: TPayload) => TAction;

export function createDispatchAction<TPayload extends any[], TAction>(action: (...payload: TPayload) => TAction) {
  return () => Dispatcher(action);
}
