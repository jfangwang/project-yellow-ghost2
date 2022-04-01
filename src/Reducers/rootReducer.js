import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import {globalReducer} from './globalReducer';

export default combineReducers({
  user: userReducer,
  global: globalReducer,
});
