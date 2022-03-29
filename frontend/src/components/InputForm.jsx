import { Fragment, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000'); // back end server

const MessageInputTest = () => {
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState('1');

  useEffect(() => {
    socket.on('new_message', (data) => {
      // do stuff here when data comes back from the server
    });
  }, [socket]);

  const handleClick = (e) => {
    socket.emit('message_sent', message);
  };

  const joinChannel = (e) => {
    socket.emit('join_channel', channel);
  };

  return (
    <>
      <button onClick={joinChannel} type="button">
        Join Channel 1
      </button>
      <input
        type="text"
        placeholder="Your message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button type="button" onClick={handleClick}>
        Send message
      </button>
    </>
  );
};

export default MessageInputTest;
