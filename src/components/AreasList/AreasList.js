import React from 'react';
import PropTypes from 'prop-types';

import Area from '../Area';
import withLoading from '../HOC/withLoading';

function List({ areas }) {
  return (
    <>
      {areas.map((area) => (
        <Area key={area.id} area={area} />
      ))}
    </>
  );
}

function EmptyAreas() {
  return (
    <div className="empty-areas flex items-center w-full h-full justify-center text-2xl text-center text-gray-300 font-semibold">
      Создайте сферы жизни или цели, в которых вы будете создавать и выполнять задачи...
    </div>
  );
}

function AreasList({ areas }) {
  return (
    <div id="areas-list" className="flex items-start justify-start overflow-x-scroll font-helvetica">
      {areas.length > 0 ? <List areas={areas} /> : <EmptyAreas />}
    </div>
  );
}

export default withLoading(AreasList);

AreasList.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.PropTypes.object,
  ),
};

AreasList.defaultProps = {
  areas: [],
};

List.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.PropTypes.object,
  ).isRequired,
};
