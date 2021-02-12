import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { rootPath } from 'helpers/routes';
import AreasCard from '../AreasCard';
import Menu from '../Menu';
import DemoModeMessage from '../shared/DemoModeMessage';

function Planner({ isAuthenticated }) {
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push(rootPath());
    }
  }, [!isAuthenticated]);

  return (
    <>
      <Menu />
      <AreasCard />
      <DemoModeMessage />
    </>
  );
}

export default Planner;

Planner.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
