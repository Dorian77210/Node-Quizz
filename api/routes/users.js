const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

// users/
router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.delete('/:email', UserController.delete_user);
router.patch('/:userID', UserController.update_user);

module.exports = router;