import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import TodosCard from '../TodosCard';
import RemoveIcon from '../shared/RemoveIcon';

function scrollTo(element, scrollLeftEdge) {
  element.scroll({ left: scrollLeftEdge, behavior: 'smooth' });
}

function makeAreaChoosen(renderedArea, chooseArea, e) {
  if (!renderedArea.classList.contains('choosen-area')) {
    e.preventDefault();
    e.stopPropagation();
    chooseArea(renderedArea.id);
  }
}

function Title({ id, title, removeArea }) {
  return (
    <div
      data-testid="Area title"
      className="area-title flex font-light items-center leading-none mb-4 text-big text-center title w-full"
    >
      <div className="w-full">{title}</div>
      <RemoveIcon callback={() => removeArea(id)} />
    </div>
  );
}

function isMobileVersion() {
  return window.screen.width <= 499;
}

function calculateAreaScreenWidth() {
  return isMobileVersion()
    ? window.screen.width
    // assuming that width of side menu is 25%
    : window.screen.width * 0.75;
}

function Area({ area, chooseArea, removeArea }) {
  useEffect(() => {
    if (area.choosen) {
      const areasCard = document.getElementById('areas-list');
      const renderedArea = document.getElementById(area.id);
      const areaScreenWidth = calculateAreaScreenWidth();
      const areaWidth = renderedArea.offsetWidth;
      const sideWidth = (areaScreenWidth - areaWidth) / 2;
      const scrollLeftEdge = renderedArea.offsetLeft - sideWidth;

      scrollTo(areasCard, scrollLeftEdge);
    }
  }, [area.choosen]);

  useEffect(() => {
    const renderedArea = document.getElementById(area.id);
    renderedArea.addEventListener('click', (e) => { makeAreaChoosen(renderedArea, chooseArea, e); });
    renderedArea.addEventListener('keyup', (e) => { makeAreaChoosen(renderedArea, chooseArea, e); });
  }, []);

  return (
    <div key={area.id} id={area.id} className={`mx-16 min-w-20em flex flex-col items-center relative area ${area.choosen && 'choosen-area'}`}>
      <Title id={area.id} title={area.title} removeArea={removeArea} />
      <TodosCard areaId={area.id} todos={area.todos} />
    </div>
  );
}

export default Area;

Area.propTypes = {
  area: PropTypes.objectOf(
    PropTypes.oneOfType(
      [
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool,
        PropTypes.instanceOf(Date),
        PropTypes.arrayOf(PropTypes.object),
      ],
    ),
  ).isRequired,
  chooseArea: PropTypes.func.isRequired,
  removeArea: PropTypes.func.isRequired,
};

Title.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  removeArea: PropTypes.func.isRequired,
};
