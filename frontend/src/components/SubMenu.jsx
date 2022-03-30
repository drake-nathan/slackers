/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #f0f0f0;
  justify-contnet: space-between;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 25px;
  padding-right: 25px;
  list-style: none;
  height: 25px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #342180;
  }
  &:focus {
    background: #b7a2d7;
    color: white;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 10px;
`;

const DropdownLink = styled(Link)`
  background: #3c15d6;
  height: 25px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f0f0f0;
  font-size: 18px;

  &:hover {
    background: #342180;
  }
  &:focus {
    background: #b7a2d7;
    color: white;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  if (item.title === 'Channels') {
    return (
      <>
        <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
          <div>
            {item.icon}
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
            <SidebarLabel>
              <strong>{item.title}</strong>
            </SidebarLabel>
          </div>
        </SidebarLink>
        {subnav &&
          item.subNav.map((item, index) => (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          ))}
      </>
    );
  }

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => (
          <DropdownLink to={item.path} key={index}>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
          </DropdownLink>
        ))}
    </>
  );
};

export default SubMenu;
