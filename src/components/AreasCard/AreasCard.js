import React from 'react';
import PropTypes from 'prop-types';

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

AreasCard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  error: PropTypes.string,
  areas: PropTypes.arrayOf(PropTypes.object).isRequired,
};

AreasCard.defaultProps = {
  error: '',
};

export default AreasCard;
