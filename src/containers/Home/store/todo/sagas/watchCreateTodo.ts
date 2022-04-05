import { call, put, takeLatest, delay } from '@redux-saga/core/effects';
import { todoService } from 'services/Todo';
import { getActionType } from 'wiloke-react-core/utils';
import { createTodo } from '../actions';

function* handleCreate({ payload }: ReturnType<typeof createTodo.request>) {
  const {
    todo: { content, label },
    callback,
  } = payload;
  try {
    const response: Awaited<ReturnType<typeof todoService.addTodo>> = yield call(todoService.addTodo, content, label);
    yield put(createTodo.success({ todo: response }));
    yield delay(100);
    callback?.();
  } catch (error) {
    yield put(createTodo.failure(undefined));
  }
}

export function* watchCreateTodo() {
  yield takeLatest(getActionType(createTodo.request), handleCreate);
}
