import AreasReducerGenerator from './AreasReducerGenerator';
import TodosReducerGenerator from './TodosReducerGenerator';

function Store(props = {}) {
  return (
    {
      areasReducer: props.areasReducer || AreasReducerGenerator({}),
      todosReducer: props.todosReducer || TodosReducerGenerator({}),
    }
  );
}

export default Store;
