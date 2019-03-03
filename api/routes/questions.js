const express = require('express');
const router = express.Router();

const QuestionController = require('../controllers/questions');

router.post('/', QuestionController.question_creation);
router.get('/', QuestionController.question_get_all);
router.get('/:quizzID', QuestionController.question_get_by_quizz);

module.exports = router;