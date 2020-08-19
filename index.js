require('dotenv').config();

const server = require('./api/server.js')

console.log(`DB_ENV = ${process.env.DB_ENV}`);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`\n** server listening on port ${port} **\n`));
