import { combineReducers } from 'redux';
import authReducer from './auth';
import reviewReducer from './review';
import messageReducer from './message';
import userReducer from './user';
import alertReducer from './alert';

export default combineReducers({
  auth: authReducer,
  review: reviewReducer,
  message: messageReducer,
  user: userReducer,
  alert: alertReducer,
});
