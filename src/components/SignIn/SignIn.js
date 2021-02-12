import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import withLoading from '../HOC/withLoading';
import AuthenticationForm from '../shared/AuthenticationForm';
import Errors from '../shared/Errors';
import LayoutWithControlPanel from '../shared/LayoutWithControlPanel';

function SignInForm({ onSubmit }) {
  const { t } = useTranslation();

  return (
    <LayoutWithControlPanel>
      <h1>{t('sign in')}</h1>
      <AuthenticationForm onSubmit={onSubmit} />
    </LayoutWithControlPanel>
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
      <SignInForm onSubmit={signIn} />
    </div>
  );
}

export default withLoading(SignIn);

SignInForm.propTypes = {
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
