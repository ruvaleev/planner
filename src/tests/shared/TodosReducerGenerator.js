export const defaultTodos = [{
  id: 'todo_1',
  fields: {
    title: 'Заработать миллион',
    completed: true,
    area_id: ['area_1'],
  },
},
{
  id: 'todo_2',
  fields: {
    title: 'Заработать два миллиона',
    completed: false,
    area_id: ['area_1'],
  },
},
{
  id: 'todo_3',
  fields: {
    title: 'Заработать три миллиона',
    completed: false,
    area_id: ['area_1'],
  },
}];

function TodosReducerGenerator({
  todos = defaultTodos, isLoading = false, isError = false, error = null,
}) {
  return {
    todos, isLoading, isError, error,
  };
}

export default TodosReducerGenerator;
