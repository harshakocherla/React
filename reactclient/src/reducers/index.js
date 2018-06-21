import { combineReducers } from 'redux';
import chitsReducer from './chitsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  chits: chitsReducer,
  users: usersReducer,
});
