const titles = ['Обеспеченность', 'Карьера', 'Призвание', 'Семья', 'Здоровье'];

function generateArea({ title, index }) {
  return {
    id: `area_${index}`,
    title,
    todos: [
      {
        id: 'todo_1',
        title: 'Заработать миллион',
        completed: true,
      },
    ],
    created_at: new Date(),
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
  title: 'Обеспеченность',
  todos: [
    {
      id: 'todo_1',
      title: 'Aspernatur totam excepturi dicta estplaceat tempore.',
      completed: false,
      created_at: new Date(),
    },
  ],
  created_at: new Date(),
},
{
  id: 'area_2',
  title: 'Карьера',
  todos: [],
  created_at: new Date(),
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
