const Users = require('./user/users-model');

module.exports = {
  logger: function (req, res, next) {
    console.log(`${req.method} Request, ${req.url}, ${Date()}`);
    next();
  },
}
