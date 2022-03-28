const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const { disconnect } = require('process');

const channelRouter = require('./routes/channel-router');
const directMessageRouter = require('./routes/direct-message-router');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/api/channels', channelRouter);
app.use('/api/direct-messages', directMessageRouter);

// Server Setup
const port = process.env.PORT || 8000;
const server = http.createServer(app);
// socket.io gets attached here
// the socket object represents the connection between the server and a particular client
const io = socketIO(server);
// attach socket listeners here
io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected ', socket.id);
  });
});
server.listen(port);
console.log('Server listening on:', port);

module.exports = app;
