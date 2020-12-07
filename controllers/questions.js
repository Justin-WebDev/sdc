const models = require('../models');

module.exports = {
  get: (req, res) => {
    models.questions.get(req.query)
      .then(({ rows }) => res.send({'product_id': req.query['product_id'], 'results': rows }))
      .catch(err => console.log(err));
  },

  post: (req, res) => {
    models.questions.post(req.query, Date.now() / 1000)
      .then(() => res.status(201).send('CREATED'))
      .catch(err => console.log(err));
  },

  helpfulness: (req, res) => {
    models.questions.helpfulness(req.params)
      .then(() => res.status(204).send('NO CONTENT'))
      .catch(err => console.log(err));
  },

  report: (req, res) => {
    models.questions.report(req.params)
      .then(() => res.status(204).send('NO CONTENT'))
      .catch(err => console.log(err));
  }
};