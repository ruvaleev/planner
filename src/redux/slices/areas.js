import 'regenerator-runtime/runtime';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../shared/axiosInstance';

const initialState = {
  areas: [], isLoading: false, isError: false, error: null,
};

function switchChoosen(state, newChoosenId) {
  const prevChoosenArea = state.areas.find((area) => area.choosen === true);
  const newChoosenArea = state.areas.find((area) => area.id === newChoosenId);
  prevChoosenArea.choosen = false;
  newChoosenArea.choosen = true;
}

export const fetchAreas = createAsyncThunk(
  'areas/fetchAll',
  async () => {
    const response = await axiosInstance.get('/areas');

    const choosenArea = response.data.records[1] || response.data.records[0];
    choosenArea.choosen = true;

    return response.data.records;
  },
);

export const createArea = createAsyncThunk(
  'areas/create',
  async (area) => {
    const response = await axiosInstance.post('/areas', {
      records: [
        {
          fields: {
            title: area.title,
          },
        },
      ],
    });

    return response.data.records[0];
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
      switchChoosen(state, action.payload);
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
    [createArea.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [createArea.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.areas.splice(-1, 0, action.payload);
      switchChoosen(state, action.payload.id);
    },
    [createArea.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      error: action.payload.error,
    }),
  },
});

export const { chooseArea } = areasSlice.actions;
export default areasSlice.reducer;
