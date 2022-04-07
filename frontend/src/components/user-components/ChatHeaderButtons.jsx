import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

import { getNonConvoUsers } from '../../context/actions';
import { Modal, List, ListItem, Imgs, Name } from './ProfilePics';

const ChatHeaderButtons = () => {
  const { conversationId } = useParams();
  const [nonUsers, setNonUsers] = useState([]);
  const [modal2, setModal2] = useState(false);

  const history = useHistory();

  const token = localStorage.getItem('token');
  const headerConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleAddUserClick = async () => {
    getNonConvoUsers(conversationId).then((res) => setNonUsers(res));
    setModal2(!modal2);
    console.log(nonUsers);
  };

  const handleLeaveChannel = async () => {
    try {
      const request = axios.delete(
        `${process.env.REACT_APP_ROOT_SERVER_URL}/api/conversations/${conversationId}/users`,
        headerConfig
      );

      const { status } = await request;
      if (status === 200) {
        history.push('/user');
      } else {
        // what should happen
      }
    } catch (error) {
      console.log(error);
    }
  };

  const nonUserMap = nonUsers.map((user, i) => (
    <ListItem key={i} userId={user.user_id}>
      <Imgs src={user.image_url} alt="user" />
      <Name>{user.name}</Name>
      <AddButton>
        <AddOutlinedIcon />
      </AddButton>
    </ListItem>
  ));

  return (
    <ButtonDiv>
      <Button onClick={() => handleLeaveChannel()}>Leave</Button>
      <Button onClick={() => handleAddUserClick()}>Add</Button>
      {modal2 && (
        <Modal>
          <List>{nonUserMap}</List>
        </Modal>
      )}
    </ButtonDiv>
  );
};

export default ChatHeaderButtons;

const AddButton = styled.div`
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

const ButtonDiv = styled.div`
  justify-content: space-between;
  align-items: center;
  width: 200px;
`;

const Button = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  text-align: center;
  display: flex;
  justify-content: center;
  letter-spacing: 0.5px;
  width: 90%;
  padding: 0.6rem 3.5rem;
  border-radius: 10px;
  background-color: #0063b2;
  border: none;
  outline: none;
  box-shadow: none;
  text-transform: uppercase;
  box-sizing: border-box;
  cursor: pointer;
  transform: 0.4s ease-out;
  &:hover {
    background-color: #b7a2d7;
  }
`;
