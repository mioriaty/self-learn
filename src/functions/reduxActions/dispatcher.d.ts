export declare function getUseDispatchRedux<TDispatch extends any>(useDispatch: TDispatch): void;
export declare function Dispatcher<TPayload extends any[], TAction>(action: (...payload: TPayload) => TAction): (...payload: TPayload) => TAction;
