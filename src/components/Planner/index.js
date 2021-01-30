import React from 'react';

import AreasCard from '../AreasCard';
import Menu from '../Menu';
import DemoModeMessage from '../shared/DemoModeMessage';

function Planner() {
  return (
    <>
      <Menu />
      <AreasCard />
      <DemoModeMessage />
    </>
  );
}

export default Planner;
