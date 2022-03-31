const router = require('express').Router();
const db = require('../dev-db/setup-dev-db');

// all routes to /api/database-setup
router.route('/').get(db.setupDevDatabase);

module.exports = router;
