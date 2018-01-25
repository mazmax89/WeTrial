import {
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

export function signInWithProviderAction(provider) {
  return dispatch => {
    return FireBaseTools.loginWithProvider(provider).then(user => {
      dispatch(setCurrentUser(user.user));
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

export function resetPasswordEmail(email) {
  return dispatch => {// eslint-disable-line
    return FireBaseTools.resetPasswordEmail(email);
  }
}

export function changePassword(newPassword) {
  return dispatch => { // eslint-disable-line
    return   FireBaseTools.changePassword(newPassword);
  }
}



