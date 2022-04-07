import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
// import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { ChannelMessageContext } from '../../context/context';
// import { getChannels, getMessages, sendMessage } from '../../context/actions';

function Searchbar() {
  const { conversationId } = useParams();
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const token = localStorage.getItem('token');
  const headerConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Need to get messages to filter through but don't want to do a fetch for it - plus the useParams here doesn't pick up the channelId anyway the way this is set up.
  const getMessages = async () => {
    try {
      const request = axios.get(
        `${process.env.REACT_APP_ROOT_SERVER_URL}/api/conversations/${conversationId}/messages`,
        headerConfig
      );

      const data = await request;

      if (data) {
        setMessages(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // get data to pass into map function below - fetch info in channel conversations
  return (
    <SearchContainer>
      <Search onSubmit={handleSubmit}>
        <input type="text" placeholder="Search..." onChange={handleSearch} />
        <Button type="submit">Search</Button>
      </Search>
      {/* <Result>
      {messages
          .filter((msg) => {
            if (search === "") {
              return;
            } else if (msg.text.toLowerCase().includes(search.toLowerCase())) {
              return msg;
            }
          })
          .map((msg, i) => (
            <div className="box" key={i}>
              <p>{msg.name} {msg.text}</p>
            </div>
          ))} 
      </Result>  */}
    </SearchContainer>
  );
}

export default Searchbar;

const SearchContainer = styled.div`
  margin-left: 16px;
  margin-right: 16px;
  min-width: 450px;
`;

const Search = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  position: fixed;
  top: 5%;
  width: 400px;
  height: 200px;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  overflow-y: auto;
`;

const Icon = styled.div``;

const Button = styled.button`
  background-color: #e9eff6;
  color: #0063b2;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.3px;
  border-radius: 5px;
  border: none;
  outline: none;
  padding: 5px;
`;
