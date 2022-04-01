import React, { useState } from 'react';
import styled from 'styled-components';
import * as HiIcons from 'react-icons/hi';
import * as AiIcons from 'react-icons/ai';


const SearchBar = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const _toggleSeach = () => {
    setIsActive(!isActive);
  };

  return (
    <SearchContainer isSearching={isActive}>
      <SearchInput
        type="text"
        placeholder="Search slackers"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <IconButton onClick={_toggleSeach}>
        {isActive ? (
          <AiIcons.AiOutlineClose size={18} />
        ) : (
          <HiIcons.HiOutlineSearch size={18} />
        )}
      </IconButton>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: absolute;
  top: 1.5%;
  left: 50%;
  transform: translateX(-30%);
  // width: ${(props) => (props.isSearching ? 460 : 0)}px;
  height: 30px;
  background: #574771;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.25s ease;
`;

const SearchInput = styled.input`
  background: #574771;
  border: none;
  border-radius: 7px;
  padding: 0.3rem 8rem;
  outline: none;
  font-size: 1rem;
  box-sizing: border-box;
  color: lightgray;
  ::placeholder {
    color: lightgray;
    font-style: italic;
    opacity: 75%;
    letter-spacing: 0.2px;
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: flex-end;
  color: lightgray;
  background: transparent;
  border: none;
  left: 0;
  &:hover {
    color: #b7a2d7;
    cursor: pointer;
  }
`;

export default SearchBar;
