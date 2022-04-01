import { createContext, useContext, useMemo, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { AuthReducer, initialState } from './reducer';

// This context object will contain the authentication token and user details.
const AuthStateContext = createContext();

// This context object will contain channel messages
export const ChannelMessageContext = createContext({});

//  We will use this context object to pass the dispatch method created in the reducer file. This makes it easy to provide the dispatch method to components that need it.
const AuthDispatchContext = createContext();

// These next functions create custom hooks that will help us read values from these context objects without having to call useContext in every component that needs it. It also does some error handling in case these contexts are used outside the context providers.
export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }

  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }

  return context;
}

// This provider composes the logic that helps us manage our application.
export const AuthProvider = ({ children }) => {
  // note that useReducer starts with this as a means of keeping/managing state using useReducer. Note that it references a specific reducer and returns an array with the current state and the dispatch method for triggering state updates/changes,
  const [user, dispatch] = useReducer(AuthReducer, initialState);
  const [messages, setMessages] = useState([]);

  return (
    <ChannelMessageContext.Provider value={{ messages, setMessages }}>
      <AuthStateContext.Provider value={user}>
        <AuthDispatchContext.Provider value={dispatch}>
          {children}
        </AuthDispatchContext.Provider>
      </AuthStateContext.Provider>
    </ChannelMessageContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
