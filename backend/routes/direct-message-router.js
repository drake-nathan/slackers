const router = require('express').Router();
const db = require('../queries');

// all routes to /api/direct-messages
router.route('/').get(db.getDMs);

module.exports = router;
