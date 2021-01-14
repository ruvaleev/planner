export const defaultAreas = [{
  id: 'area_1',
  fields: {
    title: 'Обеспеченность',
    todos: ['todo_1', 'todo_2', 'todo_3'],
  },
},
{
  id: 'area_2',
  fields: {
    title: 'Карьера',
    todos: [],
  },
}];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function composeAreasForStore(areas) {
  const area = areas[getRandomInt(areas.length)];
  area.choosen = true;
  return areas;
}

function AreasReducerGenerator({
  areas = composeAreasForStore(defaultAreas), isLoading = false, isError = false, error = null,
}) {
  return {
    areas, isLoading, isError, error,
  };
}

export default AreasReducerGenerator;
