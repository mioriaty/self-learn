export declare function getActionType<TAction>(reduxAction: (...payload: any) => {
  type: TAction;
}): TAction;
