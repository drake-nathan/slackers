const router = require('express').Router();

// all routes to /api/channels
router.route('/').get((req, res) => {
  req.io.emit('test_event', 'hello!');

  // req.io.on('connection', (socket) => {
  //   console.log(socket.id);
  //   socket.on('message_sent', (message, channelID) => {
  //     // any fetching, creating, or updating to the db can be done here.
  //     console.log(message);
  //     socket.to(channelID).emit('new_message', message);
  //   });
  //   socket.on('join_channel', (channelID) => {
  //     console.log(`${socket.id} joined channel ${channelID}`);
  //     socket.join(channelID);
  //   });
  //   socket.on('disconnect', () => {
  //     console.log('User disconnected ', socket.id);
  //   });
  // });
});

module.exports = router;
