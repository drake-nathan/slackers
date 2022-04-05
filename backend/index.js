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
io.use((socket, next) => {
  // authentication can go here
  next();
});

const SQLDate = () => new Date().toISOString().slice(0, 19).replace('T', ' ');

// attach socket listeners here.
io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);
  socket.on('message', (userId, message, channelId) => {
    const query = {
      text: `
      INSERT INTO message (user_id, conversation_id, text, createddate)
        VALUES ($1, $2, $3, $4) RETURNING *;
      `,
      // eslint-disable-next-line camelcase
      values: [userId, channelId, message, SQLDate()],
    };

    client.query(query, (err, result) => {
      if (err) {
        socket.emit('db_error', err.toString());
      } else {
        console.log(channelId);
        io.to(channelId).emit('new_message', result.rows[0]);
      }
    });
  });
  socket.on('join_channel', (channelId) => {
    if (!socket.rooms.has(channelId)) {
      socket.join(channelId);
      console.log(`${socket.id} joined room ${channelId}`);
    }
  });
  socket.on('disconnect', () => {
    console.log('User disconnected ', socket.id);
  });
});

server.listen(port);
console.log('Server listening on:', port);

module.exports = app;
