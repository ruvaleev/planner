import React from 'react';
import PropTypes from 'prop-types';

import TodosCard from '../TodosCard';

const Area = ({ area }) => (
  <div key={area.id} className="mx-4 flex flex-col items-center relative">
    <div className="mb-4">{area.fields.title}</div>
    <TodosCard areaId={area.id} />
  </div>
);

Area.propTypes = {
  area: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object],
    ),
  ).isRequired,
};

export default Area;
