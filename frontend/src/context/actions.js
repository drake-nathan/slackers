// NOTE - for now the root url is blank and I was using testing data - see below

const ROOT_URL = '';

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

// FOR NOW - since I'm just using test data, the request options are blanked out since the test data is not JSON and it's not fetching data form a URL
export async function loginUser(dispatch, loginPayload) {
  // const requestOptions = {
  //   method: 'POST',
  // headers: { 'Content-Type': 'application/json' },
  // body: JSON.stringify(loginPayload),
  // };

  // Also NOTE that the response was CHANGED to accomodate the test data - when we get a url I will switch back and turn back on the response.json()
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    const response = users.find((user) => user.email === loginPayload.email);
    // const response = await fetch(`${ROOT_URL}`, requestOptions);
    const data = response;
    console.log(response);
    //  response.json();

    if (data) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data;
    }

    // FOR THE MOMENT, without the URL, the data.errors doesn't work so just console.logging. Will turn it back on when the url is set
    console.log('not found');
    // dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}
