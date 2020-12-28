// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to create/modify service logins +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express');
const servicesController = require('../controllers/servicesController');

const router = express.Router();

// request to retrieve services login info for all families
router.get(
  '/get-login-info',
  servicesController.getServicesLogin,
  (req, res) => {
    return res.status(200).send(res.locals.loginInfo);
  }
);

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

router.delete(
  '/delete-service-password/',
  servicesController.deleteServicesLogin,
  (req, res) => {
    console.log(res.locals.status);
    res.send('service password deleted');
  }
);

// TO ADD: (1) REQUEST TO GET LOGIN INFO
// router.post('/loginInfoExt', servicesController.getLoginExt, (req, res) => {
//   const userInfo = res.locals.userInfo;
//   console.log(userInfo)
//   return res.json(userInfo)
// })

module.exports = router;
