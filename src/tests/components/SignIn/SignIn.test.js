import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import i18n from 'i18next';

import SignIn from '../../../components/SignIn';
import Store from '../../shared/Store';
import * as authenticationsSliceActions from '../../../redux/slices/authentications';
import AuthenticationsReducerGenerator from '../../shared/AuthenticationsReducerGenerator';

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <SignIn />
    </Provider>,
  );
}

describe('SignIn', () => {
  const mockStore = configureStore([]);
  let store;
  let component;
  let errorMessage;
  const correctEmail = 'correct@email.com';
  const password = 'password';

  describe('when no errors in store', () => {
    beforeEach(() => {
      store = mockStore(Store({}));
      store.dispatch = jest.fn();
      component = renderWithStore(store);
    });

    it('dispatches signIn action on signIn form submit', () => {
      authenticationsSliceActions.signIn = jest.fn().mockImplementation((payload) => payload);

      const emailInput = component.getByPlaceholderText(i18n.t('email'));
      const passwordInput = component.getByPlaceholderText(i18n.t('password'));
      const submitButton = component.getByText(i18n.t('submit'));

      userEvent.type(emailInput, correctEmail);
      userEvent.type(passwordInput, password);
      userEvent.click(submitButton);

      const expectedPayload = { email: correctEmail, password };

      expect(authenticationsSliceActions.signIn).toHaveBeenCalledTimes(1);
      expect(authenticationsSliceActions.signIn).toHaveBeenCalledWith(expectedPayload);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(expectedPayload);
    });
  });
  describe('when there are errors in store', () => {
    beforeEach(() => {
      errorMessage = 'Some Error Message';
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isError: true,
          error: errorMessage,
        }),
      }));

      store.dispatch = jest.fn();
      component = renderWithStore(store);
    });

    it('shows proper error message', () => {
      expect(component.queryByText(errorMessage)).toBeInTheDocument();
    });
    it('dispatches resetError action on click on error message', () => {
      authenticationsSliceActions.resetError = jest.fn().mockImplementation();

      const errorMessageDiv = component.getByText(errorMessage);

      userEvent.click(errorMessageDiv);

      expect(authenticationsSliceActions.resetError).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
