import React, { useState } from 'react';
import styled from 'styled-components';
import image from '../../images/man_img.jpeg';
import Menu from '../user-components/Menu';


function Logout() {
  const [menu, setMenu] = useState(false);

  const handleLogoutMenu = () => {
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
