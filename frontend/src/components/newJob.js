// src/components/AddJobForm.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../csrf';
import "./css/addjob.css"
import { useNavigate } from 'react-router-dom';
const AddJobForm = () => {
  const csrftoken = getCookie('csrftoken');
  const sessionid = getCookie('sessionid');
  const navigate = useNavigate(); 

  const [username, setUsername] = useState('');
  useEffect(() => {
    // Check if the user is logged in by looking for the presence of a specific cookie
    const sessionid = getCookie('sessionid');
    const getuser = async ()=> {
    if (sessionid) {
      // User is logged in

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

    }
    };
    getuser();
  }, []);


  const [jobDetails, setJobDetails] = useState({
    role: '',
    company_name: '',
    location: '',
    stipend_amount: 0,
    job_type: '',
    application_date: '',
    status: '',
    job_link: '',
    referred_by: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('role', jobDetails.role);
    formData.append('company_name', jobDetails.company_name);
    formData.append('location', jobDetails.location);
    formData.append('stipend_amount', jobDetails.stipend_amount);
    formData.append('job_type', jobDetails.job_type);
    formData.append('application_date', jobDetails.application_date);
    formData.append('status', jobDetails.status);
    formData.append('job_link', jobDetails.job_link);
    formData.append('referred_by', jobDetails.referred_by);

    console.log('Request Body:', jobDetails);
    try {
      console.log(sessionid)
      const response = await axios.post(
        'http://127.0.0.1:8000/addJobToProfile',
        {
          username:username,
          role: jobDetails.role,
          company_name: jobDetails.company_name,
          location: jobDetails.location,
          stipend_amount: jobDetails.stipend_amount,
          job_type: jobDetails.job_type,
          application_date: jobDetails.application_date,
          status: jobDetails.status,
          job_link: jobDetails.job_link,
          referred_by: jobDetails.referred_by,
      },
        {
          withCredentials:true,xsrfCookieName:true,withXSRFToken:true
         
        }
      );

      if (response.status === 210) {
        setSuccessMessage('Job added successfully!');
        // Clear form after successful submission
        setJobDetails({
          role: '',
          company_name: '',
          location: '',
          stipend_amount: 0,
          job_type: '',
          application_date: '',
          status: 'Watchlist',
          job_link: '',
          referred_by: '',
        });
        navigate('/')
      } else {
        console.log('Unexpected response:', response.status);

      } // Handle success or error message from the server
    } catch (error) {
      console.error('Error adding job:', error.message,error.status);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h2>Add Job</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
        <label>
          Role :  <input
            type="text"
            name="role"
            value={jobDetails.role}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Company Name :  <input
            type="text"
            name="company_name"
            value={jobDetails.company_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Location : <input
            type="text"
            name="location"
            value={jobDetails.location}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Stipend Amount : <input
            type="number"
            name="stipend_amount"
            value={jobDetails.stipend_amount}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Job Type :  <input
            type="text"
            name="job_type"
            value={jobDetails.job_type}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Application Date :  <input
            type="text"
            name="application_date"
            value={jobDetails.application_date}
            onChange={handleInputChange}
          />
        </label>
        <label>
  Status:
  <select
    name="status"
    value={jobDetails.status}
    onChange={handleInputChange}
  >
    <option value="Watchlist">Watchlist</option>
    <option value="Applied">Applied</option>
    <option value="Online Assessment">Online Assessment</option>
    <option value="Interview">Interview</option>
    <option value="Accepted">Accepted</option>
    <option value="Rejected">Rejected</option>
  </select>
</label>
        <label>
          Job Link :  <input
            type="text"
            name="job_link"
            value={jobDetails.job_link}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Referred By :   <input
            type="text"
            name="referred_by"
            value={jobDetails.referred_by}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" class="btn btn-primary">AddJob</button>
      </form>
    </div>
  );
};

export default AddJobForm;
