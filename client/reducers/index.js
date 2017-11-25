import {combineReducers} from 'redux';
import counter from './counter';
import flashMessages from './flashMessages';

export default combineReducers({
  flashMessages,
  counter,
});
