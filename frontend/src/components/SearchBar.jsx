import React, { useState } from 'react';
import styled from 'styled-components';
import * as HiIcons from 'react-icons/hi';
import * as AiIcons from 'react-icons/ai';

const SearchContainer = styled.div`
  position: relative;
  top: 0;
  width: ${(props) => (props.isSearching ? 460 : 0)}px;
  height: 30px;
  margin-left: 50%;
  background: #57498f;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.25s ease;

  &:hover {
    background: #6b5ab0;
  }
`;

const SearchInput = styled.input`
  border: none;
  padding-left: 15px;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 16px;
  background: transparent;
  color: lightgray;

  ::placeholder {
    color: white;
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
    color: white;
    cursor: pointer;
  }
`;

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
    <div>
      <SearchContainer isSearching={isActive}>
        <SearchInput
          type="text"
          placeholder="Search Parsity Students"
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
    </div>
  );
};

export default SearchBar;
