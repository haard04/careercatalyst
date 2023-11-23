// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import "./css/signup.css"
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://online-resume-watcher-6xw5.onrender.com/signup', {
        username,
        email,
        password,
        password2,
      });

      console.log(response.data); // Log the response data (optional)

      // Handle successful signup (redirect, show a success message, etc.)
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with an error:', error.response.data);
        setError(error.response.data.error || 'An error occurred during signup.');
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
      <h2 class='text-white mt-5'>Sign Up</h2>

      <div class="form-group">
    <label for="formGroupExampleInput" class='text-white'>Username</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input" value={username} onChange={(e) => setUsername(e.target.value)}></input>
  </div>
      <div class="form-group">
        <label for="exampleInputEmail1" class="text-white">Email address</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" ></input>
        <small id="emailHelp" class="form-text text-white">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1" class="text-white">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ></input>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1" class="text-white">Confirm Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ></input>
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" ></input>
        <label class="form-check-label text-white" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary" >Sign Up</button>
    </form>
    </div>
  );
};

export default Signup;
