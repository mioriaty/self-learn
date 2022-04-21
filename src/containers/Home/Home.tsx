import { Template } from 'layout/Template';
import { FC } from 'react';
import { View } from 'wiloke-react-core';
import { Todo } from './components/Todo';

export const Home: FC = () => {
  return (
    <Template
      Content={
        <View container css={{ padding: '10px' }}>
          <Todo />
        </View>
      }
    />
  );
};
