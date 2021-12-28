import { Dispatcher } from './dispatcher';

export function createDispatchAsyncAction<
  TRequestPayload extends Record<string, unknown>,
  TSuccessPayload extends Record<string, unknown>,
  TFailurePayload extends Record<string, unknown>,
  TCancelPayload extends Record<string, unknown>,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
  TCancelAction,
>(asyncAction: {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
  cancel: (payload: TCancelPayload) => TCancelAction;
}): () => {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
  cancel: (payload?: TCancelPayload) => TCancelAction;
};
export function createDispatchAsyncAction<
  TRequestPayload extends Record<string, unknown>,
  TSuccessPayload extends Record<string, unknown>,
  TFailurePayload extends Record<string, unknown>,
  TCancelPayload extends any,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
  TCancelAction,
>(asyncAction: {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
  cancel: (payload: TCancelPayload) => TCancelAction;
}): () => {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
  cancel: (payload?: TCancelPayload) => TCancelAction;
};
export function createDispatchAsyncAction<
  TRequestPayload extends Record<string, unknown>,
  TSuccessPayload extends Record<string, unknown>,
  TFailurePayload extends any,
  TCancelPayload extends any,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
  TCancelAction,
>(asyncAction: {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
  cancel: (payload: TCancelPayload) => TCancelAction;
}): () => {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
  cancel: (payload?: TCancelPayload) => TCancelAction;
};
export function createDispatchAsyncAction<
  TRequestPayload extends Record<string, unknown>,
  TSuccessPayload extends any,
  TFailurePayload extends any,
  TCancelPayload extends any,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
  TCancelAction,
>(asyncAction: {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
  cancel: (payload: TCancelPayload) => TCancelAction;
}): () => {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
  cancel: (payload?: TCancelPayload) => TCancelAction;
};
export function createDispatchAsyncAction<
  TRequestPayload extends any,
  TSuccessPayload extends any,
  TFailurePayload extends any,
  TCancelPayload extends any,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
  TCancelAction,
>(asyncAction: {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
  cancel: (payload: TCancelPayload) => TCancelAction;
}): () => {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
  cancel: (payload?: TCancelPayload) => TCancelAction;
};

export function createDispatchAsyncAction<
  TRequestPayload extends Record<string, unknown>,
  TSuccessPayload extends Record<string, unknown>,
  TFailurePayload extends Record<string, unknown>,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
>(asyncAction: {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
}): () => {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
};
export function createDispatchAsyncAction<
  TRequestPayload extends Record<string, unknown>,
  TSuccessPayload extends Record<string, unknown>,
  TFailurePayload extends Record<string, unknown>,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
>(asyncAction: {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
}): () => {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
};
export function createDispatchAsyncAction<
  TRequestPayload extends Record<string, unknown>,
  TSuccessPayload extends Record<string, unknown>,
  TFailurePayload extends any,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
>(asyncAction: {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
}): () => {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
};
export function createDispatchAsyncAction<
  TRequestPayload extends Record<string, unknown>,
  TSuccessPayload extends any,
  TFailurePayload extends any,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
>(asyncAction: {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
}): () => {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
};
export function createDispatchAsyncAction<
  TRequestPayload extends any,
  TSuccessPayload extends any,
  TFailurePayload extends any,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
>(asyncAction: {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
}): () => {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
};

export function createDispatchAsyncAction<
  TRequestPayload extends Record<string, unknown> | any,
  TSuccessPayload extends Record<string, unknown> | any,
  TFailurePayload extends Record<string, unknown> | any,
  TCancelPayload extends Record<string, unknown> | any,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
  TCancelAction,
>(asyncAction: {
  request: (payload: TRequestPayload) => TRequestAction;
  success: (payload: TSuccessPayload) => TSuccessAction;
  failure: (payload: TFailurePayload) => TFailureAction;
  cancel?: (payload?: TCancelPayload) => TCancelAction;
}) {
  return () => {
    return {
      request: Dispatcher(asyncAction.request),
      success: Dispatcher(asyncAction.success),
      failure: Dispatcher(asyncAction.failure),
      ...(!!asyncAction.cancel ? { cancel: Dispatcher(asyncAction.cancel) } : {}),
    };
  };
}
