import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProfilePics({ pics, showPics, getPics }) {
  const { conversationId } = useParams();
  const [modal1, setModal1] = useState(false);

  // This is to allow closing by clicking anywhere outside the modal
  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.path[1].localName !== 'button') {
        setModal1(false);
      }
    };
    document.body.addEventListener('click', closeDropdown);
    return () => {
      document.body.removeEventListener('click', closeDropdown);
    };
  }, []);

  useEffect(() => {
    let cancel = false;
    setModal1(false);
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
          <Header>Channel Members</Header>
          <List>{personMap}</List>
        </Modal>
      )}
      {modal1 && number < 5 && (
        <Modal>
          <Header>Channel Members</Header>
          <List>{imagesFew}</List>
        </Modal>
      )}
    </>
  );
}

ProfilePics.propTypes = {
  pics: PropTypes.array,
  showPics: PropTypes.array,
  getPics: PropTypes.func,
};

const Container = styled.div`
  position: absolute;
  top: 19px;
  right: 200px;
  margin: 2rem;
  cursor: pointer;
`;

const InnerContainer = styled.button`
  display: flex;
  background: white;
  justify-content: center;
  align-items: center;
  height: 52px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 12px;
  border: 3px solid #c3dcdf;
  cursor: pointer;
`;

export const Modal = styled.div`
  background-color: rgba(30, 25, 38, 0.8);
  position: fixed;
  padding: 1.6rem 1rem;
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
  border-radius: 20%;
  margin-right: -0.9rem;
  border: 5px solid white;
  max-width: 100%;
  background-color: #c3dcdf;
`;

const Number = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  margin: 1rem;
  margin-left: 2rem;
  color: rgba(30, 25, 38, 0.8);
`;

const Header = styled.p`
  margin: 1rem;
  margin-bottom: 1.6rem;
  color: white;
  font-weight: 600;
  font-size: 1.6rem;
  text-align: center;
`;

export const Name = styled.p`
  font-size: 1.4rem;
  margin-left: 1rem;
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
