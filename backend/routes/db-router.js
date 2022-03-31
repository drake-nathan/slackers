const router = require('express').Router();
const db = require('../queries');

// all routes to /api/database-setup
router.route('/').get(db.setupDevDatabase);

module.exports = router;
