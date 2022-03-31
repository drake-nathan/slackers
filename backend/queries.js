// instructions to setting up test database below
// https://parsity-fulltime-3.atlassian.net/jira/software/projects/PFTC3AP/boards/1?selectedIssue=PFTC3AP-9
const { Pool, Client } = require('pg');
const parser = require('pg-connection-string').parse;
const bcrypt = require('bcrypt');

const client = new Client(parser(process.env.DATABASE_URL));

const pool = new Pool(parser(process.env.DATABASE_URL));

const strings = {};

// ------------- QUERIES GO HERE---------------------

strings.allUsers = () => `SELECT * FROM "slacker_users"`;
strings.oneUser = (email, encryptedPassword) => ({
  text: `SELECT * FROM "slacker_users" WHERE email = $1 AND password = $2`,
  values: [email, encryptedPassword],
});
strings.userById = (id) => ({
  text: `SELECT * FROM "slacker_users" WHERE userid = $1`,
  values: [id],
});

// ---------------------------------------------------

const getChannelUsers = (req, res, next) => {
  const { channelId } = req.params;

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
    values: [channelId],
  };

  client.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    client.end();
    res.send(results.rows);
  });
};

const getChannelPosts = (req, res, next) => {
  const { channelId } = req.params;

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
    values: [channelId],
  };

  client.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    client.end();
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
    client.end();
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
    client.end();
    res.send('BOOM');
  });
};

const deleteChannelMessage = (req, res, next) => {
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
    client.end();
    res.send('sweet!!');
  });
};

const deleteChannelUser = (req, res, next) => {
  const { channelId } = req.params;
  const { userid } = req.body;

  const query = {
    text: `
    DELETE FROM user_channel
    WHERE userid = $1 AND channelid = $2
    `,
    values: [userid, channelId],
  };

  client.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    client.end();
    res.send('sweet!!');
  });
};

async function setupDevDatabase(request, response) {
  const passwords = ['awesome', 'cool', 'epic', 'fantabulous', 'mindblowing'];

  const hashes = passwords.map((p) => bcrypt.hashSync(p, 10));

  const createUserTable = `
    CREATE TABLE "slacker_users" (
        userid integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        email varchar,
        name varchar,
        password varchar
    );`;

  const populateUserTable = {
    text: `
    INSERT INTO "slacker_users" (name, email, password)
      VALUES ('Dio', 'dio@example.com', $1), ('Susan', 'susan@example.com', $2), ('Simon', 'simon@example.com', $3), ('Jerry', 'jerry@example.com', $4), ('Wendy', 'wendy@example.com', $5
    );`,
    values: hashes,
  };

  const createChannelTable = `
    CREATE TABLE channel (
        channelid int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        name varchar,
        description varchar
    );`;

  const populateChannelTable = `
    INSERT INTO "channel" (name, description)
      VALUES ('slackers', 'channel for cohort 3 fulltime agile project'), ('slackers-backend', 'channel for backend team'),
      ('slackers-frontend', 'channel for frontend team'
    );`;

  const createUserChannelJunction = `
    CREATE TABLE user_channel (
        userID integer REFERENCES "slacker_users"(userID),
        channelID integer REFERENCES "channel"(channelID),
        CONSTRAINT user_channel_pkey PRIMARY KEY (userID, channelID)
    );`;

  const populateUserChannelTable = `
    INSERT INTO "user_channel" (userID, channelID)
      VALUES (1, 2), (2, 2), (3, 2), (2, 3), (1, 1), (4, 1);
    `;

  const createDMTable = `
    CREATE TABLE dm (
      dmID int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      user1 integer REFERENCES "slacker_users"(userID),
      user2 integer REFERENCES "slacker_users"(userID),
      UNIQUE (user1, user2)
    );`;

  const populateDMTable = `
    INSERT INTO "dm" (user1, user2)
      VALUES (1, 2), (1, 3), (2, 3), (2, 4);
    `;

  const createMessageTable = `
    CREATE TABLE message (
        messageID int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        userID integer REFERENCES "slacker_users"(userID),
        channelID integer REFERENCES "channel"(channelID),
        dmID integer REFERENCES "dm"(dmID),
        text varchar,
        createdDate timestamp
    );`;

  const populateMessageTable = `
    INSERT INTO message (userID, channelID, dmID, text, createdDate)
      VALUES (1, 1, null, 'hey how is everyone?', '2022-03-29 10:23:54'), 
      (4, 1, null,  'hi im fine', '2022-03-29 10:24:01'),
      (2, 3, null, 'channel 3 for the win', '2022-03-25 07:30:00'),
      (2, 2, null, 'how are you liking channel 2?', '2022-03-30 02:45:15'), 
      (3, 2, null, 'it is okay', '2022-03-30 02:47:15'),
      (1, null, 1, 'hey user 2', '2022-03-30 11:15:15'),
      (2, null, 1, 'hey user 1', '2022-03-30 11:20:15'),
      (1, null, 2, 'hi how are you doing', '2022-03-30 11:16:15'),
      (3, null, 3, 'user 1 is so annoying haha', '2022-03-30 11:16:55'),
      (2, null, 3, 'what are you talking about', '2022-03-30 11:18:15'),
      (2, null, 3, 'oh i see now', '2022-03-30 11:21:17');
    `;

  await client.query(createUserTable).catch((err) => {
    console.log(err);
    console.log('----- slacker_users table could not be created :(');
  });
  console.log('+++++ slacker_users table exists or was successfully created');

  await client.query(populateUserTable).catch((err) => {
    console.log(err);
    console.log('----- slacker_users table could not be populated :(');
  });
  console.log('+++++ slacker_users table was successfully populated');

  await client.query(createChannelTable).catch((err) => {
    console.log(err);
    console.log('channel table could not be created :(');
  });
  console.log('+++++ channel table exists or was successfully created');

  await client.query(populateChannelTable).catch((err) => {
    console.log(err);
    console.log('----- channel table could not be populated :(');
  });
  console.log('+++++ channel table was successfully populated');

  await client.query(createUserChannelJunction).catch((err) => {
    console.log(err);
    console.log('user_channel table could not be created :(');
  });
  console.log('+++++ user_channel table exists or was successfully created');

  await client.query(populateUserChannelTable).catch((err) => {
    console.log(err);
    console.log('----- user_channel table could not be populated :(');
  });
  console.log('+++++ user_channel table was successfully populated');

  await client.query(createDMTable).catch((err) => {
    console.log(err);
    console.log('dm table could not be created :(');
  });
  console.log('+++++ dm table exists or was successfully created');

  await client.query(populateDMTable).catch((err) => {
    console.log(err);
    console.log('----- dm table could not be populated :(');
  });
  console.log('+++++ dm table was successfully populated');

  await client.query(createMessageTable).catch((err) => {
    console.log(err);
    console.log('message table could not be created :(');
  });
  console.log('+++++ message table exists or was successfully created');

  await client.query(populateMessageTable).catch((err) => {
    console.log(err);
    console.log('----- message table could not be populated :(');
  });
  console.log('+++++ message table was successfully populated');

  client.end();
  response.send();
}

module.exports = {
  strings,
  pool,
  client,
  setupDevDatabase,
  getChannelPosts,
  getChannelUsers,
  createChannelMessage,
  deleteChannelMessage,
  createChannelUser,
  deleteChannelUser,
};
