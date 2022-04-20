import { Template } from 'layout/Template';
import { FC } from 'react';
import { View } from 'wiloke-react-core';
import { RockPaperScissors } from './RockPaperScissors';

export const GamesPage: FC = () => {
  return (
    <Template
      Content={
        <View container>
          <RockPaperScissors />
        </View>
      }
    />
  );
};
