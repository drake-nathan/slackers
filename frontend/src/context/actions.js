// NOTE - for now the root url is blank and I was using testing data - see below for functions
// NOTE - mgrum: URL is setup.
let ROOT_URL = 'http://localhost:8000/';
if (process.env.NODE_ENV === 'production') {
  ROOT_URL = 'https://slackersz.herokuapp.com/';
}

const users = [
  {
    userId: 1,
    firstName: 'Stephanie',
    lastName: 'Bistransin',
    email: 'sbistransin@gmail.com',
    channels: [1, 2, 3],
    directMessages: [12, 13, 14],
    messages: [1, 3, 5, 6, 9, 12],
  },
  {
    userId: 2,
    firstName: 'Doug',
    lastName: 'West',
    email: 'dougwest@gmail.com',
    channels: [1, 2],
    directMessages: [12, 23, 24],
    messages: [2, 4, 8, 10, 11],
  },
  {
    userId: 3,
    firstName: 'Aaron',
    lastName: 'Hayslip',
    email: 'aaron@hotmail.com',
    channels: [1],
    directMessages: [13, 23],
    messages: [],
  },
  {
    userId: 4,
    firstName: 'Amanda',
    lastName: 'Richardson',
    email: 'ar@yahoo.com',
    channels: [3],
    directMessages: [14, 24],
    messages: [],
  },
  {
    userId: 5,
    firstName: 'Michael',
    lastName: 'Grumbine',
    email: 'michael@gmail.com',
    channels: [1, 2, 3],
    directMessages: [],
    messages: [7],
  },
];

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

// NOTE FOR NOW - since I'm just using test data, the request options are blanked out since the test data is not JSON and it's not fetching data from a URL
// NOTE done. loginPayload is encoded and sent to the endpoint, and user and auth_token are returned as json.
export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: new URLSearchParams(loginPayload),
  };

  // Also NOTE that the response was CHANGED to accomodate the test data - I did a find of the test data BUT when we get a url I will switch back and turn back on the response.json()
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

    // FOR THE MOMENT, without the URL, the data.errors doesn't work so just console.logging. Will turn it back on when the url is set
    // mgrum update: connected to the backend. Should work now.
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
