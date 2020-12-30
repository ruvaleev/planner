import 'regenerator-runtime/runtime';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../shared/axiosInstance';

const initialState = {
  todos: [], isLoading: false, isError: false, error: null,
};

export const fetchTodos = createAsyncThunk(
  'todos/fetchAll',
  async () => {
    const response = await axiosInstance.get('/todos');

    return response.data.records;
  },
);

export const createTodo = createAsyncThunk(
  'todos/create',
  async (todo) => {
    const response = await axiosInstance.post('/todos', {
      records: [
        {
          fields: {
            title: todo.title,
            area_id: [
              todo.areaId,
            ],
          },
        },
      ],
    });

    return response.data.records;
  },
);

const todosSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    toggleReady(state, action) {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      todo.fields.completed = !todo.fields.completed;

      axiosInstance.patch('/todos', {
        records: [
          {
            id: todo.id,
            fields: {
              completed: todo.fields.completed,
            },
          },
        ],
      });
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [fetchTodos.fulfilled]: (state, action) => ({
      ...initialState,
      todos: action.payload,
    }),
    [fetchTodos.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      error: action.payload.error,
    }),
    [createTodo.pending]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [createTodo.fulfilled]: (state, action) => ({
      ...initialState,
      todos: state.todos.concat(action.payload),
    }),
    [createTodo.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      error: action.payload.error,
    }),
  },
});

export const { addTodo, toggleReady } = todosSlice.actions;
export default todosSlice.reducer;
