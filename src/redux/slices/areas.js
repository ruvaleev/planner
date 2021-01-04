import 'regenerator-runtime/runtime';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../shared/axiosInstance';

const initialState = {
  areas: [], choosenAreaId: null, isLoading: false, isError: false, error: null,
};

export const fetchAreas = createAsyncThunk(
  'areas/fetchAll',
  async () => {
    const response = await axiosInstance.get('/areas');

    return response.data.records;
  },
);

/* eslint-disable no-param-reassign */
const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    chooseArea(state, action) {
      const areaIndex = state.areas.findIndex((area) => area.id === action.payload);
      if (areaIndex === 0) {
        state.areas.unshift(state.areas.splice(-1)[0]);
      } else if (areaIndex === (state.areas.length - 1)) {
        state.areas.splice(state.areas.length, 0, state.areas.shift());
      }

      state.choosenAreaId = action.payload;
    },
  },
  extraReducers: {
    [fetchAreas.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [fetchAreas.fulfilled]: (state, action) => ({
      ...initialState,
      areas: action.payload,
      choosenAreaId: action.payload[0].id,
    }),
    [fetchAreas.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      error: action.payload.error,
    }),
  },
});

export const { chooseArea } = areasSlice.actions;
export default areasSlice.reducer;
