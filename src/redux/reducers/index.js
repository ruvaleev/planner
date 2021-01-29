import { combineReducers } from 'redux';

import areasReducer from '../slices/areas';
import authenticationsReducer from '../slices/authentications';

export default combineReducers(
  {
    areasReducer,
    authenticationsReducer,
  },
);
