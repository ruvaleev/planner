import React from 'react';
import './assets/main.css';
import { Provider } from 'react-redux';
import {
  matchPath, Router, Route, Switch,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import routes from 'routes';
import createStore from './redux/store';

/* eslint no-underscore-dangle: 0 */
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(preloadedState);
const history = createBrowserHistory({ forceRefresh: true });

const onLoad = () => {
  const promises = [];
  routes.some((route) => {
    const match = matchPath(history.location.pathname, route);
    if (match) promises.push(route.loadData({ match, store }));
    return match;
  });

  return Promise.all(promises);
};

history.listen(() => {
  onLoad();
});

/* eslint react/jsx-props-no-spreading: 0 */
class App extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') onLoad();
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
