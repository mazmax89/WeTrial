import axios from 'axios';
import setAuthorizationToken from '../../server/utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import {SET_CURRENT_USER} from './types';


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function signOutAction() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function signInAction(userData) { // eslint-disable-line
  return dispatch => {
    return axios.post('/api/signin', userData).then(res => {// eslint-disable-line
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}
