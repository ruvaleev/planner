import React from 'react';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';

import renderFullPage from './renderFullPage';
import createStore from '../../src/redux/store';
import { fetchAreas } from '../../src/redux/slices/areas';
import { fetchTodos } from '../../src/redux/slices/todos';
import AreasCard from '../../src/components/AreasCard';
import Menu from '../../src/components/Menu';

function loadData(store) {
  const promises = [];

  promises.push(
    store.dispatch(fetchAreas()),
    store.dispatch(fetchTodos()),
  );

  return Promise.all(promises);
}

async function handleRender(req, res) {
  const store = createStore();

  await loadData(store);

  const html = renderToString(
    <Provider store={store}>
      <Menu />
      <AreasCard />
    </Provider>,
  );

  return renderFullPage(res, html, JSON.stringify(store.getState()), Helmet.renderStatic());
}

export default handleRender;
