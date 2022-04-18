import { Tree as AntdTree, TreeProps as AntdTreeProps } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { FC } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import { classNames } from 'wiloke-react-core/utils';
import * as styles from './styles';

type TreeMode = 'directory' | 'node';

export type TreeData = DataNode[];

export interface TreeProps extends AntdTreeProps {
  css?: ViewProps['css'];
  containerClassName?: string;
  mode?: TreeMode;
  keepAntdCss?: boolean;
}

export const Tree: FC<TreeProps> = ({ keepAntdCss = false, mode = 'node', containerClassName, css, ...rest }) => {
  return (
    <View className={classNames('custom-tree-antd', containerClassName)} css={[styles.container(keepAntdCss), css]}>
      {mode === 'node' ? <AntdTree {...rest} /> : <AntdTree.DirectoryTree {...rest} />}
    </View>
  );
};
