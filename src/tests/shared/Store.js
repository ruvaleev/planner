import AreasReducerGenerator from './AreasReducerGenerator';
import AuthenticationsReducerGenerator from './AuthenticationsReducerGenerator';

function Store(props = {}) {
  return (
    {
      areasReducer: props.areasReducer || AreasReducerGenerator({}),
      authenticationsReducer: props.authenticationsReducer || AuthenticationsReducerGenerator({}),
    }
  );
}

export default Store;
