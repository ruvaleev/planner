import 'regenerator-runtime/runtime';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';

import Cookies from 'universal-cookie';
import axiosBackendInstance from '../shared/axiosBackendInstance';

const cookies = new Cookies();
/* eslint-disable no-unused-expressions, no-param-reassign */

const initialState = {
  isAuthenticated: false, isDemo: false, isLoading: false, isError: false, error: null,
};

export const verifyAuth = createAsyncThunk(
  'authentications/verifyAuth',
  async () => {
    await axiosBackendInstance.get('/auth')
      .then((res) => res.data)
      .catch((error) => Promise.reject(new Error(error.response.data.errors)));
  },
);

export const signIn = createAsyncThunk(
  'authentications/signIn',
  async (data) => {
    await axiosBackendInstance.post(
      '/auth', qs.stringify({
        user: {
          email: data.email,
          password: data.password,
        },
      }),
    )
      .then((res) => res)
      .catch((error) => Promise.reject(new Error(error.response.data.errors)));
  },
);

export const signUp = createAsyncThunk(
  'authentications/signUp',
  async (data) => {
    await axiosBackendInstance.post(
      '/users', qs.stringify({
        user: {
          email: data.email,
          password: data.password,
        },
      }),
    )
      .then((res) => res)
      .catch((error) => Promise.reject(
        new Error(
          JSON.stringify(error.response.data.errors),
        ),
      ));
  },
);

export const logInDemo = createAsyncThunk(
  'authentications/logInDemo',
  async () => {
    await axiosBackendInstance.post('/auth/demo')
      .then((res) => {
        cookies.set('DemoMode?', true);
        res;
      })
      .catch((error) => Promise.reject(new Error(error.response.data.errors)));
  },
);

export const logOut = createAsyncThunk(
  'authentications/logOut',
  async () => {
    await axiosBackendInstance.delete('/auth')
      .then((res) => {
        cookies.remove('DemoMode?');
        res;
      })
      .catch((error) => Promise.reject(new Error(error.response.data.error)));
  },
);

const authenticationsSlice = createSlice({
  name: 'authentications',
  initialState,
  reducers: {
    enableDemoMode(state) {
      state.isDemo = true;
    },
    resetError(state) {
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: {
    [verifyAuth.pending]: (state) => {
      state.isLoading = true;
    },
    [verifyAuth.fulfilled]: (state) => {
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    [verifyAuth.rejected]: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    [signIn.pending]: (state) => {
      state.isLoading = true;
    },
    [signIn.fulfilled]: () => ({
      ...initialState,
      isAuthenticated: true,
    }),
    [signIn.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.isError = true;
      state.isLoading = false;
      state.error = action.error.message;
    },
    [signUp.pending]: (state) => {
      state.isLoading = true;
    },
    [signUp.fulfilled]: () => ({
      ...initialState,
      isAuthenticated: true,
    }),
    [signUp.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.isError = true;
      state.isLoading = false;
      state.error = action.error.message;
    },
    [logInDemo.pending]: (state) => {
      state.isLoading = true;
    },
    [logInDemo.fulfilled]: (state) => {
      state.isAuthenticated = true;
      state.isDemo = true;
      state.isLoading = false;
    },
    [logInDemo.rejected]: (state, action) => {
      state.isError = true;
      state.error = action.error.message;
      state.isLoading = false;
    },
    [logOut.pending]: (state) => {
      state.isLoading = true;
    },
    [logOut.fulfilled]: () => ({
      ...initialState,
      isDemo: false,
    }),
    [logOut.rejected]: (state, action) => {
      state.isAuthenticated = true;
      state.isError = true;
      state.error = action.error.message;
    },
  },
});

export const { enableDemoMode, resetError } = authenticationsSlice.actions;
export default authenticationsSlice.reducer;
