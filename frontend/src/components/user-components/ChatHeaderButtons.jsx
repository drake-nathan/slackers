import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import AddBox from '@material-ui/icons/AddBox';
import AddIcon from '@material-ui/icons/Add';

import { getNonConvoUsers, addChannelUser } from '../../context/actions';
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

  const handleNonUserClick = (userId) => {
    addChannelUser(conversationId, userId);
    getNonConvoUsers(conversationId).then((res) => setNonUsers(res));
  };

  const nonUserMap = nonUsers.map((user, i) => (
    <ListItem key={i} userId={user.user_id}>
      <Imgs src={user.image_url} alt="user" />
      <Name>{user.name}</Name>
      <AddButton>
        <AddBox onClick={() => handleNonUserClick(user.user_id)} />
      </AddButton>
    </ListItem>
  ));

  return (
    <ButtonDiv>
      <Button onClick={() => handleLeaveChannel()}>Leave Chat</Button>
      <Button onClick={() => handleAddUserClick()}>
        <AddIcon /> People
      </Button>
      {modal2 && (
        <Modal>
          <AddUserTitle>Add Users</AddUserTitle>
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

const AddUserTitle = styled.div`
  color: white;
  align-items: center;
  font-size: 30px;
  text-align: center;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  color: white;
  background: #f7969e;
  border-radius: 4px;
  width: 80px;
  height: 32px;
  display: flex;
  font-size: 13px;
  font-weight: 500;
  align-items: center;
  border: none;
  justify-content: center;
  margin-right: 5px;
  cursor: pointer;
  transform: 0.4s ease-out;
  &:hover {
    background-color: #d4838a;
  }
`;
