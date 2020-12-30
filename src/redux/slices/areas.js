import 'regenerator-runtime/runtime';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../shared/axiosInstance';

const initialState = {
  areas: [], isLoading: false, isError: false, error: null,
};

export const fetchAreas = createAsyncThunk(
  'areas/fetchAll',
  async () => {
    const response = await axiosInstance.get('/areas');

    return response.data.records;
  },
);

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchAreas.pending]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [fetchAreas.fulfilled]: (state, action) => ({
      ...initialState,
      areas: action.payload,
    }),
    [fetchAreas.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      error: action.payload.error,
    }),
  },
});

export default areasSlice.reducer;
