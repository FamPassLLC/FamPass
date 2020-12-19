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
      .then((res) => {
        return next();
      })
      .catch((err) => {
        return next({ err });
      });
  });
};
module.exports = usersController;
