import { call, put, takeLatest, select } from '@redux-saga/core/effects';
import { todoService } from 'services/Todo';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteTodo } from '../actions';
import { setCurrentTodo, todoSelector } from '../slice';

function* handleDelete({ payload }: ReturnType<typeof deleteTodo.request>) {
  const { id } = payload;
  try {
    const { currentTodo }: ReturnType<typeof todoSelector> = yield select(todoSelector);
    yield call(todoService.deleteTodo, id);
    yield put(deleteTodo.success({ id }));
    if (currentTodo && currentTodo.id === id) {
      yield put(setCurrentTodo(undefined));
    }
  } catch (error) {
    yield put(deleteTodo.failure({ id }));
  }
}

export function* watchDeleteTodo() {
  yield takeLatest(getActionType(deleteTodo.request), handleDelete);
}
