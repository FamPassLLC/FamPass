const db = require('../models/dbModels');

const familiesController = {};

// post request to create a family
familiesController.addFamily = (req, res, next) => {
  // request body should include family name
  const { family_name } = req.body;
  const queryString = `INSERT INTO families (family_name) VALUES ($1)`
  const values = [family_name];
  // query
  db.query(queryString, values)
    .then((data) => {
      res.locals.status = 'family created';
      return next();
    })
    .catch((err) => next({ err }));
};

// request to delete a family
familiesController.deleteFamily = (req, res, next) => {
  // request body should include family name
  const { family_name } = req.body;
  const queryString = `DELETE FROM families WHERE (family_name = $1)`
  const values = [family_name];
  // query
  db.query(queryString, values)
    .then((data) => {
      res.locals.status = 'family deleted';
      return next();
    })
    .catch((err) => next({ err }));
};

module.exports = familiesController;
