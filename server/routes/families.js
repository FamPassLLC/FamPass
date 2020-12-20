// ++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to create/modify families +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express');
const familiesController = require('../controllers/familiesController');

const router = express.Router();

// request to retrieve families (for display on landing page)
router.get('/', familiesController.getFamilies, (req, res) => {
  res.send('getting families');
});

// request to create a family
router.post('/', familiesController.addFamilies, (req, res) => {
  res.send('adding families');
});

// TO ADD: REQUESTS TO (1) UPDATE A FAMILY, (2) DELETE A FAMILY

module.exports = router;
