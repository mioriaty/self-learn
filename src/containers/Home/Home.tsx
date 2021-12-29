import AsyncComponent from 'components/AsyncComponent';
import { View } from 'core';
import { useSelector } from 'react-redux';
import { isEmpty } from 'ramda';
import { useEffect } from 'react';
import withDebounce from 'hocs/withDebounce';
import { TextInput } from 'components/TextInput/TextInput';
import { Button } from 'antd';
import { v4 } from 'uuid';
import { defaultTodoData } from './reducers/reducerTodo';
import { todoSelector } from './selector';
import { useChangeTodoKey, useCreateTodo, useGetAllTodo } from './actions/actionTodo';

const DounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const Home = () => {
  const { searchKey, todos } = useSelector(todoSelector);
  const { data, getStatus, createStatus } = todos[searchKey] ?? defaultTodoData;

  const getTodos = useGetAllTodo();
  const createTodo = useCreateTodo();
  const changeSearch = useChangeTodoKey();

  useEffect(() => {
    getTodos.request({ search: searchKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const _renderSuccess = () => {
    return data.map(item => (
      <View style={{ padding: '10px', border: '1px solid', marginBottom: '4px' }} key={item.id}>
        <View>{item.name}</View>
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
