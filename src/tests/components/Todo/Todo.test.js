import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Todo from '../../../components/Todo';
import Store from '../../shared/Store';
import * as todosSliceActions from '../../../redux/slices/todos';

Element.prototype.scroll = jest.fn();

function renderWithStore(store, todo) {
  return render(
    <Provider store={store}>
      <Todo todo={todo} />
    </Provider>,
  );
}

describe('Todo', () => {
  const mockStore = configureStore([]);
  const store = mockStore(Store());
  const todo = store.getState().todosReducer.todos[0];
  let component;

  beforeEach(() => {
    store.dispatch = jest.fn();
    todosSliceActions.toggleReady = jest.fn().mockImplementation((payload) => payload);
    todosSliceActions.removeTodo = jest.fn().mockImplementation((payload) => payload);
    component = renderWithStore(store, todo);
  });

  it('renders todo title', () => {
    expect(component.queryByText(todo.fields.title)).toBeInTheDocument();
  });

  it('dispatches toggleReady on checkbox click', () => {
    const checkbox = component.getByLabelText(todo.fields.title);
    userEvent.click(checkbox);

    expect(todosSliceActions.toggleReady).toHaveBeenCalledTimes(1);
    expect(todosSliceActions.toggleReady).toHaveBeenCalledWith(todo.id);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(todo.id);
  });

  it('dispatches toggleReady on Enter tap on todo title', () => {
    const todoLabel = component.getByText(todo.fields.title);
    const enterTap = { button: 13 };

    fireEvent.click(todoLabel, enterTap);

    expect(todosSliceActions.toggleReady).toHaveBeenCalledTimes(1);
    expect(todosSliceActions.toggleReady).toHaveBeenCalledWith(todo.id);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(todo.id);
  });

  it('dispatches toggleReady on Space tap on todo title', () => {
    const todoLabel = component.getByText(todo.fields.title);
    const spaceTap = { button: 32 };

    fireEvent.click(todoLabel, spaceTap);

    expect(todosSliceActions.toggleReady).toHaveBeenCalledTimes(1);
    expect(todosSliceActions.toggleReady).toHaveBeenCalledWith(todo.id);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(todo.id);
  });

  it('dispatches removeTodo on remove icon click', () => {
    const removeIcon = component.getByTestId('Remove icon');
    userEvent.click(removeIcon);

    expect(todosSliceActions.removeTodo).toHaveBeenCalledTimes(1);
    expect(todosSliceActions.removeTodo).toHaveBeenCalledWith(todo.id);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(todo.id);
  });
});
