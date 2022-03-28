const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app routes will go here

// Server Setup
const port = process.env.PORT || 8000;
const server = http.createServer(app);
// socket.io gets attached here
server.listen(port);
console.log('Server listening on:', port);
