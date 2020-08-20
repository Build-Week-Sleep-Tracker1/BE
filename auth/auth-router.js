const bcryptjs = require('bcryptjs');
const router = require('express').Router();
const { jwtSecret } = require('./secrets.js');

const Users = require('../user/users-model');
const { isValid, generateToken } = require('./authenticate-middleware');

router.post('/register', (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 12;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash

    Users.add(credentials)
    .then(user => {
      console.log(user)
      res.status(201).json({ data: user })
    })
    .catch (error => {
      res.status(500).json({ message: error.message })
    });
  } else {
    res.status(400).json({
      message: "Please provide username and password"
    });
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if(isValid(req.body)) {
    Users.findBy({ username: username })
    .then(([user]) => {
      if(user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: "Ready for tracking data",
          user_id: user.id,
          token
        });
      } else {
        res.status(400).json({
          message: "Please provide username and password"
        });
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
  }
});

module.exports = router;
