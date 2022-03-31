const router = require('express').Router();
const db = require('../queries/queries');
const signInRouter = require('./sign-in');

// all routes here are going to /api/me
router.route('/').get(signInRouter.currentUser);

router.route('/channels').get(db.getUserChannels);

router.route('/dms').get(db.getUserDms);

module.exports = router;
