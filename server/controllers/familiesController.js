const db = require('../models/dbModels');

const familiesController = {};

// +++++++++++++++++++++++++++++++++++++++++++++
// +++ Methods to create and delete families +++
// +++++++++++++++++++++++++++++++++++++++++++++

// post request to create a family
familiesController.addFamily = (req, res, next) => {
  // request body should include family name
  const { family_name } = req.body;
  // first, check whether a family with name already exists
  db.query('SELECT * FROM families WHERE (family_name = $1)', [family_name])
    .then((data) => {
      if (data.rows.length) {
        res.locals.status = 'family already exists';
        return next();
      } else {
        const queryString = `INSERT INTO families (family_name) VALUES ($1)`;
        const values = [family_name];
        // query
        db.query(queryString, values)
          .then((data) => {
            res.locals.status = 'family created';
            return next();
          });
      }
    })
    .catch((err) => next({ err }));
};

// request to modify family name
familiesController.renameFamily = (req, res, next) => {
  // get new family name from request body
  const { newName, family_name } = req.body;
  const values = [newName, family_name]
  const queryString = `UPDATE families SET family_name = $1 WHERE (family_name = $2)`;
  db.query(queryString, values)
    .then((data) => {
      res.locals.status = 'family name updated';
      return next();
    })
    .catch((err) => next({ err }));
};

// request to delete a family
familiesController.deleteFamily = (req, res, next) => {
  // request body should include family name
  const { family_name } = req.body;
  const queryString = `DELETE FROM families WHERE (family_name = $1)`;
  const values = [family_name];
  // query
  db.query(queryString, values)
    .then((data) => {
      res.locals.status = 'family deleted';
      return next();
    })
    .catch((err) => next({ err }));
};

// +++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Methods to add/remove users from families +++
// +++++++++++++++++++++++++++++++++++++++++++++++++

// adds a user to a family - pass local_user and family_name
familiesController.addMember = (req, res, next) => {
  // get data from body and put into variables - body will include family name and local username of user to add
  const { family_name, local_user } = req.body;
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
      db.query(firstQuery2, firstQuery2Value)
        .then((data) => {
          const local_user_id = data.rows[0]._id;
          // next query: check whether family already contains the specified member
          const newMemberInfo = [family_id, local_user_id];
          db.query(`SELECT * FROM family_members WHERE (family_id = $1 AND local_user_id = $2)`, newMemberInfo)
            .then((data) => {
              if (data.rows.length) { // if user is already a family member, this will evalute to true
                res.locals.status = 'member already in family';
                return next();
              } else {
                // final query: add member to family
                const lastQuery = `INSERT INTO family_members (family_id, local_user_id) VALUES ($1, $2)`;
                db.query(lastQuery, newMemberInfo)
                  .then((data) => {
                    res.locals.status = 'new member added';
                    return next();
                  });
              }
            });
        });
    })
    .catch((err) => next({ err }));
};

// removes a user from a family - pass local_user and family_name
familiesController.removeMember = (req, res, next) => {
  // get data from body and put into variables - body will include family name and local username of user to remove
  const { family_name, local_user } = req.body;
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
      db.query(firstQuery2, firstQuery2Value)
        .then((data) => {
          const local_user_id = data.rows[0]._id;
          // final query: remove specified user from family
          const finalQuery = 'DELETE FROM family_members WHERE (family_id = $1 AND local_user_id = $2)';
          const memberInfo = [family_id, local_user_id];
          db.query(finalQuery, memberInfo)
            .then((data) => {
              res.locals.status = 'family member removed';
              return next();
            });
        });
    })
    .catch((err) => next({ err }));
};

module.exports = familiesController;
