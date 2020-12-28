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
router.get('/allfamilies', familiesController.getFamilies, (req, res) => {
  const families = res.locals.familyDetails;
  res.status(200).json(families); // arr of objs { family_name, username }
});

// request to create a family
router.post('/addfamily', familiesController.addFamily, (req, res) => {
  const { family_name } = res.locals;
  res.status(200).json(family_name);
});

// request to rename a family
router.put('/renamefamily', familiesController.renameFamily, (req, res) => {
  const { newName } = res.locals;
  res.status(200).json(newName);
});

// request to delete a family
router.delete(
  '/deletefamily/:family_name',
  familiesController.deleteFamily,
  (req, res) => {
    const { family_name } = res.locals;
    res.status(200).json(family_name);
  }
);

// +++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Methods to add/remove users from families +++
// +++++++++++++++++++++++++++++++++++++++++++++++++

// request to add to a family
router.post('/add-family-member', familiesController.addMember, (req, res) => {
  const { data } = res.locals;
  res.status(200).json(data);
});

// request to delete users from a family
router.delete(
  '/remove-family-member/:family_name/:local_user',
  familiesController.removeMember,
  (req, res) => {
    const { data } = res.locals;
    res.status(200).json(data);
  }
);

// +++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Methods to associate services with families +++
// +++++++++++++++++++++++++++++++++++++++++++++++++++

// share service with family
router.post('/share-service', familiesController.shareService, (req, res) => {
  res.status(200).send('service shared');
});

// stop sharing service with family
router.delete(
  '/stop-sharing-service/:family_name/:service/:local_user',
  familiesController.stopSharingService,
  (req, res) => {
    res.status(200).send('sharing stopped');
  }
);

module.exports = router;
