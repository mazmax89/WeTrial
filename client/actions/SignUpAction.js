import axios from 'axios';

export function userSignUpRequest(userData) {
  return () => (axios.post('/api/users', userData));
}
