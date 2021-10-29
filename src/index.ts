import {
  ActionTypes,
  createAction,
  createReducer,
  handleAction,
} from "functions/reduxActions";

const actionShowModal = createAction("@Modal/show", (show: boolean) => ({
  show,
}));

type ReducerActions = ActionTypes<typeof actionShowModal>;

interface ReducerState {
  show: boolean;
}

const defaultState: ReducerState = {
  show: false,
};

const testReducer = createReducer<ReducerState, ReducerActions>(
  defaultState,
  [

  ]
);
