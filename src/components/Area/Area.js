import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import TodosCard from '../TodosCard';
import RemoveIcon from '../shared/RemoveIcon';

function scrollToEdge(element, scrollLeftEdge) {
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
      <div className="ml-4 w-full">{title}</div>
      <RemoveIcon callback={() => removeArea(id)} />
    </div>
  );
}

function isMobileVersion() {
  return window.screen.width <= 499;
}

function calculateScreenWidth() {
  return isMobileVersion()
    ? window.screen.width
    // assuming that width of side menu is 25%
    : window.screen.width * 0.75;
}

function scrollTo(parentElement, targetElement) {
  const screenWidth = calculateScreenWidth();
  const elementWidth = targetElement.offsetWidth;
  const elementSideWidth = (screenWidth - elementWidth) / 2;
  const elementScrollLeftEdge = targetElement.offsetLeft - elementSideWidth;

  return scrollToEdge(parentElement, elementScrollLeftEdge);
}

function Area({ area, chooseArea, removeArea }) {
  useEffect(() => {
    if (area.choosen) {
      const areasCard = document.getElementById('areas-list');
      const renderedArea = document.getElementById(area.id);

      scrollTo(areasCard, renderedArea);

      if (isMobileVersion()) {
        const linksList = document.getElementById('links-list');
        const link = document.querySelector(`[data-link-id='${area.id}']`);

        link && scrollTo(linksList, link);
      }
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
