import { css, Theme } from 'wiloke-react-core';

export const container = (keepAntdCss: boolean) => ({ colors }: Theme) => {
  if (keepAntdCss) {
    return css``;
  }
  return css`
    :global {
      .ant-tree-icon__customize {
        display: none !important;
      }

      .ant-tree.ant-tree-directory .ant-tree-treenode-selected:hover::before,
      .ant-tree.ant-tree-directory .ant-tree-treenode-selected::before {
        background: none !important;
      }

      .ant-tree.ant-tree-directory .ant-tree-treenode .ant-tree-node-content-wrapper.ant-tree-node-selected {
        color: ${colors.gray8};
        font-weight: 500;
      }
      .ant-tree.ant-tree-directory .ant-tree-treenode-selected .ant-tree-switcher {
        color: ${colors.gray8};
        font-weight: 500;
      }
    }
  `;
};
