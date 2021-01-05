import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import TodosCard from '../TodosCard';

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

function Area({ area, chooseArea }) {
  useEffect(() => {
    if (area.choosen) {
      const areasCard = document.getElementById('areas-list');
      const renderedArea = document.getElementById(area.id);
      // assuming that width of side menu is 25%
      const areaScreenWidth = window.screen.width * 0.75;
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
      <div className="mb-4 title area-title text-big font-light">{area.fields.title}</div>
      <TodosCard areaId={area.id} />
    </div>
  );
}

export default Area;

Area.propTypes = {
  area: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object, PropTypes.bool],
    ),
  ).isRequired,
  chooseArea: PropTypes.func.isRequired,
};
