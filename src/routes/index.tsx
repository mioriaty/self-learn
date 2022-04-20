import { GamesPage } from 'containers/GamesPage';
import { Home } from 'containers/Home';
import { ProjectPage } from 'containers/ProjectPage';
import { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Page } from './types';

export const pages: Page[] = [
  { path: '/', component: Home, exact: true },
  { path: '/projects', component: ProjectPage, exact: true },
  { path: '/games', component: GamesPage, exact: true },
];

const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return <Route key={path} component={component} path={path} exact={exact} />;
        })}
        <Route>404</Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
