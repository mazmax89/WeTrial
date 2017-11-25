import * as express from 'express';
import commonValidations from '../utils/validation/SignUp';
import * as bcrypt from 'bcrypt';
import  {User} from '../models/User';
import {isEmpty} from 'lodash';
import * as Promise from 'bluebird';

let router = express.Router();

function validateInput(data, otherValidations) {
  let errors = otherValidations(data);

  return Promise.all([
    User.where({username: data.username}).fetch().then((user) => {
      if (user) {
        errors.username = 'This username already exists';
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

router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({errors, isValid}) => {
    if (isValid) {
      let username = req.body.username;
      let password_digest = req.body.firstPassword;
      password_digest = bcrypt.hashSync(password_digest, 10);
      User.forge({
        username, password_digest,
      }, {hasTimestamps: true}).save()
        .then((user) => res.json({success: true}))
        .catch((err) => res.status(500).json({error: err}));
    } else {
      res.status(400).json(errors);
    }
  });
});

export default router;
