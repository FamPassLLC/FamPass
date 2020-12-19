const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
router.post('/', usersController.createUsers, (req, res) => {
  res.send('created user ');
});

router.post('/signin', usersController.verifyUser, (req, res) => {
  console.log('in router', res.locals.status);
  res.send('verifying user');
});
module.exports = router;
