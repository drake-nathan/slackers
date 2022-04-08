import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import AddIcon from '@material-ui/icons/Add';
import PeopleIcon from '@material-ui/icons/People';
import Chat from '@material-ui/icons/Chat';
import Send from '@material-ui/icons/Send';
import { Modal } from './AddChannelModal';
import { AddDmModal } from './AddDmModal';

const Sidebar = ({ dms, setDms, channels, setChannels }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDmModal, setShowDmModal] = useState(false);
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

  const handleAddDmClick = (e) => {
    e.preventDefault();
    setShowDmModal(true);
  };

  return (
    <Container>
      <InnerContainer>
        <WorkSpaceContainer>
          <Name>
            <h2>
              <strong>Parsity Students</strong>
            </h2>
          </Name>
        </WorkSpaceContainer>
        <WorkSpaceContainer>
          <h3>
            <strong>
              <a href="/people">
                <PeopleIcon style={{ marginRight: '4px' }} /> People
              </a>
            </strong>
          </h3>
        </WorkSpaceContainer>
        <ChannelsContainer>
          {showModal ? (
            <Modal
              setShowModal={setShowModal}
              setChannels={setChannels}
              channels={channels}
            />
          ) : null}
          <WorkSpaceContainer>
            <Chat style={{ marginRight: '8px' }} />
            <h3>
              <strong>Channels</strong>
            </h3>
            <AddButton>
              <AddIcon
                style={{ marginLeft: '-158%' }}
                onClick={handleAddClick}
              />
            </AddButton>
          </WorkSpaceContainer>
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
          {showDmModal ? (
            <AddDmModal
              setShowDmModal={setShowDmModal}
              setDms={setDms}
              dms={dms}
            />
          ) : null}
          <WorkSpaceContainerBottom>
            <Send style={{ marginRight: '8px' }} />
            <h3>
              <strong>DMs</strong>
            </h3>
            <AddButton onClick={handleAddDmClick}>
              <AddIcon />
            </AddButton>
          </WorkSpaceContainerBottom>
          <ChannelsList>
            {dms.map((dm, i) => (
              <Channel
                onClick={() => handleChannelClick(dm)}
                tabIndex={1}
                key={i}
              >
                # {dm.name}
              </Channel>
            ))}
          </ChannelsList>
        </ChannelsContainer>
      </InnerContainer>
    </Container>
  );
};

Sidebar.propTypes = {
  channels: PropTypes.array.isRequired,
  setChannels: PropTypes.func.isRequired,
  dms: PropTypes.array.isRequired,
  setDms: PropTypes.func.isRequired,
};

export default Sidebar;

const Container = styled.div`
  background: #0063b2;
`;

const InnerContainer = styled.div`
  max-height: 99vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const WorkSpaceContainer = styled.div`
  color: white;
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 19px;
  justify-content: left;
  border-bottom: 1px solid rgba(250, 250, 250, 0.4);

  a {
    text-decoration: none;
    color: white;
  }
`;

const Name = styled.div``;

const AddButton = styled.div`
  color: white;
  fill: #0f2f81;
  display: flex;
  margin-left: 52%;
  cursor: pointer;
`;

const ChannelsContainer = styled.div`
  color: #fafafa;
  margin-top: 10px;

  h3 {
    color: white;
  }
`;

const ChannelsList = styled.div`
  margin-top: 16px;
  margin-bottom: 12px;
`;

const Channel = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 32px;

  &:hover {
    background: #0f2f81;
  }
  &:focus {
    background: #f7969e;
    color: white;
  }
`;

const WorkSpaceContainerBottom = styled.div`
  color: white;
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 19px;
  justify-content: left;
  border-bottom: 1px solid rgba(250, 250, 250, 0.4);
  border-top: 1px solid rgba(250, 250, 250, 0.4);
`;

// const MainChannels = styled.div`
//   padding-top: 20px;
// `;

// const MainChannelItem = styled.div`
//   color: #fafafa;
//   display: grid;
//   grid-template-columns: 15% auto;
//   height: 36px;
//   align-items: center;
//   padding-left: 19px;
//   cursor: pointer;

//   &:hover {
//     background: #0f2f81;
//   }
//   &:focus {
//     background: #f7969e;
//     color: white;
//   }
// `;

// const NewChannelContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   height: 36px;
//   padding-left: 19px;
//   padding-right: 32px;
// `;
