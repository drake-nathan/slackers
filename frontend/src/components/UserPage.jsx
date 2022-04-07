import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route, useHistory } from 'react-router-dom';
import axios from 'axios';

import Header from './user-components/Header';
import Sidebar from './user-components/Sidebar';
import Chat from './user-components/Chat';
import AllUsers from './user-components/AllUsers';

function UserPage() {
  const history = useHistory();
  const [channels, setChannels] = useState([]);
  const [dms, setDms] = useState([]);

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
        history.push(`/user/${data[0].conversation_id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDms = async () => {
    const token = localStorage.getItem('token');

    const headerConfig = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const request = axios.get(
        `${process.env.REACT_APP_ROOT_SERVER_URL}/api/me/dms`,
        headerConfig
      );

      const { data } = await request;
      if (data) {
        setDms(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChannels();
    getDms();
  }, []);

  return (
    <Container>
      <Header />
      <Main>
        <Sidebar
          channels={channels}
          dms={dms}
          setDms={setDms}
          setChannels={setChannels}
        />
        <Switch>
          <Route path="/user/:conversationId">
            <Chat getChannels={getChannels} />
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
