const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const QuizzController = require('../controllers/quizz');

router.get('/', QuizzController.quizz_get_all);
router.get('/:quizzID', checkAuth, QuizzController.quizz_get_one);

router.post('/', checkAuth, QuizzController.quizz_creation);

router.patch('/:quizzID', QuizzController.quizz_update);

router.delete('/:quizzID', QuizzController.quizz_delete);

module.exports = router;