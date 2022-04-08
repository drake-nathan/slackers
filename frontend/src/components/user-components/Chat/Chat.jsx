import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ProfilePics from './ProfilePics';
import ChatHeaderButtons from './ChatHeaderButtons';

function Chat({ getChannels }) {
  const { conversationId } = useParams();
  const channelIdRef = useRef(null);
  channelIdRef.current = conversationId;
  const messagesEndRef = useRef(null);

  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [pics, setPics] = useState([]);
  const [showPics, setShowPics] = useState([]);

  const ROOT_URL = process.env.REACT_APP_ROOT_SERVER_URL;

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

      const { data, status } = await request;
      if (data[0].type === 'dm') {
        const dmRequest = axios.get(
          `${process.env.REACT_APP_ROOT_SERVER_URL}/api/conversations/${conversationId}/other-dm-user`,
          headerConfig
        );

        const dmDataResponse = await dmRequest;
        if (dmDataResponse.status === 200) {
          setCurrentConversation(dmDataResponse.data[0]);
        }
      }
      if (data && data[0].type !== 'dm' && status === 200) {
        setCurrentConversation(data[0]);
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
    deadSocket.once('connect', () => {
      deadSocket.on('new_message', (data) => {
        console.log(data);
        if (data.conversation_id === parseInt(channelIdRef.current)) {
          setMessages((mgs) => [...mgs, data]);
        }
      });
      deadSocket.emit('join_channel', channelIdRef.current);
      setSocket(deadSocket);
    });
  };

  useEffect(() => {
    if (socket) {
      socket.emit('join_channel', conversationId);
    }
    getMessages();
    getConversation();
  }, [conversationId]);

  useEffect(() => {
    const connection = io(process.env.REACT_APP_ROOT_SERVER_URL);
    socketPreConnectSetup(connection);
    return () => {
      socket.off();
      socket.disconnect();
    };
  }, []);

  const getChannelStuff = () => {
    if (currentConversation) {
      return (
        <>
          <ChannelName># {currentConversation.name}</ChannelName>
          <ChannelInfo>{currentConversation.description}</ChannelInfo>
        </>
      );
    }
    return <ChannelName>'Channel'</ChannelName>;
  };

  const getPics = async () => {
    try {
      const request = axios.get(
        `${ROOT_URL}/api/conversations/${conversationId}/users`,
        headerConfig
      );

      const { data } = await request;

      if (data) {
        setPics(data);
        setShowPics(data.slice(0, 3));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <ChatHeader>
        <Channel>{getChannelStuff()}</Channel>
        <ProfilePics pics={pics} showPics={showPics} getPics={getPics} />
        <ChatHeaderButtons getPics={getPics} getChannels={getChannels} />
      </ChatHeader>
      <MessageContainer>
        {messages.length > 0 &&
          messages.map((data, i) => (
            <ChatMessage
              key={i}
              text={data.text}
              name={data.name}
              timestamp={data.createddate}
              image={data.image_url}
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
  getChannels: PropTypes.func,
};

export default Chat;

const Container = styled.div`
  display: grid;
  grid-template-rows: 80px auto min-content;
  min-height: 0;
  margin-bottom: 5rem;
`;

const ChatHeader = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(83, 39, 83, 0.13);
  justify-content: space-between;
  box-sizing: border-box;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  overflow-y: auto;
`;

const Channel = styled.div``;

const ChannelName = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: #272727;
  margin-top: 10px;
`;

const ChannelInfo = styled.div`
  font-weight: 500;
  color: #606060;
  font-size: 12px;
  margin: 4px 0;
  max-width: 90%;
  line-height: 1.2;
`;
