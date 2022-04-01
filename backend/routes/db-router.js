const router = require('express').Router();
const setupDevDatabase = require('../dev-db/setup-dev-db');

// all routes to /api/database-setup
router.route('/').get(setupDevDatabase);

module.exports = router;
