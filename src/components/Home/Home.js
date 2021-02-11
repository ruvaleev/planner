import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { plannerPath, signInPath, signUpPath } from 'helpers/routes';
import Button from '../shared/Button';
import DemoModeMessage from '../shared/DemoModeMessage';
import Errors from '../shared/Errors';
import ToggleLocaleButton from '../shared/ToggleLocaleButton';
import withLoading from '../HOC/withLoading';

function AuthenticationMenu({ isAuthenticated, logInDemo, logOut }) {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    isAuthenticated
      ? (
        <>
          <Button callback={() => logOut()} title={t('log out')} />
          <Button callback={() => history.push(plannerPath())} title={t('planner')} />
        </>
      )
      : (
        <>
          <Button callback={() => history.push(signInPath())} title={t('sign in')} />
          <Button callback={() => history.push(signUpPath())} title={t('sign up')} />
          <Button callback={() => logInDemo()} title={t('demo mode')} />
        </>
      )
  );
}

function Home({
  error, isAuthenticated, isError, logInDemo, logOut, resetError, verifyAuth,
}) {
  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen home-menu">
      <AuthenticationMenu isAuthenticated={isAuthenticated} logInDemo={logInDemo} logOut={logOut} />
      <ToggleLocaleButton />
      <DemoModeMessage />
      <Errors isError={isError} error={error} callback={() => resetError()} />
    </div>
  );
}

export default withLoading(Home);

AuthenticationMenu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logInDemo: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

Home.propTypes = {
  error: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  logInDemo: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  verifyAuth: PropTypes.func.isRequired,
};

Home.defaultProps = {
  error: null,
};
