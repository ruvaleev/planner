import { combineReducers } from 'redux';

import areasReducer from '../slices/areas';
import authenticationsReducer from '../slices/authentications';
import todosReducer from '../slices/todos';

export default combineReducers(
  {
    areasReducer,
    authenticationsReducer,
    todosReducer,
  },
);
