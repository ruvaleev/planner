import uuid from 'uuid-random';

import mocks from 'mocks';

import * as authenticationsSliceActions from 'redux/slices/authentications';
import createStore from 'redux/store';

mocks();

describe('authenticationsReducer', () => {
  let store;

  beforeEach(() => {
    store = createStore();
  });

  describe('verifyToken', () => {
    it('set isAuthenticated flag to true if auth token correct', async () => {
      await store.dispatch(authenticationsSliceActions.verifyToken('Correct Auth Token'));
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(true);
    });
    it('set isAuthenticated flag to false if auth token is incorrect', async () => {
      await store.dispatch(authenticationsSliceActions.verifyToken('incorrectToken'));
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(false);
    });
  });

  describe('signIn', () => {
    const validCredentialsAction = { email: 'correct@email.com', password: 'password' };
    const invalidCredentialsAction = { email: 'incorrect@email.com', password: 'password' };
    const errorMessage = 'Unauthorized';

    it('set isAuthenticated flag to true and updates authToken if credentials are correct', async () => {
      await store.dispatch(authenticationsSliceActions.signIn(validCredentialsAction));
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(true);
      expect(store.getState().authenticationsReducer.authToken).not.toEqual(null);
      expect(store.getState().authenticationsReducer.isError).toEqual(false);
      expect(store.getState().authenticationsReducer.error).toEqual(null);
    });
    it('set isError flag to true and fills error if credentials are incorrect', async () => {
      await store.dispatch(authenticationsSliceActions.signIn(invalidCredentialsAction));
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(false);
      expect(store.getState().authenticationsReducer.authToken).toEqual(null);
      expect(store.getState().authenticationsReducer.isError).toEqual(true);
      expect(store.getState().authenticationsReducer.error).toEqual(errorMessage);
    });
  });

  describe('signUp', () => {
    const validCredentialsAction = { email: 'incorrect@email.com', password: 'password' };
    const invalidCredentialsAction = { email: 'correct@email.com', password: 'password' };
    const errorMessage = JSON.stringify({ email: ['has already been taken'] });

    it('set isAuthenticated flag to true and updates authToken if credentials are correct', async () => {
      await store.dispatch(authenticationsSliceActions.signUp(validCredentialsAction));
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(true);
      expect(store.getState().authenticationsReducer.authToken).not.toEqual(null);
      expect(store.getState().authenticationsReducer.isError).toEqual(false);
      expect(store.getState().authenticationsReducer.error).toEqual(null);
    });
    it('set isError flag to true and fills error if credentials are incorrect', async () => {
      await store.dispatch(authenticationsSliceActions.signUp(invalidCredentialsAction));
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(false);
      expect(store.getState().authenticationsReducer.authToken).toEqual(null);
      expect(store.getState().authenticationsReducer.isError).toEqual(true);
      expect(store.getState().authenticationsReducer.error).toEqual(errorMessage);
    });
  });

  describe('logOut', () => {
    const authToken = uuid();

    it('set isAuthenticated flag to false and nullifies authToken', async () => {
      await store.dispatch(authenticationsSliceActions.logOut(authToken));
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(false);
      expect(store.getState().authenticationsReducer.authToken).toEqual(null);
      expect(store.getState().authenticationsReducer.isError).toEqual(false);
      expect(store.getState().authenticationsReducer.error).toEqual(null);
    });
  });

  describe('fetchCookie', () => {
    const authToken = uuid();

    it('set isAuthenticated flag to true and properly set authToken if authToken present', () => {
      store.dispatch(authenticationsSliceActions.fetchCookie(authToken));
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(true);
      expect(store.getState().authenticationsReducer.authToken).toEqual(authToken);
    });

    it('set isAuthenticated flag to false if authToken absent', () => {
      store.dispatch(authenticationsSliceActions.fetchCookie(null));
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(false);
      expect(store.getState().authenticationsReducer.authToken).not.toEqual(authToken);
    });
  });

  describe('resetError', () => {
    const errorMessage = 'some error message';
    beforeEach(() => {
      store = createStore({ authenticationsReducer: { isError: true, error: errorMessage } });
    });
    it('set isAuthenticated flag to false and nullifies authToken', async () => {
      expect(store.getState().authenticationsReducer.isError).toEqual(true);
      expect(store.getState().authenticationsReducer.error).toEqual(errorMessage);

      store.dispatch(authenticationsSliceActions.resetError());

      expect(store.getState().authenticationsReducer.isError).toEqual(false);
      expect(store.getState().authenticationsReducer.error).toEqual(null);
    });
  });
});
