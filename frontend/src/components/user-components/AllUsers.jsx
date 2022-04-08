import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { getAllUsers } from '../../context/actions';
import Header from './Header/Header';

// eslint-disable-next-line react/prop-types
const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const history = useHistory();

  getAllUsers().then((res) => setAllUsers(res));

  const goBack = () => {
    history.push(`/user`);
  };

  return (
    <>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <Button onClick={goBack}>Back</Button>
      <PeopleContainer>
        {allUsers.map((user, index) => (
          <UserCard key={index}>
            <img src={user.image_url} alt="user" />
            <Name>{user.name}</Name>
            <span>
              <SendDm>Send Dm</SendDm>
            </span>
          </UserCard>
        ))}
      </PeopleContainer>
    </>
  );
};

export default AllUsers;

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

const PeopleContainer = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(4, 1fr);
  width: min(75%, 70rem);
  padding-block: 2rem;
  margin-inline: auto;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 10vh;
  display: grid;
  grid-template-rows: 38px minmax(0, 1fr);
`;

const WorkSpaceContainer = styled.div`
  color: white;
  height: 80px;
  display: flex;
  align-items: center;
  padding-left: 19px;
  justify-content: left;
  border-bottom: 1px solid rgba(250, 250, 250, 0.4);

  a {
    text-decoration: none;
    color: white;
  }
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
