const db = require('../models/dbModels');
const { Base64 } = require('js-base64');

const servicesController = {};

servicesController.addServicesLogin = (req, res, next) => {
  let { local_user, service, service_username, service_password } = req.body;
  //encode password to base64
  service_password = Base64.encode(service_password); //use atob() to decode
  //parameters to insert data
  const params = [local_user, service, service_username, service_password];
  //parameters to verify user and service
  const verifyParams = [local_user, service];

  db.query(
    `SELECT * FROM service_login WHERE (local_user = $1 AND service = $2);`,
    verifyParams
  )
    .then((data) => {
      if (data.rows.length) {
        res.locals.status = 'service exists';
        return next();
      } else {
        const queryString = `INSERT INTO service_login (local_user, service, service_username, service_password) VALUES ($1, $2, $3, $4)`;
        db.query(queryString, params)
          .then((data) => {
            res.locals.status = 'inserted';
            return next();
          })
          .catch((err) => {
            return next({ err });
          });
      }
    })
    .catch((err) => next({ err }));
};

//need to verify with frontend what type of data needs returning
servicesController.getServicesLogin = (req, res, next) => {
  const queryString = `SELECT * FROM service_login;`;
};

servicesController.updateServicesLogin = (req, res, next) => {
  let {
    local_user,
    service,
    service_password,
    new_service_password,
  } = req.body;
  const queryString = `UPDATE service_login
                        SET service_password = $1
                        WHERE (local_user =  $2 AND service = $3 AND service_password = $4)`;

  new_service_password = Base64.encode(new_service_password);
  service_password = Base64.encode(service_password);
  const params = [new_service_password, local_user, service, service_password];
  db.query(queryString, params)
    .then((data) => {
      res.locals.status = 'new password updated';
      return next();
    })
    .catch((err) => next({ err }));
};
module.exports = servicesController;
