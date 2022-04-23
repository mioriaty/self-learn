import { Tree } from 'components/AntdCustom/Tree';
import Box from 'components/FieldBox';
import { treeData } from 'data/tree/treeData';
import { Template } from 'layout/Template';
import { FC } from 'react';
import { FontAwesome, View } from 'wiloke-react-core';
import { RockPaperScissors } from './RockPaperScissors';
import { Wordle } from './Wordle';

export const GamesPage: FC = () => {
  return (
    <Template
      Content={
        <View>
          <View container>
            <RockPaperScissors />
          </View>

          <View container>
            <Wordle />
          </View>

          <Box css={{ padding: '10px', position: 'fixed', top: '20%', right: '30px' }} radius={4} borderColor="gray3" width={250}>
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
