const controller = require('./controllers');
const router = require('express').Router();

router.get('/questions', controller.questions.get);

router.get('/questions/:question_id/answers', controller.answers.get);

router.post('/questions', controller.questions.post);

router.post('/questions/:question_id/answers', controller.answers.post);

router.put('/questions/:question_id/helpful', controller.questions.helpfulness);

router.put('/questions/:question_id/report', controller.questions.report);

router.put('/answers/:answer_id/helpful', controller.answers.helpfulness);

router.put('/answers/:answer_id/report', controller.answers.report);

module.exports = router;