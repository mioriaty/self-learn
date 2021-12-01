export function getActionType<TAction>(
  reduxAction: (...payload: any) => {
    type: TAction;
  },
): TAction;

export function getActionType<TAction>(reduxAction: (...payload: any) => { type: TAction }): TAction {
  return reduxAction().type;
}
