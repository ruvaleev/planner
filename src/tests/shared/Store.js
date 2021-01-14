const defaultAreasReducer = {
  areas: [{
    id: 'area_1',
    fields: {
      title: 'Обеспеченность',
      completed_todos_count: 1,
      todos_count: 2,
      todos: [
        'todo_1', 'todo_2', 'todo_3',
      ],
    },
    choosen: true,
  }],
  isLoading: false,
  isError: false,
  error: null,
};

const defaultTodosReducer = {
  present: {
    todos: [{
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
    }],
    isLoading: false,
    isError: false,
    error: null,
  },
};

function Store(props = {}) {
  return (
    {
      areasReducer: props.areasReducer || defaultAreasReducer,
      todosReducer: props.todosReducer || defaultTodosReducer,
    }
  );
}

export default Store;
