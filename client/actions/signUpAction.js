import axios from 'axios';

export function userSignUpRequest(userData) {
  return dispatch => { // eslint-disable-line
    return axios.post('/api/users', userData);
  }
}

export function isUserExists(identifier) { // eslint-disable-line
  return dispatch => { // eslint-disable-line
    return axios.get('/api/users/${identifier}');
  }
}
