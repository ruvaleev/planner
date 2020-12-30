import React from 'react';

import Area from '../AreaCard';

function AreasList({ areas }) {
  return (
    areas.map((area, i) => (
      <Area key={area.id} area={area} />
    ))
  );
}

export default AreasList;
