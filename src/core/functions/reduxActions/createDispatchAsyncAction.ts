import { Dispatcher } from './dispatcher';

export function createDispatchAsyncAction<
  TRequestPayload extends object,
  TSuccessPayload extends object,
  TFailurePayload extends object,
  TCancelPayload extends object,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
  TCancelAction
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
  TRequestPayload extends object,
  TSuccessPayload extends object,
  TFailurePayload extends object,
  TCancelPayload extends any,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
  TCancelAction
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
  TRequestPayload extends object,
  TSuccessPayload extends object,
  TFailurePayload extends any,
  TCancelPayload extends any,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
  TCancelAction
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
  TRequestPayload extends object,
  TSuccessPayload extends any,
  TFailurePayload extends any,
  TCancelPayload extends any,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
  TCancelAction
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
  TCancelAction
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
  TRequestPayload extends object,
  TSuccessPayload extends object,
  TFailurePayload extends object,
  TRequestAction,
  TSuccessAction,
  TFailureAction
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
  TRequestPayload extends object,
  TSuccessPayload extends object,
  TFailurePayload extends object,
  TRequestAction,
  TSuccessAction,
  TFailureAction
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
  TRequestPayload extends object,
  TSuccessPayload extends object,
  TFailurePayload extends any,
  TRequestAction,
  TSuccessAction,
  TFailureAction
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
  TRequestPayload extends object,
  TSuccessPayload extends any,
  TFailurePayload extends any,
  TRequestAction,
  TSuccessAction,
  TFailureAction
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
  TFailureAction
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
  TRequestPayload extends object | any,
  TSuccessPayload extends object | any,
  TFailurePayload extends object | any,
  TCancelPayload extends object | any,
  TRequestAction,
  TSuccessAction,
  TFailureAction,
  TCancelAction
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
