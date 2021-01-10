import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { plannerPath, signInPath, signUpPath } from 'helpers/routes';
import withLoading from '../HOC/withLoading';

function AuthenticationMenu({ authToken, isAuthenticated, logOut }) {
  const history = useHistory();
  return (
    isAuthenticated
      ? <button type="button" onClick={() => logOut(authToken)} className="title cursor-pointer">Выйти</button>
      : (
        <>
          <button type="button" onClick={() => history.push(signInPath())} className="title cursor-pointer">Войти</button>
          <button type="button" onClick={() => history.push(signUpPath())} className="title cursor-pointer">Зарегистрироваться</button>
        </>
      )
  );
}

function Home({ authToken, isAuthenticated, logOut }) {
  const history = useHistory();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>Home Page</h1>
      <button type="button" onClick={() => history.push(plannerPath())} className="title cursor-pointer">Планировщик</button>
      <AuthenticationMenu authToken={authToken} isAuthenticated={isAuthenticated} logOut={logOut} />
    </div>
  );
}

export default withLoading(Home);

AuthenticationMenu.propTypes = {
  authToken: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

AuthenticationMenu.defaultProps = {
  authToken: null,
};

Home.propTypes = {
  authToken: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

Home.defaultProps = {
  authToken: null,
};
