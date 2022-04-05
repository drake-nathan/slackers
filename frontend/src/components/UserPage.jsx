import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route, useHistory } from 'react-router-dom';
import axios from 'axios';

import Header from './user-components/Header';
import Sidebar from './user-components/Sidebar';
import Chat from './user-components/Chat';
import AllUsers from './user-components/AllUsers';

const user = {
  name: 'Han Solo',
  image: 'https://i.ibb.co/gMSQPXp/green-avatar.jpg',
};

function UserPage() {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const getChannels = async () => {
    const token = localStorage.getItem('token');

    const headerConfig = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const request = axios.get(
        `${process.env.REACT_APP_ROOT_SERVER_URL}/api/me/channels/`,
        headerConfig
      );

      const { data } = await request;

      if (data) {
        setChannels(data);
        setSelectedChannel(data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <Container>
      <Header user={user} />
      <Main>
        <Sidebar
          channels={channels}
          setChannels={setChannels}
          setSelectedChannel={setSelectedChannel}
        />
        <Switch>
          <Route path="/user/:channelId">
            <Chat
              channel={selectedChannel}
              channels={channels}
              setSelectedChannel={setSelectedChannel}
            />
          </Route>
          <Route path="/people">
            <AllUsers />
          </Route>
        </Switch>
      </Main>
    </Container>
  );
}

export default UserPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px minmax(0, 1fr);
`;

const Main = styled.div`
  background: white;
  display: grid;
  grid-template-columns: 260px auto;
`;
