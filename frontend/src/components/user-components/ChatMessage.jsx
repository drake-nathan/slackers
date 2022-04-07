/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const ChatMessage = ({ text, name, timestamp }) => {
  const date = new Date(timestamp);
  const dateString = new Date(timestamp).toDateString();
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  const offset = -480;
  const estDate = new Date(date.getTime() + offset * 60 * 1000);
  const timeString = estDate.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <Container>
      {/* <UserAvatar>
      <img src={image} alt="avatar" />
    </UserAvatar> */}
      <MessageContent>
        <Name>
          {name}
          <span>
            {dateString} {timeString}
          </span>
        </Name>
        <Text>{text}</Text>
      </MessageContent>
    </Container>
  );
};

export default ChatMessage;

const Container = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  height: 64px;
`;

const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const Name = styled.span`
  font-weight: 900;
  font-size: 15px;
  line-height: 1.4;
  span {
    font-weight: 400;
    color: #272727;
    margin-left: 10px;
  }
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const Text = styled.span``;
