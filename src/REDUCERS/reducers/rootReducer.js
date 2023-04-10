// rootReducer.js
import { combineReducers } from 'redux';
import userReducer from '../userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  // add other reducers here if needed
});

export default rootReducer;
