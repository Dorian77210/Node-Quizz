const express = require('express');
const router = express.Router();

const QuestionController = require('../controllers/questions');

router.get('/home', (req, res, next) => {
    res.render('index');
});

module.exports = router;