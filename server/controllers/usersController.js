const db = require('../models/dbModels');
const bcrypt = require('bcrypt');
const saltRounds = 13;

const usersController = {};

// create new user in login database - new account for website
usersController.createUsers = (req, res, next) => {
  const { username, password } = req.body;
  const param = [username.toLowerCase()];
  // look into db to see if that username exists - if so, will redirect
  db.query(`SELECT * FROM local_users WHERE (username = $1);`, param).then(
    (data) => {
      if (data.rows.length) {
        // if user exists
        res.locals.status = 'user exists';
        return next();
        //else, create that user
      } else {
        // encrypt provided password using bcrypt
        bcrypt.hash(password, saltRounds, (err, hash) => {
          const hashPassword = hash;
          const values = [username.toLowerCase(), hashPassword];
          // add username and password to DB
          db.query(
            `INSERT INTO local_users (username, password) VALUES ($1, $2);`,
            values
          )
            .then((data) => {
              return next();
            })
            .catch((err) => {
              return next({ err });
            });
        });
      }
    }
  );
};

// checks whether login credentials are valid
usersController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const param = [username.toLowerCase()];
  // query DB to get user with provided username
  db.query(`SELECT * FROM local_users WHERE (username = $1);`, param)
    .then((data) => {
      if (data.rows.length === 0) {
        // if no such user, stop here
        res.locals.status = 'No user found';
        return next();
      } else {
        // if there is such a user, compare password with encrypted password
        bcrypt.compare(password, data.rows[0].password, (err, result) => {
          if (result === true) {
            // if provided password matches saved password
            res.locals.status = true;
            return next();
          } else {
            // if provided password is not a match
            res.locals.status = false;
            return next();
          }
        });
      }
    })
    .catch((err) => {
      return next({ err });
    });
};

module.exports = usersController;
