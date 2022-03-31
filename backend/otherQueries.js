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

const getChannelUsers = (req, res, next) => {
  const { threadId } = req.params;

  const query = {
    text: `
    SELECT
      slacker_users.userid,
      slacker_users.name,
      user_channel.channelid
    FROM
      slacker_users
    INNER JOIN user_channel ON user_channel.userid = slacker_users.userid
	  WHERE user_channel.channelid = $1
    `,
    values: [threadId],
  };

  client.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
};

const getChannelPosts = (req, res, next) => {
  const { channelid } = req.params;

  const query = {
    text: `
    SELECT
      message.text,
      message.userid,
	  message.createddate,
      slacker_users.name,
      channel.channelid
    FROM
      message
	  INNER JOIN slacker_users ON slacker_users.userid = message.userid
    INNER JOIN channel ON channel.channelid = message.channelid
    WHERE message.channelid = $1
    `,
    values: [channelid],
  };

  client.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
};

const createChannelMessage = (req, res, next) => {
  const { channelId } = req.params;
  const { text, userid, createddate } = req.body;

  const query = {
    text: `
    INSERT INTO message (userid, channelid, dmid, text, createddate)
      VALUES ($1, $2, null, $3, $4);
    `,
    values: [userid, channelId, text, createddate],
  };

  client.query(query, (error, results) => {
    if (error) {
      throw error;
    }

    res.send('cool!');
  });
};

const createChannelUser = (req, res, next) => {
  const { channelId } = req.params;
  const { userid } = req.body;

  const query = {
    text: `
    INSERT INTO user_channel (userid, channelid)
      VALUES ($1, $2);
    `,
    values: [userid, channelId],
  };

  client.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send('BOOM');
  });
};

const deleteThreadPost = (req, res, next) => {
  const { messageId } = req.params;

  const query = {
    text: `
    DELETE FROM message
    WHERE messageid = $1
    `,
    values: [messageId],
  };

  client.query(query, (error, results) => {
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
  getChannelPosts,
  getChannelUsers,
  buildDatabase,
  createChannelMessage,
  deleteThreadPost,
  createChannelUser,
};
