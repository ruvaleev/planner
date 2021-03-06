import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import i18n from 'i18next';

import Home from '../../../components/Home';
import Store from '../../shared/Store';
import * as authenticationsSliceActions from '../../../redux/slices/authentications';
import AuthenticationsReducerGenerator from '../../shared/AuthenticationsReducerGenerator';

import {
  plannerPath, rootPath, signInPath, signUpPath,
} from '../../../helpers/routes';

const history = createMemoryHistory();

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <Router history={history}>
        <Home />
      </Router>
    </Provider>,
  );
}

describe('Home', () => {
  const mockStore = configureStore([]);
  let store;
  let component;

  describe('when user unauthenticated', () => {
    beforeEach(() => {
      store = mockStore(Store());
      store.dispatch = jest.fn();
      authenticationsSliceActions.verifyAuth = jest.fn();
      component = renderWithStore(store);
    });

    it("doesn't render message about demo mode", () => {
      expect(component.queryByText(i18n.t('demo mode message'))).not.toBeInTheDocument();
    });

    it('dispatches verifyAuth', () => {
      expect(authenticationsSliceActions.verifyAuth).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('dispatches logInDemo action on log in demo link click', () => {
      authenticationsSliceActions.logInDemo = jest.fn();

      const logInDemoLink = component.getByText(i18n.t('demo mode'));
      userEvent.click(logInDemoLink);

      expect(authenticationsSliceActions.logInDemo).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it("doesn't render link to planner", () => {
      expect(component.queryByText(i18n.t('planner'))).not.toBeInTheDocument();
    });

    it('correctly renders link to sign in page', () => {
      const signInLink = component.getByText(i18n.t('sign in'));
      userEvent.click(signInLink);
      expect(history.location.pathname).toBe(signInPath());
    });

    it('correctly renders link to sign up page', () => {
      const signUpLink = component.getByText(i18n.t('sign up'));
      userEvent.click(signUpLink);
      expect(history.location.pathname).toBe(signUpPath());
    });

    it("doesn't render log out link", () => {
      expect(component.queryByText(i18n.t('log out'))).not.toBeInTheDocument();
    });

    it('renders change language link', () => {
      const initialLanguage = i18n.language;
      const changeLanguageLink = component.getByText(i18n.t('change language'));

      userEvent.click(changeLanguageLink);
      expect(i18n.language).not.toEqual(initialLanguage);

      userEvent.click(changeLanguageLink);
      expect(i18n.language).toEqual(initialLanguage);
    });
  });

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

    it('renders change language link', () => {
      const initialLanguage = i18n.language;
      const changeLanguageLink = component.getByText(i18n.t('change language'));

      userEvent.click(changeLanguageLink);
      expect(i18n.language).not.toEqual(initialLanguage);

      userEvent.click(changeLanguageLink);
      expect(i18n.language).toEqual(initialLanguage);
    });
  });

  describe('when user authenticated', () => {
    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isAuthenticated: true,
        }),
      }));

      store.dispatch = jest.fn();
      component = renderWithStore(store);
    });

    it("doesn't render message about demo mode", () => {
      expect(component.queryByText(i18n.t('demo mode message'))).not.toBeInTheDocument();
    });

    it('correctly renders link to planner', () => {
      const plannerLink = component.getByText(i18n.t('planner'));
      userEvent.click(plannerLink);
      expect(history.location.pathname).toBe(plannerPath());
    });

    it('dispatches logOut action on log out link click and user stays on root path', () => {
      history.push(rootPath());
      authenticationsSliceActions.logOut = jest.fn();

      const logOutLink = component.getByText(i18n.t('log out'));
      userEvent.click(logOutLink);

      expect(history.location.pathname).toBe(rootPath());
      expect(authenticationsSliceActions.logOut).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it("doesn't render sign in link", () => {
      expect(component.queryByText(i18n.t('sign in'))).not.toBeInTheDocument();
    });

    it("doesn't render sign up link", () => {
      expect(component.queryByText(i18n.t('sign up'))).not.toBeInTheDocument();
    });

    it('renders change language link', () => {
      const initialLanguage = i18n.language;
      const changeLanguageLink = component.getByText(i18n.t('change language'));

      userEvent.click(changeLanguageLink);
      expect(i18n.language).not.toEqual(initialLanguage);

      userEvent.click(changeLanguageLink);
      expect(i18n.language).toEqual(initialLanguage);
    });
  });
});
