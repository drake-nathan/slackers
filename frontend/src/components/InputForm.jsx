/* eslint-disable import/no-relative-packages */
import { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
import styled from 'styled-components';
import { FaRegPaperPlane } from 'react-icons/fa';
import GlobalStyle from '../globalStyles';

const moment = require('moment');

// eslint-disable-next-line react/prop-types
const Chat = () => {
  const date = moment().format('MMMM Do YYYY, h:mm a');
  const messagesEndRef = useRef(null);
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
  const [error, setError] = useState(false);

  const chatWindow = () =>
    chat.map((m, i) => (
      <ChatWindow key={i} id={i}>
        <p>
          {m.userName} - {date}
        </p>
        <p>
          <small>{m.text}</small>
        </p>
      </ChatWindow>
    ));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const sendMsg = (newMsg) => {
    setChat((previousMsgs) => [...previousMsgs, newMsg]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message) {
      // alert('enter text');
      setError(true);
    } else {
      sendMsg({
        user: 'Username',
        text: message,
        time: date,
      });
      const elem = document.getElementById('message-form');
      elem.reset();
      setMessage('');
      scrollToBottom();
    }
  };

  return (
    <Container>
      <GlobalStyle />
      <div className="col-md-6">
        {chatWindow()}
        <Form
          // className="form-inline"
          id="message-form"
          onSubmit={handleSendMessage}
        >
          <MessageInput
            className="form-control"
            type="text"
            placeholder="Send a Message"
            onChange={(event) => setMessage(event.target.value)}
          />
          {error && <p>Please enter message text</p>}
          <SendButton type="submit" className="btn btn-primary">
            <FaRegPaperPlane />
          </SendButton>
        </Form>
      </div>
    </Container>
  );
};

const InputForm = () => (
  <>
    <ChatHeader>Channel Name</ChatHeader>
    <Chat />
  </>
);

const Container = styled.div``;

const Form = styled.form``;

const SendButton = styled.button`
  color: #3c15d6;
  font-size: 1em;
  margin: 0.1em;
  padding: 0.25em 1em;
  border: 2px solid #3c15d6;
  border-radius: 8px;
`;

const MessageInput = styled.input`
  width: 50%;
  height: 120px;
  padding: 1rem;
  margin: 0.5em 0em 0.5em 20em;
  color: lightgrey;
  background: white;
  font-size: 1.2rem;
  font-style: italic;
  border: 1px solid #3c15d6;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  position: absolute;
  outline: none;
  bottom: 5%;
  left: 5%;
`;

const ChatWindow = styled.div`
  padding: 0.5em 2rem;
  margin: 0em 0em 2rem 16.75em;
  border-radius: 15px;
  background: #fafafa;
  border-bottom: 1px solid lightgrey;
  width: 70%;
`;

const ChatHeader = styled.h1`
  padding: 1rem 0 1rem 18rem;
  margin-top: 0;
  margin-bottom: 3rem;
  background: #ffffff;
  color: #131926;
  border-bottom: 1px solid #3c15d6;
`;

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
