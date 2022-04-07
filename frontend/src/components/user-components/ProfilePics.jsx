import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ROOT_URL = process.env.REACT_APP_ROOT_SERVER_URL;

function ProfilePics() {
  const { conversationId } = useParams();
  const [pics, setPics] = useState([]);
  const [showPics, setShowPics] = useState([]);
  const [modal1, setModal1] = useState(false);

  useEffect(() => {
    setModal1(false);
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
  };

  // These are only the first few images to show - like Slack does
  const images = showPics.map((user, i) => (
    <Imgs src={user.image_url} key={i} alt="user" />
  ));

  const imagesFew = showPics.map((user, i) => (
    <ListItem key={i * 740}>
      <Imgs src={user.image_url} alt="user" />
    <Name>{user.name}</Name>
  </ListItem>
  ));

  const personMap = pics.map((user, i) => (
    <ListItem key={i * 57890}>
      <Imgs src={user.image_url} alt="user" />
      <Name>{user.name}</Name>
    </ListItem>
  ));

  const number = pics.length;

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
          <List>{personMap}</List>
        </Modal>
      )}
      {modal1 && number < 5 && (
        <Modal>
          <List>{imagesFew}</List>
        </Modal>
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

export const Modal = styled.div`
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

export const Imgs = styled.img`
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

export const Name = styled.p`
  font-size: 1.4rem;
  margin: 1rem;
  color: white;
`;

export const List = styled.ul`
  padding-left: 1rem;
`;

export const ListItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

export default ProfilePics;
