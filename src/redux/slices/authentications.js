import 'regenerator-runtime/runtime';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import qs from 'qs';

import axiosBackendInstance from '../shared/axiosBackendInstance';

/* eslint-disable no-unused-expressions, no-param-reassign */

const initialState = {
  authToken: null, isAuthenticated: false, isLoading: false, isError: false, error: null,
};

const cookies = new Cookies();

export const verifyToken = createAsyncThunk(
  'authentications/verifyToken',
  async (authToken) => {
    const response = await axiosBackendInstance.get('/auth', {
      params: { token: authToken },
    })
      .then((res) => {
        cookies.set('UserAuthToken', res.data.auth_token, { sameSite: true });
        return res;
      })
      .catch((error) => Promise.reject(new Error(error.response.data.errors)));

    return response.data;
  },
);

export const signIn = createAsyncThunk(
  'authentications/signIn',
  async (data) => {
    const response = await axiosBackendInstance.post(
      '/auth', qs.stringify({
        user: {
          email: data.email,
          password: data.password,
        },
      }),
    )
      .then((res) => {
        cookies.set('UserAuthToken', res.data.auth_token, { sameSite: true });
        return res;
      })
      .catch((error) => Promise.reject(new Error(error.response.data.errors)));

    return response.data;
  },
);

export const signUp = createAsyncThunk(
  'authentications/signUp',
  async (data) => {
    const response = await axiosBackendInstance.post(
      '/users', qs.stringify({
        user: {
          email: data.email,
          password: data.password,
        },
      }),
    )
      .then((res) => {
        cookies.set('UserAuthToken', res.data.auth_token, { sameSite: true });
        return res;
      })
      .catch((error) => Promise.reject(
        new Error(
          JSON.stringify(error.response.data.errors),
        ),
      ));

    return response.data;
  },
);

export const logOut = createAsyncThunk(
  'authentications/logOut',
  async (authToken) => {
    const response = await axiosBackendInstance.delete('/auth', {
      params: { token: authToken },
    })
      .then((res) => {
        cookies.remove('UserAuthToken');
        return res;
      })
      .catch((error) => Promise.reject(new Error(error.response.data.error)));

    return response.data;
  },
);

const authenticationsSlice = createSlice({
  name: 'authentications',
  initialState,
  reducers: {
    fetchCookie(state, action) {
      state.authToken = action.payload;
      state.isAuthenticated = !!(state.authToken);
    },
    resetError(state) {
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: {
    [verifyToken.pending]: (state) => {
      state.isLoading = true;
    },
    [verifyToken.fulfilled]: (state, action) => ({
      ...initialState,
      isAuthenticated: true,
      authToken: action.payload.auth_token,
    }),
    [verifyToken.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    },
    [signIn.pending]: (state) => {
      state.isLoading = true;
    },
    [signIn.fulfilled]: (state, action) => ({
      ...initialState,
      isAuthenticated: true,
      authToken: action.payload.auth_token,
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
    [signUp.fulfilled]: (state, action) => ({
      ...initialState,
      isAuthenticated: true,
      authToken: action.payload.auth_token,
    }),
    [signUp.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.isError = true;
      state.isLoading = false;
      state.error = action.error.message;
    },
    [logOut.pending]: (state) => {
      state.isLoading = true;
    },
    [logOut.fulfilled]: () => initialState,
    [logOut.rejected]: (state, action) => {
      state.isAuthenticated = true;
      state.isError = true;
      state.error = action.error.message;
    },
  },
});

export const { fetchCookie, resetError } = authenticationsSlice.actions;
export default authenticationsSlice.reducer;
