// NOTE - mgrum: URL is setup.

import axios from 'axios';

// const axios = require('axios');

const ROOT_URL = process.env.REACT_APP_ROOT_SERVER_URL;
// These function dispatch multiple state updates as a result of an Http request or side-effect. The loginUser function will handle asynchronous requests to the server to authenticate a user login details and a logout function used to log a user out of an authenticated session.

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
    const response = await fetch(`${ROOT_URL}/api/sign-in`, requestOptions);

    if (response.ok) {
      const data = await response.json();
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      localStorage.setItem('token', data.auth_token);
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

export async function addChannelUser(channelId, userId) {
  const token = localStorage.getItem('token');
  const body = {
    userId,
  };

  const headerConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.post(
      `${ROOT_URL}/api/conversations/${channelId}/users`,
      body,
      headerConfig
    );
    if (response.status === 200) {
      const addedUser = await response.data;
      console.log(addedUser);
      return addedUser;
    }
    console.log(response.statusText);
    return response.status;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getNonConvoUsers(conversationId) {
  const token = localStorage.getItem('token');

  const headerConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.get(
      `${ROOT_URL}/api/conversations/${conversationId}/non-users`,
      headerConfig
    );
    if (response.status === 200) {
      debugger;
      const users = await response.data;
      console.log(users);
      return users;
    }
    console.log(response.statusText);
    return response.status;
  } catch (error) {
    console.log(error);
    return null;
  }
}
