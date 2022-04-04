import { call, put, takeLatest } from '@redux-saga/core/effects';
import { todoService } from 'services/Todo';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteTodo } from '../actions';

function* handleDelete({ payload }: ReturnType<typeof deleteTodo.request>) {
  const { id } = payload;
  try {
    yield call(todoService.deleteTodo, id);
    yield put(deleteTodo.success({ id }));
  } catch (error) {
    yield put(deleteTodo.failure({ id }));
  }
}

export function* watchDeleteTodo() {
  yield takeLatest(getActionType(deleteTodo.request), handleDelete);
}
