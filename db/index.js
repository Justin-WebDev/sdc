const { Pool, Client } = require('pg');

exports.pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'qa',
  password: '',
  port: 5432,
});

exports.pool.connect()
  .then(() => console.log('CONNECTED TO DB!'))
  .catch((err) => console.log(err));

// const client = new Client({
//   user: '',
//   host: 'localhost',
//   database: 'QA',
//   password: '',
//   port: 5432,
// });

// client.connect();

// module.exports = pool;