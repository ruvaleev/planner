import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import withLoading from '../HOC/withLoading';
import Errors from '../shared/Errors';

function AuthenticationForm({ onSubmit }) {
  return (
    <>
      <h1>Authentication Form:</h1>
      <form
        className="flex flex-col items-center mt-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
          });
          e.target.elements.email.value = '';
          e.target.elements.password.value = '';
        }}
      >

        <input type="text" name="email" placeholder="Email..." className="h-6 pl-8 mt-3 w-full italic bordered" />
        <input type="password" name="password" placeholder="Password..." className="h-6 pl-8 mt-3 w-full italic bordered" />
        <button type="submit" className="h-6 w-6 mt-3 w-full bordered">
          Submit
        </button>
      </form>
    </>
  );
}

function SignIn({
  isAuthenticated, isError, error, signIn, resetError,
}) {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/planner');
    }
  }, [isAuthenticated]);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Errors isError={isError} error={error} callback={() => resetError()} />
      <AuthenticationForm onSubmit={signIn} />
    </div>
  );
}

export default withLoading(SignIn);

AuthenticationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

SignIn.propTypes = {
  resetError: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  error: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

SignIn.defaultProps = {
  error: null,
};
