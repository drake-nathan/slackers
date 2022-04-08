const bcrypt = require('bcrypt');
const falso = require('@ngneat/falso');
const { pool } = require('../queries/queries');
const fakerFuncs = require('./generate-fake-data');

async function setupDevDatabase(request, response) {
  const passwords = ['awesome'];
  const hashes = passwords.map((p) => bcrypt.hashSync(p, 10));

  const numOfUsers = 25;
  const numOfChannels = 20;
  const numOfDMs = numOfUsers * 3;
  const numOfMessages = 15 * (numOfChannels + numOfDMs);

  const users = fakerFuncs.generateUsers(numOfUsers);
  const channels = fakerFuncs.generateChannels(numOfChannels);
  const DMs = fakerFuncs.generateDMs(numOfDMs);

  const getRandNum = (max) => falso.randNumber({ min: 1, max });

  const renderDateNum = (num) => {
    if (num > 9) return num;
    return `0${num}`;
  };

  const incrementDate = (i, numOf) => {
    const day = Math.floor(i * (30 / numOf)) || 1;
    const minute = Math.floor(i * (60 / numOf)) || 1;
    return `2022-03-${renderDateNum(day)} 10:${renderDateNum(minute)}:54`;
  };

  const createUserTable = `
    CREATE TABLE "slacker_users" (
        user_id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        email varchar,
        name varchar,
        password varchar,
        password_temp varchar,
        image_url varchar
    );`;

  const populateUserTable = {
    text: `
    INSERT INTO "slacker_users" (name, email, password, password_temp, image_url)
      VALUES ${users.map(
        (user, i) =>
          `('${user.name}', '${user.email}', '${user.hash}', '${user.password}', 'https://joeschmoe.io/api/v1/${i}')`
      )},('Dio', 'dio@example.com', $1, 'awesome', 'https://joeschmoe.io/api/v1/claudio');`,
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

  const populateChannels = `
    INSERT INTO "conversation" (name, description, type, private, createddate)
      VALUES  ${channels.map(
        (channel, i) =>
          `('${channel.name}', '${channel.description}', '${channel.type}', '${
            channel.private
          }', '${incrementDate(i, numOfChannels)}')`
      )};`;

  const populateDMs = `
    INSERT INTO "conversation" (type, private, createddate)
      VALUES  ${DMs.map(
        (DM, i) =>
          `('${DM.type}', '${DM.private}', '${incrementDate(i, numOfDMs)}')`
      )};`;

  const createUserConversationsJunction = `
    CREATE TABLE user_conversation (
        user_id integer REFERENCES "slacker_users"(user_id),
        conversation_id integer REFERENCES "conversation"(conversation_id),
        CONSTRAINT user_conversation_pkey PRIMARY KEY (user_id, conversation_id)
    );`;

  const createChannelJunctions = () => {
    const junctions = [];
    // adds users to random channels
    for (let user = 1; user <= numOfUsers + 1; user += 1) {
      for (
        let channel = 1;
        channel <= numOfChannels;
        channel += getRandNum(numOfChannels / 3)
      ) {
        junctions.push({ user, channel });
      }
    }
    return junctions;
  };

  const populateUserChannels = `
    INSERT INTO "user_conversation" (user_id, conversation_id)
      VALUES ${createChannelJunctions().map(
        (junc) => `('${junc.user}', '${junc.channel}')`
      )};
    `;

  const createDMJunctions = () => {
    const junctions = [];
    // adds users to random DMs
    for (let DM = numOfChannels + 1; DM <= numOfDMs + numOfChannels; DM += 1) {
      const user1 = getRandNum(numOfUsers);
      let user2 = getRandNum(numOfUsers);
      while (user2 === user1) {
        user2 = getRandNum(numOfUsers);
      }
      junctions.push({ user: user1, DM });
      junctions.push({ user: user2, DM });
    }
    return junctions;
  };

  const populateUserDMs = `
      INSERT INTO "user_conversation" (user_id, conversation_id)
        VALUES ${createDMJunctions().map(
          (junc) => `('${junc.user}', '${junc.DM}')`
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

  const messages = fakerFuncs.generateMessages(numOfMessages);
  const distributeMessages = (message, i) => {
    const userId = getRandNum(numOfUsers + 1);
    const conversationId = getRandNum(numOfChannels + numOfDMs);
    const { text } = message;
    const date = incrementDate(i, numOfMessages);

    return `('${userId}', '${conversationId}', '${text}', '${date}')`;
  };

  const populateMessageTable = `
    INSERT INTO message (user_id, conversation_id, text, createdDate)
      VALUES ${messages.map(distributeMessages)};
    `;

  await pool.query(createUserTable).catch((err) => {
    console.log(err);
    console.log('----- slacker_users table could not be created :(');
  });
  console.log('+++++ slacker_users table exists or was successfully created');

  await pool.query(populateUserTable).catch((err) => {
    console.log(err);
    console.log('----- slacker_users table could not be populated :(');
  });
  console.log('+++++ slacker_users table was successfully populated');

  await pool.query(createConversationsTable).catch((err) => {
    console.log(err);
    console.log('conversation table could not be created :(');
  });
  console.log('+++++ conversation table exists or was successfully created');

  await pool.query(populateChannels).catch((err) => {});
  console.log(
    '+++++ conversation table was successfully populated with channels'
  );

  await pool.query(populateDMs).catch((err) => {});
  console.log('+++++ conversation table was successfully populated with DMs');

  await pool.query(createUserConversationsJunction).catch((err) => {
    console.log(err);
    console.log('user_conversation table could not be created :(');
  });
  console.log(
    '+++++ user_conversation table exists or was successfully created'
  );

  await pool.query(populateUserChannels).catch((err) => {
    console.log(err);
    console.log('----- user channels table could not be populated :(');
  });
  console.log('+++++ user channels table was successfully populated');

  await pool.query(populateUserDMs).catch((err) => {
    console.log(err);
    console.log('----- user DMs table could not be populated :(');
  });
  console.log('+++++ user DMs table was successfully populated');

  await pool.query(createMessageTable).catch((err) => {
    console.log(err);
    console.log('message table could not be created :(');
  });
  console.log('+++++ message table exists or was successfully created');

  await pool.query(populateMessageTable).catch((err) => {
    console.log(err);
    console.log('----- message table could not be populated :(');
  });
  console.log('+++++ message table was successfully populated');

  response.send('you are so populated');
}

module.exports = setupDevDatabase;
