import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import AddBox from '@material-ui/icons/AddBox';
import AddIcon from '@material-ui/icons/Add';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GlobalStyles from '../../../globalStyles';

import { getNonConvoUsers, addChannelUser } from '../../../context/actions';
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

  // This is to allow closing of the Leave Btn by clicking anywhere outside the modal
  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.path[0].localName !== 'button') {
        setLeaveModal(false);
      }
    };
    document.body.addEventListener('click', closeDropdown);
    return () => {
      document.body.removeEventListener('click', closeDropdown);
    };
  }, []);

    // This is to allow closing of the Add User Btn by clicking anywhere outside the modal. I know repetitive code - ugh!
    useEffect(() => {
      const closeDropdown = (e) => {
        if (e.path[0].localName !== 'button') {
          setModal2(false);
        }
      };
      document.body.addEventListener('click', closeDropdown);
      return () => {
        document.body.removeEventListener('click', closeDropdown);
      };
    }, []);

  const nonUserMap = nonUsers.map((user, i) => (
    <ListItem key={i} userId={user.user_id}>
      <InnerRow>
        <Imgs src={user.image_url} alt="user" />
        <Name>{user.name}</Name>
        <AddButton>
          <AddBox onClick={() => handleNonUserClick(user.user_id)} />
        </AddButton>
      </InnerRow>
    </ListItem>
  ));

  return (
    <ButtonDiv>
      <GlobalStyles />
      <Button title="Add People to Channel" onClick={handleAddUserClick}>
        <AddIcon /> <PeopleIcon />
      </Button>
      <Button title="Leave Channel" onClick={handleLeaveClick}>
        <ExitToAppIcon />
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
          <Text>Leaving a channel may be permanent.</Text>
          <LeaveBtn
            onClick={handleLeaveChannel}
            type="button"
            // className="btn btn-danger btn-sm"
          >
            Leave Channel
          </LeaveBtn>
          <CancelBtn
            onClick={() => setLeaveModal(!leaveModal)}
            type="button"
            // className="btn btn-danger btn-sm"
          >
            CANCEL
          </CancelBtn>
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

const InnerRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

const AddButton = styled.div`
  color: white;
  margin-right: 20px;
  cursor: pointer;
  margin-left: auto;
  transition: 0.4s;
  &:hover {
    background-color: #1748c6;
  }
`;

const EmptyModal = styled.div`
  background-color: #1e1926;
  position: fixed;
  padding: 2rem 1rem;
  top: 100px;
  right: 80px;
  box-sizing: border-box;
  border-radius: 20px;
  height: 200px;
`;

const LeaveModal = styled.div`
  background-color: #1e1926;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  padding: 2rem 1rem;
  top: 100px;
  right: 100px;
  box-sizing: border-box;
  border-radius: 20px;
  height: 250px;
`;

const AddUserTitle = styled.div`
  color: white;
  align-items: center;
  font-size: 1.8rem;
  text-align: center;
  margin-top: 1.4rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 25px;
`;

const Button = styled.button`
  color: white;
  background: #f7969e;
  border-radius: 4px;
  width: 60px;
  height: 32px;
  display: flex;
  padding: 2px;
  font-size: 1rem;
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

const LeaveBtn = styled.button`
  color: white;
  background: #0063b2;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  width: 60%;
  height: 32px;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  align-items: center;
  border: none;
  justify-content: center;
  cursor: pointer;
  transform: 0.4s ease-out;
  &:hover {
    border: 1px solid white;
    border-offset: 10px;
  }
`;

const CancelBtn = styled.button`
  color: white;
  background: red;
  border-radius: 10px;
  letter-spacing: 0.3px;
  width: 60%;
  height: 35px;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  align-items: center;
  border: none;
  justify-content: center;
  margin-bottom: 1.4rem;
  cursor: pointer;
  transform: 0.4s ease-out;
  &:hover {
    border: 1px solid white;
  }
`;

const Text = styled.p`
  color: white;
  font-size: 1rem;
  word-wrap: wrap;
`;
