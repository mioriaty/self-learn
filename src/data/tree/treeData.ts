import { TreeData } from 'components/AntdCustom/Tree';

export const treeData: TreeData = [
  {
    title: 'Games',
    key: 'games',
    children: [
      { title: 'Wordle', key: 'wordle', isLeaf: true },
      { title: 'Rock paper scissors', key: 'rps', isLeaf: true },
    ],
  },
];
