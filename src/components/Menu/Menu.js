import React from 'react';
import PropTypes from 'prop-types';

function AreaLink({ area, chooseArea }) {
  return (
    <button
      type="button"
      className={`px-8 mt-3 leading-none text-right ${area.choosen ? 'font-normal' : 'font-light'}`}
      data-link-id={area.id}
      onClick={() => chooseArea(area.id)}
    >
      {area.fields.title}
    </button>
  );
}

function AreaForm({ onSubmit }) {
  return (
    <form
      className="flex items-center mt-4 area-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e.target.elements.areaTitle.value);
        e.target.elements.areaTitle.value = '';
      }}
    >
      <input type="text" name="areaTitle" placeholder="Создать цель или сферу жизни..." className="h-6 pr-2 w-full text-right text-base text-black italic" data-testid="Add area" />
    </form>
  );
}

function Menu({ areas, createArea, chooseArea }) {
  return (
    <div
      id="menu-container"
      className="fixed flex items-center text-2xl font-helvetica title text-right menu-container"
    >
      <div className="flex items-end flex-col menu">
        <div className="flex items-end flex-col menu-links-list">
          {areas.map((area) => (
            <AreaLink
              key={area.id}
              area={area}
              chooseArea={chooseArea}
            />
          ))}
        </div>
        <AreaForm onSubmit={(data) => { createArea({ title: data }); }} />
      </div>
    </div>
  );
}

export default Menu;

AreaLink.propTypes = {
  area: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.object, PropTypes.bool],
  ).isRequired,
  chooseArea: PropTypes.func.isRequired,
};

AreaForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

Menu.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.PropTypes.object,
  ),
  chooseArea: PropTypes.func.isRequired,
  createArea: PropTypes.func.isRequired,
};

Menu.defaultProps = {
  areas: [],
};
