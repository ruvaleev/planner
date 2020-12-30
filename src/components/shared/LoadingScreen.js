import React from 'react';
import PropTypes from 'prop-types';

function LoadingScreen({ isLoading, isError, error }) {
  const isShown = isLoading || isError;
  return (
    <div className={`${isShown && 'shownLoadingScreen'}`}>
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error}</div>}
    </div>
  );
}

LoadingScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

LoadingScreen.defaultProps = {
  error: '',
};

export default LoadingScreen;
