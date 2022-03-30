// instructions to setting up test database below
// https://parsity-fulltime-3.atlassian.net/jira/software/projects/PFTC3AP/boards/1?selectedIssue=PFTC3AP-9
// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'me',
//   host: 'localhost',
//   database: 'api',
//   password: serverPassword,
//   port: 5432,
// });

const getThreadUsers = (req, res, next) => {
  const { threadId } = req.params;

  const query = {
    text: `
    SELECT
      users.user_id,
      users.name,
      thread_user.thread_id
    FROM
      users
    INNER JOIN thread_user ON thread_user.user_id = users.user_id
    WHERE thread_user.thread_id = $1
    `,
    values: [threadId],
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
};

const getThreadPosts = (req, res, next) => {
  const { threadId } = req.params;

  const query = {
    text: `
    SELECT
      post.posttext,
      post.user_id,
      users.name,
      thread.thread_id
    FROM
      post
	  INNER JOIN users ON users.user_id = post.user_id
    INNER JOIN thread ON thread.thread_id = post.thread_id
    WHERE post.thread_id = $1
    `,
    values: [threadId],
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
};

const createThreadPost = (req, res, next) => {
  const { threadId } = req.params;
  const { posttext } = req.body;
  const userId = 1;

  const query = {
    text: `
    INSERT INTO post (user_id, thread_id, posttext)
      VALUES ($1, $2, $3);
    `,
    values: [userId, threadId, posttext],
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send('cool!');
  });
};

const createThreadUser = (req, res, next) => {
  const { threadId } = req.params;
  const { userId } = req.body;

  const query = {
    text: `
    INSERT INTO thread_user (user_id, thread_id)
      VALUES ($1, $2);
    `,
    values: [userId, threadId],
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send('BOOM');
  });
};

const deleteThreadPost = (req, res, next) => {
  const { postId } = req.params;

  const query = {
    text: `
    DELETE FROM post
    WHERE post_id = $1
    `,
    values: [postId],
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send('sweet!!');
  });
};

const buildDatabase = (req, res, next) => {
  const query = {
    text: `
    CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      name VARCHAR(30),
      email VARCHAR(30)
    );
    
    INSERT INTO users (name, email)
      VALUES ('Dio', 'dio@example.com'), ('Susan', 'susan@example.com'), ('Simon', 'simon@example.com'), ('Jerry', 'jerry@example.com'), ('Wendy', 'wendy@example.com');
    
    CREATE TABLE thread(
      thread_id SERIAL PRIMARY KEY,
      type VARCHAR(2)
    );
    
    INSERT INTO thread (type)
      VALUES ('dm'), ('ch'), ('ch'), ('ch'), ('ch');
    
    CREATE TABLE post(
      post_id SERIAL PRIMARY KEY,
      user_id INT,
      thread_id INT,
      posttext VARCHAR(100),
      CONSTRAINT fk_user
        FOREIGN KEY(user_id)
          REFERENCES users(user_id),
      CONSTRAINT fk_thread
        FOREIGN KEY(thread_id)
          REFERENCES thread(thread_id)
    );
    
    INSERT INTO post (user_id, thread_id, posttext)
      VALUES ('1', '2', 'hey how are you?'), ('2', '2', 'hi'), ('3', '2', 'hey'), ('1', '2', 'whattup?'), ('4', '3', 'channel 3 for the win');
    
    CREATE TABLE thread_user (
      thread_id INT NOT NULL,
      user_id INT NOT NULL,
      PRIMARY KEY (thread_id, user_id),
      FOREIGN KEY (thread_id)
          REFERENCES thread (thread_id),
      FOREIGN KEY (user_id)
          REFERENCES users (user_id)
    );
    
    INSERT INTO thread_user (thread_id, user_id)
      VALUES ('2', '1'), ('2', '2'), ('2', '3'), ('3', '2'), ('5', '4');
    `,
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send('sweet!');
  });
};

module.exports = {
  getThreadPosts,
  getThreadUsers,
  buildDatabase,
  createThreadPost,
  deleteThreadPost,
  createThreadUser,
};
