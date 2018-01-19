import FireBaseTools from '../firebase/firebase';
import {
  LOGIN_WITH_PROVIDER_FIREBASE,
  LOGIN_FIREBASE_USER,
  CHANGE_FIREBASE_USER_PASSWORD,
  FIREBASE_PASSWORD_RESET_EMAIL,
  SET_CURRENT_USER
} from '../actions/types';
import {isEmpty} from 'lodash';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };

    case LOGIN_FIREBASE_USER:
      return loginUser(action.user);

    case CHANGE_FIREBASE_USER_PASSWORD:
      return changePassword(action.newPassword);

    case FIREBASE_PASSWORD_RESET_EMAIL:
      return resetPasswordEmail(action.email);

    case LOGIN_WITH_PROVIDER_FIREBASE:
      return loginWithProvider(action.provider);


    default:
      return state;

  }
}

function loginWithProvider(provider) {
  FireBaseTools.loginWithProvider(provider);
}

function loginUser(user) {
  FireBaseTools.loginUser(user);
}

function fetchUser() { // eslint-disable-line
  FireBaseTools.fetchUser();
}

function changePassword(newPassword) {
  FireBaseTools.changePassword(newPassword);
}

function resetPasswordEmail(email) {
  FireBaseTools.resetPasswordEmail(email);
}
