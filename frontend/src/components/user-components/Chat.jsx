import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ProfilePics from './ProfilePics';

function Chat() {
  const { conversationId } = useParams();
  const channelIdRef = useRef(null);
  channelIdRef.current = conversationId;
  const messagesEndRef = useRef(null);

  const [currentChannel, setCurrentChannel] = useState();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [socketTrigger, setSocketTrigger] = useState({});

  const token = localStorage.getItem('token');
  const headerConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getConversation = async () => {
    try {
      const request = axios.get(
        `${process.env.REACT_APP_ROOT_SERVER_URL}/api/conversations/${conversationId}`,
        headerConfig
      );

      const { data } = await request;

      if (data.status === 200) {
        setCurrentChannel(data[0]);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const request = axios.get(
        `${process.env.REACT_APP_ROOT_SERVER_URL}/api/conversations/${channelIdRef.current}/messages`,
        headerConfig
      );

      const data = await request;

      if (data.status === 200) {
        setMessages(data.data);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const socketPreConnectSetup = (deadSocket) => {
    deadSocket.on('connect', () => {
      deadSocket.on('new_message', (data) => {
        if (data.conversation_id === parseInt(channelIdRef.current)) {
          setMessages((mgs) => [...mgs, data]);
        }
      });
      deadSocket.emit('join_channel', channelIdRef.current);
      setSocket(deadSocket);
    });
  };

  useEffect(() => {
    getMessages();
    getConversation();
  }, [conversationId]);

  useEffect(() => {
    if (
      messages.length &&
      messages[0].conversation_id === parseInt(channelIdRef.current)
    ) {
      setSocketTrigger({ ready: true });
    }
  }, [messages]);

  useEffect(() => {
    if (socketTrigger.ready) {
      if (socket) {
        socket.emit('join_channel', channelIdRef.current);
      } else {
        const connection = io(process.env.REACT_APP_ROOT_SERVER_URL);
        socketPreConnectSetup(connection);
        connection.on('disconnect', () => {
          socketPreConnectSetup(connection);
          connection.connect();
        });
      }
    }
  }, [socketTrigger]);

  return (
    <Container>
      <Header>
        <Channel>
          <ChannelName>{currentChannel ? currentChannel.name : ''}</ChannelName>
          <ChannelInfo>
            {currentChannel ? currentChannel.description : ''}
          </ChannelInfo>
        </Channel>
        <ProfilePics />
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

// Chat.propTypes = {};

export default Chat;

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
  color: #272727;
`;

const ChannelInfo = styled.div`
  font-weight: 500;
  color: #606060;
  font-size: 13px;
  margin-top: 4px;
`;
