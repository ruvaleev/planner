import AreasReducerGenerator from './AreasReducerGenerator';
import AuthenticationsReducerGenerator from './AuthenticationsReducerGenerator';
import TodosReducerGenerator from './TodosReducerGenerator';

function Store(props = {}) {
  return (
    {
      areasReducer: props.areasReducer || AreasReducerGenerator({}),
      authenticationsReducer: props.authenticationsReducer || AuthenticationsReducerGenerator({}),
      todosReducer: props.todosReducer || TodosReducerGenerator({}),
    }
  );
}

export default Store;
