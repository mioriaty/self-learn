import { watchCreateTodo } from './watchCreateTodo';
import { watchDeleteTodo } from './watchDeleteTodo';
import { watchGetAllTodos } from './watchGetAllTodos';
import { watchSortTodos } from './watchSortTodos';
import { watchUpdateTodo } from './watchUpdateTodo';

export const sagasTodo = [watchCreateTodo, watchDeleteTodo, watchGetAllTodos, watchUpdateTodo, watchSortTodos];
