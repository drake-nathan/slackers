const router = require('express').Router();
const db = require('../queries/queries');

// all routes here are going to /api/channels
router.route('/').get(db.getAllChannels).post(db.addNewChannel);

router.route('/:conversationId').get(db.getConversation);

router
  .route('/:conversationId/messages')
  .get(db.getConversationMessages)
  .post(db.createConversationMessage);

router
  .route('/:conversationId/users')
  .get(db.getChannelUsers)
  .post(db.createChannelUser)
  .delete((req, res) => res.send('hey'));

router.route('/:conversationId/non-users').get(db.getNonConvoUsers);

router.route('/posts/:messageId/').delete((req, res) => res.send('hey'));

module.exports = router;
