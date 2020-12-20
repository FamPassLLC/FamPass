const express = require('express');
const router = express.Router();
const familiesController = require('../controllers/familiesController');

router.get('/', familiesController.getFamilies, (req, res) => {
  res.send('getting families');
});
router.post('/', familiesController.addFamilies, (req, res) => {
  res.send('adding families');
});
module.exports = router;
