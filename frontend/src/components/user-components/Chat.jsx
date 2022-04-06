import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

import AddBox from '@material-ui/icons/AddBox';
import { addChannelUser, getNonConvoUsers } from '../../context/actions';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ProfilePics from './ProfilePics';


function Chat({ channel, channels, setSelectedChannel }) {
  const { conversationId } = useParams();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [socketTrigger, setSocketTrigger] = useState({});
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem('token');
  const headerConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getMessages = async () => {
    try {
      const request = axios.get(
        `${process.env.REACT_APP_ROOT_SERVER_URL}/api/conversations/${conversationId}/messages`,
        headerConfig
      );

      const data = await request;

      if (data) {
        setMessages(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const checkState = async (state) => {};

  useEffect(() => {
    setLoading(false);
  }, [channel]);

  useEffect(() => {
    setSelectedChannel(
      channels.filter((ch) => ch.conversation_id === conversationId)
    );
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getMessages();
  }, [conversationId]);

  useEffect(() => {
    if (
      messages.length &&
      messages[0].conversation_id === parseInt(conversationId)
    ) {
      setSocketTrigger({ ready: true });
    }
  }, [messages]);

  useEffect(() => {
    if (socketTrigger.ready) {
      if (socket) {
        socket.emit('join_channel', conversationId);
      } else {
        const connection = io(process.env.REACT_APP_ROOT_SERVER_URL);
        connection.once('connect', () => {
          connection.on('new_message', (data) => {
            debugger;
            if (data.conversation_id === parseInt(conversationId)) {
              setMessages((mgs) => [...mgs, data]);
            }
          });
          connection.emit('join_channel', conversationId);
          setSocket(connection);
        });
      }
    }
  }, [socketTrigger]);

  const loadChannelInfo = () => {
    if (loading) {
      return <h3 className="text-center">Loading...</h3>;
    }
    return (
      <>
        <ChannelName># {channel.name || ''}</ChannelName>
        <ChannelInfo>{channel.description}</ChannelInfo>
      </>
    );
  };

  let [users, setUsers] = useState([]);

  const handleClick = async () => {
    console.log('hey')
    users = await getNonConvoUsers(conversationId);
    console.log(users);
    setUsers(users);
  };

  const handleUserClick = async (userObj) => {
    addChannelUser(conversationId, userObj.user_id);
  };

  const UserList = (() => {
    if (users.length > 0) {
      return (
        <ul>
          {users.map((userObj, i) => (
            <li onClick={() => handleUserClick(userObj)} tabIndex={1} key={i}>
              {userObj.name}
            </li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  })

  return (
    <Container>
      <Header>
        <Channel>{loadChannelInfo()}</Channel>
        <ProfilePics />
        <AddButton>
          <AddBox onClick={() => handleClick()} />
        </AddButton>
      </Header>
      <MessageContainer>
        {messages.length > 0 &&
          messages.map((data, index) => (
            <ChatMessage
              key={index}
              text={data.text}
              name={data.name}
              timestamp={data.createddate}
            />
          ))}
        <div ref={messagesEndRef} />
      </MessageContainer>
      <ChatInput
        socket={socket}
        messages={messages}
        setMessages={setMessages}
      />
    </Container>
  );
}

Chat.propTypes = {
  channel: PropTypes.object,
  channels: PropTypes.array,
  setSelectedChannel: PropTypes.func,
};

export default Chat;

const AddButton = styled.div`
  color: black;
  fill: #0f2f81;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 64px auto min-content;
  min-height: 0;
`;

const Header = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(83, 39, 83, 0.13);
  justify-content: space-between;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  overflow-y: scroll;
`;

const Channel = styled.div``;

const ChannelName = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: #f7969e;
`;

const ChannelInfo = styled.div`
  font-weight: 500;
  color: #606060;
  font-size: 13px;
  margin-top: 4px;
`;
