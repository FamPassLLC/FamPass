// ++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to create/modify families +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express');
const familiesController = require('../controllers/familiesController');

const router = express.Router();

// request to retrieve families (for display on landing page)
// router.get('/', familiesController.getFamilies, (req, res) => {
//   res.send('getting families');
// });

// request to create a family
router.post('/addfamily', familiesController.addFamily, (req, res) => {
  res.send('adding families');
});

// request to delete a family
router.delete('/deletefamily', familiesController.deleteFamily, (req, res) => {
  res.send('family deleted');
});

// TO ADD: REQUESTS TO DELETE A FAMILY

module.exports = router;
