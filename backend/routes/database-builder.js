const router = require('express').Router();

// all routes to /api/channels
router.route('/').get();

router.route('/api/channels/:channel/posts').get();

router.route('/').get();

router.route('/api/channels/:channel/users').get();

module.exports = router;
