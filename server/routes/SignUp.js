import * as express from 'express';
import  {User} from '../models/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../jwtConfig';
let router = express.Router();

router.post('/', (req, res) => {
  const {identifier, password} = req.body;

  User.query({
    where: {username: identifier},
  }).fetch().then((user) => {
    if (user) {
      if (bcrypt.compareSync(password, user.get('password_digest'))) {
        const token = jwt.sign({
          id: user.get('id'),
          username: user.get('username'),
        }, config.jwtSecret);
        res.json({token});
      } else {
        res.status(401).json({errors: {form: 'Incorrect username or password'}});
      }
    } else {
      res.status(401).json({errors: {form: 'Incorrect username or password'}});
    }
  });
});

export default router;
