import {combineReducers} from 'redux';
import flashMessages from './flashMessages';
import signIn from './signIn';

export default combineReducers({
  flashMessages,
  signIn,
});
