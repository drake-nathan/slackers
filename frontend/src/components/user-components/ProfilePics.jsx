import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Img from '../../images/man_img.jpeg';

function ProfilePics() {
  const [pics, setPics] = useState([
    'https://joeschmoe.io/api/v1/0',
    'https://joeschmoe.io/api/v1/1',
    'https://joeschmoe.io/api/v1/13',
  ]);

  // const getProfilePics = async () => {
  //   const token = localStorage.getItem('token');

  //   const headerConfig = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };

  //   //need to get the channel id, then the user_ids in that channel and then the image_url of each user

  //   try {
  //     const request = axios.get(
  //       `${process.env.REACT_APP_ROOT_SERVER_URL}/api/me/channels/`,
  //       headerConfig
  //     );

  //     const data = await request;

  //     if (data) {
  //       setPics(data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getProfilePics();
  // });

  const images = pics.map((pic, i) => <Imgs src={pic} key={i} alt="user" />);

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
