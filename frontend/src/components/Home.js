// src/components/Home.js
import React ,{useEffect}from 'react';
import { Link } from 'react-router-dom';
import '@dotlottie/player-component/dist/dotlottie-player.mjs'; // Import the dotlottie-player component

import "./css/home.css"
const Home = () => {
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
    <a className="button">
      <Link to="/signup">SignUp</Link>
    </a>
    <a className="button">
      <Link to="/login">Login</Link>
    </a>
    <a className="button">
      <Link to="/jobs">Jobs</Link>
    </a>
    <a className="button">
      <Link to="/Dashboard">Dashboard</Link>
    </a>
  </div>
</div>
  );
};

export default Home;
