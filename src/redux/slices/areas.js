import 'regenerator-runtime/runtime';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../shared/axiosInstance';

/* eslint-disable no-unused-expressions, no-param-reassign */

const initialState = {
  areas: [], isLoading: false, isError: false, error: null,
};

function switchChoosen(state, newChoosenId) {
  const prevChoosenArea = state.areas.find((area) => area.choosen === true);
  const newChoosenArea = state.areas.find((area) => area.id === newChoosenId);
  prevChoosenArea && (prevChoosenArea.choosen = false);
  newChoosenArea.choosen = true;
}

function shiftBorderAreas(state, choosenAreaIndex) {
  if (choosenAreaIndex === 0) {
    state.areas.unshift(state.areas.splice(-1)[0]);
  } else if (choosenAreaIndex === (state.areas.length - 1)) {
    state.areas.splice(state.areas.length, 0, state.areas.shift());
  }
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

export const removeArea = createAsyncThunk(
  'areas/remove',
  async (areaId) => {
    const response = await axiosInstance.delete(`/areas?records[]=${areaId}`);

    return response.data.records[0];
  },
);

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    chooseArea(state, action) {
      const areaIndex = state.areas.findIndex((area) => area.id === action.payload);
      shiftBorderAreas(state, areaIndex);
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
    [removeArea.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [removeArea.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload.deleted === true) {
        const deletedArea = state.areas.find((area) => area.id === action.payload.id);
        const index = state.areas.indexOf(deletedArea);
        state.areas = state.areas.filter(
          (area) => (area.id !== action.payload.id) && (action.payload.deleted === true),
        );
        const newChoosenAreaIndex = index === state.areas.length ? (index - 1) : index;
        const newChoosenArea = state.areas[newChoosenAreaIndex];

        shiftBorderAreas(state, newChoosenAreaIndex);
        newChoosenArea && switchChoosen(state, newChoosenArea.id);
      }
    },
    [removeArea.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      error: action.payload.error,
    }),
  },
});

export const { chooseArea } = areasSlice.actions;
export default areasSlice.reducer;
