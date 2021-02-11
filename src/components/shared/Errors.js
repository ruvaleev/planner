import React from 'react';
import PropTypes from 'prop-types';

import { castErrorMessage } from './functions';

function Errors({ isError, error, callback }) {
  return (
    isError
      && (
      <button type="button" className="fixed p-4 z-20 bordered modal" onClick={callback}>
        {castErrorMessage(error)}
      </button>
      )
  );
}

export default Errors;

Errors.propTypes = {
  isError: PropTypes.bool.isRequired,
  error: PropTypes.string,
  callback: PropTypes.func.isRequired,
};

Errors.defaultProps = {
  error: null,
};
