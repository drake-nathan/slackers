import React from 'react';
import styled from 'styled-components';
import Img from '../../images/man_img.jpeg';
{/* <img
src={
  user.photo
    ? user.photo
    : 'https://i.ibb.co/gMSQPXp/green-avatar.jpg'
}
alt="avatar"
/> */}

function ProfilePics() {
  return (
    <Container>
      <InnerContainer>
        <Imgs src={Img} alt="user" />
        <Imgs src={Img} alt="user" />
        <Imgs src={Img} alt="user" />
        <Imgs src={Img} alt="user" />
        <Imgs src={Img} alt="user" />
        <Number>5</Number>
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
