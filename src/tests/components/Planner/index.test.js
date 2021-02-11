import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import i18n from 'i18next';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Planner from '../../../components/Planner';
import Store from '../../shared/Store';
import AuthenticationsReducerGenerator from '../../shared/AuthenticationsReducerGenerator';
import { plannerPath, rootPath } from '../../../helpers/routes';

Element.prototype.scroll = jest.fn();

const history = createMemoryHistory();

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <Router history={history}>
        <Planner />
      </Router>
    </Provider>,
  );
}

describe('Planner', () => {
  const mockStore = configureStore([]);
  let store;
  let component;

  describe('when user in Demo mode', () => {
    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isAuthenticated: true,
          isDemo: true,
        }),
      }));

      store.dispatch = jest.fn();
      component = renderWithStore(store);
    });

    it('renders message about demo mode', () => {
      expect(component.queryByText(i18n.t('demo mode message'))).toBeInTheDocument();
    });
  });

  describe('when user authenticated', () => {
    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isAuthenticated: true,
          isDemo: false,
        }),
      }));

      store.dispatch = jest.fn();
      component = renderWithStore(store);
    });

    it("doesn't render message about demo mode", () => {
      expect(component.queryByText(i18n.t('demo mode message'))).not.toBeInTheDocument();
    });
  });

  describe('when user unauthenticated', () => {
    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isAuthenticated: false,
        }),
      }));
      history.push(plannerPath());
      store.dispatch = jest.fn();
      component = renderWithStore(store);
    });

    it('redirects to Home Page', () => {
      expect(history.location.pathname).toBe(rootPath());
    });
  });
});
