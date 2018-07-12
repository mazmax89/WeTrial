import {combineReducers} from 'redux';
import currentUser from './firebaseUser';
import flashMessages from './flashMessages';
import topics from './topics';

export default combineReducers({
  currentUser,
  flashMessages,
  topics,
});
