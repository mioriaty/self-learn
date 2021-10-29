import { Type } from "./types";

export declare function createAsyncAction<
  TRequestType extends Type,
  TSuccessType extends Type,
  TFailureType extends Type
>(
  types: [TRequestType, TSuccessType, TFailureType]
): <TRequestPayload, TSuccessPayload, TFailurePayload>() => {
  request: (payload: TRequestPayload) => {
    type: TRequestType;
    payload: TRequestPayload;
  };
  success: (payload: TSuccessPayload) => {
    type: TSuccessType;
    payload: TSuccessPayload;
  };
  failure: (payload: TFailurePayload) => {
    type: TFailureType;
    payload: TFailurePayload;
  };
};

export declare function createAsyncAction<
  TRequestType extends Type,
  TSuccessType extends Type,
  TFailureType extends Type,
  TCancelType extends Type,
>(
  types: [TRequestType, TSuccessType, TFailureType, TCancelType]
): <TRequestPayload, TSuccessPayload, TFailurePayload, TCancelPayload = undefined>() => {
  request: (payload: TRequestPayload) => {
    type: TRequestType;
    payload: TRequestPayload;
  };
  success: (payload: TSuccessPayload) => {
    type: TSuccessType;
    payload: TSuccessPayload;
  };
  failure: (payload: TFailurePayload) => {
    type: TFailureType;
    payload: TFailurePayload;
  };
  cancel: (payload?: TCancelPayload) => {
    type: TCancelType;
    payload: TCancelPayload;
  };
};

