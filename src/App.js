import React from 'react';
import './assets/main.css';
import { Provider } from 'react-redux';
import AreasCard from './components/AreasCard';

import createStore from './redux/store';
import { fetchAreas } from './redux/slices/areas';
import { fetchTodos } from './redux/slices/todos';

/* eslint no-underscore-dangle: 0 */
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = createStore(preloadedState);

const onLoad = (providedStore) => {
  const promises = [];
  promises.push(
    providedStore.dispatch(fetchAreas()),
    providedStore.dispatch(fetchTodos()),
  );

  return Promise.all(promises);
};

class App extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') onLoad(store);
  }

  render() {
    return (
      <Provider store={store}>
        <AreasCard />
      </Provider>
    );
  }
}

export default App;
