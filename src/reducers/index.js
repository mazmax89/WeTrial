import {combineReducers} from 'redux';
import currentUser from './firebaseUser';
import flashMessages from './flashMessages';

export default combineReducers({
  currentUser,
  flashMessages,
});
