import React from 'react';
import PropTypes from 'prop-types';

function AreaLink({ id, title, choosen }) {
  return (
    <button type="button" className={`px-8 ${choosen ? 'font-normal' : 'font-light'}`} data-link-id={id}>{title}</button>
  );
}

function Menu({ areas, choosenAreaId }) {
  return (
    <div
      id="menu-container"
      className="fixed flex items-center text-2xl font-helvetica title text-right menu-container"
    >
      <div className="flex items-end flex-col menu">
        {areas.map((area) => (
          <AreaLink
            key={area.id}
            id={area.id}
            title={area.fields.title}
            choosen={area.id === choosenAreaId}
          />
        ))}
      </div>
    </div>
  );
}

export default Menu;

Menu.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.PropTypes.object,
  ).isRequired,
  choosenAreaId: PropTypes.string,
};

Menu.defaultProps = {
  choosenAreaId: null,
};

AreaLink.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  choosen: PropTypes.bool.isRequired,
};
