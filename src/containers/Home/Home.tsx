import AsyncComponent from 'components/AsyncComponent';
import { View } from 'core';
import { useSelector } from 'react-redux';
import { isEmpty } from 'ramda';
import { useEffect } from 'react';
import withDebounce from 'hocs/withDebounce';
import { TextInput } from 'components/TextInput/TextInput';
import { Button } from 'antd';
import { v4 } from 'uuid';
import { createGlobalState } from 'react-use';
import { defaultTodoData } from './reducers/reducerTodo';
import { todoSelector } from './selector';
import { useChangeTodoKey, useCreateTodo, useEditTodoName, useGetAllTodo } from './actions/actionTodo';
import { TodoItem } from './Todo';

const DounceInput = withDebounce(TextInput, 'value', 'onValueChange');

const useClickEdit = createGlobalState<boolean>(false);
const useNameTodo = createGlobalState<string>('');

export const Home = () => {
  const { searchKey, todos } = useSelector(todoSelector);
  const { data, getStatus, createStatus } = todos[searchKey] ?? defaultTodoData;
  const [willEdit, setWillEdit] = useClickEdit();
  const [name, setName] = useNameTodo();

  const getTodos = useGetAllTodo();
  const createTodo = useCreateTodo();
  const changeSearch = useChangeTodoKey();
  const changeName = useEditTodoName();

  useEffect(() => {
    getTodos.request({ search: searchKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const _handleClickSelf = (item: TodoItem) => () => {
    setName(item.name);
    setWillEdit(true);
  };

  const _handleChangeName = (id: string, val: string) => {
    changeName(id, val);
  };

  const _renderSuccess = () => {
    return data.map(item => (
      <View style={{ padding: '10px', border: '1px solid', marginBottom: '4px' }} key={item.id}>
        {willEdit ? <DounceInput value={name} /> : <View onClick={_handleClickSelf(item)}>{item.name}</View>}
      </View>
    ));
  };

  const _handleCreate = () => {
    createTodo.request({ name: `new todo ${v4()}` });
  };

  return (
    <View style={{ padding: '10px' }}>
      <View style={{ width: '400px' }}>
        <View style={{ margin: '6px 0' }}>
          <DounceInput placeholder="Search đê ranh con" value={searchKey} onValueChange={changeSearch} />
          <Button loading={createStatus === 'loading'} onClick={_handleCreate}>
            Tạo
          </Button>
        </View>
        <AsyncComponent status={getStatus} isEmpty={isEmpty(data)} Success={_renderSuccess()} />
      </View>
    </View>
  );
};
