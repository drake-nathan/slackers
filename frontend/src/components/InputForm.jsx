import { useState } from 'react';
// import io from 'socket.io-client';
import styled from 'styled-components';
import { FaRegPaperPlane } from 'react-icons/fa';

const moment = require('moment');

const SendButton = styled.button`
  color: green;
  font-size: 1em;
  margin: 0.1em;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 3px;
`;

const MessageInput = styled.input`
  width: 600px;
  padding: 0.5em;
  margin: 0.5em 0em 0.5em 20em;
  color: black;
  background: white;
  border: none;
  border-radius: 3px;
`;

const ChatWindow = styled.div`
  padding: 0.5em;
  margin: 0em 0em 0em 16.75em;
  background: #e8e6df;
  border: none;
`;

const ChatHeader = styled.h1`
  padding: 0.5em;
  margin: 0em 0em 0em 8em;
  background: #e8e6df;
  border: none; ;
`;

// eslint-disable-next-line react/prop-types
const Chat = () => {
  const date = moment().format('MMMM Do YYYY, h:mm a');

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    {
      user: 'User1',
      text: 'Hello',
      time: date,
    },
    {
      user: 'User2',
      text: 'Good day',
      time: date,
    },
  ]);

  const chatWindow = () =>
    chat.map((m, i) => (
      <ChatWindow key={i}>
        <p>
          {m.user} - {m.time}
        </p>
        <p>
          <small>{m.text}</small>
        </p>
      </ChatWindow>
    ));

  const sendMsg = (newMsg) => {
    setChat((previousMsgs) => [...previousMsgs, newMsg]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message) {
      alert('enter text');
    } else {
      sendMsg({
        user: 'Username',
        text: message,
        time: date,
      });
      document.getElementById('message-form').reset();
      setMessage('');
    }
  };
  return (
    <div className="container">
      <div className="col-md-6">
        {chatWindow()}
        <form
          className="form-inline"
          id="message-form"
          onSubmit={handleSendMessage}
        >
          <MessageInput
            className="form-control"
            type="text"
            placeholder="Send a Message"
            onChange={(event) => setMessage(event.target.value)}
          />
          <SendButton type="submit" className="btn btn-primary">
            <FaRegPaperPlane />
          </SendButton>
        </form>
      </div>
    </div>
  );
};

const InputForm = () => (
  <>
    <ChatHeader>Channel Name</ChatHeader>
    <Chat />
  </>
);

export default InputForm;

// const socket = io.connect('http://localhost:8000'); // back end server

// const MessageInputTest = () => {
//   const [message, setMessage] = useState('');
//   const [channel, setChannel] = useState('1');

//   const handleClick = (e) => {
//     socket.emit('message_sent', message);
//   };

//   const joinChannel = (e) => {
//     socket.emit('join_channel', channel);
//   };

//   return (
//     <>
//       <button onClick={joinChannel} type="button">
//         Join Channel 1
//       </button>
//       <input
//         type="text"
//         placeholder="Your message"
//         onChange={(e) => {
//           setMessage(e.target.value);
//         }}
//       />
//       <button type="button" onClick={handleClick}>
//         Send message
//       </button>
//     </>
//   );
// };
