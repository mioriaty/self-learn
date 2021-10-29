export declare function createDispatchAction<TPayload, TAction>(action: () => TAction): () => () => TAction;
export declare function createDispatchAction<TPayload extends object, TAction>(action: (payload: TPayload) => TAction): () => (payload: TPayload) => TAction;
export declare function createDispatchAction<TPayload extends any, TAction>(action: (payload: TPayload) => TAction): () => (payload: TPayload) => TAction;
export declare function createDispatchAction<TPayload extends any[], TAction>(action: (...payload: TPayload) => TAction): () => (...payload: TPayload) => TAction;
