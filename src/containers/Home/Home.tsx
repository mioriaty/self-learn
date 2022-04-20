import { Tree } from 'components/AntdCustom/Tree';
import Box from 'components/FieldBox';
import { Wordle } from 'containers/GamesPage/Wordle';
import { treeData } from 'data/tree/treeData';
import { Template } from 'layout/Template';
import { FC } from 'react';
import { FontAwesome, View } from 'wiloke-react-core';
import { Todo } from './components/Todo';

export const Home: FC = () => {
  return (
    <Template
      Content={
        <View container css={{ padding: '10px' }}>
          <Todo />

          <View width={700} css={{ padding: '10px' }}>
            <Wordle />
          </View>

          <Box css={{ padding: '20px' }} radius={4} borderColor="gray3" width={250}>
            <Tree
              mode="directory"
              icon={<View css={{ display: 'none !important' }} />}
              switcherIcon={<FontAwesome type="fas" name="gamepad" />}
              treeData={treeData}
              onSelect={keys => {
                console.log(keys);
              }}
            />
          </Box>
        </View>
      }
    />
  );
};
