import { Home } from 'containers/Home';
import { FC } from 'react';
import { Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { Page } from './types';

export const pages: Page[] = [{ path: '/', component: Home, exact: true }];

const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {pages.map(({ component: Component, path, exact }) => {
          return (
            <Route key={path} exact={exact} path={path}>
              <Component />
            </Route>
          );
        })}
        <Route>404</Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
