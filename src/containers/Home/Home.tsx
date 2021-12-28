import AsyncComponent from 'components/AsyncComponent';
import { View } from 'core';
import { useSelector } from 'react-redux';
import { isEmpty } from 'ramda';
import { useEffect } from 'react';
import { defaultTodoData } from './reducers/reducerTodo';
import { todoSelector } from './selector';
import { useGetAllTodo } from './actions/actionTodo';

export const Home = () => {
  const { searchKey, todos } = useSelector(todoSelector);
  const { data, getStatus } = todos[searchKey] ?? defaultTodoData;

  const getTodos = useGetAllTodo();

  useEffect(() => {
    getTodos.request(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _renderSuccess = () => {
    return data.map(item => (
      <View key={item.id}>
        <View>{item.name}</View>
      </View>
    ));
  };

  return (
    <View>
      <AsyncComponent status={getStatus} isEmpty={isEmpty(data)} Success={_renderSuccess()} />
    </View>
  );
};
