const bcrypt = require('bcrypt');
const falso = require('@ngneat/falso');
const { client } = require('../queries/queries');
const fakerFuncs = require('./generate-fake-data');

async function setupDevDatabase(request, response) {
  const passwords = ['awesome'];
  const hashes = passwords.map((p) => bcrypt.hashSync(p, 10));
  const users = fakerFuncs.generateUsers(25);
  const channels = fakerFuncs.generateChannels(40);

  const createUserTable = `
    CREATE TABLE "slacker_users" (
        user_id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        email varchar,
        name varchar,
        password varchar
    );`;

  const populateUserTable = {
    text: `
    INSERT INTO "slacker_users" (name, email, password)
      VALUES ${users.map(
        (user) => `('${user.name}', '${user.email}', '${user.password}')`
      )},('Dio', 'dio@example.com', $1);`,
    values: hashes,
  };

  const createConversationTable = `
    CREATE TABLE conversation (
        conversation_id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        name varchar,
        description varchar,
        type varchar,
        private boolean,
        count int,
        createddate timestamp
    );`;

  const populateConversationTable = `
    INSERT INTO "conversation" (name, description, type, private, createddate)
      VALUES  ${channels.map(
        (channel) =>
          `('${channel.name}', '${channel.description}', '${channel.type}', '${channel.private}', '${channel.createDate}')`
      )};`;

  const createUserConversationJunction = `
    CREATE TABLE user_conversation (
        user_id integer REFERENCES "slacker_users"(user_id),
        conversation_id integer REFERENCES "conversation"(conversation_id),
        CONSTRAINT user_conversation_pkey PRIMARY KEY (user_id, conversation_id)
    );`;

  const populateUserConversationTable = `
    INSERT INTO "user_conversation" (user_id, conversation_id)
      VALUES (1, 5), (2, 2), (2, 3), (2, 4), (2, 6), (3, 2), (3, 6), (4, 1);
    `;

  // const createMessageTable = `
  //   CREATE TABLE message (
  //       message_id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  //       user_id integer REFERENCES "slacker_users"(user_id),
  //       conversation_id integer REFERENCES "conversation"(conversation_id),
  //       text varchar,
  //       createdDate timestamp
  //   );`;

  // const populateMessageTable = `
  //   INSERT INTO message (user_id, conversation_id, text, createdDate)
  //     VALUES (1, 1, 'hey how is everyone?', '2022-03-29 10:23:54'),
  //     (4, 1,  'hi im fine', '2022-03-29 10:24:01'),
  //     (2, 3, 'channel 3 for the win', '2022-03-25 07:30:00'),
  //     (2, 2, 'how are you liking channel 2?', '2022-03-30 02:45:15'),
  //     (3, 2, 'it is okay', '2022-03-30 02:47:15'),
  //     (1, 4, 'hey user 2', '2022-03-30 11:15:15'),
  //     (2, 4, 'hey user 1', '2022-03-30 11:20:15'),
  //     (1, 5, 'hi how are you doing', '2022-03-30 11:16:15'),
  //     (3, 6, 'user 1 is so annoying haha', '2022-03-30 11:16:55'),
  //     (2, 6, 'what are you talking about', '2022-03-30 11:18:15'),
  //     (2, 6, 'oh i see now', '2022-03-30 11:21:17');
  //   `;

  // await client.query(createUserTable).catch((err) => {
  //   console.log(err);
  //   console.log('----- slacker_users table could not be created :(');
  // });
  // console.log('+++++ slacker_users table exists or was successfully created');

  // await client.query(populateUserTable).catch((err) => {
  //   console.log(err);
  //   console.log('----- slacker_users table could not be populated :(');
  // });
  // console.log('+++++ slacker_users table was successfully populated');

  // await client.query(createConversationTable).catch((err) => {
  //   console.log(err);
  //   console.log('channel table could not be created :(');
  // });
  // console.log('+++++ channel table exists or was successfully created');

  // await client.query(populateConversationTable).catch((err) => {
  //   console.log(err);
  //   console.log('----- channel table could not be populated :(');
  // });
  // console.log('+++++ channel table was successfully populated');

  // await client.query(createUserConversationJunction).catch((err) => {
  //   console.log(err);
  //   console.log('user_channel table could not be created :(');
  // });
  // console.log('+++++ user_channel table exists or was successfully created');

  // await client.query(populateUserConversationTable).catch((err) => {
  //   console.log(err);
  //   console.log('----- user_channel table could not be populated :(');
  // });
  // console.log('+++++ user_channel table was successfully populated');

  // await client.query(createMessageTable).catch((err) => {
  //   console.log(err);
  //   console.log('message table could not be created :(');
  // });
  // console.log('+++++ message table exists or was successfully created');

  // await client.query(populateMessageTable).catch((err) => {
  //   console.log(err);
  //   console.log('----- message table could not be populated :(');
  // });
  // console.log('+++++ message table was successfully populated');

  const id = await client.query(`SELECT user_id
  FROM slacker_users
  ORDER BY RANDOM()
  LIMIT 1;`);

  response.send(id.rows[0]);
}

module.exports = { setupDevDatabase };
