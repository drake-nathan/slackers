const falso = require('@ngneat/falso');
const bcrypt = require('bcrypt');

const getHashedPassword = (pw) => {
  const password = pw || falso.randPassword();
  const hashed = bcrypt.hashSync(password, 10);
  return hashed;
};

const generateUsers = (numToMake) => {
  const users = [];
  for (let i = 0; i < numToMake; i += 1) {
    users.push({
      email: falso.randEmail(),
      name: falso.randUserName(),
      password: falso.randPassword(),
      hash: getHashedPassword(this.password),
    });
  }
  return users;
};

const generateChannels = (numToMake) => {
  const channels = [];
  for (let i = 0; i < numToMake; i += 1) {
    channels.push({
      name: falso.randProductName(),
      description: falso.randProductDescription(),
      // type: Math.random() > 5 / 10 ? 'channel' : 'dm',
      type: 'channel',
      private: false,
      count: null,
      createDate: `2022-03-31 10:${i + 15}:54`,
    });
  }
  return channels;
};

const generateMessages = (numToMake) => {
  const messages = [];
  for (let i = 0; i < numToMake; i += 1) {
    messages.push({
      text: falso.randPhrase(),
    });
  }
  return messages;
};

module.exports = {
  getHashedPassword,
  generateUsers,
  generateChannels,
  generateMessages,
};
