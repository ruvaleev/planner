import React from 'react';
import PropTypes from 'prop-types';

function Button({ callback, title, classNames }) {
  return (
    <button type="button" onClick={callback} className={classNames}>{title}</button>
  );
}

export default Button;

Button.propTypes = {
  callback: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  classNames: PropTypes.string,
};

Button.defaultProps = {
  classNames: 'title cursor-pointer',
};
