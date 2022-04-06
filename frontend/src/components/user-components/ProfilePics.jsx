import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { getNonConvoUsers } from '../../context/actions';

const ROOT_URL = process.env.REACT_APP_ROOT_SERVER_URL;

function ProfilePics() {
  const { conversationId } = useParams();
  const [pics, setPics] = useState([]);
  const [showPics, setShowPics] = useState([]);
  const [modal1, setModal1] = useState(false);

  const [nonUsers, setNonUsers] = useState([]);
  const [modal2, setModal2] = useState(false);

  useEffect(() => {
    setModal1(false);
    setModal2(false);
  }, [conversationId]);

  const token = localStorage.getItem('token');
  const headerConfig = {
    headers: { Authorization: `Bearer ${token}` },
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
        setShowPics(data.slice(0, 5));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let cancel = false;
    getPics().then(() => {
      // eslint-disable-next-line no-useless-return
      if (cancel) return;
    });

    return () => {
      cancel = true;
    };
  }, [conversationId]);

  const handleModal1Click = () => {
    setModal1(!modal1);
    setModal2(false);
  };

  // These are only the first few images to show - like Slack does
  const images = showPics.map((user, i) => (
    <Imgs src={user.image_url} key={i} alt="user" />
  ));

  const personMap = pics.map((user, i) => (
    <ListItem key={i * 57890}>
      <Imgs src={user.image_url} alt="user" />
      <Name>{user.name}</Name>
    </ListItem>
  ));

  const number = pics.length;

  const handleAddUserClick = async () => {
    getNonConvoUsers(conversationId).then((res) => setNonUsers(res));
    setModal2(!modal2);
    console.log(nonUsers);
  };

  const nonUserMap = nonUsers.map((user, i) => (
    <ListItem key={i} userId={user.user_id}>
      <Imgs src={user.image_url} alt="user" />
      <Name>{user.name}</Name>
    </ListItem>
  ));

  return (
    <>
      <Container onClick={handleModal1Click}>
        <InnerContainer>
          {images}
          <Number>{number}</Number>
        </InnerContainer>
      </Container>
      {modal1 && number >= 5 && (
        <Modal>
          <Button onClick={() => handleAddUserClick()}>
            Add Users to Channel
          </Button>
          <List>{personMap}</List>
        </Modal>
      )}
      {modal1 && number < 5 && (
        <Modal>
          <List>{images}</List>
        </Modal>
      )}
      {modal2 && (
        <Modal2>
          <List>{nonUserMap}</List>
        </Modal2>
      )}
    </>
  );
}

const Container = styled.div`
  margin: 2rem;
  cursor: pointer;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 1rem;
  padding-left: 1rem;
  background-color: #e9eff6;
  border-radius: 12px;
`;

const Modal = styled.div`
  background-color: #1e1926;
  position: fixed;
  padding: 2rem 1rem;
  top: 100px;
  right: 80px;
  box-sizing: border-box;
  border-radius: 20px;
  height: 600px;
  overflow-y: auto;
`;

const Modal2 = styled.div`
  background-color: #1e1926;
  position: fixed;
  padding: 2rem 1rem;
  top: 100px;
  left: 40%;
  box-sizing: border-box;
  border-radius: 20px;
  height: 600px;
  overflow-y: auto;
`;

const Imgs = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  margin-right: -0.9rem;
  border: 3px solid #fdf2e9;
  max-width: 100%;
`;

const Number = styled.p`
  font-size: 1.4rem;
  margin: 1rem;
`;

const Name = styled.p`
  font-size: 1.4rem;
  margin: 1rem;
  color: white;
`;

const List = styled.ul`
  padding-left: 1rem;
`;
const ListItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const Button = styled.button`
  margin-top: 4rem;
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

export default ProfilePics;
