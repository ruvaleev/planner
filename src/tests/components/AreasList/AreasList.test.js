import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import AreasList from '../../../components/AreasList';
import Store from '../../shared/Store';
import AreasReducerGenerator from '../../shared/AreasReducerGenerator';

Element.prototype.scroll = jest.fn();

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <AreasList />
    </Provider>,
  );
}

describe('AreasList', () => {
  const mockStore = configureStore([]);
  let store;
  let component;

  it('renders all areas', () => {
    store = mockStore(
      Store({ areasReducer: AreasReducerGenerator({}) }),
    );
    component = renderWithStore(store);
    const { areas } = store.getState().areasReducer;
    areas.forEach((area) => expect(
      component.queryByText(area.title),
    ).toBeInTheDocument());
  });

  it("doesn't render loading page", () => {
    store = mockStore(
      Store({ areasReducer: AreasReducerGenerator({}) }),
    );
    component = renderWithStore(store);
    expect(component.queryByAltText('loading...')).not.toBeInTheDocument();
  });

  describe('when component is loading', () => {
    it('renders loading page', () => {
      store = mockStore(
        Store({
          areasReducer: AreasReducerGenerator({
            isLoading: true,
          }),
        }),
      );
      component = renderWithStore(store);
      expect(component.queryByAltText('loading...')).toBeInTheDocument();
    });
  });
});
