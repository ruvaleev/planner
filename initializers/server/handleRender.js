import React from 'react';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import {
  matchPath, StaticRouter, Route, Switch,
} from 'react-router-dom';
import Cookies from 'universal-cookie';

import routes from 'routes';
import renderFullPage from './renderFullPage';
import createStore from '../../src/redux/store';

function loadData(store, path, cookies) {
  const promises = [];

  routes.some((route) => {
    const match = matchPath(path, route);
    if (match) promises.push(route.loadData && route.loadData({ match, store, cookies }));
    return match;
  });

  return Promise.all(promises);
}

/* eslint react/jsx-props-no-spreading: 0 */
async function handleRender(req, res) {
  const context = {};
  const store = createStore();

  const cookies = new Cookies(req.headers.cookie);
  await loadData(store, req.url, cookies);

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Switch>
          {routes.map((route) => (
            <Route key={route.name} {...route} />
          ))}
        </Switch>
      </StaticRouter>
    </Provider>,
  );

  return renderFullPage(res, html, JSON.stringify(store.getState()), Helmet.renderStatic());
}

export default handleRender;
