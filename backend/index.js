const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const app = express();

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

const channelRouter = require('./routes/channel-router');
const directMessageRouter = require('./routes/direct-message-router');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.io = io;
  return next();
});

// routes
app.use('/api/channels', channelRouter);
app.use('/api/direct-messages', directMessageRouter);

// you can insert middleware that gets to use the socket when a client connects or an event is received from the client.
io.use((socket, next) => {
  console.log('middleware');
  next();
});

server.listen(port);
console.log('Server listening on:', port);

module.exports = app;
