import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import AreasList from '../../components/AreasList';
import Store from '../shared/Store';

Element.prototype.scroll = jest.fn();

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <AreasList />
    </Provider>,
  );
}

const areas = [{
  id: 'area_1',
  fields: {
    title: 'Обеспеченность',
    todos: [],
  },
  choosen: true,
},
{
  id: 'area_2',
  fields: {
    title: 'Карьера',
    todos: [],
  },
  choosen: false,
}];

const areasReducer = {
  areas,
  isLoading: false,
  isError: false,
  error: null,
};

const areasReducerWithLoading = {
  areas,
  isLoading: true,
  isError: false,
  error: null,
};

describe('AreasList', () => {
  const mockStore = configureStore([]);
  let store;
  let component;

  it('renders all areas', () => {
    store = mockStore(Store({ areasReducer }));
    component = renderWithStore(store);
    areas.forEach((area) => expect(component.queryByText(area.fields.title)).toBeInTheDocument());
  });

  it("doesn't render loading page", () => {
    store = mockStore(Store({ areasReducer }));
    component = renderWithStore(store);
    expect(component.queryByAltText('loading...')).not.toBeInTheDocument();
  });

  describe('when component is loading', () => {
    it('renders loading page', () => {
      store = mockStore(Store({ areasReducer: areasReducerWithLoading }));
      component = renderWithStore(store);
      expect(component.queryByAltText('loading...')).toBeInTheDocument();
    });
  });
});
