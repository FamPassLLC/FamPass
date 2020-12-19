const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
router.post('/', usersController.createUsers, (req, res) => {
  res.send('working ');
});

module.exports = router;
