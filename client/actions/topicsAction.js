import axios from 'axios';

export function createTopicAction(topicData, authData) {
  return dispatch => { // eslint-disable-line
    return axios.post('/api/topic', {topicData, authData});
  }
}

export function getAllTopics () {
  return dispatch => { // eslint-disable-line
    return axios.get('/api/topic')
  }
}

export function getTopicById (identifier) {
  return dispatch => { // eslint-disable-line
    return axios.get(`/api/topic/${identifier}`);
  }
}

