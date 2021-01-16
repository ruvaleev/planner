import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import TodosCard from '../../../components/TodosCard';
import { selectTodos } from '../../../components/shared/functions';
import Store from '../../shared/Store';
import * as todosSliceActions from '../../../redux/slices/todos';

function renderWithStore(store, areaId) {
  return render(
    <Provider store={store}>
      <TodosCard areaId={areaId} />
    </Provider>,
  );
}

describe('TodosCard', () => {
  const mockStore = configureStore([]);
  const store = mockStore(Store());
  const area = store.getState().areasReducer.areas.find((a) => a.choosen);
  const todos = selectTodos(store.getState().todosReducer.todos, area.id);
  let component;

  beforeEach(() => {
    store.dispatch = jest.fn();
    todosSliceActions.createTodo = jest.fn().mockImplementation((payload) => payload);
    component = renderWithStore(store, area.id);
  });

  it("renders titles of area's todos", () => {
    todos.forEach((todo) => expect(component.queryByText(todo.fields.title)).toBeInTheDocument());
  });

  it('dispatches createTodo action on todo form submit', () => {
    const title = 'New Todo Title';
    const todoInput = component.getByTestId('Add todo');

    userEvent.type(todoInput, title);
    expect(screen.getByTestId('Add todo')).toHaveValue(title);
    userEvent.type(todoInput, '{enter}');

    expect(todosSliceActions.createTodo).toHaveBeenCalledTimes(1);
    expect(todosSliceActions.createTodo).toHaveBeenCalledWith({ title, areaId: area.id });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ title, areaId: area.id });
  });
});
