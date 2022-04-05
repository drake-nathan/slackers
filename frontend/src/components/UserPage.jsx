import { useState } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import Header from './user-components/Header';
import Sidebar from './user-components/Sidebar';
import Chat from './user-components/Chat';
import AllUsers from './user-components/AllUsers';

const user = {
  name: 'Han Solo',
  image: 'https://i.ibb.co/gMSQPXp/green-avatar.jpg',
};

function UserPage() {
  const [channels, sendChannelsUp] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  console.log(channels);
  return (
    <Container>
      <Header user={user} />
      <Main>
        <Sidebar
          sendChannelsUp={sendChannelsUp}
          setSelectedChannel={setSelectedChannel}
        />
        <Switch>
          <Route path="/user/:channelId">
            <Chat user={user} channel={selectedChannel} />
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
