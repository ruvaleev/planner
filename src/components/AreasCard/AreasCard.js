import React from 'react';

import AreasList from './AreasList';
import Menu from '../Menu';
import LoadingScreen from '../shared/LoadingScreen';

function AreasCard({
  isLoading, isError, error, areas,
}) {
  return (
    <>
      <LoadingScreen isLoading={isLoading} isError={isError} error={error} />
      <Menu />
      <AreasList areas={areas} />
    </>
  );
}

export default AreasCard;
