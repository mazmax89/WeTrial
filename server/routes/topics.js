import * as express from 'express';
import commonValidations from '../utils/validation/createTopic';
import  {Topic} from '../models/topic';
import {isEmpty} from 'lodash';
import * as Promise from 'bluebird';

let router = express.Router();

function validateInput(data, otherValidations) {
  let errors = otherValidations(data);

  return Promise.all([
    Topic.where({topic_name: data.topicName}).fetch().then((topic) => {
      if (topic) {
        errors.topicName = 'This topic already exists';
      } else {
        errors = null;
      }
    }),
  ]).then(() => {
    return {
      errors,
      isValid: isEmpty(errors),
    };
  });
}

router.get('/', (req, res) => {
  Topic.fetchAll().then((topic) => res.json({topic}))
    .catch((error) => res.status(500).json({error}));
});

router.post('/', (req, res) => {
  validateInput(req.body.topicData, commonValidations).then(({errors, isValid}) => {
    if (isValid) {
        let topic_name = req.body.topicData.topicName;
      let topic_text = req.body.topicData.topicText;
      let user_id = req.body.authData.user.id;
      Topic.forge({
        topic_name, topic_text,user_id,
      }, {hasTimestamps: true}).save()
        .then((user) => res.json({success: true}))
        .catch((err) => res.status(500).json({error: err}));
    } else {
      res.status(400).json(errors);
    }
  });
});

export default router;