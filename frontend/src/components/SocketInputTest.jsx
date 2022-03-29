import { Fragment, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000'); // back end server

const MessageInputTest = () => {
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState('1');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('new_message', (data) => {
      console.log(data);
      setMessages([...messages, data]);
    });
  }, []);

  const handleClick = (e) => {
    socket.emit('message_sent', message, channel);
  };

  const joinChannel = (e) => {
    socket.emit('join_channel', channel);
  };

  return (
    <>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>{m}</li>
        ))}
      </ul>
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
