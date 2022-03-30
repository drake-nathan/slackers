const router = require('express').Router();
const db = require('../queries');

// all routes here are going to /api/channels
router.route('/').get((req, res) => res.send('hey'));

// TODO uncomment this before pushing to production
// This endpoint will build a sample database out, so be sure to delete all of your postgresql tables before you run it, as creating a table with the same name as one that already exists will give you an error
// router.route('/builddatabase').get(db.buildDatabase);

// router
//   .route('/:threadId/posts')
//   .get(db.getThreadPosts)
//   .post(db.createThreadPost);

// router
//   .route('/:threadId/users')
//   .get(db.getThreadUsers)
//   .post(db.createThreadUser);

// router.route('/posts/:postId/').delete(db.deleteThreadPost);

// describe('/GET api/channels/:channel/users', () => {});

// describe('/POST api/channels/:channel/users', () => {});

module.exports = router;
