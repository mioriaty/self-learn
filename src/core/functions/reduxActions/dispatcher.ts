type Callback<TAction extends any> = (action: TAction) => TAction;
type UseDispatch = <TAction extends any>() => Callback<TAction>;
let _useDispatch: UseDispatch;

export function getUseDispatchRedux<TDispatch extends any>(useDispatch: TDispatch) {
  _useDispatch = useDispatch as UseDispatch;
}

export function Dispatcher<TPayload extends any[], TAction>(action: (...payload: TPayload) => TAction) {
  if (typeof _useDispatch !== 'function') {
    throw new Error('You need to add `getUseDispatchRedux(useDispatch)` at root');
  }
  const dispatch = _useDispatch<TAction>();
  return (...payload: TPayload) => dispatch(action(...payload));
}
