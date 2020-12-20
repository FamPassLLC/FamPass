const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');
router.post('/', servicesController.addServicesLogin, (req, res) => {
  console.log(res.locals.status);
  res.send('adding services info ');
});

router.put(
  '/update-service-password',
  servicesController.updateServicesLogin,
  (req, res) => {
    console.log(res.locals.status);
    res.send('updated service password');
  }
);
module.exports = router;
