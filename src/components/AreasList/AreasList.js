import React from 'react';
import PropTypes from 'prop-types';

import Area from '../Area';
import withLoading from '../HOC/withLoading';

function AreasList({ areas }) {
  return (
    <div id="areas-card" className="flex h-screen items-center justify-start overflow-x-scroll font-helvetica">
      {areas.map((area) => (
        <Area key={area.id} area={area} />
      ))}
    </div>
  );
}

export default withLoading(AreasList);

AreasList.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.PropTypes.object,
  ).isRequired,
};
