import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import areasReducer from '../slices/areas';
import todosReducer from '../slices/todos';
import tableOfContentsReducer from '../slices/tableOfContents';

export default combineReducers(
  {
    todosReducer: undoable(todosReducer),
    areasReducer,
    tableOfContentsReducer,
  },
);
