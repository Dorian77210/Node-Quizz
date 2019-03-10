const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const QuestionController = require('../controllers/questions');

router.post('/', QuestionController.question_creation);
router.get('/', checkAuth, QuestionController.question_get_all);
router.get('/:quizzID', QuestionController.question_get_by_quizz);

module.exports = router;