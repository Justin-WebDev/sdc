const { Pool } = require('pg');
const connectionInfo = require('../config/postgres');

exports.pool = new Pool(connectionInfo);

// exports.pool.connect()
//   .then(() => console.log('CONNECTED TO DB!'))
//   .catch((err) => console.log(err));

// const client = new Client({
//   user: '',
//   host: 'localhost',
//   database: 'QA',
//   password: '',
//   port: 5432,
// });

// client.connect();

// module.exports = pool;