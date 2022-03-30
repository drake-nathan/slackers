const router = require('express').Router();
const db = require('../queries');

// all routes here are going to /api/channels
router.route('/').get((req, res) => res.send('hey'));

router
  .route('/:threadId/posts')
  .get(db.getThreadPosts)
  .post(db.createThreadPost);

router
  .route('/:threadId/users')
  .get(db.getThreadUsers)
  .post(db.createThreadUser);

router.route('/posts/:postId/').delete(db.deleteThreadPost);

// describe('/GET api/channels/:channel/users', () => {});

// describe('/POST api/channels/:channel/users', () => {});

module.exports = router;
