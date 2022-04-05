/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from 'react';
import ReactDom from 'react-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const Modal = ({ setShowModal }) => {
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
        <div className="row">
          <div className="col-md-12">
            <h3>Add Channel</h3>
            <form onSubmit={handleSubmitNewChannelClick}>
              <div className="form-group">
                <label htmlFor="nameInput">Channel Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  required
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="descriptionInput">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="DescriptionInput"
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <br />
              <button type="submit" className="btn btn-primary">
                Add Channel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
