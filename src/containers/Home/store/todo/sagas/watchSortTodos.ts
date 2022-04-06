import { call, put, takeEvery } from '@redux-saga/core/effects';
import { todoService } from 'services/Todo';
import { getActionType } from 'wiloke-react-core/utils';
import { sortTodos } from '../actions';

function* handleSort({ payload: { desIndex, srcIndex } }: ReturnType<typeof sortTodos.request>) {
  try {
    yield call(todoService.sortTodos, srcIndex, desIndex);
    yield put(sortTodos.success({ desIndex, srcIndex }));
  } catch (error) {
    yield put(sortTodos.failure(undefined));
  }
}

export function* watchSortTodos() {
  yield takeEvery(getActionType(sortTodos.request), handleSort);
}
