import React, { useNavigate } from 'react';
import { useAuthDispatch, logout, useAuthState } from '../context';

// NOTE THAT THIS MENU FUNCTION HAS NOT BEEN STYLED YET- IT IS JUST FOR the functionality

// Also note have to see how to get the name - for now, just {user.name}

function Logout() {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
    navigate('/');
  };
  return (
    <div>
      <h1>
        {userDetails.user.firstName} {userDetails.user.lastName}
      </h1>
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
