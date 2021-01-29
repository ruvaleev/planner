import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import TodosCard from '../../../components/TodosCard';
import Store from '../../shared/Store';
import * as areasSliceActions from '../../../redux/slices/areas';

function renderWithStore(store, areaId, todos) {
  return render(
    <Provider store={store}>
      <TodosCard areaId={areaId} todos={todos} />
    </Provider>,
  );
}

describe('TodosCard', () => {
  const mockStore = configureStore([]);
  const store = mockStore(Store());
  const area = store.getState().areasReducer.areas.find((a) => a.choosen);
  const { todos } = area;
  let component;

  beforeEach(() => {
    store.dispatch = jest.fn();
    areasSliceActions.createTodo = jest.fn().mockImplementation((payload) => payload);
    component = renderWithStore(store, area.id, todos);
  });

  it("renders titles of area's todos", () => {
    todos.forEach((todo) => expect(component.queryByText(todo.title)).toBeInTheDocument());
  });

  it('dispatches createTodo action on todo form submit', () => {
    const title = 'New Todo Title';
    const todoInput = component.getByTestId('Add todo');

    userEvent.type(todoInput, title);
    expect(screen.getByTestId('Add todo')).toHaveValue(title);
    userEvent.type(todoInput, '{enter}');

    expect(areasSliceActions.createTodo).toHaveBeenCalledTimes(1);
    expect(areasSliceActions.createTodo).toHaveBeenCalledWith({ title, areaId: area.id });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ title, areaId: area.id });
  });
});
