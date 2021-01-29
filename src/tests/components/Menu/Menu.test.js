import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Menu from '../../../components/Menu';
import Store from '../../shared/Store';
import * as areasSliceActions from '../../../redux/slices/areas';
import AreasReducerGenerator from '../../shared/AreasReducerGenerator';

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <Menu />
    </Provider>,
  );
}

describe('Menu', () => {
  const mockStore = configureStore([]);
  let store;
  let component;
  let areas;
  const regularLinkClass = 'button[class="px-8 mt-3 leading-none text-right font-light"]';
  const choosedLinkClass = 'button[class="px-8 mt-3 leading-none text-right font-normal"]';

  beforeEach(() => {
    store = mockStore(Store({ areasReducer: AreasReducerGenerator({ areasCount: 3 }) }));
    store.dispatch = jest.fn();
    component = renderWithStore(store);
    areas = store.getState().areasReducer.areas;
  });

  it('renders all areas titles', () => {
    areas.forEach((area) => expect(component.queryByText(area.title)).toBeInTheDocument());
  });
  it('lights up which area is choosen', () => {
    const { container } = renderWithStore(store);
    const choosenArea = areas.find((area) => area.choosen);
    const choosenLink = container.querySelector(`button[data-link-id="${choosenArea.id}"`);

    expect(choosenLink.classList.contains('font-normal')).toBe(true);
    expect(choosenLink.classList.contains('font-light')).toBe(false);
    expect(container.querySelectorAll(regularLinkClass).length).toBe(2);
    expect(container.querySelectorAll(choosedLinkClass).length).toBe(1);
  });
  it('dispatches chooseArea action on area link click', () => {
    const nonChoosenArea = areas.find((area) => !area.choosen);
    areasSliceActions.chooseArea = jest.fn().mockImplementation((payload) => payload);

    const { container } = renderWithStore(store);
    const nonChoosenLink = container.querySelector(`button[data-link-id="${nonChoosenArea.id}"`);
    userEvent.click(nonChoosenLink);

    expect(areasSliceActions.chooseArea).toHaveBeenCalledTimes(1);
    expect(areasSliceActions.chooseArea).toHaveBeenCalledWith(nonChoosenArea.id);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(nonChoosenArea.id);
  });
  it('dispatches createArea action on area form submit', () => {
    areasSliceActions.createArea = jest.fn().mockImplementation((payload) => payload);

    const title = 'New Area Title';
    const areaInput = component.getByTestId('Add area');

    userEvent.type(areaInput, title);
    expect(screen.getByTestId('Add area')).toHaveValue(title);
    userEvent.type(areaInput, '{enter}');

    expect(areasSliceActions.createArea).toHaveBeenCalledTimes(1);
    expect(areasSliceActions.createArea).toHaveBeenCalledWith({ title });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ title });
  });
});
