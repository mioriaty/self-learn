import AsyncComponent from 'components/AsyncComponent';
import Button from 'components/Button';
import DragItem from 'components/DragItem';
import Field from 'components/Field';
import Sortable, { RenderItemParam } from 'components/Sortable';
import SwitchBeauty from 'components/SwitchBeauty';
import TextInput from 'components/TextInput';
import Tooltip from 'components/Tooltip';
import withDebounce from 'hocs/withDebounce';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TodoItem } from 'services/Todo';
import { Divider, FontAwesome, View } from 'wiloke-react-core';
import { defaultTodoData, todoSelector, useChangeSearchKey, useGetAllTodos, useReorderTodos, useUpdateTodo } from '.';
import { useSetCurrentTodo } from './store/todo/slice';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const Home: FC = () => {
  const { data, searchKey, currentTodo } = useSelector(todoSelector);
  const { todos, updateTodo, getTodos } = data[searchKey] ?? defaultTodoData;

  const getAllTodos = useGetAllTodos();
  const changeSearchKey = useChangeSearchKey();
  const reorderTodos = useReorderTodos();
  const setCurrentTodo = useSetCurrentTodo();
  const updateTodoReq = useUpdateTodo();

  useEffect(() => {
    getAllTodos.request({ searchKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const renderItem = ({ isDragging, item, dragHandleProps }: RenderItemParam<TodoItem>) => {
    return (
      <View
        {...dragHandleProps}
        css={{ opacity: item.active ? '1' : '0.6' }}
        onClick={() => {
          setCurrentTodo(item);
        }}
      >
        <DragItem
          dragIconDisabled
          active={currentTodo?.id === item.id || isDragging}
          label={item.label}
          description={item.content}
          RightItem={
            <Tooltip portal text={item.active ? 'active' : 'inactive'}>
              <FontAwesome type="far" name={item.active ? 'eye' : 'eye-slash'} css={{ marginRight: '10px' }} />
            </Tooltip>
          }
        />
      </View>
    );
  };

  return (
    <View container css={{ padding: '10px' }}>
      <View row>
        <View columns={[12, 4, 4]}>
          <DebounceInput
            block
            sizeInput="medium"
            value={searchKey}
            onValueChange={val => {
              changeSearchKey(val);
            }}
            css={{ marginBottom: '4px' }}
            placeholder="Search đê"
          />
          <Divider size={10} css={{ marginBottom: '4px' }} />
          <AsyncComponent
            status={getTodos}
            Success={
              <Sortable
                keyExtractor={item => item.id}
                itemCss={{ marginBottom: '5px' }}
                data={todos}
                onDragEnd={result => {
                  const srcIndex = result.source.index;
                  const desIndex = result.destination?.index;
                  if (desIndex !== undefined) {
                    reorderTodos({
                      srcIndex,
                      desIndex,
                    });
                  }
                }}
                renderItem={renderItem}
              />
            }
          />
        </View>

        <View columns={[12, 6, 6]}>
          {currentTodo && (
            <View>
              <Field label="Label">
                <DebounceInput
                  block
                  css={{ opacity: updateTodo[currentTodo.id] === 'loading' ? 0.6 : 1 }}
                  value={currentTodo.label}
                  onValueChange={val => {
                    setCurrentTodo({ ...currentTodo, label: val });
                  }}
                />
              </Field>

              <Field label="Content">
                <DebounceInput
                  block
                  css={{ opacity: updateTodo[currentTodo.id] === 'loading' ? 0.6 : 1 }}
                  value={currentTodo.content}
                  onValueChange={val => {
                    setCurrentTodo({ ...currentTodo, content: val });
                  }}
                />
              </Field>

              <Field label="Active">
                <SwitchBeauty
                  loading={updateTodo[currentTodo.id] === 'loading'}
                  borderColor="gray3"
                  checked={currentTodo.active}
                  onValueChange={val => {
                    setCurrentTodo({ ...currentTodo, active: val });
                  }}
                />
              </Field>

              <Button
                radius={6}
                size="small"
                loading={updateTodo[currentTodo.id] === 'loading'}
                onClick={() => {
                  updateTodoReq.request({ ...currentTodo });
                }}
              >
                Update
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
