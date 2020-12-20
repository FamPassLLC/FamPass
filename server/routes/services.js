// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to create/modify service logins +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express');
const servicesController = require('../controllers/servicesController');

const router = express.Router();

// request to add login information to a service
router.post('/', servicesController.addServicesLogin, (req, res) => {
  console.log(res.locals.status);
  res.send('adding services info ');
});

// request to update password information for an existing login
router.put(
  '/update-service-password',
  servicesController.updateServicesLogin,
  (req, res) => {
    console.log(res.locals.status);
    res.send('updated service password');
  }
);

// TO ADD: (1) REQUEST TO GET LOGIN INFO; (2) REQUEST TO DELETE LOGIN INFO

module.exports = router;
