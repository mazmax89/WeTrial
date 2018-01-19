import {
  LOGIN_WITH_PROVIDER_FIREBASE,
  CHANGE_FIREBASE_USER_PASSWORD,
  FIREBASE_PASSWORD_RESET_EMAIL,
  SET_CURRENT_USER
} from './types';
import FireBaseTools from '../firebase/firebase';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function signInAction(user) {
  return dispatch => {
    return FireBaseTools.loginUser(user).then(user => {
      dispatch(setCurrentUser(user));
    });
  };
}

export function updateUser(updatingData) {
  return dispatch => {
    return FireBaseTools.updateUserProfile(updatingData).then(updatingData => {
      dispatch(setCurrentUser(updatingData));
    });
  };
}

export function signOutAction() {
  return dispatch => {
    return FireBaseTools.logoutUser().then(data => { // eslint-disable-line
      dispatch(setCurrentUser({}));
    });
  };
}

export function signUpAction(user) {
  return dispatch => { // eslint-disable-line
    return FireBaseTools.registerUser(user);
  };

}

//TODO do this normal
export function loginWithProvider(provider) {
  return {
    type: LOGIN_WITH_PROVIDER_FIREBASE,
    provider
  };
}


export function changePassword(newPassword) {
  return {
    type: CHANGE_FIREBASE_USER_PASSWORD,
    newPassword
  };
}

export function resetPasswordEmail(email) {
  return {
    type: FIREBASE_PASSWORD_RESET_EMAIL,
    email
  };
}

