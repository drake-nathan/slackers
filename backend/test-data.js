const channels = [
  {
    channelId: 1,
    name: 'slackers',
    description: 'channel for agile project cohort 3',
  },
  {
    channelId: 2,
    name: 'slackers-front-end',
    description: 'channel for front-end',
  },
  {
    channelId: 3,
    name: 'slackers-front-end',
    description: 'channel for front-end',
  },
];

const directMessages = [
  {
    dMId: 12,
    user1: 1,
    user2: 2,
  },
  {
    dMId: 13,
    user1: 1,
    user2: 3,
  },
  {
    dMId: 14,
    user1: 1,
    user2: 4,
  },
  {
    dMId: 24,
    user1: 2,
    user2: 4,
  },
];

const users = [
  {
    userId: 1,
    firstName: 'Stephanie',
    lastName: 'Bistransin',
    email: 'sbistransin@gmail.com',
    channels: [1, 2, 3],
    directMessages: [12, 13, 14],
    messages: [1, 3, 5, 6, 9, 12],
  },
  {
    userId: 2,
    firstName: 'Doug',
    lastName: 'West',
    email: 'dougwest@gmail.com',
    channels: [1, 2],
    directMessages: [12, 23, 24],
    messages: [2, 4, 8, 10, 11],
  },
  {
    userId: 3,
    firstName: 'Aaron',
    lastName: 'Hayslip',
    email: 'aaron@hotmail.com',
    channels: [1],
    directMessages: [13, 23],
    messages: [],
  },
  {
    userId: 4,
    firstName: 'Amanda',
    lastName: 'Richardson',
    email: 'ar@yahoo.com',
    channels: [3],
    directMessages: [14, 24],
    messages: [],
  },
  {
    userId: 5,
    firstName: 'Michael',
    lastName: 'Grumbine',
    email: 'michael@gmail.com',
    channels: [1, 2, 3],
    directMessages: [],
    messages: [7],
  },
];

const messages = [
  {
    id: 1,
    userId: 1,
    channelId: 1,
    directMessageId: null,
    text: 'Hey',
    createdDate: new Date('March 29, 2022 03:24:00'),
  },
  {
    id: 2,
    userId: 2,
    channelId: 1,
    directMessageId: null,
    text: 'Hi',
    createdDate: new Date('March 29, 2022 03:25:00'),
  },
  {
    id: 3,
    userId: 1,
    channelId: 2,
    directMessageId: null,
    text: 'Hey again',
    createdDate: new Date('March 28, 2022 03:30:00'),
  },
  {
    id: 4,
    userId: 2,
    channelId: 2,
    directMessageId: null,
    text: 'Hi again',
    createdDate: new Date('March 28, 2022 03:31:00'),
  },
  {
    id: 5,
    userId: 1,
    channelId: 3,
    directMessageId: null,
    text: 'Hello',
    createdDate: new Date('March 30, 2022 03:31:00'),
  },
  {
    id: 6,
    userId: 1,
    channelId: 3,
    directMessageId: null,
    text: 'Hello?',
    createdDate: new Date('March 31, 2022 03:31:00'),
  },
  {
    id: 7,
    userId: 5,
    channelId: 1,
    directMessageId: null,
    text: 'How are things going?',
    createdDate: new Date('March 29, 2022 05:24:00'),
  },
  {
    id: 8,
    userId: 2,
    channelId: null,
    directMessageId: 12,
    text: 'I need test data',
    createdDate: new Date('March 24, 2022 04:00:00'),
  },
  {
    id: 9,
    userId: 1,
    channelId: null,
    directMessageId: 12,
    text: 'I will get it to you I promise!!!',
    createdDate: new Date('March 24, 2022 04:02:00'),
  },
  {
    id: 10,
    userId: 2,
    channelId: null,
    directMessageId: 23,
    text: 'Hello Aaron',
    createdDate: new Date('March 25, 2022 03:31:00'),
  },
  {
    id: 11,
    userId: 2,
    channelId: null,
    directMessageId: 12,
    text: 'You still have not give me test data',
    createdDate: new Date('March 29, 2022 05:00:00'),
  },
  {
    id: 12,
    userId: 1,
    channelId: null,
    directMessageId: 12,
    text: 'I know I forgot',
    createdDate: new Date('March 29, 2022 05:02:00'),
  },
];

module.exports = {
  channels,
  directMessages,
  users,
  messages,
};