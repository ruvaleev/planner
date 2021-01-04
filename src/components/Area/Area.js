import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import TodosCard from '../TodosCard';

const Area = ({ area, choosenAreaId, chooseArea }) => {
  useEffect(() => {
    const links = document.querySelectorAll(`[data-link-id=${area.id}]`);
    links.forEach((link) => {
      link.addEventListener('click', () => {
        chooseArea(area.id);
        const renderedArea = document.getElementById(area.id);
        const areaWidth = renderedArea.offsetWidth;
        // assuming that width of side menu is 25%
        const areaScreenWidth = window.screen.width * 0.75;
        const sideWidth = (areaScreenWidth - areaWidth) / 2;
        const areasCard = document.getElementById('areas-card');
        const scrollLeftEdge = renderedArea.offsetLeft - sideWidth;

        areasCard.scroll({ left: scrollLeftEdge, behavior: 'smooth' });
      });
    });
  });

  return (
    <div key={area.id} id={area.id} className={`mx-16 min-w-20em flex flex-col items-center relative area ${choosenAreaId === area.id && 'choosen-area'}`}>
      <div className="mb-4 title text-big font-light">{area.fields.title}</div>
      <TodosCard areaId={area.id} />
    </div>
  );
};

Area.propTypes = {
  area: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object],
    ),
  ).isRequired,
  choosenAreaId: PropTypes.string.isRequired,
  chooseArea: PropTypes.func.isRequired,
};

export default Area;
