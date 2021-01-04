import React from 'react';
import PropTypes from 'prop-types';

import TodosCard from '../TodosCard';

function scrollTo(element, scrollLeftEdge) {
  element.scroll({ left: scrollLeftEdge, behavior: 'smooth' });
}

function makeAreaChoosen(renderedArea, areasCard, areaScreenWidth, chooseArea, e) {
  if (!renderedArea.classList.contains('choosen-area')) {
    e.preventDefault();
    e.stopPropagation();
    chooseArea(renderedArea.id);

    const areaWidth = renderedArea.offsetWidth;
    const sideWidth = (areaScreenWidth - areaWidth) / 2;
    const scrollLeftEdge = renderedArea.offsetLeft - sideWidth;

    scrollTo(areasCard, scrollLeftEdge);
  }
}

class Area extends React.Component {
  componentDidMount() {
    const { area, chooseArea } = this.props;
    const links = document.querySelectorAll(`[data-link-id=${area.id}]`);
    const areasCard = document.getElementById('areas-card');
    const renderedArea = document.getElementById(area.id);
    // assuming that width of side menu is 25%
    const areaScreenWidth = window.screen.width * 0.75;

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        makeAreaChoosen(renderedArea, areasCard, areaScreenWidth, chooseArea, e);
      });
    });
    renderedArea.addEventListener('click', (e) => {
      makeAreaChoosen(renderedArea, areasCard, areaScreenWidth, chooseArea, e);
    });
  }

  render() {
    const { area, choosenAreaId } = this.props;
    return (
      <div key={area.id} id={area.id} className={`mx-16 min-w-20em flex flex-col items-center relative area ${choosenAreaId === area.id && 'choosen-area'}`}>
        <div className="mb-4 title text-big font-light">{area.fields.title}</div>
        <TodosCard areaId={area.id} />
      </div>
    );
  }
}

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
