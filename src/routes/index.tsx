import { Home } from 'containers/Home';
import { FC } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';
import { Page } from './types';

export const pages: Page[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
];

const Routes: FC = () => {
  return (
    <Router history={history}>
      <Switch>
        {pages.map(({ component: Component, path, exact }) => {
          return (
            <Route key={path} exact={exact} path={path}>
              <Component />
            </Route>
          );
        })}
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
