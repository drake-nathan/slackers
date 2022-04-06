import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Modal } from './AddChannelModal';

const Sidebar = ({ channels, setChannels, setSelectedChannel }) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const goToChannel = (id) => {
    if (id) {
      history.push(`/user/${id}`);
    }
  };

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
    goToChannel(channel.conversation_id);
  };

  return (
    <Container>
      <WorkSpaceContainer>
        <Name>
          <h3>Parsity Students</h3>
        </Name>
      </WorkSpaceContainer>
      <ChannelsContainer>
        {showModal ? (
          <Modal
            setShowModal={setShowModal}
            setChannels={setChannels}
            channels={channels}
            setSelectedChannel={setSelectedChannel}
          />
        ) : null}
        <NewChannelContainer>
          <h3>
            <strong>Channels</strong>
          </h3>
          <NewMessage>
            <AddCircleOutlineIcon onClick={handleAddClick} />
          </NewMessage>
        </NewChannelContainer>
        <ChannelsList>
          {channels.map((channel, i) => (
            <Channel
              onClick={() => handleChannelClick(channel)}
              tabIndex={1}
              key={i}
            >
              # {`${channel.name} ${channel.conversation_id}`}
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
  channels: PropTypes.array.isRequired,
  setChannels: PropTypes.func.isRequired,
  setSelectedChannel: PropTypes.func.isRequired,
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
  width: 25px;
  height: 25px;
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
