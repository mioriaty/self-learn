import { call, put, takeLatest } from '@redux-saga/core/effects';
import { todoService } from 'services/Todo';
import { getActionType } from 'wiloke-react-core/utils';
import { getAllTodos } from '../actions';

function* handleGetAll({ payload: { searchKey } }: ReturnType<typeof getAllTodos.request>) {
  try {
    const response: Awaited<ReturnType<typeof todoService.getTodo>> = yield call(todoService.getTodo, searchKey);
    yield put(getAllTodos.success({ todos: response }));
  } catch (error) {
    yield put(getAllTodos.failure(undefined));
  }
}

export function* watchGetAllTodos() {
  yield takeLatest(getActionType(getAllTodos.request), handleGetAll);
}
