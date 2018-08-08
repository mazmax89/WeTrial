import FireBaseTools from '../firebase/firebase';
import {FETCH_TOPICS} from '../actions/types';

export function createTopicAction(topicData, authData) {
  return dispatch => { // eslint-disable-line
    let topicId = FireBaseTools.getDatabaseReference('topics/' + topicData.topicCategory).push().key;
    return FireBaseTools.getDatabaseReference('topics/' + topicData.topicCategory + '/' + topicId).set({
      topicName: topicData.topicName,
      topicText: topicData.topicText,
      userId: authData.uid,
      topicId: topicId
    });
  }
}

export const getAllTopics = (status) => async dispatch => {
  if (!status) {
    FireBaseTools.getDatabaseReference('/topics/main').off();
  } else if (status){
    FireBaseTools.getDatabaseReference('/topics/main').on('value', snapshot => {
      let data = snapshot.val();
      let arrOfData = [];
      for (let index in data) {
        arrOfData.push(data[index])
      }
      dispatch({
        type: FETCH_TOPICS,
        payload: arrOfData
      });
    });
  }
};

export function getTopicById(identifier) {
  return dispatch => { // eslint-disable-line
    return FireBaseTools.getDatabaseReference('topics/main/' + identifier).once('value', (snapshot) => {
      //console.log(snapshot.key);
    });
  }
}

export function getTopicByUserId(identifier) {
  return dispatch => { // eslint-disable-line
    return FireBaseTools.getDatabaseReference('topics/').orderByChild('user').equalTo(authData.uid).on('child_added', (snapshot) => {
      console.log(snapshot.key);
    });
  }
}

