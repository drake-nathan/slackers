const {
  randUserName,
  randEmail,
  randPassword,
  randPhrase,
  randNumber,
  randBird,
} = require('@ngneat/falso');

const channels = [];
for (let i = 0; i < 10; i += 1) {
  channels.push({
    _id: randNumber(),
    // i used bird because I needed a word and it sometimes spits out 'bushtit'...i'm a child
    name: randBird(),
  });
}

const users = [];
for (let i = 0; i < 25; i += 1) {
  channels.push({
    _id: randNumber(),
    email: randEmail(),
    username: randUserName(),
    password: randPassword(),
  });
}

const messages = [];
for (let i = 0; i < 500; i += 1) {
  channels.push({
    _id: randNumber(),
    userId: '', // get random userId
    channelId: '', // get random channelId
    text: randPhrase(),
    date: '', // generate sequential dates
  });
}

// write this out to a js file
