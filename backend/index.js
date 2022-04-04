/* eslint-disable global-require */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

// Connect to the DB! (no need to end the connection)
const { client } = require('./queries/queries');

client.connect((err) => {
  if (err) console.log(err);
});

// route level authentication middleware. Expecting a JWT in the header for in the requireAuth middleware.
const { requireSignIn, requireAuth } = require('./services/authentication');

const channelRouter = require('./routes/channel-router');
const currentUserRouter = require('./routes/current-user-router');
const databaseRouter = require('./routes/db-router');
const { signin } = require('./routes/sign-in');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.get('/test', (req, res) => res.send('Beers, Beets, Battlestar Gallactica'));
app.post('/api/sign-in', requireSignIn, signin);
app.use('/api/me', requireAuth, currentUserRouter);
app.use('/api/channels', requireAuth, channelRouter);
app.use('/api/database-setup', databaseRouter);

// Server Setup
const port = process.env.PORT || 8000;
const server = http.createServer(app);

// socket.io gets attached here
// the socket object represents the connection between the server and a particular client
const io = new socketIO.Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

// you can insert middleware that gets to use the socket when a client connects or an event is received from the client.

// attach socket listeners here. You can also export the io object and use it in your routes.
io.on('new_namespace', (namespace) => {
  namespace.on('connection', (socket) => {
    socket.on('message_sent', (message) => {
      console.log(message);
    });
  });
});

// io.on('connection', (socket) => {
//   // socket id = unique identifier for user
//   console.log(socket.id);
//   socket.on('message_sent', ({ message, channelID }) => {
//     // add to database
//     socket.to(channelID).emit('new_message', message);
//     // any fetching, creating, or updating to the db can be done here.
//   });
//   socket.on('join_channel', (channelID) => {
//     // query db for messages
//     console.log(`${socket.id} joined channel ${channelID}`);
//     socket.join(channelID);
//   });
//   socket.on('disconnect', () => {
//     console.log('User disconnected ', socket.id);
//   });
// });

server.listen(port);
console.log('Server listening on:', port);

module.exports = app;
