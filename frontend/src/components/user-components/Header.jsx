import { useState } from 'react';
import styled from 'styled-components';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Menu from './Menu';
import Searchbar from './Searchbar';

const Header = () => {
  const [menu, setMenu] = useState(false);
  const handleLogout = () => {
    setMenu(!menu);
  };

  const userImage =
    JSON.parse(localStorage.getItem('currentUser')).user.url ||
    '../../public/favicon.ico'; // evil bunny!
  // 'https://i.ibb.co/gMSQPXp/green-avatar.jpg';
  const userName =
    JSON.parse(localStorage.getItem('currentUser')).user.name || '';

  return (
    <Container>
      <Main>
        <AccessTimeIcon />
        <Searchbar />
        {/* <SearchContainer>
          <Search>
            <input type="text" placeholder="Search..." />
          </Search>
        </SearchContainer > */}
        <HelpOutlineIcon />
      </Main>
      <UserContainer>
        <Name>{userName}</Name>
        <UserImage>
          <Image src={userImage} onClick={handleLogout} />
          {menu && <Menu />}
        </UserImage>
      </UserContainer>
    </Container>
  );
};

const Container = styled.div`
  background: #0f2f81;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: inset 0 0 0 1px rgba(250, 250, 250, 0.4);
  padding: 10px;
`;

const Main = styled.div`
  display: flex;
  margin-left: 16px;
  margin-right: 16px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 16px;
  position: absolute;
  right: 0;
`;

const SearchContainer = styled.div`
  min-width: 400px;
  margin-left: 16px;
  margin-right: 16px;
`;

const Search = styled.div`
  box-shadow: inset 0 0 0 1px rgba(250, 250, 250, 0.4);
  border-radius: 6px;
  width: 100%;

  input {
    background: transparent;
    border: none;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    color: white;
    outline: none;
  }
`;

const Name = styled.div`
  padding-right: 16px;
`;

const UserImage = styled.div`
  background-color: #e9eff6;
  width: 28px;
  height: 28px;
  border: 2px solid #b7a2d7;
  border-radius: 3px;
  cursor: pointer;
  img {
    width: 100%;
  }
`;

const Image = styled.img``;

export default Header;
