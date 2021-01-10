import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import mocks from './mocks';

if (process.env.NODE_ENV === 'production') {
  ReactDOM.hydrate(
    <App />,
    document.getElementById('root'),
  );
} else {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  );
}

if (process.env.NODE_ENV === 'development') mocks();
