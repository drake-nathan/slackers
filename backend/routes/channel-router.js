const router = require('express').Router();
const db = require('../queries/queries');

// all routes here are going to /api/channels
router.route('/').get(db.getAllChannels);

router
  .route('/:channelId/posts')
  .get(db.getConversationMessages)
  .post(db.createConversationMessage);

router
  .route('/:channelId/users')
  .get(db.getChannelUsers)
  .post((req, res) => res.send('hey'))
  .delete((req, res) => res.send('hey'));

router.route('/posts/:messageId/').delete((req, res) => res.send('hey'));

module.exports = router;
