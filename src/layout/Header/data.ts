import { MenuItem } from 'components/Navigation/Navigation';
import { v4 } from 'uuid';

export const menuItems: MenuItem[] = [
  { id: v4(), href: '/', label: 'Home', isReactRouter: true, exact: true },
  { id: v4(), href: '/projects', label: 'Project', isReactRouter: true, exact: true },
];
