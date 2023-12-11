// src/components/Home.js
import React ,{useEffect , useState}from 'react';
import { Link } from 'react-router-dom';
import '@dotlottie/player-component/dist/dotlottie-player.mjs'; // Import the dotlottie-player component

import "./css/home.css"
import axios from 'axios';
import { getCookie } from '../csrf';
const Home = () => {
  console.log(getCookie('sessionid'));
  console.log(getCookie('csrftoken'))

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  useEffect(() => {
    // Check if the user is logged in by looking for the presence of a specific cookie
    const sessionid = getCookie('sessionid');
    const getuser = async ()=> {
    if (sessionid) {
      // User is logged in
      setIsLoggedIn(true);
      try {
        const response = await axios.get('http://localhost:8000/get_logged_in_user', { 
          withCredentials: true,
        });
        console.log(response.data['username'])
        setUsername(response.data['username'])
        
      } 
        catch(error) {
          console.error('Error fetching username:', error);
        }
    } else {
      // User is not logged in
      setIsLoggedIn(false);
    }
    };
    getuser();
  }, []);




  return (
    <div className="grid">
      <p className="title">
        CareerCatalyst
      </p>
  <div className='dsc'>
    <h1>CareerCatalysts</h1>
    <h2>Effortlessly Manage Your Job Search</h2>
          
    <p className="para">
          CareerCatalysts is a user-friendly job search management tool designed to help
          you keep track of all your job applications in one place. With
          CareerCatalysts, you can easily add job listings and track their status,
          whether it&apos;s pending, interview scheduled, or declined. Say
          goodbye to the hassle of managing your job search with spreadsheets or
          sticky notes, and say hello to CareerCatalysts - your ultimate job search
          companion.
    </p>
    <Link to="/AddJobForm">
    <button className='newbtn'>Start Managing Your Job</button>
    </Link>
    
  </div>
                <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>

              {/* Use dotlottie-player inside a div */}
              <div className='lottie'>
                <dotlottie-player
                  src="https://lottie.host/589a8130-32ce-4f03-9069-81cd0a86aa59/VT22K1aRjN.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '400px', height: '400px' }}
                  loop
                  autoplay
                ></dotlottie-player>
              </div>
  <div className='btns'>
  {isLoggedIn ? (
          // If user is authenticated, show logout button and username
          <>
            <p className="username">Welcome,{username}</p>
            <a className="button">
              <Link to="/logout">Logout</Link>
            </a>
          </>
        ) : (
          // If user is not authenticated, show login button
          <>
            <a className="button">
              <Link to="/signup">SignUp</Link>
            </a>
            <a className="button">
              <Link to="/login">Login</Link>
            </a>
          </>
        )}
    <a className="button">
      <Link to="/jobs">Jobs</Link>
    </a>

    <a className="button">
      <Link to="/Dashboard">Track Jobs</Link>
    </a>
  </div>
</div>
  );
};

export default Home;
