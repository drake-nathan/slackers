const router = require('express').Router();
const db = require('../queries/queries');

// all routes to /api/database-setup
router.route('/').get(db.setupDevDatabase);

module.exports = router;
