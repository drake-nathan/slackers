import React, { useState } from 'react';
import styled from 'styled-components';
import image from '../images/man_img.jpeg';
import Menu from './Menu';

import { useAuthDispatch, logout, useAuthState } from '../context';

// NOTE THAT THIS MENU FUNCTION HAS NOT BEEN STYLED YET- IT IS JUST FOR the functionality

// Also note have to see how to get the name - for now, just {user.name}

function Logout() {
  const [menu, setMenu] = useState(false);

  const handleLogoutMenu = () => {
    console.log('clicked');
    setMenu(!menu);
  };

  return (
    <Container onClick={handleLogoutMenu}>
      <Avatar src={image} alt="avatar" />
      {menu && <Menu />}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 30px;
`;

const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50px;
`;

export default Logout;
