import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import NotFound from '../../components/NotFound';
import { rootPath } from '../../helpers/routes';

const history = createMemoryHistory();

describe('NotFound', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Router history={history}>
        <NotFound />
      </Router>,
    );
  });

  it('shows error message', () => {
    expect(component.queryByText('Страница не найдена')).toBeInTheDocument();
  });

  it('correctly renders link to root path', () => {
    const rootPathLink = component.getByText('Вернуться на главную');
    userEvent.click(rootPathLink);
    expect(history.location.pathname).toBe(rootPath());
  });
});
