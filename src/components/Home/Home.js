import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { plannerPath, signInPath, signUpPath } from 'helpers/routes';
import withLoading from '../HOC/withLoading';
import DemoModeMessage from '../shared/DemoModeMessage';
import ToggleLocaleButton from '../shared/ToggleLocaleButton';
import Button from '../shared/Button';

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
  isAuthenticated, logInDemo, logOut, verifyAuth,
}) {
  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <AuthenticationMenu isAuthenticated={isAuthenticated} logInDemo={logInDemo} logOut={logOut} />
      <ToggleLocaleButton />
      <DemoModeMessage />
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
  isAuthenticated: PropTypes.bool.isRequired,
  logInDemo: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  verifyAuth: PropTypes.func.isRequired,
};
