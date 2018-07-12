import { FETCH_TOPICS } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPICS:
      return action.payload;
    default:
      return state;
  }
};
