import React from 'react';
import PropTypes from 'prop-types';

import remove from '../../assets/icons/remove.svg';

const RemoveIcon = ({ callback }) => (
  <button type="button" onClick={callback} className="ml-auto">
    <img src={remove} alt="remove" className="w-4 h-4 cursor-pointer" />
  </button>
);

export default RemoveIcon;

RemoveIcon.propTypes = {
  callback: PropTypes.func.isRequired,
};
