const usersController = {};
const db = require('../models/dbModels');
const bcrypt = require('bcrypt');
const saltRounds = 13;

//create new users
usersController.createUsers = (req, res, next) => {
  //grab req body for username and password
  const { username, password } = req.body;
  //encrypt password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    const hashPassword = hash;
    const values = [username, hashPassword];
    //insert them to db
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
};

usersController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const param = [username];
  db.query(`SELECT * FROM local_users WHERE (username = $1);`, param)
    .then((data) => {
      if (!data) {
        res.locals.status = 'No user found';
        return next();
      } else {
        bcrypt.compare(password, data.rows[0].password, (err, result) => {
          if (result === true) {
            res.locals.status = true;
            return next();
          } else {
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
