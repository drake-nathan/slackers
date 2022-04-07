import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Chat from '@material-ui/icons/Chat';
import Send from '@material-ui/icons/Send';
import { Modal } from './AddChannelModal';

const Sidebar = ({ dms, setDms, channels, setChannels }) => {
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

  const handleChannelClick = (conversation) => {
    goToChannel(conversation.conversation_id);
  };

  return (
    <Container>
      <WorkSpaceContainer>
        <Name>
          <h2>
            <strong>Parsity Students</strong>
          </h2>
        </Name>
      </WorkSpaceContainer>
      <WorkSpaceContainer>
        <h3>
          <strong>People</strong>
        </h3>
      </WorkSpaceContainer>
      <WorkSpaceContainer>
        <Chat />
        <h3>
          <strong>Channels</strong>
        </h3>
        <AddButton>
          <AddOutlinedIcon onClick={handleAddClick} />
        </AddButton>
      </WorkSpaceContainer>
      <ChannelsContainer>
        {showModal ? (
          <Modal
            setShowModal={setShowModal}
            setChannels={setChannels}
            channels={channels}
          />
        ) : null}
        <ChannelsList>
          {channels.map((channel, i) => (
            <Channel
              onClick={() => handleChannelClick(channel)}
              tabIndex={1}
              key={i}
            >
              # {`${channel.name}`}
            </Channel>
          ))}
        </ChannelsList>
        <ChannelsList>
          {dms.map((dm, i) => (
            <Channel
              onClick={() => handleChannelClick(dm)}
              tabIndex={1}
              key={i}
            >
              # {dm.conversation_id}
            </Channel>
          ))}
        </ChannelsList>
      </ChannelsContainer>
      <WorkSpaceBottomContainer>
        <Send />
        <h3>
          <strong>DMs</strong>
        </h3>
        <AddButton>
          <AddOutlinedIcon />
        </AddButton>
      </WorkSpaceBottomContainer>
    </Container>
  );
};

Sidebar.propTypes = {
  channels: PropTypes.array.isRequired,
  setChannels: PropTypes.func.isRequired,
  dms: PropTypes.array.isRequired,
  setDms: PropTypes.func,
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
  /* justify-content: space-between; */
  border-bottom: 1px solid rgba(250, 250, 250, 0.4);

  h3 {
    padding-left: 10px;
    padding-right: 80px;
  }
`;

const WorkSpaceBottomContainer = styled.div`
  color: white;
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 19px;
  justify-content: space-between;
  border-top: 1px solid rgba(250, 250, 250, 0.4);
  border-bottom: 1px solid rgba(250, 250, 250, 0.4);
`;

const Name = styled.div``;

const AddButton = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
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
  border-bottom: 1px solid rgba(250, 250, 250, 0.4);
`;

const ChannelsList = styled.div`
  padding-bottom: 10px;
`;

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
