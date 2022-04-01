export const MessagesReducer = (state, { type, payload, error }) => {
  switch (type) {
    case 'REQUEST_MESSAGES':
      return {
        ...state,
        loading: true,
      };
    case 'MESSAGES_RECIEVED':
      return {
        ...state,
        messages: payload,
        loading: false,
      };
    case 'MESSAGE_REQUEST_ERROR':
      return {
        ...state,
        loading: false,
        errorMessage: error,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
