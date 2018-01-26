import FireBaseTools from '../firebase/firebase';
import {
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
        isAuthenticated: !isEmpty(action.user.uid),
        user: action.user
      };

    default:
      return state;

  }
}

function fetchUser() {  //eslint-disable-line
  FireBaseTools.fetchUser();
}

