const router = require('express').Router();
const db = require('../queries');

// all routes here are going to /api/direct-messages
// router.route('/').get(db.getThreadPosts);

router.route('/').get((req, res) => res.send('hey'));

// Starting to feel like it doesn't make much sense to have separate endpoints for channels and direct messages. Thinking it might be interesting if we just combine the two into one "threads" router file, as it would be more representitive of how our data is represented in the database. What are your thoughts??

module.exports = router;
