const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { logger } = require('../middleware.js')
const morgan = require('morgan');

const { restricted } = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../user/users-router.js');

const server = express();


server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(logger, morgan('dev'));

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter)

server.get("/", (req, res) => {
  res.status(201).json({api: "Time to get some sleep"})
})

module.exports = server;
