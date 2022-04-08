import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from 'prop-types';

const ChatInput = ({ socket }) => {
  const [input, setInput] = useState('');
  const { conversationId } = useParams();

  const submitMessage = (e) => {
    e.preventDefault();

    if (!input) return;
    if (input.trim().length === 0) {
      setInput('');
      return;
    }

    try {
      socket.send(
        JSON.parse(localStorage.getItem('currentUser')).user.user_id,
        input,
        conversationId
      );
    } catch (error) {
      console.log(error);
    }
    setInput('');
  };

  return (
    <Container>
      <InputContainer>
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message here..."
          />
          <SendButtton type="submit" onClick={submitMessage}>
            <SendIcon />
          </SendButtton>
        </form>
      </InputContainer>
    </Container>
  );
};

ChatInput.propTypes = {
  socket: PropTypes.object,
};

export default ChatInput;

const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: -40px;
`;

const InputContainer = styled.div`
  border: 1px solid #0063b2;
  border-radius: 4px;
  margin-top: 30px;

  form {
    display: flex;
    height: 42px;
    align-items: center;
    padding-left: 10px;
    input {
      flex: 1;
      border: none;
      outline: none;
      color: #1e1926;
      font-weight: 300;
      font-size: 15px;
    }
  }
`;

const SendButtton = styled.button`
  color: white;
  background: #f7969e;
  border-radius: 2px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  border: none;
  justify-content: center;
  margin-right: 5px;
  cursor: pointer;

  .MuiSvgIcon-root {
    width: 20px;
  }
`;
