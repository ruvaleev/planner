const titles = ['Обеспеченность', 'Карьера', 'Призвание', 'Семья', 'Здоровье'];

function generateArea({ title, index }) {
  return {
    id: `area_${index}`,
    fields: {
      title,
      todos: [],
    },
  };
}

function generateAreas(count) {
  const result = [];
  for (let i = 0; i < count; i += 1) {
    result.push(
      generateArea({ title: titles[i], index: i }),
    );
  }
  return result;
}

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
  areasCount = 2, areas = null, isLoading = false, isError = false, error = null,
}) {
  const totalAreas = areas || composeAreasForStore(generateAreas(areasCount));
  return {
    areas: totalAreas, isLoading, isError, error,
  };
}

export default AreasReducerGenerator;
