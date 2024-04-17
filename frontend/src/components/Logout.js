import React from 'react';
import { removeCookie } from '../csrf'; // Assuming you have a removeCookie function
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session-related cookies
    removeCookie('csrftoken');
    removeCookie('sessionid');

    // Navigate to home page
    navigate('/');
  };

  // Call handleLogout function immediately after rendering
  // This will clear cookies and redirect to home page automatically
  handleLogout();

  return (
    <div>
      {/* You can optionally display a logout message here */}
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
