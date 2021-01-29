import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import AreasCard from '../../../components/AreasCard';

Element.prototype.scroll = jest.fn();

jest.mock('../../../components/AreasList', () => () => (<>Areas List</>));

describe('AreasCard', () => {
  let component;

  it('renders areas list', () => {
    component = render(<AreasCard />);
    expect(component.queryByText('Areas List')).toBeInTheDocument();
  });

  it('wraps areas list to relative div', () => {
    const { container } = render(<AreasCard />);
    expect(container.querySelector('[class="areas-card relative"]')).toBeInTheDocument();
  });
});
