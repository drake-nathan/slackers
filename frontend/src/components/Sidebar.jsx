import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
// import * as RiIcons from 'react-icons/ri';
// import * as BiIcons from 'react-icons/bi';
// import * as TiIcons from 'react-icons/ti';
// import * as HiIcons from 'react-icons/hi';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import SearchBar from './SearchBar';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <Nav>
        <NavIcon to="#">
          <FaIcons.FaBars onClick={showSidebar} />
        </NavIcon>
        <SearchBar />
      </Nav>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <Slacktitle>Parsity Students</Slacktitle>
          {SidebarData.map((item, index) => (
            <SubMenu item={item} key={index} />
          ))}
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

const Nav = styled.div`
  background: #362b48;
  // background: #403159;
  height: 60px;
  display: flex;
  justify-content: flext-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 1rem;
  color: white;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #403159;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-conter: center;
  position: fixed;
  top: 60px;
  // left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 150ms;
  z-index: 10px;
  color: white;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Slacktitle = styled.div`
  background: #362b48;
  height: 15px;
  padding-left: 1.5rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
  padding-top: 1rem;
  border-top: 0.01em solid rgba(211, 211, 211, 0.2);
  border-bottom: 0.01em solid rgba(211, 211, 211, 0.2);
  display: flex;
  font-weight: bold;
  letter-spacing: 0.4px;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  font-size: 24px;

  &:hover {
    background: #342180;
    color: white;
  }
`;
export default Sidebar;
