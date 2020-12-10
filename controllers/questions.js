const models = require('../models');

module.exports = {
  get: (req, res) => {
    models.questions.get(req.query)
      .then(({ rows }) => rows.length === 0 ? res.status(500).send('Error Getting Data') : res.status(200).send({'product_id': req.query['product_id'], 'results': rows }))
      .catch(() => res.status(500).send('Error Getting Data'));
  },

  post: (req, res) => {
    models.questions.post(req.query, Date.now() / 1000)
      .then(() => res.status(201).send('CREATED'))
      .catch(() => res.status(400).send('Error with post request'));
  },

  helpfulness: (req, res) => {
    models.questions.helpfulness(req.params)
      .then(() => res.status(204).send('NO CONTENT'))
      .catch(() => res.status(500).send());
  },

  report: (req, res) => {
    models.questions.report(req.params)
      .then(() => res.status(204).send('NO CONTENT'))
      .catch(() => res.status(500).send());
  }
};