import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import withLoading from '../HOC/withLoading';
import AuthenticationForm from '../shared/AuthenticationForm';
import Errors from '../shared/Errors';
import LayoutWithControlPanel from '../shared/LayoutWithControlPanel';

function RegistrationForm({ onSubmit }) {
  const { t } = useTranslation();

  return (
    <LayoutWithControlPanel>
      <h1>{t('sign up')}</h1>
      <AuthenticationForm onSubmit={onSubmit} />
    </LayoutWithControlPanel>
  );
}

function SignUp({
  isAuthenticated, isError, error, resetError, signUp,
}) {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/planner');
    }
  }, [isAuthenticated]);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <RegistrationForm onSubmit={signUp} />
      <Errors isError={isError} error={error} callback={() => resetError()} />
    </div>
  );
}

export default withLoading(SignUp);

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

SignUp.propTypes = {
  error: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  resetError: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

SignUp.defaultProps = {
  error: null,
};
