const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./secrets.js');
const Users = require('../user/users-model.js');

module.exports = {
  restricted,
  generateToken,
  isValid,
  validateUserId,
  validateSleepEntry
}

function restricted (req,res,next) {
  try {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({message: "Not authorized"});
        } else {
          req.decodedToken = decodedToken;
          console.log(req.decodedToken);
          next();
        }
      })
    } else {
      throw new Error('invalid auth data');
    }
  } catch (err) {
    res.status(401).json({error: err.message});
  }
}

function isValid(user) {
  return Boolean(user.username && user.password && typeof user.password === 'string');
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, jwtSecret, options);
}

function validateUserId(req, res, next) {
  Users.findById(req.params.id)
  .then(user => {
    if(user) {
      req.user = user;
      next()
    } else {
      res.status(404).json({
        message: 'This user does not exist'
      })
    }
  })
  .catch (err => {
    console.log(err)
    res.status(500).json({ message: 'API Error', error: err.message})
  });
}

function validateSleepEntry(req, res, next) {
  Users.findSleepEntryById(req.params.id, req.params.sleepid)
  .then(sleepentry => {
    if(sleepentry) {
      req.sleepentry = sleepentry;
      next()
    } else {
      res.status(404).json({
        message: 'No entry exists with this ID for this User'
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: 'API Error', error: err.message})
  })
}
