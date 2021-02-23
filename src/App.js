import React from 'react';
import './assets/main.css';
import { Provider } from 'react-redux';
import {
  matchPath, Router, Route, Switch,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Cookies from 'universal-cookie';

import routes from 'routes';
import Locales from 'locales';
import createStore from './redux/store';
import rollbarScript from './components/shared/rollbarScript';

/* eslint no-underscore-dangle: 0 */
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(preloadedState);
const history = createBrowserHistory();

const onLoad = () => {
  const promises = [];
  const cookies = new Cookies();

  routes.some((route) => {
    const match = matchPath(history.location.pathname, route);
    if (match && route.loadData) promises.push(route.loadData({ match, store, cookies }));
    return match;
  });

  return Promise.all(promises);
};

history.listen(() => {
  onLoad();
});

Locales();

/* eslint react/jsx-props-no-spreading: 0 */
class App extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      onLoad();

      const rollbarScriptTag = document.createElement('script');
      rollbarScriptTag.innerHTML = rollbarScript;
      document.head.appendChild(rollbarScriptTag);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            {routes.map((route) => (
              <Route key={route.name} {...route} />
            ))}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
