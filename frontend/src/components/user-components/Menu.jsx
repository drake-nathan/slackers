import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useAuthDispatch, logout } from '../../context';

function Menu() {
  const dispatch = useAuthDispatch();

  const history = useHistory();
  const username =
    JSON.parse(localStorage.getItem('currentUser')).user.name || '';

  const handleLogout = () => {
    console.log(username);
    logout(dispatch);
    history.push('/');
  };
  return (
    <Container>
      <Name>Hello {username}</Name>
      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 40px;
  right: 20px;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  background-color: #1e1926;
  color: white;
  box-sizing: border-box;
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
  background-color: #362b48;
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
`;

export default Menu;
