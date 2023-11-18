// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { setCookie } from '../csrf';
import { getCookie } from '../csrf';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const csrftoken = getCookie('csrftoken');

  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password,
        
      },{
        headers: {
            'X-CSRFToken': csrftoken,
          },
      });

      console.log(response.data); // Log the response data (optional)

      // Handle successful login (e.g., store authentication token, redirect)
      const csrfTokenFromResponse = response.data.token;

      // Set CSRF token and session ID in cookies
      setCookie('csrftoken', csrfTokenFromResponse);
      setCookie('sessionid', response.data.sessionid);

        navigate('/dashboard');

        // Handle successful login (e.g., store authentication token, redirect)
      
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with an error:', error.response.data);
        setError(error.response.data.error || 'Invalid credentials.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server.');
        setError('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
        setError('Error setting up the request.');
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
