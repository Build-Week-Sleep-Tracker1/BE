const express = require('express');
const cors = require('cors');
const helmet = require('hemlet');
const morgan = require('morgan');

const authenticate = rquire('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../user/user-router.js');

const server = exppress();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, usersRouter)

server.get("/", (req, res) => {
  res.status(201).json({api: "Time to get some sleep"})
})

module.exports = server;
