import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import i18n from 'i18next';

import Planner from '../../../components/Planner';
import Store from '../../shared/Store';
import AuthenticationsReducerGenerator from '../../shared/AuthenticationsReducerGenerator';

Element.prototype.scroll = jest.fn();

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <Planner />
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
});
