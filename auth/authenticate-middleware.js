const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./secrets.js');

module.exports = {
  restricted,
  generateToken,
  isValid
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
