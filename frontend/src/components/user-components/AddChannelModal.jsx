/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useState } from 'react';
import ReactDom from 'react-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Modal = ({
  setShowModal,
  channels,
  setChannels,
  setSelectedChannel,
}) => {
  // close the modal when clicking outside the modal.
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  const postNewChannel = async () => {
    const userInfoObj = JSON.parse(localStorage.getItem('currentUser'));
    const data = {
      name,
      description,
    };
    const headerConfig = {
      headers: {
        Authorization: `Bearer ${userInfoObj.auth_token}`,
        'Content-Type': 'application/json',
      },
    };

    // update end point for adding channel
    try {
      const createChannelRequest = axios.post(
        `${process.env.REACT_APP_ROOT_SERVER_URL}/api/channels`,
        data,
        headerConfig
      );
      const createChannelResponse = await createChannelRequest;

      const responseData = {
        userId: userInfoObj.user.user_id,
      };

      const conversationId = createChannelResponse.data[0].conversation_id;

      const addCurrentUserToNewChannelRequest = axios.post(
        `${process.env.REACT_APP_ROOT_SERVER_URL}/api/channels/${conversationId}/users`,
        responseData,
        headerConfig
      );
      const addUserResponse = await addCurrentUserToNewChannelRequest;

      if (createChannelResponse && addUserResponse) {
        // console.log(createChannelResponse.data);
        // console.log(addUserResponse.data);
        // debugger;
        setChannels([...channels, createChannelResponse.data[0]]);
        setSelectedChannel(createChannelResponse.data[0]);
        setShowModal(false);
        history.push('/user');
        history.push(`user/${conversationId}`);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleSubmitNewChannelClick = (e) => {
    // send post request to channels
    e.preventDefault();
    postNewChannel();
  };
  // render the modal JSX in the portal div.
  return ReactDom.createPortal(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <InnerContainer>
            <Heading>Add Channel</Heading>
            <Form onSubmit={handleSubmitNewChannelClick}>
              <InputContainer>
              <Row >
                <Label htmlFor="nameInput">Channel Name</Label>
                <Input
                  type="text"
                  // className="form-control"
                  id="nameInput"
                  required
                  onChange={(event) => setName(event.target.value)}
                />
              </Row>
              <Row>
                <Label htmlFor="descriptionInput">Description</Label>
                <Input
                  type="text"
                  // className="form-control"
                  id="DescriptionInput"
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Row>
              </InputContainer>
              <br />
              <Button type="submit">
                Submit
              </Button>
            </Form>
      </InnerContainer>
      </div> ,
    // </div>,
    document.getElementById('portal')
  );
};

Modal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  channels: PropTypes.array,
  setChannels: PropTypes.func.isRequired,
  setSelectedChannel: PropTypes.func.isRequired,
};

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 2rem;
`;

const Form = styled.form`
`;

const InputContainer = styled.form`
display:flex;
flex-direction: column;
`;

const Row = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
column-gap: 1rem;
width: 100%;
margin-top: 1.8rem;
`;

const Input = styled.input`
  border-radius: 5px;
  justify-self: flex-end;
  padding: 0.5rem 1.5rem;
  outline: none;
`;

const Label = styled.label`
  text-align: left;
  letter-spacing: 0.4px;
  font-size: 1.4rem;
  margin-right: 4rem;
  font-family:'Montserrat', sans-serif;

`
const Heading=styled.h3`
  font-size: 2rem;
  font-family:'Montserrat', sans-serif;
  font-family: inherit
  color: #1e1926;
  text-align: center;
  margin-top: 3rem;
`;

const Button = styled.button`
  margin: 3rem auto;
  color: white;
  font-weight: 700;
  font-size: 1.4rem;
  text-align: center;
  display: flex;
  justify-content: center;
  letter-spacing: 0.6px;
  width: 65%;
  padding: 1rem 3.5rem;
  border-radius: 10px;
  background-color:  #0063b2;
  border: none;
  outline: none;
  box-shadow: none;
  text-transform: uppercase;
  font-family:'Montserrat', sans-serif;
  box-sizing: border-box;
  font-family:'Montserrat', sans-serif;
  cursor: pointer;
  transform: 0.4s ease-out;
  &:hover {
    background-color: #b7a2d7;
  }
`;