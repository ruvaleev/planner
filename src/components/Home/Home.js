import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { plannerPath, signInPath, signUpPath } from 'helpers/routes';
import withLoading from '../HOC/withLoading';
import DemoModeMessage from '../shared/DemoModeMessage';

function AuthenticationMenu({ isAuthenticated, logInDemo, logOut }) {
  const history = useHistory();
  return (
    isAuthenticated
      ? (
        <>
          <button type="button" onClick={() => logOut()} className="title cursor-pointer">Выйти</button>
          <button type="button" onClick={() => history.push(plannerPath())} className="title cursor-pointer">Планировщик</button>
        </>
      )
      : (
        <>
          <button type="button" onClick={() => history.push(signInPath())} className="title cursor-pointer">Войти</button>
          <button type="button" onClick={() => history.push(signUpPath())} className="title cursor-pointer">Зарегистрироваться</button>
          <button type="button" onClick={() => logInDemo()} className="title cursor-pointer">Демо режим</button>
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
