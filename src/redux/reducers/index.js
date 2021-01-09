import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import areasReducer from '../slices/areas';
import authenticationsReducer from '../slices/authentications';
import todosReducer from '../slices/todos';

export default combineReducers(
  {
    areasReducer,
    authenticationsReducer,
    todosReducer: undoable(todosReducer),
  },
);
