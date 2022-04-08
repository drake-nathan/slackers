import styled from 'styled-components';
import PropTypes from 'prop-types';

const ChatMessage = ({ text, name, timestamp, image }) => {
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
    <OuterContainer>
      <Container>
        <UserAvatar>
          <img src={image} alt="avatar" />
        </UserAvatar>
        <MessageContent>
          <Name>
            {name}
            <TimeSpan>{timeString}</TimeSpan>
          </Name>
          <Text>{text}</Text>
        </MessageContent>
      </Container>
      <HorizontalRule />
      <DateSpan>{dateString}</DateSpan>
    </OuterContainer>
  );

  // return (
  //   <Container>
  //     <UserAvatar>
  //       <img src={image} alt="avatar" />
  //     </UserAvatar>
  //     <MessageContent>
  //       <Name>
  //         {name}
  //         <span>
  //           {dateString} {timeString}
  //         </span>
  //       </Name>
  //       <Text>{text}</Text>
  //     </MessageContent>
  //   </Container>
  // );
};

ChatMessage.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  timestamp: PropTypes.string,
  image: PropTypes.string,
};

export default ChatMessage;

const Container = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  height: 64px;
`;

const OuterContainer = styled.div`
  width: 100%;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  margin: 2.4rem;
`;
const TimeSpan = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  margin-left: 1.4rem;
`;

const DateSpan = styled.p`
  text-align: center;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 20px;
  width: 200px;
  margin: 0 auto;
  margin-top: -3.1rem;
`;
const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  overflow: hidden;
  background-color: #e9eff6;
  // border: 1px solid;
  border-color: #646464;

  img {
    width: 100%;
  }
`;

const Name = styled.span`
  font-weight: 900;
  font-size: 15px;
  line-height: 1.4;
  margin-bottom: 0.6rem;
  margin-right: 2rem;
  // span {
  //   font-weight: 400;
  //   color: #272727;
  //   margin-left: 10px;
  // }
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const Text = styled.span``;
