// // src/components/Home.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div>
//       <h1>Welcome to My App</h1>
//       <Link to="/signup">Sign Up</Link>
//       <Link to="/login">Login</Link>
//       <Link to="/jobs">Jobs</Link>
//     </div>
//   );
// };

// export default Home;
import React from 'react';
import './home.css'; // Import the external CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function IndexPageClient() {
  const isLoggedIn = false; // Replace with your logic for checking logged in status
  const isDemoApp = true; // Replace with your logic for checking demo app status

  if (isLoggedIn) {
    window.location.href = '/dashboard'; // Redirect if logged in
  }

  return (
    <div className="grid">
    <div className="space">
      <p className="title">
        CareerCatalyst
      </p>
      </div>
      
    <div>
      <h1>Welcome to My App</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
      <Link to="/jobs">Jobs</Link>
      <Link to="/Dashboard">Dashboard</Link>
      <Link to="/AddJobForm">AddJobForm</Link>

    </div>
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
      <button className='newbtn'>Start Managing Your Job</button>
    </div>
    <a className="button">
      <Link to="/signup">SignUp</Link>
    </a>
    <a className="button">
      <Link to="/login">Login</Link>
    </a>
    <a className="button">
      <Link to="/jobs">Jobs</Link>
    </a>
  
  </div>
    
  );
}

export default IndexPageClient;
