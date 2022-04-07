/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const AddDmModal = ({ setShowDmModal, dms, setDms }) => {
  // close the modal when clicking outside the modal.
  const history = useHistory();
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowDmModal(false);
    }
  };

  const userInfoObj = JSON.parse(localStorage.getItem('currentUser'));
  const headerConfig = {
    headers: {
      Authorization: `Bearer ${userInfoObj.auth_token}`,
      'Content-Type': 'application/json',
    },
  };

  const nonDmUsers = async () => {
    const request = axios.get(
      `${process.env.REACT_APP_ROOT_SERVER_URL}/api/users`,
      headerConfig
    );

    const { data, status } = await request;

    if (status === 200) {
      setUsers(
        data.filter((user) => user.user_id !== userInfoObj.user.user_id)
      );
      // if (dms.length) {
      //   setUsers(
      //     data.filter((user) => dms.some((dm) => dm.name !== user.name))
      //   );
      // } else {
      //   setUsers(data);
      // }
    } else {
      return null;
    }
  };

  useEffect(() => {
    nonDmUsers();
  }, []);

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
        setShowDmModal(false);
        setDms((prev) => [...prev, data]);
        history.push('/user');
        history.push(`user/${data.conversation_id}`);
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
      setShowDmModal(false);
      history.push(`/user/${conv}`);
    } else {
      postNewDm(userId);
    }
  };

  const personMap = users.map((u, index) => (
    <ListItem key={index * 3000}>
      <Button onClick={() => handleAddDmClick(u.user_id)}>
        <Img src={u.image_url} alt="user" />
        <Name>{u.name}</Name>
      </Button>
    </ListItem>
  ));

  // render the modal JSX in the portal div.
  return ReactDom.createPortal(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="container" ref={modalRef} onClick={closeModal}>
      <Modal className="dm-modal">
        <Heading>Direct Message</Heading>
        <List>{personMap}</List>
      </Modal>
    </div>,
    document.getElementById('portal')
  );
};

const Modal = styled.div`
  overflow-y: scroll;
`;

const Button = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  &:hover {
    background-color: #e9eff6;
  }
`;

const List = styled.ul`
  margin-right: 15px;
`;

const ListItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const Img = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  margin-right: -0.9rem;
  border: 3px solid #2b2119;
  max-width: 100%;
`;

const Name = styled.p`
  font-size: 1.4rem;
  margin-left: 2rem;
  color: #221b1b;
`;

const Heading = styled.h3`
  font-size: 2rem;
  font-family: 'Montserrat', sans-serif;
  font-family: inherit;
  color: #1e1926;
  text-align: center;
  margin-top: 2rem;
  margin-left: 1rem;
`;
