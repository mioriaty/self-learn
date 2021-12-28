import { getActionType } from 'core';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { todoService } from 'services/Todo';
import { getAllTodo } from '../actions/actionTodo';
import { DataState, TodoState } from '../reducers/reducerTodo';
import { todoSelector } from '../selector';
import { TodoItem } from '../Todo';

function* handleGet() {
  try {
    const { searchKey, todos }: TodoState = yield select(todoSelector);
    const { data, getStatus } = todos[searchKey] as Exclude<DataState, undefined>;
    if (getStatus === 'success') {
      yield put(getAllTodo.success({ data }));
    } else {
      const response: TodoItem[] = yield call(todoService.getTodos);
      yield put(getAllTodo.success({ data: response }));
    }
  } catch (error) {
    yield put(getAllTodo.failure(undefined));
  }
}

export function* watchGetTodos() {
  yield takeLatest(getActionType(getAllTodo.request), handleGet);
}
