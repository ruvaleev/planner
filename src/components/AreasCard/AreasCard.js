import React from 'react';
import PropTypes from 'prop-types';

import AreasList from './AreasList';
import Menu from '../Menu';
import withLoading from '../HOC/withLoading';

function AreasCard({ areas }) {
  return (
    <div className="flex flex col h-screen items-start justify-center bg-gray-200 text-gray-500 pt-30vh">
      <Menu />
      <AreasList areas={areas} />
    </div>
  );
}

AreasCard.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withLoading(AreasCard);
