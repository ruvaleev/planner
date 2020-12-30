import React from 'react';

function LoadingScreen({ isLoading, isError, error }) {
  const isShown = isLoading || isError;
  return (
    <div className={`${isShown && 'shownLoadingScreen'}`}>
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error}</div>}
    </div>
  );
}

export default LoadingScreen;
