const models = require('../models');

module.exports = {
  get: (req, res) => {
    models.answers.get(req.params, req.query)
      .then(({ rows }) => {
        rows.length === 0
          ? res.status(500).send('Invalid Question ID')
          : res.status(200).send(
            { 
              'question': req.params['question_id'], 
              'page': req.query['page'] || 1, 
              'count': req.query['count'] || 5, 
              'results': rows 
            })
      })
      .catch(() => res.status(500).send('Problem with answers'));
  },

  post: (req, res) => {
    models.answers.post(req.params, req.query, Date.now() / 1000)
      .then(({ rows }) => models.photos.post(rows[0], req.query))
      .then(() => res.status(201).send('CREATED'))
      .catch(() => res.status(400).send('Problem with post'));
  },

  helpfulness: (req, res) => {
    models.answers.helpfulness(req.params)
      .then(() => res.status(204).send('NO CONTENT'))
      .catch(() => res.status(500).send());
  },

  report: (req, res) => {
    models.answers.report(req.params)
      .then(() => res.status(204).send('NO CONTENT'))
      .catch(() => res.status(500).send());
  }
};