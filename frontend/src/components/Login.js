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
        'https://online-resume-watcher-6xw5.onrender.com/login',
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
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* <form onSubmit={handleLogin}>
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
      </form> */}
      <form onSubmit={handleLogin}>
      <h2 class='text-white mt-5'>Login</h2>

      <div class="form-group">
    <label for="formGroupExampleInput" class='text-white'>Username</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1" style={{ color: 'white' }}>Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
  </div>
  <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1" style={{ color: 'white' }}>Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  );
};

export default Login;
