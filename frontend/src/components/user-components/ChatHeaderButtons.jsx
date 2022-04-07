import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import AddBox from '@material-ui/icons/AddBox';
import AddIcon from '@material-ui/icons/Add';

import { getNonConvoUsers, addChannelUser } from '../../context/actions';
import { Modal, List, ListItem, Imgs, Name } from './ProfilePics';

const ChatHeaderButtons = ({ getPics, getChannels }) => {
  const { conversationId } = useParams();
  const [nonUsers, setNonUsers] = useState([]);
  const [modal2, setModal2] = useState(false);
  const [leaveModal, setLeaveModal] = useState(false);

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
        getChannels();
      } else {
        // what should happen
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNonUserClick = (userId) => {
    addChannelUser(conversationId, userId);
    getNonConvoUsers(conversationId).then((res) => {
      setNonUsers(res);
      getPics();
    });
  };

  const handleLeaveClick = () => {
    setLeaveModal(!leaveModal);
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
      <Button onClick={() => handleLeaveChannel()}>Leave</Button>
      <Button onClick={() => handleAddUserClick()}>
        <AddIcon /> Users
      </Button>
      {modal2 && nonUsers.length > 0 && (
        <Modal>
          <AddUserTitle>Add Users</AddUserTitle>
          <List>{nonUserMap}</List>
        </Modal>
      )}
      {modal2 && nonUsers.length === 0 && (
        <EmptyModal>
          <AddUserTitle>No Users to Add!</AddUserTitle>
        </EmptyModal>
      )}
      {leaveModal && (
        <LeaveModal>
          <AddUserTitle>Are you sure?</AddUserTitle>
          <button
            onClick={() => setLeaveModal(!leaveModal)}
            type="button"
            className="btn btn-danger btn-sm"
          >
            No
          </button>
          <button
            onClick={() => handleLeaveChannel()}
            type="button"
            className="btn btn-danger btn-sm"
          >
            Yes
          </button>
        </LeaveModal>
      )}
    </ButtonDiv>
  );
};

ChatHeaderButtons.propTypes = {
  getPics: PropTypes.func,
  getChannels: PropTypes.func,
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

const EmptyModal = styled.div`
  background-color: #1e1926;
  position: fixed;
  padding: 2rem 1rem;
  top: 100px;
  right: 80px;
  box-sizing: border-box;
  border-radius: 20px;
  height: 100px;
  overflow-y: auto;
`;

const LeaveModal = styled.div`
  background-color: #1e1926;
  position: fixed;
  padding: 2rem 1rem;
  top: 100px;
  right: 100px;
  box-sizing: border-box;
  border-radius: 20px;
  height: 200px;
  overflow-y: auto;
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
