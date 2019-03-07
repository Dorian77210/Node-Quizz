const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

// users/
router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.get('/signin', UserController.signin_get);
router.get('/signup', UserController.signup_get);

router.delete('/:email', UserController.delete_user);
router.patch('/:userID', UserController.update_user);

module.exports = router;