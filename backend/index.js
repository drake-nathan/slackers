const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');

const channelRouter = require('./routes/channel-router');
const directMessageRouter = require('./routes/direct-message-router');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/api/channels');
app.use('/api/direct-messages');

// Server Setup
const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

module.exports = app;
