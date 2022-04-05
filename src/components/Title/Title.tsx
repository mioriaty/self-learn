import { FC, ReactNode } from 'react';
import { Text, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface TitleProps {
  title: string;
  titleNumberOfLines?: number;
  text?: string;
  Left?: ReactNode;
  Right?: ReactNode;
  css?: ViewProps['css'];
  titleCss?: ViewProps['css'];
}

const Title: FC<TitleProps> = ({ title, text, css, titleCss, titleNumberOfLines = 1, Right, Left }) => {
  return (
    <View css={[styles.container, css]}>
      <View css={styles.item(!!text)}>
        <View css={{ fontSize: 0, ...(!!text ? { marginTop: '5px' } : {}) }}>{Left}</View>
        <View>
          <Text tagName="h5" numberOfLines={titleNumberOfLines} css={[{ fontSize: '15px' }, titleCss]}>
            {title}
          </Text>
          {!!text && <Text tagName="p">{text}</Text>}
        </View>
      </View>
      <View css={styles.item(!!Left)}>{Right}</View>
    </View>
  );
};

export default Title;
