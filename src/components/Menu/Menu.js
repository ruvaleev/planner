import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { rootPath } from 'helpers/routes';
import home from '../../assets/icons/home.svg';

function HomeLink() {
  const history = useHistory();
  return (
    <button type="button" onClick={() => history.push(rootPath())} className="home-link cursor-pointer mx-2 mt-4">
      <img src={home} alt="home" className="w-8" />
    </button>
  );
}

function LinksList({ areas, chooseArea }) {
  return (
    <div className="flex items-end flex-col menu-links-list">
      {areas.map((area) => (
        <AreaLink
          key={area.id}
          area={area}
          chooseArea={chooseArea}
        />
      ))}
    </div>
  );
}

function AreaLink({ area, chooseArea }) {
  return (
    <button
      type="button"
      className={`px-8 mt-3 leading-none text-right ${area.choosen ? 'font-normal' : 'font-light'}`}
      data-link-id={area.id}
      onClick={() => chooseArea(area.id)}
    >
      {area.title}
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
      className="fixed flex items-center text-2xl font-helvetica title text-right menu-container z-10"
    >
      <HomeLink />
      <div className="flex items-end flex-col menu">
        <LinksList areas={areas} chooseArea={chooseArea} />
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

LinksList.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.PropTypes.object,
  ).isRequired,
  chooseArea: PropTypes.func.isRequired,
};
