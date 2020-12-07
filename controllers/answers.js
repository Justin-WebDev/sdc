const models = require('../models');

module.exports = {
  get: (req, res) => {
    models.answers.get(req.params, req.query)
      .then(({ rows }) => res.send(
        { 
          'question': req.params['question_id'], 
          'page': req.query['page'] || 1, 
          'count': req.query['count'] || 5, 
          'results': rows 
        }
      ))
      .catch(err => console.log(err));
  },

  post: (req, res) => {
    models.answers.post(req.params, req.query, Date.now() / 1000)
      .then(({ rows }) => models.photos.post(rows[0], req.query))
      .then(() => res.status(201).send('CREATED'))
      .catch(err => console.log(err));
  },

  helpfulness: (req, res) => {
    models.answers.helpfulness(req.params)
      .then(() => res.status(204).send('NO CONTENT'))
      .catch(err => console.log(err));
  },

  report: (req, res) => {
    models.answers.report(req.params)
      .then(() => res.status(204).send('NO CONTENT'))
      .catch(err => console.log(err));
  }
};