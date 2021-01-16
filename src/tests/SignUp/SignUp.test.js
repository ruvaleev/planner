import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import SignUp from '../../components/SignUp';
import Store from '../shared/Store';
import * as authenticationsSliceActions from '../../redux/slices/authentications';
import AuthenticationsReducerGenerator from '../shared/AuthenticationsReducerGenerator';

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <SignUp />
    </Provider>,
  );
}

describe('SignUp', () => {
  const mockStore = configureStore([]);
  let store;
  let component;
  let errorMessage;
  const email = 'email@email.com';
  const password = 'password';

  describe('when no errors in store', () => {
    beforeEach(() => {
      store = mockStore(Store({}));
      store.dispatch = jest.fn();
      component = renderWithStore(store);
    });

    it('dispatches signUp action on signUp form submit', () => {
      authenticationsSliceActions.signUp = jest.fn().mockImplementation((payload) => payload);

      const emailInput = component.getByPlaceholderText('Email...');
      const passwordInput = component.getByPlaceholderText('Password...');
      const submitButton = component.getByText('Submit');

      userEvent.type(emailInput, email);
      userEvent.type(passwordInput, password);
      userEvent.click(submitButton);

      const expectedPayload = { email, password };

      expect(authenticationsSliceActions.signUp).toHaveBeenCalledTimes(1);
      expect(authenticationsSliceActions.signUp).toHaveBeenCalledWith(expectedPayload);
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
