import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Todo from '../../../components/Todo';
import Store from '../../shared/Store';
import * as areasSliceActions from '../../../redux/slices/areas';

Element.prototype.scroll = jest.fn();

function renderWithStore(store, areaId, todo) {
  return render(
    <Provider store={store}>
      <Todo areaId={areaId} todo={todo} />
    </Provider>,
  );
}

describe('Todo', () => {
  const mockStore = configureStore([]);
  const store = mockStore(Store());
  const area = store.getState().areasReducer.areas[0];
  const todo = area.todos[0];
  const toggleReadyPayload = { areaId: area.id, todoId: todo.id };
  const removeTodoPayload = { areaId: area.id, id: todo.id };
  let component;

  beforeEach(() => {
    store.dispatch = jest.fn();
    areasSliceActions.toggleReady = jest.fn().mockImplementation((payload) => payload);
    areasSliceActions.removeTodo = jest.fn().mockImplementation((payload) => payload);
    component = renderWithStore(store, area.id, todo);
  });

  it('renders todo title', () => {
    expect(component.queryByText(todo.title)).toBeInTheDocument();
  });

  it('dispatches toggleReady on checkbox click', () => {
    const checkbox = component.getByLabelText(todo.title);
    userEvent.click(checkbox);

    expect(areasSliceActions.toggleReady).toHaveBeenCalledTimes(1);
    expect(areasSliceActions.toggleReady).toHaveBeenCalledWith(toggleReadyPayload);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(toggleReadyPayload);
  });

  it('dispatches toggleReady on Enter tap on todo title', () => {
    const todoLabel = component.getByText(todo.title);
    const enterTap = { button: 13 };

    fireEvent.click(todoLabel, enterTap);

    expect(areasSliceActions.toggleReady).toHaveBeenCalledTimes(1);
    expect(areasSliceActions.toggleReady).toHaveBeenCalledWith(toggleReadyPayload);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(toggleReadyPayload);
  });

  it('dispatches toggleReady on Space tap on todo title', () => {
    const todoLabel = component.getByText(todo.title);
    const spaceTap = { button: 32 };

    fireEvent.click(todoLabel, spaceTap);

    expect(areasSliceActions.toggleReady).toHaveBeenCalledTimes(1);
    expect(areasSliceActions.toggleReady).toHaveBeenCalledWith(toggleReadyPayload);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(toggleReadyPayload);
  });

  it('dispatches removeTodo on remove icon click', () => {
    const removeIcon = component.getByTestId('Remove icon');
    userEvent.click(removeIcon);

    expect(areasSliceActions.removeTodo).toHaveBeenCalledTimes(1);
    expect(areasSliceActions.removeTodo).toHaveBeenCalledWith(removeTodoPayload);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(removeTodoPayload);
  });
});
