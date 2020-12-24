// ++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to create/modify families +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express');
const familiesController = require('../controllers/familiesController');

const router = express.Router();

// +++++++++++++++++++++++++++++++++++++++++++++
// +++ Methods to create and delete families +++
// +++++++++++++++++++++++++++++++++++++++++++++

// request to retrieve families (for display on landing page)
// also use this method to get members to display within families
router.get('/', familiesController.getFamilies, (req, res) => {
  res.status(200).send(res.locals.familyDetails); // arr of objs { family_name, username }
});

// request to create a family
router.post('/addfamily', familiesController.addFamily, (req, res) => {
  res.send('adding families');
});

// request to rename a family
router.put('/renamefamily', familiesController.renameFamily, (req, res) => {
  res.send('family updated');
});

// request to delete a family
router.delete('/deletefamily', familiesController.deleteFamily, (req, res) => {
  res.send('family deleted');
});

// +++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Methods to add/remove users from families +++
// +++++++++++++++++++++++++++++++++++++++++++++++++

// request to add to a family
router.post('/add-family-member', familiesController.addMember, (req, res) => {
  res.send('family member added');
});

// request to delete users from a family
router.delete(
  '/remove-family-member',
  familiesController.removeMember,
  (req, res) => {
    res.send('family member removed');
  }
);

// +++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Methods to associate services with families +++
// +++++++++++++++++++++++++++++++++++++++++++++++++++

// share service with family
router.post('/share-service', familiesController.shareService, (req, res) => {
  res.send('service shared');
});

// stop sharing service with family
router.delete(
  '/stop-sharing-service',
  familiesController.stopSharingService,
  (req, res) => {
    res.send('sharing stopped');
  }
);

module.exports = router;
