// src/components/AddJobForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { getCookie } from '../csrf';

const AddJobForm = () => {
    const csrftoken = getCookie('csrftoken');
  const sessionid = getCookie('sessionid');

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

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://online-resume-watcher-6xw5.onrender.com/addJobToProfile',
        jobDetails,
        {
          withCredentials:true,
          
        }
      );

      console.log(response.data); // Handle success or error message from the server
    } catch (error) {
      console.error('Error adding job:', error.message,error.status);
    }
  };

  return (
    <div>
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={jobDetails.role}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Company Name:
          <input
            type="text"
            name="company_name"
            value={jobDetails.company_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={jobDetails.location}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Stipend Amount:
          <input
            type="number"
            name="stipend_amount"
            value={jobDetails.stipend_amount}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Job Type:
          <input
            type="text"
            name="job_type"
            value={jobDetails.job_type}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Application Date:
          <input
            type="text"
            name="application_date"
            value={jobDetails.application_date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={jobDetails.status}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Job Link:
          <input
            type="text"
            name="job_link"
            value={jobDetails.job_link}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Referred By:
          <input
            type="text"
            name="referred_by"
            value={jobDetails.referred_by}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobForm;
