import React, { useState } from 'react';
import axios from 'axios';
import { setCookie, getCookie } from '../csrf';  // Assuming you have a getCookie function
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [csrftoken] = useState(getCookie('csrftoken'));
    // Make sure getCookie is implemented

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'http://localhost:8000/login',
        {
          username,
          password,
        }
      );
  
      // Handle successful login
      const csrfTokenFromResponse = response.data.token;
  
      // Set CSRF token and session ID in cookies
      setCookie('csrftoken', csrfTokenFromResponse);
      setCookie('sessionid', response.data.sessionid);
  
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password.');
      } else {
        setError('An error occurred while trying to log in.');
        console.error('Error during login:', error);
      }
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />

        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
