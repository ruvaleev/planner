import React from 'react';
import PropTypes from 'prop-types';
import loading from '../../assets/icons/loading.svg';

function LoadingScreen({ isLoading }) {
  return (
    <div className="absolute inset-0 z-10 flex justify-center items-center">
      {isLoading && <img src={loading} alt="loading..." className="w-8 rotating" />}
    </div>
  );
}

/* eslint-disable react/jsx-props-no-spreading */
const withLoading = (EnhancedComponent) => {
  function renderWithLoading({ isLoading, ...props }) {
    return (
      <>
        {isLoading && <LoadingScreen isLoading={isLoading} />}
        <div className={`block w-full ${isLoading && 'blurred'}`}>
          <EnhancedComponent {...props} />
        </div>
      </>
    );
  }

  renderWithLoading.propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };

  return renderWithLoading;
};

export default withLoading;

withLoading.propTypes = {
  Component: PropTypes.element,
};

LoadingScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
