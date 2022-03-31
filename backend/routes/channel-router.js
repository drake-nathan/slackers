const router = require('express').Router();
const db = require('../queries');

// all routes here are going to /api/channels
router.route('/').get(db.getAllChannels);

router
  .route('/:channelId/posts')
  .get(db.getChannelPosts)
  .post(db.createChannelMessage);

router
  .route('/:channelId/users')
  .get(db.getChannelUsers)
  .post(db.createChannelUser)
  .delete(db.deleteChannelUser);

router.route('/posts/:messageId/').delete(db.deleteChannelMessage);

module.exports = router;
