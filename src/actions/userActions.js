import {
  FETCH_TOPICS,
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
      if (user.additionalUserInfo.isNewUser) {
        FireBaseTools.getDatabaseReference('users/' + user.user.uid).set({
          displayName: (user.user.displayName ? user.user.displayName : ''),
          photoURL: (user.user.photoURL ? user.user.photoURL : ''),
          email: user.user.email,
          emailVerified: user.user.emailVerified,
          phoneNumber: (user.user.phoneNumber ? user.user.phoneNumber : ''),
          isAnonymous: user.user.isAnonymous,
          providerData: user.user.providerData,
          lastLoginAt: user.user.metadata.lastSignInTime,
          createdAt: user.user.metadata.creationTime,
        });

      }
      dispatch(setCurrentUser(user.user));
    });
  };
}

export function signUpAction(user) {
  return dispatch => { // eslint-disable-line
    return FireBaseTools.registerUser(user);
  };
}

export function pushUserToDatabase(user) {
  return dispatch => {
    FireBaseTools.getDatabaseReference('users/' + user.uid).set({
      displayName: (user.displayName ? user.displayName : ''),
      photoURL: (user.photoURL ? user.photoURL : ''),
      email: user.email,
      emailVerified: user.emailVerified,
      phoneNumber: (user.phoneNumber ? user.phoneNumber : ''),
      isAnonymous: user.isAnonymous,
      providerData: user.providerData,
      lastLoginAt: user.metadata.lastSignInTime,
      createdAt: user.metadata.creationTime,
    });
  }
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

export function resetPasswordEmail(email) {
  return dispatch => {// eslint-disable-line
    return FireBaseTools.resetPasswordEmail(email);
  }
}

export function changePassword(newPassword) {
  return dispatch => { // eslint-disable-line
    return FireBaseTools.changePassword(newPassword);
  }
}

/*      FireBaseTools.getDatabaseReference('users/').equalTo(user.user.uid).on('child_added', (snapshot) => {
        console.log(snapshot.key);
      });*/
