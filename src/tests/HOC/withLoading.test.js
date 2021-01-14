import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import withLoading from '../../components/HOC/withLoading';

/* eslint no-unused-vars: 0
          react/prop-types: 0 */
function EnhancedComponent({ isLoading }) {
  return <div>Enhanced Component</div>;
}
const WrappedComponent = withLoading(EnhancedComponent);

describe('withLoading', () => {
  let component;

  describe('when component is loading', () => {
    it('renders loading icon', () => {
      component = render(<WrappedComponent isLoading />);
      expect(component.queryByAltText('loading...')).toBeInTheDocument();
    });
    it('wraps enhanced component to blurred div', () => {
      const { container } = render(<WrappedComponent isLoading />);
      expect(container.querySelector('[class="block w-full blurred"]')).toBeInTheDocument();
    });
    it('renders areas list', () => {
      component = render(<WrappedComponent isLoading />);
      expect(component.queryByText('Enhanced Component')).toBeInTheDocument();
    });
  });
  describe('when component is not loading', () => {
    it("doesn't render loading icon", () => {
      component = render(<WrappedComponent isLoading={false} />);
      expect(component.queryByAltText('loading...')).not.toBeInTheDocument();
    });
    it('removes blurred class from div', () => {
      const { container } = render(<WrappedComponent isLoading={false} />);
      expect(container.querySelector('[class="block w-full blurred"]')).not.toBeInTheDocument();
    });
    it('renders areas list', () => {
      component = render(<WrappedComponent isLoading={false} />);
      expect(component.queryByText('Enhanced Component')).toBeInTheDocument();
    });
  });
});
