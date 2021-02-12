import 'regenerator-runtime/runtime';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';

import axiosBackendInstance from '../shared/axiosBackendInstance';

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
    const response = await axiosBackendInstance.get('/areas')
      .then((res) => res)
      .catch((error) => Promise.reject(new Error(error.response.data.errors)));

    const choosenArea = response.data.areas[1] || response.data.areas[0];
    choosenArea && (choosenArea.choosen = true);

    return response.data.areas;
  },
);

export const createArea = createAsyncThunk(
  'areas/create',
  async (area) => {
    const response = await axiosBackendInstance.post('/areas', qs.stringify({
      area: {
        title: area.title,
      },
    }))
      .then((res) => res)
      .catch((error) => Promise.reject(
        new Error(
          JSON.stringify(error.response.data.errors),
        ),
      ));

    return response.data.area;
  },
);

export const removeArea = createAsyncThunk(
  'areas/remove',
  async (areaId) => {
    const response = await axiosBackendInstance.delete(`/areas/${areaId}`)
      .then(() => areaId)
      .catch((error) => Promise.reject(new Error(error.response.data.errors)));

    return response;
  },
);

export const createTodo = createAsyncThunk(
  'areas/createTodo',
  async (todo) => {
    const response = await axiosBackendInstance.post('/todos', qs.stringify({
      area_id: todo.areaId,
      todo: {
        title: todo.title,
      },
    }))
      .then((res) => res)
      .catch((error) => Promise.reject(
        new Error(
          JSON.stringify(error.response.data.errors),
        ),
      ));

    return { areaId: todo.areaId, todo: response.data.todo };
  },
);

export const removeTodo = createAsyncThunk(
  'areas/removeTodo',
  async (todo) => {
    const params = { area_id: todo.areaId };
    const response = await axiosBackendInstance.delete(`/todos/${todo.id}`, { params })
      .then(() => todo)
      .catch((error) => Promise.reject(new Error(error.response.data.errors)));

    return response;
  },
);

let area;

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    chooseArea(state, action) {
      const areaIndex = state.areas.findIndex((stateArea) => stateArea.id === action.payload);
      shiftBorderAreas(state, areaIndex);
      switchChoosen(state, action.payload);
    },
    resetError(state) {
      state.isError = false;
      state.error = null;
    },
    toggleReady(state, action) {
      area = state.areas.find((stateArea) => stateArea.id === action.payload.areaId);
      const todo = area.todos.find((stateTodo) => stateTodo.id === action.payload.todoId);
      todo.completed = !todo.completed;

      axiosBackendInstance.patch(`/todos/${todo.id}`, qs.stringify({
        area_id: area.id,
        todo: {
          completed: todo.completed,
        },
      }));
    },
  },
  extraReducers: {
    [fetchAreas.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [fetchAreas.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.areas = action.payload;
    },
    [fetchAreas.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      error: action.error.message,
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
      error: action.error.message,
    }),
    [removeArea.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [removeArea.fulfilled]: (state, action) => {
      state.isLoading = false;
      const deletedArea = state.areas.find((stateArea) => stateArea.id === action.payload);
      const index = state.areas.indexOf(deletedArea);
      state.areas = state.areas.filter(
        (stateArea) => (stateArea.id !== action.payload),
      );
      if (state.areas.length > 0) {
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
      error: action.error.message,
    }),
    [createTodo.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [createTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      area = state.areas.find((stateArea) => stateArea.id === action.payload.areaId);
      area.todos = area.todos.concat(action.payload.todo);
    },
    [createTodo.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      error: action.error.message,
    }),
    [removeTodo.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [removeTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      area = state.areas.find((stateArea) => stateArea.id === action.payload.areaId);
      area.todos = area.todos.filter((todo) => todo.id !== action.payload.id);
    },
    [removeTodo.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      error: action.error.message,
    }),
  },
});

export const { chooseArea, resetError, toggleReady } = areasSlice.actions;
export default areasSlice.reducer;
