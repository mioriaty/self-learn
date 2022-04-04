import { call, put, takeLatest } from '@redux-saga/core/effects';
import { todoService } from 'services/Todo';
import { getActionType } from 'wiloke-react-core/utils';
import { updateTodo } from '../actions';

function* handleUpdate({ payload }: ReturnType<typeof updateTodo.request>) {
  const { id, active, content } = payload;
  try {
    yield call(todoService.updateTodo, { id, active, content });
    yield put(updateTodo.success({ id, active, content }));
  } catch (error) {
    yield put(updateTodo.failure({ id }));
  }
}

export function* watchUpdateTodo() {
  yield takeLatest(getActionType(updateTodo.request), handleUpdate);
}
