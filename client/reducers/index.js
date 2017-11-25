import {combineReducers} from 'redux';
import counter from './counter';
import flashMessages from './flashMessages';
import signIn from './signIn';

export default combineReducers({
  flashMessages,
  signIn,
  counter,
});
