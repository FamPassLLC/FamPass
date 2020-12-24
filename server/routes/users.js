// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to create accounts on website +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

// request to create an account
router.post('/', usersController.createUsers, (req, res) => {
  res.send('created user ');
});

// request to sign into an existing account
router.post('/signin', usersController.verifyUser, (req, res) => {
  res.status(200)
  return res.send('Hello there')
});

module.exports = router;
