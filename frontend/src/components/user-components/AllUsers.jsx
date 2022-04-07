import React, { useState } from 'react';
import styled from 'styled-components';
import { userItems } from '../../data/UserData';
import { getAllUsers } from '../../context/actions';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  getAllUsers().then((res) => setAllUsers(res));

  return (
    <Container>
      {allUsers.map((user, index) => (
        <UserCard key={index}>
          <img src={user.image_url} alt="user" />
          <Name>{user.name}</Name>
          <span>
            <AddToChannel>Add To Channel</AddToChannel>
            <SendDm>Send Dm</SendDm>
          </span>
        </UserCard>
      ))}
    </Container>
  );
};

export default AllUsers;

const Container = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(4, 1fr);
  width: min(75%, 70rem);
  padding-block: 2rem;
  margin-inline: auto;
`;

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  font-weight: 600;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 100%;
  height: 100hv;
  justify-content: space-between;

  img {
    width: 100%;
    margin-bottom: 12px;
  }
`;

const Name = styled.div`
  padding-bottom: 12px;
  padding-top: 2px;
`;

const AddToChannel = styled.button`
  color: #f7969e;
  background: white;
  border-radius: 2px;
  border-radius: 4px;
  border: solid 1px #f7969e;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 12px;

  &:hover {
    background: #f7969e;
    color: white;
  }
`;

const SendDm = styled.button`
  color: #f7969e;
  background: white;
  border-radius: 2px;
  border-radius: 4px;
  border: solid 1px #f7969e;
  justify-content: center;
  cursor: pointer;
  margin-left: 6px;

  &:hover {
    background: #f7969e;
    color: white;
  }
`;
