const parser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');
const router = require('./routes');
const morgan = require('morgan');

const app = express();
module.exports.app = app;
const port = 3000;
const mainDir = __dirname.substring(0, __dirname.length - 6);
console.log(mainDir);

// middleware
app.use(parser.json());
app.use(morgan('dev'));
app.use('/qa', router);
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./client/dist'));
app.get('/loaderio-8f297cf85de19e5805e706b238aab2bd/', (req, res) => {
  res.status(200).send('loaderio-8f297cf85de19e5805e706b238aab2bd');
});

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(mainDir, 'client/dist', 'index.html'));
// });


app.listen(port, () => console.log(`listening on port ${port}!`));