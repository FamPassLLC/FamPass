const bcrypt = require('bcrypt');
const db = require('../models/dbModels');

const saltRounds = 13;

const familiesController = {};

// +++++++++++++++++++++++++++++++++++++++++++++
// +++ Methods to create and delete families +++
// +++++++++++++++++++++++++++++++++++++++++++++

// get request to retrieve families and members - returns arr of objs { family_name, username }
// use this method to get members in families, too
// on frontend, filter by family_name or username depending on use
familiesController.getFamilies = (req, res, next) => {
  // gets table with all users/families because GET requests generally lack bodies
  const queryString = `SELECT f.family_name, lu.username
      FROM family_members fm
      JOIN families f ON f._id = fm.family_id
      JOIN local_users lu ON lu._id = fm.local_user_id`;

  db.query(queryString)
    .then((data) => {
      res.locals.familyDetails = data.rows; // data.rows is arr of objs with format { family_name, username }
      return next();
    })
    .catch((err) => next({ err }));
};

// post request to create a family
familiesController.addFamily = (req, res, next) => {
  // request body should include family name and family password
  const { family_name, family_password } = req.body;
  // first, check whether a family with name already exists
  db.query('SELECT * FROM families WHERE (family_name = $1)', [family_name])
    .then((data) => {
      if (data.rows.length) {
        res.locals.status = 'family already exists';
        return next();
      } else {
        // encrypt password using bcrypt
        bcrypt.hash(family_password, saltRounds, (err, hash) => {
          const hashPassword = hash;
          const values = [family_name, hashPassword];
          const queryString = `INSERT INTO families (family_name, family_password) VALUES ($1, $2)`;
          // query
          db.query(queryString, values).then((data) => {
            res.locals.status = 'family created';
            res.locals.data = family_name;
            return next();
          });
        });
      }
    })
    .catch((err) => next({ err }));
};
// request to modify family name (update request)
familiesController.renameFamily = (req, res, next) => {
  // get new family name and existing family name from request body
  const { newName, family_name } = req.body;
  // check whether updated family name already exists
  db.query('SELECT * FROM families WHERE (family_name = $1);', [newName])
    .then((data) => {
      if (data.rows.length) {
        res.locals.status = 'new family name already exists';
        return next();
      } else {
        const values = [newName, family_name];
        const queryString = `UPDATE families SET family_name = $1 WHERE (family_name = $2)`;
        db.query(queryString, values).then((data) => {
          res.locals.status = 'family name updated';
          res.locals.newName = newName;
          return next();
        });
      }
    })
    .catch((err) => next({ err }));
};

// request to delete a family
familiesController.deleteFamily = (req, res, next) => {
  // request params should include family name
  const { family_name } = req.params;
  const queryString = `DELETE FROM families WHERE (family_name = $1);`;
  const values = [family_name];
  // query
  db.query(queryString, values)
    .then((data) => {
      res.locals.status = 'family deleted';
      res.locals.family_name = family_name;
      return next();
    })
    .catch((err) => next({ err }));
};

// +++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Methods to add/remove users from families +++
// +++++++++++++++++++++++++++++++++++++++++++++++++

// adds a user to a family - pass local_user and family_name
familiesController.addMember = (req, res, next) => {
  // get data from body and put into variables - body will include family name, family password, and local username of user to add
  const { family_name, family_password, local_user } = req.body;

  // first queries - get family_id and user_id corresponding to input data
  // get _id from families table
  const firstQuery1 = `SELECT _id, family_password FROM families WHERE (family_name = $1)`;
  const firstQuery1Value = [family_name];
  db.query(firstQuery1, firstQuery1Value)
    .then((data) => {
      const family_id = data.rows[0]._id;
      // verify family password
      bcrypt.compare(
        family_password,
        data.rows[0].family_password,
        (err, result) => {
          if (!result) {
            res.locals.status = 'incorrect family password';
            return next();
          } else {
            // second portion of first query: get _id from local_users table
            const firstQuery2 = `SELECT _id FROM local_users WHERE (username = $1)`;
            const firstQuery2Value = [local_user];
            db.query(firstQuery2, firstQuery2Value).then((data2) => {
              const local_user_id = data2.rows[0]._id;

              // next query: check whether family already contains the specified member
              const newMemberInfo = [family_id, local_user_id];
              db.query(
                `SELECT * FROM family_members WHERE (family_id = $1 AND local_user_id = $2)`,
                newMemberInfo
              ).then((data3) => {
                if (data3.rows.length) {
                  // if user is already a family member, this will evalute to true
                  res.locals.status = 'member already in family';
                  return next();
                } else {
                  // final query: add member to family
                  const lastQuery = `INSERT INTO family_members (family_id, local_user_id) VALUES ($1, $2)`;
                  db.query(lastQuery, newMemberInfo).then(() => {
                    res.locals.status = 'new member added';
                    res.locals.data = { family_name, local_user };
                    return next();
                  });
                }
              });
            });
          }
        }
      );
    })
    .catch((err) => next({ err }));
};
// removes a user from a family - pass local_user and family_name
familiesController.removeMember = (req, res, next) => {
  // get data from params and put into variables - body will include family name and local username of user to remove
  const { family_name, local_user } = req.params;
  // first queries - get family_id and user_id corresponding to input data
  // get _id from families table
  const firstQuery1 = `SELECT _id FROM families WHERE (family_name = $1)`;
  const firstQuery1Value = [family_name];
  db.query(firstQuery1, firstQuery1Value)
    .then((data) => {
      const family_id = data.rows[0]._id;
      // second portion of first query: get _id from local_users table
      const firstQuery2 = `SELECT _id FROM local_users WHERE (username = $1)`;
      const firstQuery2Value = [local_user];
      db.query(firstQuery2, firstQuery2Value).then((data2) => {
        const local_user_id = data2.rows[0]._id;
        // final query: remove specified user from family
        const finalQuery =
          'DELETE FROM family_members WHERE (family_id = $1 AND local_user_id = $2)';
        const memberInfo = [family_id, local_user_id];
        db.query(finalQuery, memberInfo).then(() => {
          res.locals.status = 'family member removed';
          res.locals.data = req.params;
          return next();
        });
      });
    })
    .catch((err) => next({ err }));
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Methods to associate services with families +++
// +++++++++++++++++++++++++++++++++++++++++++++++++++

// shares service with a family
// body should include family name, service, local_user
familiesController.shareService = (req, res, next) => {
  const { family_name, service, local_user } = req.body;

  // first, queries to obtain family_id and service_login_id
  const firstQuery1 = 'SELECT _id FROM families WHERE (family_name = $1)'; // will get family id
  const firstQuery1Value = [family_name];
  db.query(firstQuery1, firstQuery1Value)
    .then((data) => {
      const family_id = data.rows[0]._id;

      const firstQuery2 =
        'SELECT _id FROM service_login WHERE (service = $1 AND local_user = $2)';
      const firstQuery2Values = [service, local_user];
      db.query(firstQuery2, firstQuery2Values).then((data2) => {
        const service_login_id = data2.rows[0]._id;
        // final query: add to family_logins table
        const serviceInfo = [family_id, service_login_id];
        db.query(
          'INSERT INTO family_logins (family_id, service_login_id) VALUES ($1, $2)',
          serviceInfo
        ).then(() => {
          res.locals.status = 'service shared';
          return next();
        });
      });
    })
    .catch((err) => next({ err }));
};

// stop sharing a service with a family
// params should include family name, service, local_user
familiesController.stopSharingService = (req, res, next) => {
  const { family_name, service, local_user } = req.params;
  // first, queries to obtain family_id and service_login_id
  const firstQuery1 = 'SELECT _id FROM families WHERE (family_name = $1)'; // will get family id
  const firstQuery1Value = [family_name];
  db.query(firstQuery1, firstQuery1Value)
    .then((data) => {
      const family_id = data.rows[0]._id;
      const firstQuery2 =
        'SELECT _id FROM service_login WHERE (service = $1 AND local_user = $2)';
      const firstQuery2Values = [service, local_user];
      db.query(firstQuery2, firstQuery2Values).then((data2) => {
        const service_login_id = data2.rows[0]._id;
        // final query: delete from family_logins table
        const serviceInfo = [family_id, service_login_id];
        db.query(
          'DELETE FROM family_logins WHERE (family_id = $1 AND service_login_id = $2)',
          serviceInfo
        ).then(() => {
          res.locals.status = 'sharing stopped';
          return next();
        });
      });
    })
    .catch((err) => next({ err }));
};

module.exports = familiesController;
