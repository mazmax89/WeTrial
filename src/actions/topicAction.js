import FireBaseTools from '../firebase/firebase';

export function createTopicAction(topicData, authData) {
  return dispatch => { // eslint-disable-line
    let topicId = FireBaseTools.getDatabaseReference('topics/' +topicData.topicCategory).push().key;
    return FireBaseTools.getDatabaseReference('topics/'+ topicData.topicCategory+ '/' + topicId).set({
      topicName: topicData.topicName,
      topicText: topicData.topicText,
      user: authData.uid
    });
  }
}

export function getAllTopics() {
  return dispatch => { // eslint-disable-line
    return FireBaseTools.getDatabaseReference('/topics/main').once('value');
  }
}

export function getTopicById(identifier) {
  return dispatch => { // eslint-disable-line
    return FireBaseTools.getDatabaseReference('topics/').orderByChild('user').equalTo(authData.uid).on('child_added', (snapshot) => {
      console.log(snapshot.key);
    });
  }
}

