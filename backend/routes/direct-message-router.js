const router = require('express').Router();
const db = require('../queries');

// all routes here are going to /api/direct-messages
router.route('/').get(db.getThreadPosts);

router.route('/buildit').get(db.buildDatabase);

module.exports = router;
