// NOTE - mgrum: URL is setup.

const axios = require('axios');

let ROOT_URL = 'http://localhost:8000/';

if (process.env.NODE_ENV === 'production') {
  ROOT_URL = 'https://slackersz.herokuapp.com/';
}
// These function dispatch multiple state updates as a result of an Http request or side-effect. The loginUser function will handle asynchronous requests to the server to authenticate a user login details and a logout function used to log a user out of an authenticated session.

// NOTE this function modifies the messages state via setState, not a dispatch/reducer. It takes in current meassages and the setMesages function.
export async function sendMessage(
  currentMessages,
  setMessages,
  message,
  channelID
) {
  const userInfo = localStorage.getItem('currentUser');
  const messageData = {
    text: message,
    user_id: userInfo.user.user_id,
    createddate: Date(),
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type:': 'application/json',
      Authorization: `Bearer ${userInfo.auth_token}`,
    },
    body: JSON.stringify(messageData),
  };

  try {
    const response = await fetch(
      `${ROOT_URL}api/channels/${channelID}/posts`,
      requestOptions
    );
    if (response.ok) {
      const savedMessage = await response.json();
      setMessages([...currentMessages, savedMessage]);
      return savedMessage;
    }
    console.log(response.statusText);
    return response.status;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// NOTE done. loginPayload is encoded and sent to the endpoint, and user and auth_token are returned as json.
export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: new URLSearchParams(loginPayload),
  };

  // NOTE updated by mgrum: completed the above task.
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    const response = await fetch(`${ROOT_URL}api/sign-in`, requestOptions);

    if (response.ok) {
      const data = await response.json();
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data;
    }
    if (response.status === 401) {
      console.log('not found');
      dispatch({
        type: 'LOGIN_ERROR',
        error: 'Invalid username and/or password.',
      });
      return;
    }
    dispatch({
      type: 'LOGIN_ERROR',
      error: `${response.status} error.`,
    });
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error.toString() });
    console.log(error);
    return null;
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}

export const getMessages = async (setMessages, channelId) => {
  const token = localStorage.getItem('token');

  const headerConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const request = axios
      .get(
        `http://localhost:8000/api/channels/${channelId}/posts`,
        headerConfig
      )
      .catch((error) => {
        throw error;
      });

    const data = await request;

    if (data) {
      setMessages(data.data);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getChannels = async (setMessages, channelId) => {
  const token = localStorage.getItem('token');

  const headerConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const request = axios
      .get(`http://localhost:8000/api/channels/`, headerConfig)
      .catch((error) => {
        throw error;
      });

    const data = await request;

    if (data) {
      setChannels(data);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};