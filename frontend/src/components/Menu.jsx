import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useAuthDispatch, logout, useAuthState } from '../context';

function Menu() {

  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
    navigate('/');
  };

  return (
    <Container>
      <Button onClick={handleLogout}>Logout</Button>
      </Container>
  )
}

const Container = styled.div `
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
  background-color: #1E1926;
  color: white;
  box-sizing: border-box;
`

const Button = styled.button `
  background-color: #1e1926;
  margin-top: 4rem;
  margin-bottom: 0;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  text-align: center;
  display: flex;
  justify-content: center;
  letter-spacing: 0.5px;
  width: 90%;
  padding: 0.6rem 3.5rem;
  border: 1px solid #B7A2D7;
  border-radius: 10px;
  text-transform: uppercase;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #b7a2d7;
  }
`


export default Menu;