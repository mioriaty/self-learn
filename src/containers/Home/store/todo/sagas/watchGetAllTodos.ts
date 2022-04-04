import { call, put, takeLatest } from '@redux-saga/core/effects';
import { todoService } from 'services/Todo';
import { getActionType } from 'wiloke-react-core/utils';
import { getAllTodos } from '../actions';

function* handleGetAll(_: ReturnType<typeof getAllTodos.request>) {
  try {
    const response: Awaited<ReturnType<typeof todoService.getTodo>> = yield call(todoService.getTodo);
    yield put(getAllTodos.success({ todos: response }));
  } catch (error) {
    yield put(getAllTodos.failure(undefined));
  }
}

export function* watchGetAllTodos() {
  yield takeLatest(getActionType(getAllTodos.request), handleGetAll);
}
