import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Area from '../Area';
import Errors from '../shared/Errors';
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
  const { t } = useTranslation();
  return (
    <div className="empty-areas flex items-center w-full h-full justify-center text-2xl text-center text-gray-300 font-semibold">
      {t('no areas')}
    </div>
  );
}

function AreasList({
  areas, error, isError, resetError,
}) {
  return (
    <div id="areas-list" className="flex items-start justify-start overflow-x-scroll font-helvetica">
      {areas.length > 0 ? <List areas={areas} /> : <EmptyAreas />}
      <Errors isError={isError} error={error} callback={() => resetError()} />
    </div>
  );
}

export default withLoading(AreasList);

AreasList.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.PropTypes.object,
  ),
  error: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  resetError: PropTypes.func.isRequired,
};

AreasList.defaultProps = {
  areas: [],
  error: null,
};

List.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.PropTypes.object,
  ).isRequired,
};
