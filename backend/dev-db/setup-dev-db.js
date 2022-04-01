const bcrypt = require('bcrypt');
const falso = require('@ngneat/falso');
const { client } = require('../queries/queries');
const fakerFuncs = require('./generate-fake-data');

async function setupDevDatabase(request, response) {
  const passwords = ['awesome'];
  const hashes = passwords.map((p) => bcrypt.hashSync(p, 10));

  const numOfUsers = 25;
  const numOfChannels = 10;
  const numOfMessages = 25 * numOfChannels;

  const users = fakerFuncs.generateUsers(numOfUsers);
  const channels = fakerFuncs.generateChannels(numOfChannels);

  const getRandNum = (max) => falso.randNumber({ min: 1, max });

  const createUserTable = `
    CREATE TABLE "slacker_users" (
        user_id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        email varchar,
        name varchar,
        password varchar,
        password_temp varchar
    );`;

  const populateUserTable = {
    text: `
    INSERT INTO "slacker_users" (name, email, password, password_temp)
      VALUES ${users.map(
        (user) =>
          `('${user.name}', '${user.email}', '${user.hash}', '${user.password}')`
      )},('Dio', 'dio@example.com', $1, 'awesome');`,
    values: hashes,
  };

  const createConversationsTable = `
    CREATE TABLE conversation (
        conversation_id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        name varchar,
        description varchar,
        type varchar,
        private boolean,
        count int,
        createddate timestamp
    );`;

  const populateConversationsTable = `
    INSERT INTO "conversation" (name, description, type, private, createddate)
      VALUES  ${channels.map(
        (channel) =>
          `('${channel.name}', '${channel.description}', '${channel.type}', '${channel.private}', '${channel.createDate}')`
      )};`;

  const createUserConversationsJunction = `
    CREATE TABLE user_conversation (
        user_id integer REFERENCES "slacker_users"(user_id),
        conversation_id integer REFERENCES "conversation"(conversation_id),
        CONSTRAINT user_conversation_pkey PRIMARY KEY (user_id, conversation_id)
    );`;

  const createJunctions = () => {
    const junctions = [];
    for (let user = 1; user <= numOfUsers + 1; user += 1) {
      for (
        let channel = 1;
        channel <= 5;
        channel += getRandNum(numOfChannels / 3)
      ) {
        junctions.push({ user, channel });
      }
    }
    return junctions;
  };

  const populateUserConversationsTable = `
    INSERT INTO "user_conversation" (user_id, conversation_id)
      VALUES ${createJunctions().map(
        (junc) => `('${junc.user}', '${junc.channel}')`
      )};
    `;

  const createMessageTable = `
    CREATE TABLE message (
        message_id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        user_id integer REFERENCES "slacker_users"(user_id),
        conversation_id integer REFERENCES "conversation"(conversation_id),
        text varchar,
        createdDate timestamp
    );`;

  const renderDateNum = (num) => {
    if (num > 9) return num;
    return `0${num}`;
  };

  const incrementDate = (i) => {
    const day = Math.floor(i * (30 / numOfMessages)) || 1;
    const minute = Math.floor(i * (60 / numOfMessages)) || 1;
    return `2022-03-${renderDateNum(day)} 10:${renderDateNum(minute)}:54`;
  };

  const messages = fakerFuncs.generateMessages(numOfMessages);
  const distributeMessages = (message, i) => {
    const userId = getRandNum(numOfUsers + 1);
    const conversationId = getRandNum(numOfChannels);
    const { text } = message;
    const date = incrementDate(i);

    return `('${userId}', '${conversationId}', '${text}', '${date}')`;
  };

  const populateMessageTable = `
    INSERT INTO message (user_id, conversation_id, text, createdDate)
      VALUES ${messages.map(distributeMessages)};
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

  await client.query(createConversationsTable).catch((err) => {
    console.log(err);
    console.log('channel table could not be created :(');
  });
  console.log('+++++ channel table exists or was successfully created');

  await client.query(populateConversationsTable).catch((err) => {});
  console.log('+++++ channel table was successfully populated');

  await client.query(createUserConversationsJunction).catch((err) => {
    console.log(err);
    console.log('user_channel table could not be created :(');
  });
  console.log('+++++ user_channel table exists or was successfully created');

  await client.query(populateUserConversationsTable).catch((err) => {
    console.log(err);
    console.log('----- user_channel table could not be populated :(');
  });
  console.log('+++++ user_channel table was successfully populated');

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

  response.send('you are so populated');
}

module.exports = setupDevDatabase;
