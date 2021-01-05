import React from 'react';
import PropTypes from 'prop-types';
import loading from '../../assets/icons/loading.svg';

function LoadingScreen({ isLoading, isError, error }) {
  return (
    <div className="absolute inset-0 z-10 flex justify-center items-center">
      {isLoading && <img src={loading} alt="loading..." className="w-8 rotating" />}
      {isError && <div>{error}</div>}
    </div>
  );
}

/* eslint-disable react/jsx-props-no-spreading */
const withLoading = (EnhancedComponent) => {
  const renderWithLoading = ({ isLoading, isError, ...props }) => (
    <>
      {(isLoading || isError) && <LoadingScreen isLoading={isLoading} isError={isError} />}
      <div className={`block w-full ${(isLoading || isError) && 'blurred'}`}>
        <EnhancedComponent {...props} />
      </div>
    </>
  );

  renderWithLoading.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
  };

  return renderWithLoading;
};

withLoading.propTypes = {
  Component: PropTypes.element,
};

LoadingScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

LoadingScreen.defaultProps = {
  error: '',
};

export default withLoading;
