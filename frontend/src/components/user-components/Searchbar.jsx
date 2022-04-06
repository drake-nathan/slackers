import React from "react";
import styled from "styled-components";

function Searchbar() {
  return (
    <SearchContainer>
      <Search>
        <input type="text" placeholder="Search..." />
      </Search>
      <Result></Result>
    </SearchContainer>
  );
}

export default Searchbar;

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


const Result = styled.div`

`;