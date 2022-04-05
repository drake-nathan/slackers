import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Modal } from './AddChannelModal';

const Sidebar = ({ sendChannelsUp }) => {
  const [channels, setChannels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const getChannels = async () => {
    const token = localStorage.getItem('token');
    // const token = localStorage.getItem('currentUser').user.auth_token;

    const headerConfig = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const request = axios.get(
        `${process.env.REACT_APP_ROOT_SERVER_URL}/api/me/channels/`,
        headerConfig
      );

      const data = await request;

      if (data) {
        setChannels(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goToChannel = (id) => {
    if (id) {
      history.push(`/user/${id}`);
    }
  };

  useEffect(() => {
    getChannels();
  });

  const handleAddClick = () => {
    setShowModal(true);
  };

  return (
    <Container>
      <WorkSpaceContainer>
        <Name>
          <h3>Parsity Students</h3>
        </Name>
        <NewMessage>
          <AddCircleOutlineIcon onClick={handleAddClick} />
        </NewMessage>
      </WorkSpaceContainer>
      <ChannelsContainer>
        {showModal ? (
          <Modal
            setShowModal={setShowModal}
            setChannels={setChannels}
            currentChannels={channels}
          />
        ) : null}
        <NewChannelContainer>
          <h3>
            <strong>Channels</strong>
          </h3>
        </NewChannelContainer>
        <ChannelsList>
          {channels.map((channel, i) => (
            <Channel
              onClick={() => goToChannel(channel.conversation_id)}
              tabIndex={1}
              key={i}
            >
              # {channel.name}
            </Channel>
          ))}
        </ChannelsList>
        <hr />
        <NewChannelContainer>
          <h3>
            <strong>People</strong>
          </h3>
        </NewChannelContainer>
        <hr />
        <NewChannelContainer>
          <h3>
            <strong>Direct Messages</strong>
          </h3>
        </NewChannelContainer>
      </ChannelsContainer>
    </Container>
  );
};

Sidebar.propTypes = {
  sendChannelsUp: PropTypes.func.isRequired,
};

export default Sidebar;

const Container = styled.div`
  background: #0063b2;
`;

const WorkSpaceContainer = styled.div`
  color: white;
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 19px;
  justify-content: space-between;
  border-bottom: 1px solid rgba(250, 250, 250, 0.4);
`;

const Name = styled.div``;

const NewMessage = styled.div`
  width: 36px;
  height: 36px;
  background: white;
  color: #0f2f81;
  fill: #0f2f81;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 20px;
  cursor: pointer;
`;

const MainChannels = styled.div`
  padding-top: 20px;
`;

const MainChannelItem = styled.div`
  color: #fafafa;
  display: grid;
  grid-template-columns: 15% auto;
  height: 36px;
  align-items: center;
  padding-left: 19px;
  cursor: pointer;
  margin-bottom: 8px;

  &:hover {
    background: #0f2f81;
  }
  &:focus {
    background: #f7969e;
    color: white;
  }
`;

const ChannelsContainer = styled.div`
  color: #fafafa;
  margin-top: 10px;

  h3 {
    color: white;
  }
`;

const NewChannelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  padding-left: 19px;
  padding-right: 32px;
`;

const ChannelsList = styled.div``;

const Channel = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 19px;

  &:hover {
    background: #0f2f81;
  }
  &:focus {
    background: #f7969e;
    color: white;
  }
`;
