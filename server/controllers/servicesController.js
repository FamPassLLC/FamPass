const db = require('../models/dbModels');
const { Base64 } = require('js-base64');
const servicesController = {};
// adds login information to service login info database

servicesController.addServicesLogin = (req, res, next) => {
  // take content of req.body and assign to variables to pass to DB query
  let { local_user, service, service_username, service_password } = req.body;
  // determine service being added and get corresponding login link and logo
  let login_link;
  let service_logo;
  if (service === 'Netflix') {
    login_link = 'https://www.netflix.com/login';
    service_logo =
      'https://i.pinimg.com/originals/f6/97/4e/f6974e017d3f6196c4cbe284ee3eaf4e.png';
  }
  // encode password to base64
  service_password = Base64.encode(service_password); // use atob() to decode in chrome extension
  // values to pass into database query
  const params = [
    local_user,
    service,
    service_username,
    service_password,
    login_link,
    service_logo,
  ];
  // values for first query - to determine whether login info already exists
  const verifyParams = [local_user, service];

  // first query: whether login information is already in DB
  db.query(
    `SELECT * FROM service_login WHERE (local_user = $1 AND service = $2);`,
    verifyParams
  )
    .then((data) => {
      if (data.rows.length) {
        // if something is returned, then the entry already exists
        res.locals.status = 'service exists';
        return next();
      } else {
        // second query: add login infor to DB

        const queryString = `INSERT INTO service_login (local_user, service, service_username, service_password, login_link, service_logo) 
          VALUES ($1, $2, $3, $4, $5, $6)`;
        db.query(queryString, params)
          .then((data) => {
            res.locals.status = 'inserted';
            return next();
          })
          .catch((err) => next({ err }));
      }
    })
    .catch((err) => next({ err }));
};

// will return table with family names and available services
// gets arr of objs w/ format: family_name, local_user, service, login_link, service_logo
// on frontend, filter by family_name
servicesController.getServicesLogin = (req, res, next) => {
  const queryString = `SELECT f.family_name, sl.local_user, sl.service, sl.login_link, sl.service_logo
  FROM family_logins fl
  JOIN families f ON f._id = fl.family_id
  JOIN service_login sl ON sl._id = fl.service_login_id`;
  db.query(queryString)
    .then((data) => {
      res.locals.loginInfo = data.rows; // note that service_password is encoded
      return next();
    })
    .catch((err) => next({ err }));
};
// allows user to update saved password for third-party service
servicesController.updateServicesLogin = (req, res, next) => {
  let {
    // body will contain user's name, the service, existing PW, and new PW
    local_user,
    service,
    service_password,
    new_service_password,
  } = req.body;
  const queryString = `UPDATE service_login
                        SET service_password = $1
                        WHERE (local_user =  $2 AND service = $3 AND service_password = $4)`;
  // encode existing password to match with DB and new password to save
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
// allows users to delete previously saved login information
servicesController.deleteServicesLogin = (req, res, next) => {
  // will take local user and service
  const { local_user, service } = req.body;
  const queryString = `DELETE FROM service_login WHERE (local_user = $1 AND service = $2);`;
  const params = [local_user, service];
  // delete row containing local user and specified service from service_login table
  db.query(queryString, params)
    .then((data) => {
      res.locals.status = 'login info deleted';
      return next();
    })
    .catch((err) => next({ err }));
};

servicesController.getLoginExt = (req, res, next) => {
  const families = [];
  const services = [];
  const username = req.body.username 
  const param = [username]
  const urlToServiceName = {
    'https://www.netflix.com/login': 'Netflix',
  };
  const currentService = urlToServiceName[req.body.service]
  const queryString = `SELECT f.family_name
  FROM family_members fm
  JOIN families f ON f._id = fm.family_id
  JOIN local_users lu ON lu._id = fm.local_user_id where lu.username = $1`

db.query(queryString, param)
.then((data) => {
  for (let i = 0; i < data.rows.length; i += 1) {
  families[i] = data.rows[i].family_name
  }
  console.log(families)
})
.then(() => {
  const queryString2 = `SELECT f.family_name, sl.service, service_username, service_password
  FROM family_logins fl
  JOIN families f ON f._id = fl.family_id
  JOIN service_login sl ON sl._id = fl.service_login_id`;
  db.query(queryString2)
    .then((data2) => {
      for (let i = 0; i < data2.rows.length; i += 1){
        if (families.includes(data2.rows[i].family_name) && data2.rows[i].service === currentService) {
          services.push(data2.rows[i])
        }
      }
      if (services.length > 0) {
        res.locals.userInfo = {username: services[0].service_username, password: services[0].service_password}
      }
      return next();
    })
  }
)
.catch((err) => next({ err }));
};

module.exports = servicesController;
