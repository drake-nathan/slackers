import React, { useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ReactDom from 'react-dom';
import { useAuthDispatch, logout } from '../../context';

function Menu() {
  const dispatch = useAuthDispatch();
  const history = useHistory();

  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      // setShowModal(false);
    }
  };

  const username =
    JSON.parse(localStorage.getItem('currentUser')).user.name || '';

  const handleLogout = () => {
    console.log(username);
    logout(dispatch);
    history.push('/');
  };
  //   return (
  //     <Container>
  //       <Name>{username}</Name>
  //       <Button onClick={handleLogout}>Logout</Button>
  //     </Container>
  //   );
  // }

  return ReactDom.createPortal(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <Backdrop ref={modalRef} onClick={closeModal}>
      <Container>
        <Name>{username}</Name>
        <Button onClick={handleLogout}>Logout</Button>
      </Container>
    </Backdrop>,
    document.getElementById('portal')
  );
}

const Backdrop = styled.div`
  position: fixed;
  top: 40px;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 40px;
  right: 20px;
  min-width: 250px;
  border-radius: 10px;
  background-color: #1e1926;
  color: white;
  box-sizing: border-box;
  z-index: 999;
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

const Name = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  color: white;
  padding: 1rem;
  text-align: center;
  margin: 0 auto;
  overflow-wrap: break-word;
`;

export default Menu;
