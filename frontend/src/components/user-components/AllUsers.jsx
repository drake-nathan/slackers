import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getAllUsers } from '../../context/actions';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [dms, setDms] = useState([]);

  const userInfoObj = JSON.parse(localStorage.getItem('currentUser'));

  const headerConfig = {
    headers: {
      Authorization: `Bearer ${userInfoObj.auth_token}`,
      'Content-Type': 'application/json',
    },
  };

  const getDms = async () => {
    const token = localStorage.getItem('token');

    try {
      const request = axios.get(
        `${process.env.REACT_APP_ROOT_SERVER_URL}/api/me/dms`,
        headerConfig
      );

      const { data } = await request;
      if (data) {
        setDms(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers().then((res) => {
      console.log('users');
      setAllUsers(res);
    });

    getDms().then((res) => {
      console.log(res);
      // setDms(res)
    });
  }, []);

  const history = useHistory();

  const postNewDm = async (userId) => {
    const body = { userToDm: userId };

    // update end point for adding channel
    try {
      const dmRequest = axios.post(
        `${process.env.REACT_APP_ROOT_SERVER_URL}/api/me/dms`,
        body,
        headerConfig
      );

      const { data, status } = await dmRequest;
      if (status === 200) {
        // history.push('/user')
        history.push(`/user/${data.conversation_id}`);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleAddDmClick = (userId) => {
    let conv = '';
    const existingDm = dms.find((dm) => {
      if (dm.user_id === userId) {
        conv = dm.conversation_id;
        return true;
      }
      return false;
    });

    if (existingDm) {
      history.push(`/user/${conv}`);
    } else {
      postNewDm(userId);
    }
  };

  return (
    <Container>
      {allUsers.map((user, index) => (
        <UserCard key={index}>
          <img src={user.image_url} alt="user" />
          <Name>{user.name}</Name>
          <span>
            <SendDm onClick={() => handleAddDmClick(user.user_id)}>
              Send Dm
            </SendDm>
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
