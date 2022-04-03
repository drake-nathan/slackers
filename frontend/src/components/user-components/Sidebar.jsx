import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';
// import db from '../firebase';

import { ChannelMessageContext } from '../../context/context';
// import { sidebarItems } from '../../data/SidebarData';
import { channelItems } from '../../data/ChannelData';

const Sidebar = () => {
  // const [channels, setChannels] = useContext(ChannelMessageContext);
  const history = useHistory();

  const goToChannel = (id) => {
    if (id) {
      history.push(`/user/${id}`);
    }
  };

  return (
    <Container>
      <WorkSpaceContainer>
        <Name>
          <h3>Parsity Students</h3>
        </Name>
        <NewMessage>
          <AddCircleOutlineIcon />
        </NewMessage>
      </WorkSpaceContainer>
      {/* <MainChannels>
        {sidebarItems.map((item, index) => (
          <MainChannelItem tabIndex={1} key={index}>
            {item.icon}
            {item.text}
          </MainChannelItem>
        ))}
      </MainChannels> */}
      <ChannelsContainer>
        <NewChannelContainer>
          <h3>
            <strong>Channels</strong>
          </h3>
        </NewChannelContainer>
        <ChannelsList>
          {channelItems.map((item, index) => (
            <Channel
              onClick={() => goToChannel(item.id)}
              tabIndex={1}
              key={index}
            >
              # {item.name}
            </Channel>
          ))}
        </ChannelsList>
        <NewChannelContainer>
          <h3>
            <strong>Direct Messages</strong>
          </h3>
        </NewChannelContainer>
        <ChannelsList>
          {channelItems.map((item, index) => (
            <Channel
              onClick={() => goToChannel(item.id)}
              tabIndex={1}
              key={index}
            >
              # {item.name}
            </Channel>
          ))}
        </ChannelsList>
      </ChannelsContainer>
    </Container>
  );
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
