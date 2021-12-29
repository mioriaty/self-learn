import { getActionType } from 'core';
import { call, put, takeLatest } from 'redux-saga/effects';
import { todoService } from 'services/Todo';
import { createTodo } from '../actions/actionTodo';
import { TodoItem } from '../Todo';

function* handleGet({ payload }: ReturnType<typeof createTodo.request>) {
  const { name } = payload;
  try {
    const response: TodoItem = yield call(todoService.createTodo, name);
    yield put(createTodo.success({ item: response }));
  } catch (error) {
    yield put(createTodo.failure({ message: 'loi vl roi' }));
  }
}

export function* watchCreateTodo() {
  yield takeLatest(getActionType(createTodo.request), handleGet);
}
