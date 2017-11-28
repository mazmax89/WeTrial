import axios from 'axios';

export function createTopicAction(topicData, authData) {
  return dispatch => { // eslint-disable-line
    return axios.post('/api/topic', topicData, authData);
  }
}

