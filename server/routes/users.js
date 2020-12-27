// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to create accounts on website +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

// request to create an account
router.post('/signup', usersController.createUsers, (req, res) => {
  if (res.locals.status === 'user exists') {
    res.status(409)
    return res.send('User exists')
  }
  res.status(200)
  return res.send('Created user')
});

// request to sign into an existing account
router.post('/signin', usersController.verifyUser, (req, res) => {
  if(res.locals.status === true) res.status(200);
  else if (res.locals.status === false) {
    res.status(401);
  }
  else {
    res.status(409)
  }
  return res.send('Hello there')
});

module.exports = router;
