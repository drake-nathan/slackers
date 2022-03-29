/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: lightgray;
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
    background: #300d30;
  }
  &:focus {
    background: #2472ad;
    color: white;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 10px;
`;

const SubMenu = ({ item }) => (
  <SidebarLink to={item.path}>
    <div>
      {item.icon}
      <SidebarLabel>{item.title}</SidebarLabel>
    </div>
  </SidebarLink>
);

export default SubMenu;
