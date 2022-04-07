const router = require('express').Router();
const db = require('../queries/queries');
const signInRoutes = require('./sign-in');

// all routes here are going to /api/me
router.route('/').get(signInRoutes.currentUser);

router.route('/channels').get(db.getUserChannels);

router.route('/dms').get(db.getUserDms).post(db.addNewDm);

module.exports = router;
