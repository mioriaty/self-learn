import { Template } from 'layout/Template';
import { FC } from 'react';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export const Home: FC = () => {
  return (
    <Template
      CustomHeader={<></>}
      Content={
        <View css={styles.container}>
          <View css={styles.dark}></View>
          <View css={styles.light}></View>

          <View css={styles.intro} backgroundColor="light">
            <View css={styles.introLeft}></View>
            <View css={styles.introRight}></View>
          </View>
        </View>
      }
    />
  );
};
