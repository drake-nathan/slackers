// Below we are either retrieving or storing user info and the jwt token for the logged in user;

const user = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).user
  : '';
const token = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).auth_token
  : '';

export const initialState = {
  userDetails: '' || user,
  token: '' || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (state, { type, payload, error }) => {
  switch (type) {
    case 'REQUEST_LOGIN':
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: payload.user,
        token: payload.auth_token,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: '',
        token: '',
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        loading: false,
        errorMessage: error,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
