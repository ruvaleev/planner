import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getByTestId } from '@testing-library/dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Area from '../../../components/Area';
import Store from '../../shared/Store';
import * as areasSliceActions from '../../../redux/slices/areas';

Element.prototype.scroll = jest.fn();

function renderWithStore(store, area) {
  return render(
    <Provider store={store}>
      <div id="areas-list">
        <Area area={area} />
      </div>
    </Provider>,
  );
}

describe('Area', () => {
  const mockStore = configureStore([]);
  const store = mockStore(Store());
  const area = store.getState().areasReducer.areas.find((a) => a.choosen);
  const { todos } = area;
  let component;

  it('renders area title', () => {
    component = renderWithStore(store, area);
    expect(component.queryByText(area.title)).toBeInTheDocument();
  });

  it("renders titles of area's todos", () => {
    component = renderWithStore(store, area);
    todos.forEach((todo) => expect(component.queryByText(todo.title)).toBeInTheDocument());
  });

  it('dispatches removeArea on remove icon click', () => {
    store.dispatch = jest.fn();
    areasSliceActions.removeArea = jest.fn().mockImplementation((payload) => payload);

    component = renderWithStore(store, area);

    const areaDiv = component.getByTestId('Area title');
    const removeIcon = getByTestId(areaDiv, 'Remove icon');
    userEvent.click(removeIcon);

    expect(areasSliceActions.removeArea).toHaveBeenCalledTimes(1);
    expect(areasSliceActions.removeArea).toHaveBeenCalledWith(area.id);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(area.id);
  });
});
