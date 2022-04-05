import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ROOT_URL = process.env.REACT_APP_ROOT_SERVER_URL;

function ProfilePics() {
  const { channelId } = useParams();
  const [pics, setPics] = useState([]);

  const token = localStorage.getItem('token');
  const headerConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get(`${ROOT_URL}/api/channels/${channelId}/users`, headerConfig)
      .then((response) => {
        console.log('response', response.data);
        setPics(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [channelId]);

  const images = pics.map((user, i) => (
    <Imgs src={user.image_url} key={i} alt="user" />
  ));

  const number = pics.length;

  return (
    <Container>
      <InnerContainer>
        {images}
        <Number>{number}</Number>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  padding-right: 2rem;
`;
const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 1rem;
  padding-left: 1rem;
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

export default ProfilePics;
