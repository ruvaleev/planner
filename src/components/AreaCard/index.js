import React from 'react';

import TodosCard from '../TodosCard';

const Area = ({area}) => {
  return (
    <div key={area.id} className="mx-4 flex flex-col items-center relative">
      <div className="mb-4">{area.fields.title}</div>
      <TodosCard areaId={area.id} />
    </div>
  )
}

export default Area;
